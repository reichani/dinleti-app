import { test, expect } from "@playwright/test";

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
    expect(kurallar).toContain("overflow-wrap: anywhere");
    expect(kurallar).toContain("max-height: none !important");
    expect(kurallar).toContain("safe-area-inset-bottom");
  });
});
