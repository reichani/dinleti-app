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
  expect(appSource).toContain('data-mobile-stability="v2.8.3"');
  expect(appSource).toContain("readerScrollRef");
  expect(appSource).toContain("container.scrollTo({ top: nextTop");
  expect(appSource).toContain("visibleHeight * 0.40");
  expect(appSource).toContain("visibleHeight * 0.55");
  expect(appSource).toContain("wordIsFullyVisible");
  expect(appSource).toContain("visualViewportBottom");
  expect(appSource).toContain('okumaModu === "kendim"');
  expect(appSource).not.toContain("scrollIntoView(");
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


test("dynamic viewport excludes player occlusion from the real active-word area", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop-chrome", "Occlusion gate applies to touch layouts.");
  await page.goto("/");

  const result = await page.evaluate(async () => {
    const { getReaderVisibleRect, isActiveWordActuallyVisible } = window.__okurioReadingFixes;
    const area = document.createElement("section");
    area.setAttribute("data-okuma-alani", "1");
    const reader = document.createElement("div");
    reader.setAttribute("data-okuma-metin", "1");
    const word = document.createElement("span");
    word.setAttribute("data-aktif", "1");
    const controls = document.createElement("div");
    controls.setAttribute("data-alt-kontrol", "1");
    reader.append(word);
    area.append(reader, controls);
    document.body.append(area);

    reader.getBoundingClientRect = () => ({ top: 100, bottom: 700, left: 10, right: 370, width: 360, height: 600, x: 10, y: 100, toJSON() {} });
    controls.getBoundingClientRect = () => ({ top: 500, bottom: 760, left: 0, right: 384, width: 384, height: 260, x: 0, y: 500, toJSON() {} });
    word.getBoundingClientRect = () => ({ top: 480, bottom: 520, left: 30, right: 150, width: 120, height: 40, x: 30, y: 480, toJSON() {} });

    const visibleRect = getReaderVisibleRect(reader);
    const hiddenByPlayer = !isActiveWordActuallyVisible(word, reader);
    word.getBoundingClientRect = () => ({ top: 280, bottom: 320, left: 30, right: 150, width: 120, height: 40, x: 30, y: 280, toJSON() {} });
    const actuallyVisible = isActiveWordActuallyVisible(word, reader);
    return {
      visibleBottom: visibleRect?.bottom,
      hiddenByPlayer,
      actuallyVisible,
      viewportCss: getComputedStyle(document.documentElement).getPropertyValue("--okurio-visual-viewport-height").trim(),
    };
  });

  expect(result.visibleBottom).toBe(500);
  expect(result.hiddenByPlayer).toBe(true);
  expect(result.actuallyVisible).toBe(true);
  expect(result.viewportCss).toMatch(/^\d+px$/);
});
