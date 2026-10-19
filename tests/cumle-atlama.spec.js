import { test, expect } from "@playwright/test";
import { installSpeechSynthesisMock } from "./fixtures/speech-synthesis.js";

// v2.10.1 sözleşmesi: varsayılan atlama cümle bazlıdır. Sonraki/önceki cümle ve
// "Cümleyi tekrarla" aktif kelimeyi cümle başına taşır; ayarlardan 15/30 sn'ye geçilebilir.
async function aktifIx(page) {
  return Number(await page.locator("[data-okuma-metin] [data-aktif]").first().getAttribute("data-kelime-ix"));
}
async function cumleBaslari(page) {
  return page.locator("[data-okuma-metin]").evaluate((el) => {
    const kelimeler = [...el.querySelectorAll("[data-kelime-ix]")].map((k) => k.textContent.trim());
    const starts = []; let s = 0;
    kelimeler.forEach((w, i) => { if (/[.!?…]$/u.test(w) || i === kelimeler.length - 1) { starts.push(s); s = i + 1; } });
    return starts;
  });
}

test("cümle bazlı atlama: sonraki, tekrarla, önceki ve süre moduna geçiş", async ({ page }) => {
  await installSpeechSynthesisMock(page);
  await page.addInitScript(() => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "1");
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify({ secildi: true, yolId: "ilk_cumleler_7_8", evreId: "kisa_cumle", destekler: ["kelime_takibi"] }));
    localStorage.setItem("dinleti-mod-v1", "cocuk");
  });
  await page.goto("/");
  await page.getByText("Grimm Kardeşler Masalları").first().click();
  await page.getByRole("button", { name: "Okumaya başla" }).first().click();
  await expect(page.getByRole("button", { name: "Duraklat" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Duraklat" }).first().click();

  const starts = await cumleBaslari(page);
  expect(starts.length).toBeGreaterThan(3);
  await page.getByRole("button", { name: "Sonraki cümle" }).click();
  await expect.poll(() => aktifIx(page)).toBe(starts[1]);
  await page.getByRole("button", { name: "Sonraki cümle" }).click();
  await expect.poll(() => aktifIx(page)).toBe(starts[2]);
  await page.getByRole("button", { name: "Önceki cümle" }).click();
  await expect.poll(() => aktifIx(page)).toBe(starts[1]);
  await page.getByRole("button", { name: "Cümleyi tekrarla" }).click();
  await expect.poll(() => aktifIx(page)).toBe(starts[1]);

  await page.getByRole("button", { name: /Aa\s+Ayarlar/ }).click();
  await page.getByRole("button", { name: "Atlama: Cümle" }).click();
  await expect(page.getByRole("button", { name: "Atlama: 15 / 30 saniye" })).toBeVisible();
  await page.getByRole("button", { name: "Okuma ayarlarını kapat" }).click();
  await expect(page.getByRole("button", { name: "15 saniye geri" })).toBeVisible();
  await expect(page.getByRole("button", { name: "30 saniye ileri" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sonraki cümle" })).toHaveCount(0);
});
