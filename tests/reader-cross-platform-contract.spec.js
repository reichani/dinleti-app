import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";
import { installSpeechSynthesisMock } from "./fixtures/speech-synthesis.js";

const appSource = fs.readFileSync(path.resolve("src/App.jsx"), "utf8");

const READER_PROFILE = {
  secildi: true,
  yolId: "okuma_guveni_8_10",
  evreId: "paragraf",
  destekler: ["kelime_takibi", "buyuk_yazi", "genis_aralik", "yumusak_zemin"],
};

async function openRealContentAndPlay(page) {
  await installSpeechSynthesisMock(page);
  await page.addInitScript((profile) => {
    localStorage.clear();
    localStorage.setItem("okurio-okuma-yolu-v1", JSON.stringify(profile));
  }, READER_PROFILE);
  await page.goto("/");
  const text = Array.from({ length: 32 }, (_, index) =>
    `Sakin okuma cümlesi ${index + 1}, aktif kelimenin gerçek ekranda bütünüyle görünmesini doğrular.`
  ).join(" ");
  await page.getByRole("button", { name: /Kendi metnini oku/i }).click();
  await page.getByLabel("Kendi metnim", { exact: true }).fill(text);
  await page.getByRole("button", { name: "Okuma moduna al", exact: true }).click();
  const shell = page.locator("[data-reader-shell]");
  await expect(shell).toBeVisible();
  const play = shell.getByRole("button", { name: "Oynat", exact: true });
  if (await play.isVisible()) await play.click();
  await expect(shell).toHaveAttribute("data-playing", "1");
  await expect(shell.locator('[data-okuma-metin] [data-aktif="1"]')).toBeVisible();
  return shell;
}

test("reader exposes stable sync contracts", async () => {
  expect(appSource).toContain("data-kelime-ix={gercekIx}");
  expect(appSource).toContain("data-aktif-cumle=");
  expect(appSource).toContain("data-okuma-modu={m.id}");
  expect(appSource).toContain("data-ses-tonu={sesTonu}");
  expect(appSource).toContain('data-mobile-stability="v2.8.4"');
  expect(appSource).toContain("readerScrollRef");
  expect(appSource).toContain("container.scrollTo({ top: nextTop");
  expect(appSource).toContain("visibleHeight * 0.40");
  expect(appSource).toContain("visibleHeight * 0.55");
  expect(appSource).toContain("wordIsFullyVisible");
  expect(appSource).toContain("visualViewportBottom");
  expect(appSource).toContain('data-player-visual="compact-progress"');
  expect(appSource).toContain('data-playing={caliyor ? "1" : "0"}');
  expect(appSource).toContain('okumaModu === "kendim"');
  expect(appSource).not.toContain("scrollIntoView(");
});

test("real mobile reader reserves text height and keeps the active word clear of controls", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop-chrome", "Real-device geometry gate applies to touch layouts.");
  const shell = await openRealContentAndPlay(page);
  await expect(shell.locator('[data-player-visual="compact-progress"]')).toBeVisible();
  await expect(shell.locator("[data-okuma-modu-ipucu]")).toHaveCount(0);

  await expect.poll(async () => shell.evaluate((root) => {
    const reader = root.querySelector("[data-okuma-metin]");
    const active = reader?.querySelector('[data-aktif="1"]');
    const controls = root.querySelector("[data-alt-kontrol]");
    if (!reader || !active || !controls || !window.__okurioReadingFixes) return null;
    const readerRect = reader.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const controlsRect = controls.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    return {
      readerHeight: readerRect.height,
      requiredHeight: Math.max(280, viewportHeight * 0.35),
      activeFullyVisible: window.__okurioReadingFixes.isActiveWordActuallyVisible(active, reader),
      activeAboveControls: activeRect.bottom <= controlsRect.top,
      readerAboveControls: readerRect.bottom <= controlsRect.top + 1,
    };
  })).toMatchObject({
    activeFullyVisible: true,
    activeAboveControls: true,
    readerAboveControls: true,
  });

  const height = await shell.locator("[data-okuma-metin]").evaluate((reader) => {
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    return { actual: reader.getBoundingClientRect().height, required: Math.max(280, viewportHeight * 0.35) };
  });
  expect(height.actual).toBeGreaterThanOrEqual(height.required - 1);
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
