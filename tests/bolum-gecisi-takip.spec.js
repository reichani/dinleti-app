import { test, expect } from "@playwright/test";
import { installSpeechSynthesisMock } from "./fixtures/speech-synthesis.js";

// v2.9.4 sözleşmesi (Samsung kaydı, 9 Ekim 2026): okuma kendiliğinden yeni bölüme
// geçtiğinde önceki bölümün kaydırma konumu kalmaz; yeni bölümün ilk kelimesi
// aynı karede görünür alandadır (yumuşak kaydırmanın yetişmesi beklenmez).
const BOOK_ID = "grimm-masallari";

async function seed(page, wordIndex) {
  await page.addInitScript(({ bookId, wordIndex }) => {
    const bayrak = `seeded-${wordIndex}`;
    if (sessionStorage.getItem(bayrak)) return;
    if (wordIndex == null && sessionStorage.getItem("seeded-ikinci")) return;
    sessionStorage.setItem(bayrak, "1");
    if (wordIndex != null) sessionStorage.setItem("seeded-ikinci", "1");
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify({ secildi: true, yolId: "ilk_cumleler_7_8", evreId: "kisa_cumle", destekler: ["kelime_takibi", "odak"] }));
    localStorage.setItem("dinleti-mod-v1", "cocuk");
    localStorage.setItem("dinleti-okuma-ayar-v1", JSON.stringify({ punto: 3, aralik: 2, odak: true, vurgu: true, tema: "krem", font: "lexend" }));
    if (wordIndex == null) return;
    localStorage.setItem("dinleti-durum-v1", JSON.stringify({
      favoriler: [], hiz: 1, sonKitap: bookId,
      ilerlemeler: { [bookId]: { pos: 0, sectionIndex: 0, wordIndex, storyId: bookId, ts: Date.now(), version: 2 } },
    }));
  }, { bookId: BOOK_ID, wordIndex });
}

test("bölüm kendiliğinden değişince yeni bölümün ilk kelimesi hemen görünür", async ({ page }) => {
  await installSpeechSynthesisMock(page, "normal");
  await seed(page, null);
  await page.goto("/");
  await page.getByText("Grimm Kardeşler Masalları").first().click();
  await page.getByRole("button", { name: "Okumaya başla" }).first().click();
  const metin = page.locator("[data-okuma-metin]");
  await expect(metin).toBeVisible();
  const kelimeSayisi = await metin.locator("[data-kelime-ix]").count();
  expect(kelimeSayisi).toBeGreaterThan(20);

  await page.evaluate(() => sessionStorage.clear());
  await seed(page, kelimeSayisi - 3);
  await page.goto("/");
  const devam = page.getByText("Kaldığın yerden devam et", { exact: true });
  await expect(devam).toBeVisible();
  await devam.locator("..").click();
  await expect(metin).toBeVisible();
  // Bölüm sonuna kaydırılmış olarak başlar; oynat.
  const oynat = page.getByRole("button", { name: "Oynat" }).first();
  if (await oynat.isVisible()) await oynat.click();

  const sonuc = await metin.evaluate((el) => new Promise((resolve) => {
    const ilkMetin = el.querySelector('[data-kelime-ix="0"]')?.textContent;
    const kontrol = () => {
      const ilk = el.querySelector('[data-kelime-ix="0"]');
      const aktif = el.querySelector("[data-aktif]");
      if (ilk && ilk.textContent !== ilkMetin && aktif && Number(aktif.getAttribute("data-kelime-ix")) <= 1) {
        requestAnimationFrame(() => {
          const kutu = el.getBoundingClientRect();
          const k = el.querySelector("[data-aktif]").getBoundingClientRect();
          resolve({ gorunur: k.top >= kutu.top - 1 && k.bottom <= kutu.bottom + 1, kTop: k.top, kutuTop: kutu.top, kutuBottom: kutu.bottom });
        });
        return;
      }
      requestAnimationFrame(kontrol);
    };
    setTimeout(() => resolve({ zamanAsimi: true }), 20000);
    requestAnimationFrame(kontrol);
  }));
  expect(sonuc.zamanAsimi).toBeUndefined();
  expect(sonuc.gorunur, JSON.stringify(sonuc)).toBe(true);
});
