import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const mainSource = await readFile(new URL("../../src/main.jsx", import.meta.url), "utf8");
const css = await readFile(new URL("../../src/mobile-settings-hotfix.css", import.meta.url), "utf8");
const visibilitySource = await readFile(new URL("../../src/reading-mobile-fixes.js", import.meta.url), "utf8");

test("v2.7.4 mobile settings stylesheet is loaded after base mobile styles", () => {
  const baseIndex = mainSource.indexOf('import "./mobile-reading.css"');
  const hotfixIndex = mainSource.indexOf('import "./mobile-settings-hotfix.css"');

  assert.ok(baseIndex >= 0, "base mobile stylesheet must be imported");
  assert.ok(hotfixIndex > baseIndex, "hotfix stylesheet must load after base styles");
});

test("reader settings becomes a bounded mobile bottom sheet", () => {
  assert.match(css, /@media\s*\(max-width:\s*819px\)/);
  assert.match(css, /\[data-reader-settings\][\s\S]*position:\s*fixed\s*!important/);
  assert.match(css, /max-height:\s*90dvh\s*!important/);
  assert.match(css, /overflow-y:\s*auto\s*!important/);
  assert.match(css, /safe-area-inset-bottom/);
});

test("closed settings use the hidden and inert accessibility contract", () => {
  assert.match(css, /\[data-reader-settings\]\[hidden\][\s\S]*display:\s*none\s*!important/);
  assert.match(visibilitySource, /isMobileReaderViewport\(\)/);
  assert.match(visibilitySource, /if \(!mobileViewport\)/);
  assert.match(visibilitySource, /panel\.hidden\s*=\s*false/);
  assert.match(visibilitySource, /panel\.hidden\s*=\s*!open/);
  assert.match(visibilitySource, /panel\.setAttribute\('aria-hidden',\s*open\s*\?\s*'false'\s*:\s*'true'\)/);
  assert.match(visibilitySource, /panel\.setAttribute\('inert',\s*''\)/);
});

test("settings title and close control remain reachable when open", () => {
  assert.match(css, /\[data-reader-settings-title\][\s\S]*position:\s*sticky\s*!important/);
  assert.match(css, /\[data-reader-settings-close\][\s\S]*44px\s*!important/);
});
