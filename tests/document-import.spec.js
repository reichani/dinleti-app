import { test, expect } from "@playwright/test";

const READER_PROFILE = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "buyuk_yazi", "genis_aralik", "yumusak_zemin"],
};

test("TXT dosyası önizlemeden sonra mevcut Reader'a alınır", async ({ page }) => {
  await page.addInitScript((profile) => {
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(profile));
  }, READER_PROFILE);

  await page.goto("/");
  await page.getByRole("button", { name: /Kendi İçeriğini Ekle/i }).click();

  const dialog = page.getByRole("dialog", { name: /Kendi İçeriğini Ekle/i });
  await expect(dialog).toBeVisible();

  const sample = "Sadâbâd sabahın ilk ışığında sessizdi. Kağıthane kıyısında rüzgâr ağaçların arasından geçiyordu. Bu metin dosyadan gelen okuma akışını doğrular.";
  await dialog.locator('input[type="file"]').setInputFiles({
    name: "sadabad-deneme.txt",
    mimeType: "text/plain",
    buffer: Buffer.from(sample, "utf8"),
  });

  await expect(dialog.getByLabel("Kendi metnim", { exact: true })).toHaveValue(sample);
  await expect(dialog).toContainText("okumaya hazır");
  await expect(page.locator("[data-reader-shell]")).toHaveCount(0);

  await dialog.getByRole("button", { name: "Okuma moduna al", exact: true }).click();
  const reader = page.locator("[data-reader-shell]");
  await expect(reader).toBeVisible();
  await expect(reader).toHaveAttribute("data-story-id", /kendi-metin-/);
  await expect(reader).toContainText("Sadâbâd");
});
