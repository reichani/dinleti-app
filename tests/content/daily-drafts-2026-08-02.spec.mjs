import test from "node:test";
import assert from "node:assert/strict";
import { LABIRENTTE_UC_SES_DRAFT } from "../../src/content/drafts/2026-08-02-labirentte-uc-ses.js";

const story = LABIRENTTE_UC_SES_DRAFT;
const countWords = (text) =>
  String(text ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = (text) =>
  String(text ?? "").split(/(?<=[.!?])\s+/u).map((item) => item.trim()).filter(Boolean);
const paragraphs = story.sections.flatMap((section) => section.paragraphs);
const body = paragraphs.join(" ");

test("Labirentte Üç Ses: yaş, süre ve bölüm sözleşmesi", () => {
  const actualWords = countWords(body);
  const actualSeconds = Math.ceil((actualWords * 60) / 155);
  const sectionWords = story.sections.map((section) => countWords(section.paragraphs.join(" ")));
  assert.ok(actualWords >= 700 && actualWords <= 1200);
  assert.equal(story.wordCount, actualWords);
  assert.equal(story.estimatedSeconds, actualSeconds);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(sectionWords.every((words) => words >= 30));
  assert.ok(new Set(sectionWords).size > 1);
});

test("Labirentte Üç Ses: dil, paragraf, sözlük ve anlatı sözleşmesi", () => {
  const allSentences = paragraphs.flatMap(sentences);
  const sentenceWords = allSentences.map(countWords);
  const average = sentenceWords.reduce((sum, count) => sum + count, 0) / sentenceWords.length;
  assert.ok(sentenceWords.every((words) => words <= 12));
  assert.ok(average >= 6 && average <= 10);
  assert.ok(paragraphs.every((paragraph) => sentences(paragraph).length <= 3));
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.ok(story.primaryTheme);
  assert.ok(story.optionalReflectionPrompt);
  assert.match(body, /Ariadne/u);
  assert.match(body, /Fikir değişikliği grubumuzu güçlendirdi/u);
});

test("Labirentte Üç Ses: kaynak ve insan onayı olmadan yayımlanamaz", () => {
  const review = story.contentQualityReview;
  assert.equal(story.contentStatus, "draft");
  assert.equal(story.releaseReady, false);
  assert.equal(story.sourceTruth.sourceType, "original-mythology-inspired-role-play");
  assert.equal(story.sourceTruth.adaptationStatus, "not-a-retelling");
  assert.ok(story.sourceTruth.references.length >= 2);
  assert.ok(story.sourceTruth.references.every((reference) => /^https:\/\//u.test(reference.url)));
  assert.equal(review.status, "pending");
  assert.equal(review.reviewerName, "");
  assert.equal(review.reviewedAt, "");
  assert.equal(review.reviewNotes, "");
  assert.ok(Object.values(review.checklist).every((value) => value === false));
  assert.equal(story.factualReview.status, "pending-human-review");
  assert.equal(story.originalityRightsReview.status, "pending-human-review");
  assert.equal(story.sourceTruth.verificationStatus, "pending-human-review");
});
