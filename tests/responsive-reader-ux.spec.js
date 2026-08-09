import { test, expect } from "@playwright/test";

const OKUMA_YOLU = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "buyuk_yazi", "genis_aralik", "yumusak_zemin"],
};

async function uygulamayiHazirla(page, okumaYolu = OKUMA_YOLU) {
  await page.addInitScript((okumaYolu) => {
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(okumaYolu));
  }, okumaYolu);
  await page.goto("/");
  await expect(page.locator("[data-kendi-metnim]")).toBeVisible();
}

async function okuyucuyuAc(page) {
  await uygulamayiHazirla(page);
  const metin = Array.from({ length: 24 }, (_, i) =>
    `Sakin okuma cümlesi ${i + 1}, geniş alanda rahatça izlenir ve kullanıcı istediği anda durur.`
  ).join(" ");
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  await page.getByLabel("Kendi metnim", { exact: true }).fill(metin);
  const ac = page.getByRole("button", { name: "Okuma moduna al", exact: true });
  await ac.click();
  await expect(page.locator("[data-reader-shell]")).toBeVisible();
  return ac;
}

test.describe("Responsive reader UX sözleşmesi", () => {
  test("kartlarda gerçek süre ve kapsam görünür; genişletilen Andersen tam okuma durumundadır", async ({ page }) => {
    await uygulamayiHazirla(page);
    await expect(page.locator("[data-surum]")).toContainText("v2.8.3");

    const kisaMasal = page.locator('[data-story-id="andersen-masallari"]').first();
    await expect(kisaMasal).toBeVisible();
    await expect(kisaMasal.locator("[data-content-scope]")).toHaveText("Tam okuma");
    await expect(kisaMasal.locator("[data-actual-duration]")).toContainText(/4:\d{2}/);
    await expect(kisaMasal).toHaveAttribute("data-reading-enabled", "true");

    const tamMetin = page.locator('[data-story-id="peter-rabbit-en"]').first();
    await expect(tamMetin).toBeVisible();
    await expect(tamMetin.locator("[data-content-scope]")).toHaveText("Tam metin");
    await expect(tamMetin).toHaveAttribute("data-reading-enabled", "true");
  });

  test("genişletilen Andersen tam okuma olarak başlatılabilir", async ({ page }) => {
    await uygulamayiHazirla(page);
    await page.getByRole("button", { name: "Ara", exact: true }).click();
    await page.getByPlaceholder("Kitap veya yazar ara").fill("Andersen Masalları");
    await page.getByRole("button", { name: /Andersen Masalları/ }).click();

    await expect(page.locator("[data-content-preparing]")).toHaveCount(0);
    await expect(page.locator('[data-icerik-kapsami="full-reading"]')).toContainText("Tam okuma");
    const baslat = page.getByRole("button", { name: "Okumaya başla", exact: true });
    await expect(baslat).toBeEnabled();
    await baslat.click();
    await expect(page.locator("[data-reader-shell]")).toBeVisible();
  });

  test("harf, hece ve kelime kartları ayrı Mikro Alıştırmalar rafındadır", async ({ page }) => {
    await uygulamayiHazirla(page, {
      ...OKUMA_YOLU,
      yolId: "ilk_harfler_6_7",
      evreId: "hece_kelime",
      destekler: ["hece_takibi", "kelime_takibi", "buyuk_yazi", "genis_aralik"],
    });

    const mikroRaf = page.locator('[data-shelf-name="Mikro Alıştırmalar"]');
    await expect(mikroRaf).toBeVisible();
    const tamOturum = page.locator('[data-story-id="okurio-lili-kayip-tohum-haritasi"]');
    await expect(tamOturum).toBeVisible();
    await expect(tamOturum.locator("[data-content-scope]")).toHaveText("Tam okuma");
    await expect(tamOturum.locator("[data-actual-duration]")).toContainText(/3:\d{2}/);
    await expect(tamOturum).toHaveAttribute("data-reading-enabled", "true");

    const harfKarti = mikroRaf.locator('[data-story-id="oki-ses-a"]');
    await expect(harfKarti.locator("[data-content-scope]")).toHaveText("Mikro alıştırma");
    await expect(harfKarti.locator("[data-actual-duration]")).toContainText(/0:\d{2}/);
    await expect(harfKarti).toHaveAttribute("data-reading-enabled", "true");

    await harfKarti.click();
    await expect(page.getByRole("button", { name: "Okumaya başla", exact: true })).toBeEnabled();
    await expect(page.locator('[data-icerik-kapsami="micro-exercise"]')).toContainText("Harf, hece veya kelime çalışmasıdır");
  });

  test("Kendi Metnim raflardan sonra kapalı CTA olarak durur ve isteğe bağlı açılır", async ({ page }, testInfo) => {
    await uygulamayiHazirla(page);
    const cta = page.getByRole("button", { name: /Kendi metnini oku/i });
    const lastShelf = page.locator("[data-content-shelf]").last();
    await expect(cta).toBeVisible();
    await expect(page.getByLabel("Kendi metnim", { exact: true })).toHaveCount(0);
    const [ctaBox, shelfBox] = await Promise.all([cta.boundingBox(), lastShelf.boundingBox()]);
    expect(ctaBox).not.toBeNull();
    expect(shelfBox).not.toBeNull();
    expect(ctaBox.y).toBeGreaterThanOrEqual(shelfBox.y + shelfBox.height);

    await cta.click();
    const dialog = page.locator("[data-kendi-metin-dialog]");
    await expect(dialog).toBeVisible();
    await expect(page.getByLabel("Kendi metnim", { exact: true })).toBeVisible();
    if (testInfo.project.name !== "desktop-chrome") {
      const height = await dialog.evaluate((element) => element.getBoundingClientRect().height);
      expect(height).toBeGreaterThanOrEqual((await page.evaluate(() => innerHeight)) - 1);
    }
  });

  test("masaüstünde uygulama ve gerçek metin yüzeyi geniş alanı kullanır", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "Masaüstü geometri sözleşmesi");
    await okuyucuyuAc(page);

    const metrics = await page.locator("[data-reader-shell]").evaluate((shell) => {
      const card = shell.querySelector("[data-okuma-metin]");
      const stage = shell.querySelector("[data-okuma-alani]");
      const settings = shell.querySelector("[data-reader-settings]");
      const shellRect = shell.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      return {
        shellWidth: shellRect.width,
        cardWidth: cardRect.width,
        cardHeight: cardRect.height,
        stageOverflow: getComputedStyle(stage).overflowY,
        cardOverflow: getComputedStyle(card).overflowY,
        settingsVisible: settings.getBoundingClientRect().width > 0,
      };
    });

    expect(metrics.shellWidth).toBeGreaterThanOrEqual(1050);
    expect(metrics.cardWidth).toBeGreaterThanOrEqual(650);
    expect(metrics.cardHeight).toBeGreaterThanOrEqual(300);
    expect(metrics.stageOverflow).toBe("hidden");
    expect(metrics.cardOverflow).toBe("auto");
    expect(metrics.settingsVisible).toBe(true);
  });

  test("mobilde ayarlar kapalı başlar ve metin kalan yüksekliği doldurur", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "desktop-chrome", "Mobil geometri sözleşmesi");
    await okuyucuyuAc(page);
    const shell = page.locator("[data-reader-shell]");
    const panel = shell.locator("[data-reader-settings]");
    await expect(panel).toBeHidden();

    const metrics = await shell.locator("[data-okuma-metin]").evaluate((card) => {
      const rect = card.getBoundingClientRect();
      return { height: rect.height, left: rect.left, right: rect.right, viewport: innerWidth };
    });
    expect(metrics.height).toBeGreaterThanOrEqual(220);
    expect(metrics.left).toBeGreaterThanOrEqual(0);
    expect(metrics.right).toBeLessThanOrEqual(metrics.viewport + 1);
    const dockHeight = await shell.locator("[data-alt-kontrol]").evaluate((element) => element.getBoundingClientRect().height);
    expect(dockHeight).toBeLessThanOrEqual(135);
    await expect(shell.locator("[data-transport-controls]")).toBeVisible();
    await expect(shell.locator("[data-okuma-modu-kompakt]")).toBeHidden();
    await expect(shell.locator("[data-alt-araclar]")).toBeHidden();

    await shell.locator("[data-reader-settings-toggle]").click();
    await expect(panel).toBeVisible();
    await panel.getByRole("button", { name: "Okuma ayarlarını kapat" }).click();
    await expect(panel).toBeHidden();
  });

  test("onboarding destekleri gerçek okuyucu stiline uygulanır", async ({ page }) => {
    await okuyucuyuAc(page);
    const values = await page.locator("[data-okuma-metin]").evaluate((card) => {
      const style = getComputedStyle(card);
      return {
        fontSize: Number.parseFloat(style.fontSize),
        letterSpacing: Number.parseFloat(style.letterSpacing),
        background: style.backgroundColor,
      };
    });
    expect(values.fontSize).toBeGreaterThanOrEqual(26);
    expect(values.letterSpacing).toBeGreaterThan(0);
    expect(values.background).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("okuyucu Escape ile kapanır ve odak açan kontrole döner", async ({ page }) => {
    await okuyucuyuAc(page);
    const geriDonus = page.getByRole("button", { name: /Kendi metnini oku/i });
    await expect(page.getByRole("dialog", { name: /okuma ekranı/i })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("[data-reader-shell]")).toHaveCount(0);
    await expect(geriDonus).toBeFocused();
  });
});
