import assert from "node:assert/strict";
import test from "node:test";

import { THE_MOON_IS_NOT_A_STAR_DRAFT as story } from "../../src/content/drafts/2026-08-03-the-moon-is-not-a-star.js";

const WORDS_PER_MINUTE = 155;
const countWords = (text = "") =>
  String(text).match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = (text = "") =>
  String(text).split(/(?<=[.!?])\s+/u).map((value) => value.trim()).filter(Boolean);
const paragraphs = (text = "") => String(text).split(/\n\s*\n/u).filter(Boolean);

test("English science draft meets age, section and duration gates", () => {
  const sections = story.legacy.bolumler;
  assert.ok(sections.length >= 3 && sections.length <= 8);

  const sectionWords = sections.map((section) => countWords(section.metin));
  const totalWords = sectionWords.reduce((sum, value) => sum + value, 0);
  const calculatedSeconds = Math.ceil((totalWords * 60) / WORDS_PER_MINUTE);
  const declaredSeconds = story.legacy.sureDk * 60;

  assert.ok(totalWords >= 700 && totalWords <= 1200, `${totalWords} words`);
  assert.ok(Math.abs(declaredSeconds - calculatedSeconds) / calculatedSeconds <= 0.15);
  assert.equal(story.metadata.estimatedSeconds, calculatedSeconds);

  sections.forEach((section, index) => {
    const words = sectionWords[index];
    const calculatedSectionSeconds = Math.ceil((words * 60) / WORDS_PER_MINUTE);
    assert.ok(words >= 30, `section ${index + 1} is too short`);
    assert.ok(sentences(section.metin).length >= 2);
    assert.ok(
      Math.abs(section.estimatedSeconds - calculatedSectionSeconds) / calculatedSectionSeconds <= 0.15,
      `section ${index + 1} duration differs by more than 15%`,
    );
    paragraphs(section.metin).forEach((paragraph) => {
      assert.ok(sentences(paragraph).length <= 3, `section ${index + 1} paragraph exceeds 3 sentences`);
    });
  });
});

test("English science draft meets sentence and metadata gates", () => {
  const fullText = story.legacy.bolumler.map((section) => section.metin).join(" ");
  const sentenceWords = sentences(fullText).map(countWords);
  const totalWords = countWords(fullText);
  const average = totalWords / sentenceWords.length;

  assert.ok(sentenceWords.every((value) => value <= 12));
  assert.ok(average >= 6 && average <= 10, `average sentence length ${average.toFixed(2)}`);
  assert.ok(story.metadata.glossary.length >= 3 && story.metadata.glossary.length <= 8);
  assert.ok(story.metadata.sourceUrls.length >= 1);
  assert.equal(story.metadata.contentQualityReview.status, "pending");
  assert.equal(story.metadata.contentQualityReview.reviewerName, "");
  assert.equal(story.metadata.contentQualityReview.reviewedAt, "");
  assert.equal(story.metadata.contentQualityReview.reviewNotes, "");
  assert.ok(Object.values(story.metadata.contentQualityReview.checklist).every((value) => value === false));
  assert.equal(story.metadata.releaseReady, false);
});

test("five-eyes council remains pending without invented reviewers", () => {
  for (const review of Object.values(story.metadata.experienceCouncilReview)) {
    assert.equal(review.status, "pending");
    assert.equal(review.reviewerName, "");
    assert.equal(review.reviewedAt, "");
    assert.equal(review.reviewNotes, "");
  }
});
