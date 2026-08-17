import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { CLASSICS_PREP_STORIES } from "../../src/content/classicsPrepStories.js";
import { evaluateStoryForReadingLevel } from "../../src/content/readingLevelPolicy.js";

const words = (text) => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

test("14–16 klasiklere hazırlık yolunda en az bir gerçek tam okuma vardır", () => {
  assert.ok(CLASSICS_PREP_STORIES.length > 0);
  for (const { legacy, metadata } of CLASSICS_PREP_STORIES) {
    const wordCount = legacy.bolumler.reduce((sum, section) => sum + words(section.metin), 0);
    assert.ok(wordCount >= 1200 && wordCount <= 2000, `${legacy.id}: ${wordCount}`);
    assert.ok(legacy.bolumler.length >= 3 && legacy.bolumler.length <= 8);
    assert.equal(metadata.readingPathId, "klasiklere_hazirlik_14_16");
    assert.equal(evaluateStoryForReadingLevel(legacy, metadata, "klasiklere_hazirlik_14_16").eligible, true);
    assert.equal(evaluateStoryForReadingLevel(legacy, metadata, "genc_okurlar_12_14").eligible, false);
    assert.equal(evaluateStoryForReadingLevel(legacy, metadata, "lise_okuma_16_18").eligible, false);
  }
});

test("14–16 sürümü iki konu rafına arka planda bağlıdır", () => {
  const app = readFileSync(new URL("../../src/App.jsx", import.meta.url), "utf8");
  assert.match(app, /"Odysseia Yolculukları"[^\n]+"klasiklere_hazirlik_14_16"[^\n]+"odysseia-01-klasiklere-hazirlik"/u);
  assert.match(app, /"Mitolojiden Klasiklere"[^\n]+"odysseia-01-klasiklere-hazirlik"/u);
});
