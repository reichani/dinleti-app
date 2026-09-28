import test from "node:test";
import assert from "node:assert/strict";
import { MINO_NEREDE_DRAFT } from "../../src/content/drafts/2026-08-26-mino-nerede.js";

const story = MINO_NEREDE_DRAFT;
const countWords = (text) =>
  String(text ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = (text) =>
  String(text ?? "").split(/(?<=[.!?])\s+/u).map((sentence) => sentence.trim()).filter(Boolean);
const paragraphs = story.sections.flatMap((section) => section.paragraphs);
const body = paragraphs.join(" ");

test("Mino: yaş, gerçek süre ve anlamlı bölüm sözleşmesi", () => {
  const actualWords = countWords(body);
  const actualSeconds = Math.ceil((actualWords * 60) / 155);
  const sectionWords = story.sections.map((section) => countWords(section.paragraphs.join(" ")));

  assert.equal(story.ageBand, "6-7");
  assert.equal(story.readingPathId, "ilk_harfler_6_7");
  assert.ok(actualWords >= 250 && actualWords <= 500);
  assert.equal(story.wordCount, actualWords);
  assert.equal(story.estimatedWordsPerMinute, 155);
  assert.equal(story.estimatedSeconds, actualSeconds);
  assert.equal(story.declaredSeconds, actualSeconds);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(sectionWords.every((wordCount) => wordCount >= 30));
  assert.ok(new Set(sectionWords).size > 1, "bölümler mekanik eşit olmamalı");
});

test("Mino: cümle, paragraf, sözlük ve anlatı sözleşmesi", () => {
  const sentenceWords = paragraphs.flatMap(sentences).map(countWords);
  const averageSentenceWords =
    sentenceWords.reduce((sum, count) => sum + count, 0) / sentenceWords.length;

  assert.ok(sentenceWords.every((wordCount) => wordCount <= 12));
  assert.ok(averageSentenceWords >= 6 && averageSentenceWords <= 10);
  assert.ok(paragraphs.every((paragraph) => sentences(paragraph).length <= 3));
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.ok(story.primaryTheme);
  assert.ok(story.optionalReflectionPrompt);
});

test("Mino: özgünlük izi açık, insan onayı olmadan release kapalı", () => {
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
  assert.equal(story.structuralValid, true);
  assert.equal(story.releaseReady, false);
  assert.equal(story.sourceTruth.sourceType, "original");
  assert.equal(story.sourceTruth.verificationStatus, "pending-human-review");
  assert.equal(review.status, "pending");
  assert.equal(review.reviewerName, "");
  assert.equal(review.reviewedAt, "");
  assert.equal(review.reviewedCommit, "");
  assert.equal(review.reviewNotes, "");
  assert.deepEqual(Object.keys(review.checklist), checklistKeys);
  assert.ok(Object.values(review.checklist).every((value) => value === false));
  assert.ok(Object.values(review.readingPathChecklist).every((value) => value === false));
  assert.equal(story.factualReview.status, "pending-human-review");
  assert.equal(story.originalityRightsReview.status, "pending-human-review");
  assert.equal(story.safeguardingLanguageReview.status, "pending-human-review");
});

test("Tam katalog audit'i 16-18 yaş anahtarını doğrudan eşler", async () => {
  const source = await import("node:fs").then(({ readFileSync }) =>
    readFileSync(new URL("../../scripts/audit-full-catalog.mjs", import.meta.url), "utf8"),
  );
  assert.match(source, /"16-18":\s*"16-18"/u);
});
