import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const appSource = readFileSync(new URL("../../src/App.jsx", import.meta.url), "utf8");

test("yaş filtresinden sonra boş kalan raflar hazırlanıyor kartı üretmez", () => {
  assert.match(appSource, /\.filter\(\(raf\) => raf\.ids\.length > 0\)/u);
  assert.doesNotMatch(appSource, /data-bos-raf/u);
  assert.doesNotMatch(appSource, /Bu başlık için içerik hazırlanıyor/u);
});

test("hazırlanan bilim ve mitoloji tam metinleri konu raflarına bağlıdır", () => {
  assert.match(appSource, /"Gökyüzü ve Yıldızlar"[^\n]+"uzay-kulubu-piyesi"/u);
  assert.match(appSource, /"Oki Mitolojiye Başlıyor"[^\n]+"labirentte-uc-ses"/u);
});
