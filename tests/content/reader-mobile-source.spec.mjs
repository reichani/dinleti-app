import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../../src/reading-mobile-fixes.js", import.meta.url), "utf8");

test("self-reading mode disables automatic word following", () => {
  assert.match(source, /if\s*\(isManualMode\(player\)\)\s*return false/u);
  assert.match(source, /if\s*\(!speechIsActuallyRunning\(\)\)\s*return false/u);
  assert.doesNotMatch(source, /pacedManualReading/u);
});

test("reader keeps the active token in a stable comfort band", () => {
  assert.match(source, /COMFORT_TOP_RATIO\\s*=\\s*0\\.40/u);
  assert.match(source, /COMFORT_BOTTOM_RATIO\\s*=\\s*0\\.55/u);
  assert.match(source, /TARGET_RATIO\\s*=\\s*0\\.475/u);
  assert.match(source, /behavior:\s*prefersReducedMotion\s*\|\|\s*force\s*\?\s*'auto'\s*:\s*'smooth'/u);
});

test("manual touch and wheel input temporarily suspend automatic tracking", () => {
  assert.match(source, /MANUAL_SCROLL_PAUSE_MS\s*=\s*4200/u);
  assert.match(source, /touchstart/u);
  assert.match(source, /pointerdown/u);
  assert.match(source, /wheel/u);
  assert.match(source, /now\s*<\s*manualScrollUntil/u);
});
