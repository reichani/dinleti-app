import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../../src/reading-mobile-fixes.js", import.meta.url), "utf8");
const css = await readFile(new URL("../../src/mobile-reading.css", import.meta.url), "utf8");
const appSource = await readFile(new URL("../../src/App.jsx", import.meta.url), "utf8");

test("self-reading mode disables automatic word following", () => {
  assert.match(source, /if\s*\(isManualMode\(player\)\)\s*return false/u);
  assert.match(source, /if\s*\(!speechIsActuallyRunning\(\)\)\s*return false/u);
  assert.doesNotMatch(source, /pacedManualReading/u);
});

test("reader keeps the active token in a stable comfort band", () => {
  assert.match(source, /COMFORT_TOP_RATIO\s*=\s*0\.40/u);
  assert.match(source, /COMFORT_BOTTOM_RATIO\s*=\s*0\.55/u);
  assert.match(source, /TARGET_RATIO\s*=\s*0\.475/u);
  assert.match(source, /behavior:\s*prefersReducedMotion\s*\|\|\s*force\s*\?\s*'auto'\s*:\s*'smooth'/u);
});

test("manual touch and wheel input temporarily suspend automatic tracking", () => {
  assert.match(source, /MANUAL_SCROLL_PAUSE_MS\s*=\s*4200/u);
  assert.match(source, /touchstart/u);
  assert.match(source, /pointerdown/u);
  assert.match(source, /wheel/u);
  assert.match(source, /now\s*<\s*manualScrollUntil/u);
});

test("compact reader reserves only the remaining stage height", () => {
  assert.match(css, /\[data-reader-workspace\]\s*\{[\s\S]*block-size:\s*auto\s*!important;[\s\S]*flex:\s*1 1 auto\s*!important;/u);
  assert.doesNotMatch(css, /\[data-reader-workspace\]\s*\{[^}]*block-size:\s*100%/u);
});

test("touch layouts enforce a 44 by 44 pixel button target", () => {
  assert.match(css, /\[data-reader-shell\] button\s*\{[\s\S]*min-block-size:\s*44px;[\s\S]*min-inline-size:\s*44px;/u);
  assert.match(appSource, /\[data-app-shell\] button \{ min-width: 44px !important; min-height: 44px !important; \}/u);
});
