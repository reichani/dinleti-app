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

test("onaysız Uzay Kulübü Sunumu production aramasında açılmaz", async ({ page }) => {
  await uygulamayiHazirla(page);
  await page.getByRole("button", { name: "Ara", exact: true }).click();
  await page.getByPlaceholder("Kitap veya yazar ara").fill("Uzay Kulübü Sunumu");
  await expect(page.getByRole("button", { name: /Uzay Kulübü Sunumu/ })).toHaveCount(0);
});
