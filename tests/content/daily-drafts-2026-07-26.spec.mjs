import test from "node:test";
import assert from "node:assert/strict";
import { ODYSSEIA_LISE_DRAFT } from "../../src/content/drafts/2026-07-26-odysseia-lise.js";

const countWords = (text) =>
  String(text ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

const sentences = (text) =>
  String(text ?? "")
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

const paragraphs = ODYSSEIA_LISE_DRAFT.sections.flatMap(
  (section) => section.paragraphs,
);
const body = paragraphs.join(" ");

test("Odysseia lise: yaş, süre ve bölüm sözleşmesi", () => {
  const actualWords = countWords(body);
  const actualSeconds = Math.ceil((actualWords * 60) / 155);
  const sectionWords = ODYSSEIA_LISE_DRAFT.sections.map((section) =>
    countWords(section.paragraphs.join(" ")),
  );

  assert.ok(actualWords >= 1500 && actualWords <= 2500);
  assert.equal(ODYSSEIA_LISE_DRAFT.wordCount, actualWords);
  assert.equal(ODYSSEIA_LISE_DRAFT.estimatedWordsPerMinute, 155);
  assert.equal(ODYSSEIA_LISE_DRAFT.estimatedSeconds, actualSeconds);
  assert.equal(ODYSSEIA_LISE_DRAFT.declaredSeconds, actualSeconds);
  assert.equal(ODYSSEIA_LISE_DRAFT.sections.length, 8);
  assert.ok(sectionWords.every((wordCount) => wordCount >= 30));
  assert.ok(new Set(sectionWords).size > 1);
});

test("Odysseia lise: cümle, paragraf, sözlük ve tema sözleşmesi", () => {
  const allSentences = paragraphs.flatMap(sentences);
  const sentenceWords = allSentences.map(countWords);
  const averageSentenceWords =
    sentenceWords.reduce((sum, count) => sum + count, 0) / sentenceWords.length;

  assert.ok(sentenceWords.every((wordCount) => wordCount <= 12));
  assert.ok(averageSentenceWords >= 6 && averageSentenceWords <= 10);
  assert.ok(paragraphs.every((paragraph) => sentences(paragraph).length <= 3));
  assert.ok(
    ODYSSEIA_LISE_DRAFT.glossary.length >= 3 &&
      ODYSSEIA_LISE_DRAFT.glossary.length <= 8,
  );
  assert.ok(ODYSSEIA_LISE_DRAFT.primaryTheme);
  assert.ok(ODYSSEIA_LISE_DRAFT.optionalReflectionPrompt);
});

test("Odysseia lise: kaynak ve insan onayı olmadan yayımlanamaz", () => {
  const story = ODYSSEIA_LISE_DRAFT;
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
  assert.match(story.sourceTruth.sourceType, /public-domain/u);
  assert.match(
    story.sourceTruth.primaryText.url,
    /^https:\/\/www\.gutenberg\.org\//u,
  );
  assert.ok(story.sourceTruth.adaptationScope);
});
