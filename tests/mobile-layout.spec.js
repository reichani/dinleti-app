import { test, expect } from "@playwright/test";

async function onboardingTamamla(page) {
  await page.goto("/");
  const startButton = page.getByRole("button", { name: /Okuma yolumu başlat/i });
  if (await startButton.isVisible().catch(() => false)) {
    await startButton.click();
  }
  await expect(page.getByText(/İçerik durumu/i)).toBeVisible();
}

test.describe("Mobil görünüm regresyonları", () => {
  test("sayfada yatay taşma oluşmaz", async ({ page }) => {
    await page.goto("/");

    const overflow = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      difference:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    }));

    expect(
      overflow.difference,
      `Sayfa ${overflow.difference}px yatay taşıyor`
    ).toBeLessThanOrEqual(1);
  });

  test("görünür öğeler ekran sınırlarını aşmaz", async ({ page }) => {
    await page.goto("/");

    const overflowingElements = await page.evaluate(() =>
      [...document.querySelectorAll("body *")]
        .filter((element) => {
          const style = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();

          if (
            style.position === "fixed" ||
            style.position === "absolute" ||
            rect.width === 0 ||
            rect.height === 0
          ) {
            return false;
          }

          return rect.left < -1 || rect.right > window.innerWidth + 1;
        })
        .slice(0, 20)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName,
            text: element.textContent?.trim().slice(0, 80),
            className:
              typeof element.className === "string" ? element.className : "",
            left: rect.left,
            right: rect.right
          };
        })
    );

    expect(overflowingElements).toEqual([]);
  });

  test("ana uygulama alanı mobil ekranda kullanılabilir", async ({ page }) => {
    await page.goto("/");

    const root = page.locator("#root");
    await expect(root).toBeVisible();

    const rootBox = await root.boundingBox();
    expect(rootBox).not.toBeNull();
    expect(rootBox.width).toBeGreaterThanOrEqual(320);
  });

  test("mobil okuma stil paketi build içine yüklenir", async ({ page }) => {
    await page.goto("/");

    const kurallar = await page.evaluate(() =>
      [...document.styleSheets]
        .flatMap((sheet) => {
          try {
            return [...sheet.cssRules].map((rule) => rule.cssText);
          } catch {
            return [];
          }
        })
        .join("\n")
    );

    expect(kurallar).toContain("[data-okuma-metin]");
    expect(kurallar).toContain("overflow-wrap: break-word");
    expect(kurallar).toContain("max-height: none !important");
    expect(kurallar).toContain("safe-area-inset-bottom");
    expect(kurallar).toContain("touch-action: manipulation");
  });

  test("mobil okuma metni sabit kartta kayar ve aktif kelime takibine alan bırakır", async ({ page }, testInfo) => {
    await onboardingTamamla(page);

    await page.getByLabel("Kendi metnim", { exact: true }).fill(
      "Oki bugün sakin bir metin okuyor. Kelimeler ekrana rahatça sığıyor. Satırlar düzenli aralıklarla ilerliyor. Uzun metinlerde aktif kelime kartın içinde görünür kalıyor. Okuma devam ettikçe metin kontrollü biçimde kayıyor."
    );
    await page.getByRole("button", { name: /Okuma moduna al/i }).click();

    const readingText = page.locator("[data-okuma-metin]");
    await expect(readingText).toBeVisible();

    const metrics = await readingText.evaluate((element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        overflowY: style.overflowY,
        fontSize: Number.parseFloat(style.fontSize),
        lineHeight: Number.parseFloat(style.lineHeight),
        height: rect.height,
        left: rect.left,
        right: rect.right,
        viewportWidth: window.innerWidth
      };
    });

    const mobilProje = testInfo.project.name !== "desktop-chrome";
    expect(metrics.overflowY).toBe(mobilProje ? "auto" : "visible");
    if (mobilProje) expect(metrics.height).toBeGreaterThanOrEqual(170);
    expect(metrics.fontSize).toBeGreaterThanOrEqual(17);
    expect(metrics.lineHeight).toBeGreaterThan(metrics.fontSize * 1.5);
    expect(metrics.left).toBeGreaterThanOrEqual(0);
    expect(metrics.right).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    await expect(page.locator("[data-alt-kontrol]")).toBeVisible();
  });
});