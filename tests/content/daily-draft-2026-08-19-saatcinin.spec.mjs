import assert from "node:assert/strict";
import test from "node:test";
import { SAATCININ_SON_DEFTERI_DRAFT } from "../../src/content/drafts/2026-08-19-saatcinin-son-defteri.js";
import { evaluateContentQualityReview } from "../../src/content/contentQualityReview.js";

const story = SAATCININ_SON_DEFTERI_DRAFT;
const countWords = (text) =>
  String(text ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = (text) =>
  String(text ?? "").split(/(?<=[.!?])\s+/u).map((item) => item.trim()).filter(Boolean);
const paragraphs = story.sections.flatMap((section) => section.paragraphs);
const body = paragraphs.join(" ");

test("Saatçinin Son Defteri yetişkin hedefi ve gerçek süreyi karşılar", () => {
  const actualWords = countWords(body);
  const actualSeconds = Math.ceil((actualWords * 60) / 155);
  const sectionWords = story.sections.map((section) => countWords(section.paragraphs.join(" ")));

  assert.ok(actualWords >= 1800 && actualWords <= 3500);
  assert.equal(story.wordCount, actualWords);
  assert.equal(story.estimatedSeconds, actualSeconds);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(sectionWords.every((words) => words >= 30));
  assert.ok(new Set(sectionWords).size > 1);
});

test("Saatçinin Son Defteri manifesto dili ve anlatı yayını karşılar", () => {
  const sentenceWords = paragraphs.flatMap(sentences).map(countWords);
  const average = sentenceWords.reduce((sum, count) => sum + count, 0) / sentenceWords.length;

  assert.ok(sentenceWords.every((words) => words <= 12));
  assert.ok(average >= 6 && average <= 10);
  assert.ok(paragraphs.every((paragraph) => sentences(paragraph).length <= 3));
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.ok(story.primaryTheme);
  assert.ok(story.optionalReflectionPrompt.endsWith("?"));
  assert.match(body, /dükkânı satmak/ui);
  assert.match(body, /sayfanın koparıldığını/u);
  assert.match(body, /duvar saati salonda hâlâ asılıydı/ui);
  assert.match(body, /Doğru şeyi aktarmak yeni zaman açar/u);
});

test("Saatçinin Son Defteri insan onayı olmadan yalnız yapısal taslaktır", () => {
  const review = story.contentQualityReview;
  const evaluation = evaluateContentQualityReview(review, { readingPathId: story.readingPathId });

  assert.equal(story.contentStatus, "draft");
  assert.equal(story.structuralValid, true);
  assert.equal(story.releaseReady, false);
  assert.equal(evaluation.candidateDeployReady, true);
  assert.equal(evaluation.publicationReady, false);
  assert.equal(review.status, "pending");
  assert.equal(review.reviewerName, "");
  assert.equal(review.reviewedAt, "");
  assert.equal(review.reviewedCommit, "");
  assert.equal(review.reviewNotes, "");
  assert.ok(Object.values(review.checklist).every((value) => value === false));
  assert.ok(Object.values(review.readingPathChecklist).every((value) => value === false));
  assert.equal(story.sourceTruth.sourceType, "original-okurio-ai-assisted");
  assert.equal(story.sourceTruth.adaptationStatus, "not-an-adaptation");
  assert.equal(story.sourceTruth.verificationStatus, "pending-owner-confirmation");
  assert.equal(story.factualReview.status, "not-applicable-fiction");
  assert.equal(story.originalityRightsReview.status, "pending-human-review");
  assert.equal(story.safeguardingLanguageReview.status, "pending-human-review");
});
