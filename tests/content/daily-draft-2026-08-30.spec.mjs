import test from "node:test";
import assert from "node:assert/strict";
import { LILI_ILE_AT_DRAFT } from "../../src/content/drafts/2026-08-30-lili-ile-at.js";

const story = LILI_ILE_AT_DRAFT;
const countWords = (text) => String(text ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = (text) => String(text ?? "").split(/(?<=[.!?])\s+/u).map((item) => item.trim()).filter(Boolean);
const paragraphs = story.sections.flatMap((section) => section.paragraphs);

test("Lili ile At yaş, süre ve bölüm sözleşmesini karşılar", () => {
  const words = countWords(paragraphs.join(" "));
  const seconds = Math.ceil((words * 60) / 155);
  const sectionWords = story.sections.map((section) => countWords(section.paragraphs.join(" ")));
  assert.equal(story.ageBand, "6-7");
  assert.ok(words >= 250 && words <= 500);
  assert.equal(story.wordCount, words);
  assert.equal(story.estimatedSeconds, seconds);
  assert.equal(story.declaredSeconds, seconds);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(sectionWords.every((count) => count >= 30));
  assert.ok(new Set(sectionWords).size > 1);
});

test("Lili ile At manifesto dili ve tamamlanmış anlatı yapısını korur", () => {
  const sentenceWords = paragraphs.flatMap(sentences).map(countWords);
  const average = sentenceWords.reduce((sum, count) => sum + count, 0) / sentenceWords.length;
  assert.ok(sentenceWords.every((count) => count <= 12));
  assert.ok(average >= 6 && average <= 10);
  assert.ok(paragraphs.every((paragraph) => sentences(paragraph).length <= 3));
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.ok(story.primaryTheme);
  assert.ok(story.optionalReflectionPrompt);
});

test("Lili ile At insan onayı olmadan yayın-ready değildir", () => {
  const review = story.contentQualityReview;
  assert.equal(story.structuralValid, true);
  assert.equal(story.releaseReady, false);
  assert.equal(story.sourceTruth.sourceType, "original");
  assert.equal(story.sourceTruth.verificationStatus, "pending-human-review");
  assert.equal(review.status, "pending");
  assert.equal(review.reviewerName, "");
  assert.equal(review.reviewedAt, "");
  assert.equal(review.reviewNotes, "");
  assert.ok(Object.values(review.checklist).every((value) => value === false));
  assert.equal(story.factualReview.status, "pending-human-review");
  assert.equal(story.originalityRightsReview.status, "pending-human-review");
  assert.equal(story.safeguardingLanguageReview.status, "pending-human-review");
});
