import assert from "node:assert/strict";
import test from "node:test";
import { ANDERSEN_STORIES } from "../../src/content/andersenStories.js";
import { countStoryWords, estimateStorySeconds } from "../../src/content/contentIntegrity.js";

const sentenceWords = (text) =>
  text
    .split(/(?<=[.!?…])\s+/u)
    .filter(Boolean)
    .map((sentence) => sentence.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0);

test("Andersen anthology is a complete 8-10 reading, not a short summary", () => {
  const words = countStoryWords(ANDERSEN_STORIES);
  const seconds = estimateStorySeconds(ANDERSEN_STORIES);
  assert.ok(words >= 500 && words <= 900, `expected 500-900 words, received ${words}`);
  assert.ok(seconds >= 120 && seconds <= 300, `expected 2-5 minutes, received ${seconds}s`);
  assert.equal(ANDERSEN_STORIES.bolumler.length, 3);
  assert.match(ANDERSEN_STORIES.sourceUrl, /^https:\/\//);
  assert.match(ANDERSEN_STORIES.adaptationScope, /kısaltılmış Türkçe yeniden anlatım/);
});

test("Andersen prose follows the accessibility language contract", () => {
  for (const section of ANDERSEN_STORIES.bolumler) {
    const counts = sentenceWords(section.metin);
    const words = counts.reduce((sum, count) => sum + count, 0);
    const average = words / counts.length;
    assert.ok(words >= 150, `${section.ad} is too short`);
    assert.ok(Math.max(...counts) <= 12, `${section.ad} has a sentence over 12 words`);
    assert.ok(average >= 6 && average <= 10, `${section.ad} average is ${average.toFixed(2)}`);
    for (const paragraph of section.metin.split(/\n\n+/u)) {
      assert.ok(paragraph.split(/(?<=[.!?…])\s+/u).filter(Boolean).length <= 3);
    }
  }
});

test("automation leaves human quality and rights approval pending", () => {
  assert.equal(ANDERSEN_STORIES.releaseReady, false);
  assert.equal(ANDERSEN_STORIES.contentQualityReview.status, "pending");
  assert.equal(ANDERSEN_STORIES.contentQualityReview.reviewerName, "");
  assert.equal(ANDERSEN_STORIES.contentQualityReview.reviewedAt, "");
  assert.equal(ANDERSEN_STORIES.contentQualityReview.reviewNotes, "");
  assert.ok(Object.values(ANDERSEN_STORIES.contentQualityReview.checklist).every((value) => value === false));
});
