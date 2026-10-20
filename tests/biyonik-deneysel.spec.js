import { test, expect } from "@playwright/test";

// Ürün kararı 20.10.2026 (Reyhan Açar): biyonik vurgu deneysel destek olarak geri gelir.
// Kanıt matrisi v1.0'da aleyhte (Snell 2024), bu yüzden: varsayılan kapalı, hiçbir
// ihtiyaç açmaz, dürüst not görünür, kelime metni ve indeksleri değişmez.

const OKUMA_YOLU = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "genis_aralik", "yumusak_zemin"],
};
const METIN = "Kaplumbağa sabah erkenden yola çıktı. Ormanın kenarında küçük bir dere vardı.";

async function okuyucuyuAc(page) {
  await page.addInitScript((okumaYolu) => {
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
  }, OKUMA_YOLU);
  await page.goto("/");
  await expect(page.locator("[data-kendi-metnim]")).toBeVisible();
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  await page.getByLabel("Kendi metnim", { exact: true }).fill(METIN);
  await page.getByRole("button", { name: "Okuma moduna al", exact: true }).click();
  const metin = page.locator("[data-okuma-metin]");
  await expect(metin).toBeVisible();
  await page.locator("[data-reader-settings-toggle]").click();
  const panel = page.locator("[data-reader-settings]");
  await expect(panel).toBeVisible();
  return { metin, panel };
}

test.describe("Deneysel biyonik vurgu", () => {
  test("varsayılan kapalı, dürüst not görünür ve ihtiyaçlar onu açmaz", async ({ page }) => {
    const { metin, panel } = await okuyucuyuAc(page);
    const dugme = panel.getByRole("button", { name: "Biyonik vurgu, deneysel" });
    await expect(dugme).toHaveAttribute("aria-pressed", "false");
    await expect(panel.locator("[data-biyonik-not]")).toContainText(/deneysel/);
    await expect(metin.locator("[data-biyonik]")).toHaveCount(0);
    for (const ad of ["Harfler kayıyor, karışıyor", "Uzun metinde dikkatim dağılıyor", "Gözüm çabuk yoruluyor", "Sade ve sakin ekran"]) {
      await panel.getByRole("button", { name: ad, exact: true }).click();
    }
    await expect(dugme).toHaveAttribute("aria-pressed", "false");
    await expect(metin.locator("[data-biyonik]")).toHaveCount(0);
  });

  test("açılınca kelime başları kalınlaşır; metin ve kelime indeksleri değişmez; ihtiyaç değişince korunur", async ({ page }) => {
    const { metin, panel } = await okuyucuyuAc(page);
    const onceMetin = (await metin.innerText()).replace(/\s+/g, " ").trim();
    const onceSayi = await metin.locator("[data-kelime-ix]").count();
    await panel.getByRole("button", { name: "Biyonik vurgu, deneysel" }).click();
    await expect(panel.getByRole("button", { name: "Biyonik vurgu, deneysel" })).toHaveAttribute("aria-pressed", "true");
    await expect(metin.locator("[data-biyonik]").first()).toBeAttached();
    expect((await metin.innerText()).replace(/\s+/g, " ").trim()).toBe(onceMetin);
    expect(await metin.locator("[data-kelime-ix]").count()).toBe(onceSayi);
    const kaplumbaga = metin.locator("[data-kelime-ix='0'] [data-biyonik]");
    await expect(kaplumbaga).toHaveText("Kapl");
    // 3 harfli kelime kalınlaştırılmaz ("bir").
    const bir = metin.locator("[data-kelime-ix]").filter({ hasText: /^bir$/ });
    await expect(bir.locator("[data-biyonik]")).toHaveCount(0);

    await panel.getByRole("button", { name: "Gözüm çabuk yoruluyor", exact: true }).click();
    await expect(panel.getByRole("button", { name: "Biyonik vurgu, deneysel" })).toHaveAttribute("aria-pressed", "true");

    await panel.getByRole("button", { name: "Biyonik vurgu, deneysel" }).click();
    await expect(metin.locator("[data-biyonik]")).toHaveCount(0);
  });
});
