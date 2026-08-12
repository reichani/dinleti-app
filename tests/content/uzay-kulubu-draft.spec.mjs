import assert from "node:assert/strict";
import test from "node:test";
import { UZAY_KULUBU_PIYESI_DRAFT as story } from "../../src/content/drafts/2026-08-04-uzay-kulubu-piyesi.js";

const countWords = (text = "") => String(text).match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
const sentences = (text = "") => String(text).split(/(?<=[.!?])\s+/u).map((v) => v.trim()).filter(Boolean);
const paragraphs = (text = "") => String(text).split(/\n\s*\n/u).filter(Boolean);

test("age, section and duration gates", () => {
  const sections = story.legacy.bolumler;
  const counts = sections.map((section) => countWords(section.metin));
  const total = counts.reduce((sum, value) => sum + value, 0);
  const seconds = Math.ceil((total * 60) / 155);
  assert.ok(total >= 700 && total <= 1200, `${total} words`);
  assert.ok(sections.length >= 3 && sections.length <= 8);
  assert.equal(story.metadata.estimatedSeconds, seconds);
  assert.ok(Math.abs(story.legacy.sureDk * 60 - seconds) / seconds <= 0.15);
  sections.forEach((section, index) => {
    assert.ok(counts[index] >= 30);
    assert.ok(sentences(section.metin).length >= 2);
    const calculated = Math.ceil((counts[index] * 60) / 155);
    assert.ok(Math.abs(section.estimatedSeconds - calculated) / calculated <= 0.15);
    paragraphs(section.metin).forEach((p) => assert.ok(sentences(p).length <= 3));
  });
});

test("sentence, glossary, source and review gates", () => {
  const text = story.legacy.bolumler.map((section) => section.metin).join(" ");
  const sentenceCounts = sentences(text).map(countWords);
  const average = countWords(text) / sentenceCounts.length;
  assert.ok(sentenceCounts.every((value) => value <= 12), `max ${Math.max(...sentenceCounts)}`);
  assert.ok(average >= 6 && average <= 10, `average ${average.toFixed(2)}`);
  assert.ok(story.metadata.glossary.length >= 3 && story.metadata.glossary.length <= 8);
  assert.ok(story.metadata.sourceUrls.length >= 3);
  assert.equal(story.metadata.contentQualityReview.status, "pending");
  assert.equal(story.metadata.contentQualityReview.reviewerName, "");
  assert.ok(Object.values(story.metadata.contentQualityReview.checklist).every((v) => v === false));
  assert.equal(story.metadata.releaseReady, false);
});

test("all council roles remain pending", () => {
  for (const review of Object.values(story.metadata.experienceCouncilReview)) {
    assert.deepEqual(review, { status: "pending", reviewerName: "", reviewedAt: "", reviewNotes: "" });
  }
});
