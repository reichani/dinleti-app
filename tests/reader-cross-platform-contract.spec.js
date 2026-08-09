import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";
import { installSpeechSynthesisMock } from "./fixtures/speech-synthesis.js";

const appSource = fs.readFileSync(path.resolve("src/App.jsx"), "utf8");

test("reader exposes stable sync contracts", async () => {
  expect(appSource).toContain("data-kelime-ix={gercekIx}");
  expect(appSource).toContain("data-aktif-cumle=");
  expect(appSource).toContain("data-okuma-modu={m.id}");
  expect(appSource).toContain("data-ses-tonu={sesTonu}");
  expect(appSource).toContain('data-mobile-stability="v2.8.1"');
});

for (const scenario of ["normal", "repeated-zero", "no-boundary", "silent-stop"]) {
  test(`app boots with ${scenario} speech engine`, async ({ page }) => {
    await installSpeechSynthesisMock(page, scenario);
    await page.goto("/");
    await expect(page.locator("[data-app-shell]")).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/uygulama hatası|application error/i);
  });
}

test("interactive targets remain at least 44px on touch layouts", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop-chrome", "Touch target gate applies to mobile projects.");
  await installSpeechSynthesisMock(page);
  await page.goto("/");
  const undersized = await page.locator("button:visible").evaluateAll((buttons) =>
    buttons.filter((button) => {
      const box = button.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && (box.width < 44 || box.height < 44);
    }).slice(0, 5).map((button) => button.getAttribute("aria-label") || button.textContent?.trim())
  );
  expect(undersized, `Undersized touch targets: ${undersized.join(", ")}`).toEqual([]);
});
