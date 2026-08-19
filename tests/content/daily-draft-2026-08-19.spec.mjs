import test from "node:test";
import assert from "node:assert/strict";
import { ARIADNENIN_IPI_YOL_BULMAK_DRAFT as story } from "../../src/content/drafts/2026-08-19-ariadnenin-ipi-yol-bulmak.js";

const countWords = (text) =>
  String(text ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

test("Ariadne yetişkin taslağı 18+ uzunluk ve bölüm sözleşmesini karşılar", () => {
  const sectionCounts = story.sections.map((section) => countWords(section.paragraphs.join(" ")));
  const total = sectionCounts.reduce((sum, count) => sum + count, 0);

  assert.equal(story.ageBand, "18+");
  assert.equal(story.readingPathId, "yetiskin_odak_18");
  assert.equal(story.sections.length, 6);
  assert.ok(sectionCounts.every((count) => count >= 250));
  assert.equal(total, 1800);
  assert.equal(story.wordCount, total);
  assert.equal(story.estimatedSeconds, Math.ceil((total * 60) / 155));
});

test("Ariadne taslağı manifesto cümle ve paragraf sınırlarını korur", () => {
  for (const section of story.sections) {
    for (const paragraph of section.paragraphs) {
      const sentences = paragraph.split(/(?<=[.!?])\s+/u).filter(Boolean);
      assert.ok(sentences.length <= 3, `${section.title}: paragrafta üçten fazla cümle var`);
      for (const sentence of sentences) {
        assert.ok(countWords(sentence) <= 12, `${section.title}: 12 kelimeyi aşan cümle: ${sentence}`);
      }
    }
  }
});

test("Ariadne taslağı kaynak ve insan inceleme kapılarını açık tutar", () => {
  assert.equal(story.contentQualityReview.status, "pending");
  assert.equal(story.contentQualityReview.reviewerName, "");
  assert.equal(story.releaseReady, false);
  assert.equal(story.factualReview.status, "pending-human-review");
  assert.equal(story.originalityRightsReview.status, "pending-human-review");
  assert.ok(story.sourceTruth.references.length >= 2);
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
});
