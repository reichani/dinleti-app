import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../../src/App.jsx", import.meta.url), "utf8");

test("yaş metadata'sı arka planda kalır ve eser kartlarında gösterilmez", () => {
  assert.match(app, /yas:\s*"8-10 yaş"/u);
  assert.match(app, /evaluateStoryForReadingLevel\(kitap, meta, okumaYolu\.yolId\)/u);
  assert.doesNotMatch(app, /<div data-yas/u);
  assert.doesNotMatch(app, /\{k\.yas\s*&&\s*<span/u);
  assert.doesNotMatch(app, /\{k\.yas\s*\?\s*` · \$\{k\.yas\}`/u);
});

test("dil ve harf grubu desteği yaş etiketi olmadan görünür kalır", () => {
  assert.match(app, /data-reading-support-label/u);
  assert.match(app, /CEFR \$\{meta\.cefr \|\| "A1"\}/u);
  assert.match(app, /\$\{meta\.harfGrubu\}\. harf grubu/u);
});
