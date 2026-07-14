import { test, expect } from "@playwright/test";

test.describe("Dinleti/Okurio temel açılış kontrolleri", () => {
  test("uygulama siyah ekranda kalmadan açılır", async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/");

    const root = page.locator("#root");
    await expect(root).toBeVisible();
    await expect(root).not.toBeEmpty();

    const rootText = (await root.innerText()).trim();
    expect(rootText.length).toBeGreaterThan(20);
    expect(pageErrors).toEqual([]);
  });

  test("sayfa başlığı korunur", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Dinleti|Okurio/i);
  });

  test("onboarding ekranı ve ana kataloğa geçiş çalışır", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText(/Okuma yolunu seç/i)).toBeVisible();

    const startButton = page.getByRole("button", {
      name: /Okuma yolumu başlat/i
    });

    await expect(startButton).toBeVisible();
    await startButton.click();

    await expect(page.getByText(/Oki Sesleri Dinliyor/i).first()).toBeVisible();
  });
});
