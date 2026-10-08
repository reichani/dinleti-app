import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { installSpeechSynthesisMock } from "./fixtures/speech-synthesis.js";

// v2.9.1 okuma bitişi sözleşmesi (okul demosu bulguları, 2026-10-05):
//  - "Birlikte Düşünelim" kartı anlatıcı son cümleyi okurken AÇILMAZ.
//  - Ses bitince oynatıcı durur (data-playing=0, data-okuma-bitti=1) ve kart açılır.
//  - "Okumayı bitir" sonrası ana sayfada "Kaldığın yerden devam et" kartı görünmez.
const BOOK_ID = "mino-nerede-sahnesi";
const READING_PATH = {
  secildi: true,
  yolId: "ilk_cumleler_7_8",
  evreId: "kisa_cumle",
  destekler: ["kelime_takibi", "odak"],
};

const appSource = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const sahne7 = appSource.match(/ad: "Sahne 7 — Gece Vakti", dk: 2, metin: "((?:[^"\\]|\\.)*)"/u)[1].replace(/\\n/g, "\n");
const kelimeSayisi = sahne7.trim().split(/\s+/u).length;

test("sesli okuma bitince oynatıcı durur, soru o zaman açılır ve devam kartı kalkar", async ({ page }) => {
  await installSpeechSynthesisMock(page, "normal");
  await page.addInitScript(({ readingPath, bookId, wordIndex }) => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "1");
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(readingPath));
    localStorage.setItem("dinleti-mod-v1", "cocuk");
    localStorage.setItem("dinleti-durum-v1", JSON.stringify({
      favoriler: [], hiz: 1, sonKitap: bookId,
      ilerlemeler: { [bookId]: { pos: 700, sectionIndex: 6, wordIndex, storyId: bookId, ts: Date.now(), version: 2 } },
    }));
  }, { readingPath: READING_PATH, bookId: BOOK_ID, wordIndex: kelimeSayisi - 10 });

  await page.goto("/");
  const resumeLabel = page.getByText("Kaldığın yerden devam et", { exact: true });
  await expect(resumeLabel).toBeVisible();
  await resumeLabel.locator("..").click();

  const player = page.locator("[data-mobile-stability]");
  await expect(player).toBeVisible();
  await expect(player).toHaveAttribute("data-playing", "1");
  const soru = page.locator("[data-birlikte-dusunelim]");

  // Son cümle okunurken kart ekranda olmamalı: oynatma sürerken kartın DOM'a
  // girdiği her an sayfa içi gözlemciyle yakalanır (kısa kelimelerde polling kaçırabilir).
  await page.evaluate(() => {
    window.__soruErken = false;
    const kontrol = () => {
      const shell = document.querySelector("[data-mobile-stability]");
      if (shell?.getAttribute("data-playing") === "1" && document.querySelector("[data-birlikte-dusunelim]")) window.__soruErken = true;
    };
    new MutationObserver(kontrol).observe(document.body, { childList: true, subtree: true, attributes: true });
    kontrol();
  });

  // Ses bitince: oynatıcı durur, kart açılır.
  await expect(player).toHaveAttribute("data-okuma-bitti", "1", { timeout: 15000 });
  await expect(player).toHaveAttribute("data-playing", "0");
  await expect(soru).toBeVisible();
  expect(await page.evaluate(() => window.__soruErken)).toBe(false);

  await soru.getByRole("button", { name: "Okumayı bitir" }).click();
  await expect(player).toHaveCount(0);
  await expect(page.getByText("Kaldığın yerden devam et", { exact: true })).toHaveCount(0);
  const kayit = await page.evaluate((id) => JSON.parse(localStorage.getItem("dinleti-durum-v1")).ilerlemeler[id], BOOK_ID);
  expect(kayit.tamamlandi).toBe(true);
});
