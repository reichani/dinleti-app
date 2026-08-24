import test from "node:test";
import assert from "node:assert/strict";
import { KIYIDAKI_SESSIZ_ISTASYON_DRAFT } from "../../src/content/drafts/2026-07-28-kiyidaki-sessiz-istasyon.js";

const story = KIYIDAKI_SESSIZ_ISTASYON_DRAFT;

const countWords = (text) =>
  String(text ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

const sentences = (text) =>
  String(text ?? "")
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

const paragraphs = story.sections.flatMap((section) => section.paragraphs);
const body = paragraphs.join(" ");

test("Kıyıdaki Sessiz İstasyon: yaş, süre ve bölüm sözleşmesi", () => {
  const actualWords = countWords(body);
  const actualSeconds = Math.ceil((actualWords * 60) / 155);
  const sectionWords = story.sections.map((section) =>
    countWords(section.paragraphs.join(" ")),
  );

  assert.ok(actualWords >= 1200 && actualWords <= 2000);
  assert.equal(story.wordCount, actualWords);
  assert.equal(story.estimatedWordsPerMinute, 155);
  assert.equal(story.estimatedSeconds, actualSeconds);
  assert.equal(story.declaredSeconds ?? actualSeconds, actualSeconds);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(sectionWords.every((wordCount) => wordCount >= 30));
  assert.ok(new Set(sectionWords).size > 1, "bölümler mekanik eşit olmamalı");
});

test("Kıyıdaki Sessiz İstasyon: cümle, paragraf, sözlük ve tema sözleşmesi", () => {
  const allSentences = paragraphs.flatMap(sentences);
  const sentenceWords = allSentences.map(countWords);
  const averageSentenceWords =
    sentenceWords.reduce((sum, count) => sum + count, 0) / sentenceWords.length;

  assert.ok(sentenceWords.every((wordCount) => wordCount <= 12));
  assert.ok(averageSentenceWords >= 6 && averageSentenceWords <= 10);
  assert.ok(paragraphs.every((paragraph) => sentences(paragraph).length <= 3));
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.ok(story.primaryTheme);
  assert.ok(story.optionalReflectionPrompt);
});

test("Kıyıdaki Sessiz İstasyon: insan onayı olmadan yayımlanamaz", () => {
  const review = story.contentQualityReview;
  const checklistKeys = [
    "narrativeArc",
    "ageFit",
    "sectionContinuity",
    "characterConsistency",
    "languageQuality",
    "factualAccuracy",
    "originalityRights",
    "accessibilityTone",
  ];

  assert.equal(story.contentStatus, "draft");
  assert.equal(story.releaseReady, false);
  assert.equal(review.status, "pending");
  assert.equal(review.reviewerName, "");
  assert.equal(review.reviewedAt, "");
  assert.equal(review.reviewNotes, "");
  assert.deepEqual(Object.keys(review.checklist), checklistKeys);
  assert.ok(Object.values(review.checklist).every((value) => value === false));
  assert.equal(story.factualReview.status, "pending-human-review");
  assert.equal(story.originalityRightsReview.status, "pending-human-review");
  assert.equal(story.sourceTruth.verificationStatus, "pending-human-review");
});
