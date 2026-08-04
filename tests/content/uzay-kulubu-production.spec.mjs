import assert from "node:assert/strict";
import test from "node:test";
import { PRODUCTION_STORY_UPGRADES_BY_ID } from "../../src/content/productionStoryUpgrades.js";

const story = PRODUCTION_STORY_UPGRADES_BY_ID["uzay-kulubu-piyesi"];
const countWords = (text = "") => String(text).match(/[\p{L}\p{N}]+/gu)?.length ?? 0;

test("Uzay Kulübü Piyesi production upgrade preserves complete content", () => {
  assert.ok(story);
  assert.equal(story.id, "uzay-kulubu-piyesi");
  assert.equal(story.icerikDurumu, "tam-metin");
  assert.equal(story.hakDurumu, "okurio-ozgun-ai-destekli");
  assert.ok(story.bolumler.length >= 3 && story.bolumler.length <= 8);
  const words = story.bolumler.reduce((sum, section) => sum + countWords(section.metin), 0);
  assert.ok(words >= 700 && words <= 1200, `${words} words`);
  assert.equal(Math.ceil((words * 60) / 155), 275);
});

test("Okurio Kaynak İzi discloses AI assistance and primary references", () => {
  const stamp = story.provenanceStamp;
  assert.equal(stamp.mark, "Okurio Kaynak İzi");
  assert.match(stamp.disclosure, /AI destekli/u);
  assert.match(stamp.disclosure, /Okurio için özgün/u);
  assert.match(stamp.reviewNotice, /insan hak.*incelemesi yerine geçmez/u);
  assert.equal(stamp.primarySources.length, 3);
  stamp.primarySources.forEach((source) => assert.match(source.url, /^https:\/\/science\.nasa\.gov\//u));
});
