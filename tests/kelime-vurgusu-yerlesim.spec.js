import { test, expect } from "@playwright/test";
import { installSpeechSynthesisMock } from "./fixtures/speech-synthesis.js";

// v2.9.2 kelime vurgusu yerleşim sözleşmesi (Samsung kaydı, 2026-10-08):
//  - Aktif kelime değiştiğinde hiçbir kelimenin yeri değişmez (padding/kalınlık kaynaklı satır kayması yok).
//  - Cümle bandı kelime başına ayrı kutu çizmez: gölge yok, köşe yuvarlama yok.
//  - Aktif kelime vurgusu sondaki boşluğu boyamaz.
const BOOK_ID = "mino-nerede-sahnesi";
const READING_PATH = { secildi: true, yolId: "ilk_cumleler_7_8", evreId: "kisa_cumle", destekler: ["kelime_takibi", "odak"] };

test("büyük punto + ekstra aralık + odak modunda kelime vurgusu satırları kaydırmaz", async ({ page }) => {
  await installSpeechSynthesisMock(page, "normal");
  await page.addInitScript(({ readingPath, bookId }) => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "1");
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(readingPath));
    localStorage.setItem("dinleti-mod-v1", "cocuk");
    localStorage.setItem("dinleti-durum-v1", JSON.stringify({
      favoriler: [], hiz: 1, sonKitap: bookId,
      ilerlemeler: { [bookId]: { pos: 121, sectionIndex: 1, wordIndex: 0, storyId: bookId, ts: Date.now(), version: 2 } },
    }));
  }, { readingPath: READING_PATH, bookId: BOOK_ID });

  await page.goto("/");
  const resumeLabel = page.getByText("Kaldığın yerden devam et", { exact: true });
  await expect(resumeLabel).toBeVisible();
  await resumeLabel.locator("..").click();
  const player = page.locator("[data-mobile-stability]");
  await expect(player).toBeVisible();

  // Kayıttaki ayarlar: 26 px, Aralık: Ekstra, Odak modu, Kelime vurgusu açık.
  const ayarlarAcik = await page.locator("[data-reader-settings]").getAttribute("data-acik");
  if (ayarlarAcik !== "1" && await page.getByRole("button", { name: /Ayarlar/ }).first().isVisible()) {
    await page.getByRole("button", { name: /Ayarlar/ }).first().click();
  }
  for (let i = 0; i < 4 && !(await page.getByRole("button", { name: "Yazı boyutu: 26 piksel" }).count()); i += 1) {
    await page.getByRole("button", { name: /Yazı boyutu:/ }).click();
  }
  for (let i = 0; i < 4 && !(await page.getByRole("button", { name: /aralığı: Ekstra geniş/ }).count()); i += 1) {
    await page.getByRole("button", { name: /Harf ve satır aralığı:/ }).click();
  }
  const odak = page.getByRole("button", { name: "Odak modu" });
  if ((await odak.getAttribute("aria-pressed")) !== "true") await odak.click();
  const kapat = page.getByRole("button", { name: "Okuma ayarlarını kapat" });
  if (await kapat.isVisible()) await kapat.click();

  const metin = player.locator("[data-okuma-metin]");
  if (!(await page.getByRole("button", { name: "Duraklat" }).count())) await page.getByRole("button", { name: "Oynat" }).first().click();
  await expect(metin.locator('[data-aktif="1"]')).toHaveCount(1, { timeout: 10000 });

  const yerlesim = () => metin.evaluate((el) => {
    const kutu = el.getBoundingClientRect();
    const aktif = el.querySelector('[data-aktif="1"]');
    return {
      aktifIx: Number(aktif?.dataset.kelimeIx ?? -1),
      yerler: [...el.querySelectorAll("[data-kelime-ix]")].map((k) => {
        const r = k.getBoundingClientRect();
        return { ix: k.dataset.kelimeIx, sol: Math.round(r.left - kutu.left), ust: r.top - kutu.top + el.scrollTop, gen: Math.round(r.width) };
      }),
    };
  });

  const ilk = await yerlesim();
  await expect.poll(async () => (await yerlesim()).aktifIx, { timeout: 10000 }).not.toBe(ilk.aktifIx);
  const sonra = await yerlesim();
  // Yatay konum ve genişlik birebir aynı kalmalı (satır kayması yok); dikeyde yalnız kaydırma yuvarlaması (≤2 px) tolere edilir.
  expect(sonra.yerler.map(({ ix, sol, gen }) => `${ix}:${sol}:${gen}`)).toEqual(ilk.yerler.map(({ ix, sol, gen }) => `${ix}:${sol}:${gen}`));
  const satirFarki = Math.max(...sonra.yerler.map((y, i) => Math.abs(y.ust - ilk.yerler[i].ust)));
  expect(satirFarki).toBeLessThanOrEqual(2);

  const stil = await metin.evaluate((el) => {
    const cumle = el.querySelector('[data-aktif-cumle="1"]');
    const govde = el.querySelector('[data-aktif="1"] > [data-kelime-govde]');
    const cs = cumle ? getComputedStyle(cumle) : null;
    return {
      cumleVar: Boolean(cumle),
      cumleGolge: cs?.boxShadow,
      cumleKose: cs?.borderTopLeftRadius,
      govdeMetni: govde?.textContent,
      govdeKalinlik: govde ? getComputedStyle(govde).fontWeight : null,
      metinKalinlik: getComputedStyle(el).fontWeight,
    };
  });
  if (stil.cumleVar) {
    expect(stil.cumleGolge).toBe("none");
    expect(stil.cumleKose).toBe("0px");
  }
  expect(stil.govdeMetni).toBe(stil.govdeMetni.trimEnd());
  expect(stil.govdeKalinlik).toBe(stil.metinKalinlik);
  await page.screenshot({ path: test.info().outputPath("vurgu.png") });
});
