import test from "node:test";
import assert from "node:assert/strict";
import { MINO_MIYAV_QUALITY_DRAFT as draft } from "../../src/content/minoMiyavQualityDraft.js";

const words = (text) => text.trim().split(/\s+/u).filter(Boolean);
const sentences = (text) => text.split(/[.!?]+/u).map((item) => item.trim()).filter(Boolean);

test("Mino draft passes structural gates but remains human-review blocked", () => {
  const sectionWords = draft.sections.map((section) => words(section.text).length);
  const totalWords = sectionWords.reduce((sum, count) => sum + count, 0);
  const allSentences = draft.sections.flatMap((section) => sentences(section.text));
  const sentenceLengths = allSentences.map((sentence) => words(sentence).length);
  const averageSentenceWords = totalWords / allSentences.length;
  const estimatedSeconds = Math.round((totalWords / draft.wordsPerMinute) * 60);

  assert.equal(draft.sections.length, 4);
  assert.ok(totalWords >= draft.targetWordRange.min);
  assert.ok(totalWords <= draft.targetWordRange.max);
  assert.ok(sectionWords.every((count) => count >= 30));
  assert.ok(Math.max(...sentenceLengths) <= 12);
  assert.ok(averageSentenceWords >= 6 && averageSentenceWords <= 10);
  assert.ok(estimatedSeconds > 20);
  assert.ok(draft.glossary.length >= 3 && draft.glossary.length <= 8);
  assert.equal(draft.contentQualityReview.status, "pending");
  assert.equal(draft.contentQualityReview.reviewerName, "");
  assert.equal(draft.contentQualityReview.reviewedAt, "");
  assert.equal(draft.sourceTruth.factualReviewStatus, "pending_human_review");
  assert.equal(draft.sourceTruth.originalityRightsStatus, "pending_human_review");
  assert.equal(draft.structuralValid, true);
  assert.equal(draft.releaseReady, false);
});
