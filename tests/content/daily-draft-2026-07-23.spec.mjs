import test from "node:test";
import assert from "node:assert/strict";
import { OKI_ATI_TANIYOR_DRAFT as story } from "../../src/content/drafts/2026-07-23-oki-ati-taniyor.js";

const countWords = (text) =>
  text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

const sentences = (text) =>
  text.split(/(?<=[.!?])\s+/u).filter(Boolean);

test("6-7 yaş taslağı kelime ve bölüm hedeflerini karşılar", () => {
  const body = story.sections
    .flatMap((section) => section.paragraphs)
    .join(" ");
  const wordCount = countWords(body);

  assert.ok(wordCount >= 250 && wordCount <= 500);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(story.sections.every((section) => countWords(section.paragraphs.join(" ")) >= 30));
});

test("cümle, paragraf, sözlük ve tema sınırları korunur", () => {
  const allParagraphs = story.sections.flatMap((section) => section.paragraphs);
  const allSentences = allParagraphs.flatMap(sentences);
  const averageSentenceWords =
    allSentences.reduce((sum, sentence) => sum + countWords(sentence), 0) /
    allSentences.length;

  assert.ok(allSentences.every((sentence) => countWords(sentence) <= 12));
  assert.ok(averageSentenceWords >= 6 && averageSentenceWords <= 10);
  assert.ok(allParagraphs.every((paragraph) => sentences(paragraph).length <= 3));
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.ok(story.primaryTheme);
});

test("insan kalite onayı olmadan taslak release-ready olamaz", () => {
  assert.equal(story.contentStatus, "draft");
  assert.equal(story.releaseReady, false);
  assert.equal(story.contentQualityReview.status, "pending");
  assert.equal(story.contentQualityReview.reviewerName, "");
  assert.equal(story.contentQualityReview.reviewedAt, "");
  assert.equal(story.factualReview.status, "pending-human-review");
  assert.equal(story.originalityRightsReview.status, "pending-human-review");
  assert.ok(
    Object.values(story.contentQualityReview.checklist).every(
      (value) => value === false,
    ),
  );
});
