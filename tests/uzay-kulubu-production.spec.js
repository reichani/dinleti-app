import { test, expect } from "@playwright/test";

async function uygulamayiHazirla(page) {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem("dinleti:dinleti-mod-v1", "cocuk");
    const path = {
      secildi: true,
      yolId: "akici_okuma_10_12",
      evreId: "paragraf",
      destekler: ["kelime_takibi", "genis_aralik", "yumusak_zemin"],
    };
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(path));
    localStorage.setItem("dinleti:okurio-okuma-yolu-v1", JSON.stringify(path));
  });
  await page.goto("/");
}

test("Uzay Kulübü yapısal production adayı olarak açılır", async ({ page }) => {
  await uygulamayiHazirla(page);
  await page.getByRole("button", { name: "Ara", exact: true }).click();
  await page.getByPlaceholder("Kitap veya yazar ara").fill("Uzay Kulübü Sunumu");
  await page.getByRole("button", { name: /Uzay Kulübü Sunumu/ }).click();
  await expect(page.locator('[data-icerik-kapsami="full-reading"]')).toContainText("Tam okuma");
  await expect(page.getByRole("button", { name: "Okumaya başla", exact: true })).toBeEnabled();
});
