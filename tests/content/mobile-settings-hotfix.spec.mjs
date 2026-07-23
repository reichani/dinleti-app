import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const mainSource = await readFile(new URL("../../src/main.jsx", import.meta.url), "utf8");
const css = await readFile(new URL("../../src/mobile-settings-hotfix.css", import.meta.url), "utf8");
const mobileFixes = await readFile(new URL("../../src/reading-mobile-fixes.js", import.meta.url), "utf8");
const appSource = await readFile(new URL("../../src/App.jsx", import.meta.url), "utf8");

test("reader settings stylesheet is loaded after base mobile styles", () => {
  const baseIndex = mainSource.indexOf('import "./mobile-reading.css"');
  const modalIndex = mainSource.indexOf('import "./mobile-settings-hotfix.css"');

  assert.ok(baseIndex >= 0, "base mobile stylesheet must be imported");
  assert.ok(modalIndex > baseIndex, "settings stylesheet must load after base styles");
});

test("React state is the only settings visibility source", () => {
  assert.match(appSource, /const \[ayarPaneliAcik, setAyarPaneliAcik\] = useState\(false\)/);
  assert.match(appSource, /data-acik=\{ayarPaneliAcik \? "1" : "0"\}/);
  assert.match(appSource, /data-reader-settings-toggle[\s\S]*setAyarPaneliAcik/);
  assert.match(appSource, /data-reader-settings-close[\s\S]*setAyarPaneliAcik\(false\)/);

  assert.doesNotMatch(mobileFixes, /syncReaderSettingsVisibility/);
  assert.doesNotMatch(mobileFixes, /panel\.hidden/);
  assert.doesNotMatch(mobileFixes, /attributeFilter:\s*\[[^\]]*data-acik/);
});

test("closed and open settings have deterministic CSS states", () => {
  assert.match(css, /\[data-reader-settings\]\[data-acik="0"\][\s\S]*display:\s*none\s*!important/);
  assert.match(css, /\[data-reader-settings\]\[data-acik="1"\][\s\S]*position:\s*fixed\s*!important/);
  assert.match(css, /max-height:\s*calc\(100dvh[\s\S]*safe-area-inset-top/);
  assert.match(css, /overflow-y:\s*auto\s*!important/);
  assert.match(css, /safe-area-inset-bottom/);
});

test("modal layer blocks background and keeps controls reachable", () => {
  assert.match(css, /\[data-reader-settings-toggle\][\s\S]*min-height:\s*44px\s*!important/);
  assert.match(css, /\[data-reader-settings-close\][\s\S]*min-height:\s*44px\s*!important/);
  assert.match(css, /\[data-reader-shell\]:has\(\[data-reader-settings\]\[data-acik="1"\]\)[\s\S]*\[data-alt-kontrol\][\s\S]*pointer-events:\s*none\s*!important/);
  assert.match(css, /\[data-reader-settings\][\s\S]*z-index:\s*100\s*!important/);
});
