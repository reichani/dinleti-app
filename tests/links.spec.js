import { test, expect } from "@playwright/test";

test("sayfadaki dahili bağlantılar bozuk değildir", async ({ page }) => {
  await page.goto("/");

  const origin = new URL(page.url()).origin;
  const links = await page.locator("a[href]").evaluateAll((elements) =>
    elements.map((element) => ({
      text: element.textContent?.trim() || "İsimsiz bağlantı",
      href: element.href
    }))
  );

  for (const link of links) {
    const target = new URL(link.href);

    if (target.origin !== origin || target.protocol === "mailto:") {
      continue;
    }

    const response = await page.request.get(link.href);
    expect(
      response.status(),
      `${link.text} bağlantısı ${response.status()} döndürdü`
    ).toBeLessThan(400);
  }
});
