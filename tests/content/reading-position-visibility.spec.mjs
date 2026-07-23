import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const main = await readFile(new URL("../../src/main.jsx", import.meta.url), "utf8");
const css = await readFile(new URL("../../src/reading-position-hotfix.css", import.meta.url), "utf8");

test("spoken-position hotfix is loaded after reader styles", () => {
  const base = main.indexOf('import "./mobile-reading.css"');
  const hotfix = main.indexOf('import "./reading-position-hotfix.css"');
  assert.ok(base >= 0);
  assert.ok(hotfix > base);
});

test("active spoken word has high-contrast visual treatment", () => {
  assert.match(css, /\[data-aktif="1"\]/);
  assert.match(css, /background:\s*#f2ad3f\s*!important/);
  assert.match(css, /color:\s*#171a1f\s*!important/);
  assert.match(css, /box-shadow:/);
});

test("cream theme and forced-colors receive explicit active-word states", () => {
  assert.match(css, /\[data-tema="krem"\]/);
  assert.match(css, /@media \(forced-colors: active\)/);
});
