import { test, expect } from "@playwright/test";
import { installSpeechSynthesisMock } from "./fixtures/speech-synthesis.js";

// v2.9.3 sözleşmesi: ses çalarken okuma yolu ekranında yapılan seçimler kaybolmaz.
// Önceden okuma yolu sayfası her App render'ında yeniden kuruluyordu; ses çalarken
// konum her kelimede güncellendiği için yol ve evre seçimi anında sıfırlanıyordu.
test("ses çalarken okuma yolu ve evre seçimi korunur", async ({ page }) => {
  await installSpeechSynthesisMock(page);
  await page.addInitScript(() => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "1");
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify({ secildi: true, yolId: "ilk_cumleler_7_8", evreId: "kisa_cumle", destekler: ["kelime_takibi", "odak"] }));
    localStorage.setItem("dinleti-mod-v1", "cocuk");
  });
  await page.goto("/");
  await page.getByText("Grimm Kardeşler Masalları").first().click();
  await page.getByRole("button", { name: "Okumaya başla" }).first().click();
  await expect(page.getByRole("button", { name: "Duraklat" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Kapat" }).first().click();
  await page.getByRole("button", { name: "Geri" }).first().click();

  await page.getByRole("button", { name: "Değiştir" }).first().click();
  const akici = page.locator('[data-yol="akici_okuma_10_12"]');
  await akici.click();
  await page.waitForTimeout(600); // birkaç kelime ilerlesin
  const uzun = page.getByRole("button", { name: "Uzun metinde zorlanıyor" });
  await expect(uzun).toBeVisible();
  await uzun.click();
  await page.waitForTimeout(600);
  await expect(page.locator("[data-onboarding-page]")).toContainText("10–12 · Uzun metinde zorlanıyor");
  await expect(akici).toHaveCSS("border-top-color", "rgba(232, 163, 61, 0.48)");
});
