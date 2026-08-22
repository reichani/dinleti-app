import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../../src/App.jsx", import.meta.url), "utf8");

test("reader progress has one owner: speech word cursor", () => {
  assert.match(source, /const konumuYaz = \(wordIndex\)/u);
  assert.match(source, /setPozisyon\(positionFromCursor/u);
  assert.doesNotMatch(source, /Math\.min\(toplam, p \+ hiz\)/u);
});

test("pause and periodic persistence store versioned word anchors", () => {
  const snapshots = source.match(/readingProgressSnapshot\(/gu) || [];
  assert.ok(snapshots.length >= 2);
  assert.match(source, /sectionIndex: aktifBolumIx/u);
  assert.match(source, /wordIndex: kelimeIx/u);
});

test("resume and seek restore the exact section and word", () => {
  assert.match(source, /normalizeReadingProgress\(\{/u);\n  assert.match(source, /setKelimeIx\(progress\.wordIndex\)/u);
  assert.match(source, /konusmayiBaslat\(k, progress\.sectionIndex, progress\.wordIndex\)/u);
  assert.match(source, /konusmayiBaslat\(aktif, aktifBolumIx, kelimeIx\)/u);
});
