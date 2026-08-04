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

test("Uzay Kulübü Piyesi production kataloğunda kaynak damgasıyla açılır", async ({ page }) => {
  await uygulamayiHazirla(page);
  await page.getByRole("button", { name: "Ara", exact: true }).click();
  await page.getByPlaceholder("Kitap veya yazar ara").fill("Uzay Kulübü Piyesi");
  const result = page.getByRole("button", { name: /Uzay Kulübü Piyesi/ });
  await expect(result).toBeVisible();
  await result.click();

  const stamp = page.locator('[data-detail-page] [data-okurio-provenance-stamp]');
  await expect(stamp).toContainText("Okurio Kaynak İzi");
  await expect(stamp).toContainText("AI destekli");
  await expect(stamp.getByRole("link")).toHaveCount(3);
  const start = page.getByRole("button", { name: "Okumaya başla", exact: true });
  await expect(start).toBeEnabled();
  await start.click();
  await expect(page.locator("[data-reader-shell]")).toBeVisible();
  await expect(page.locator("[data-okuma-metin]")).toContainText("Okulun uzay kulübü");
});
