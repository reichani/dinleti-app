import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { ODYSSEY_STORIES } from "../../src/content/odysseyStories.js";

const countWords = (text) => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const bodyWords = (story) => story.legacy.bolumler.reduce((sum, section) => sum + countWords(section.metin), 0);

test("Odysseia sürümleri üç okuma yolunun gerçek kelime hedeflerini karşılar", () => {
  const targets = new Map([
    ["odysseia-01-cocuk-truvadan-ayrilis", [500, 900]],
    ["odysseia-01-genc-truvadan-ayrilis", [900, 1600]],
    ["odysseia-01-yetiskin-truvadan-ayrilis", [1500, 2500]],
  ]);
  for (const story of ODYSSEY_STORIES) {
    const [min, max] = targets.get(story.legacy.id);
    const words = bodyWords(story);
    assert.ok(words >= min && words <= max, `${story.legacy.id}: ${words} kelime; hedef ${min}-${max}`);
    assert.ok(story.legacy.bolumler.length >= 3 && story.legacy.bolumler.length <= 8);
    assert.equal(story.legacy.sureDk, Number((words / 155).toFixed(1)));
    const longestSentence = Math.max(...story.legacy.bolumler.flatMap((section) =>
      section.metin.split(/(?<=[.!?])\s+/u).map(countWords)));
    assert.ok(longestSentence <= 12, `${story.legacy.id}: en uzun cümle ${longestSentence} kelime`);
  }
});

test("Odysseia rafı aynı anda yalnız seçilen yaş yolunun uygun sürümünü sunar", () => {
  const app = readFileSync(new URL("../../src/App.jsx", import.meta.url), "utf8");
  assert.match(app, /"Odysseia Yolculukları"[^\n]+"okuma_guveni_8_10"[^\n]+"genc_okurlar_12_14"[^\n]+"lise_okuma_16_18"/u);
  for (const story of ODYSSEY_STORIES) {
    assert.match(app, new RegExp(`"${story.legacy.id}"`, "u"));
  }
});
