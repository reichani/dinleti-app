import test from "node:test";
import assert from "node:assert/strict";
import {
  SINCABIN_KOZALAK_SANDIGI_DRAFT as story,
  SINCABIN_KOZALAK_SANDIGI_METADATA_PROPOSAL as metaProposal,
} from "../../src/content/drafts/2026-10-19-sincabin-kozalak-sandigi.js";
import { evaluateContentQualityReview } from "../../src/content/contentQualityReview.js";
import { READING_LEVEL_WORD_TARGETS } from "../../src/content/readingLevelPolicy.js";
import { PASSAGE_WORD_TARGETS, auditStoryLength, LENGTH_VERDICT } from "../../src/content/lengthOptimizationPolicy.js";

const words = (t) => String(t ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = (t) => String(t ?? "").split(/(?<=[.!?…])\s+/u).map((s) => s.trim()).filter(Boolean);
const paragraphs = story.sections.flatMap((s) => s.paragraphs);
const body = paragraphs.join(" ");
const lower = (t) => t.toLocaleLowerCase("tr-TR");

test(`${story.title}: okuma yolu, tür, uzunluk ve süre sözleşmesi`, () => {
  const target = READING_LEVEL_WORD_TARGETS[story.readingPathId];
  const n = words(body);
  assert.equal(story.readingPathId, "okumaya_hazirlik_5_6");
  assert.equal(story.icerikTuru, "fabl");
  assert.ok(n >= target.minWords && n <= target.maxWords, `kelime ${n}`);
  // Brif 1 önerisi: 250-350 kelime (docs/content-plans/2026-10-19.md)
  assert.ok(n >= 250 && n <= 350, `brif önerisi dışında: ${n}`);
  assert.equal(story.wordCount, n);
  assert.equal(story.estimatedSeconds, Math.ceil((n * 60) / story.estimatedWordsPerMinute));
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
});

test(`${story.title}: cümle, paragraf, sözlük ve dil profili sözleşmesi`, () => {
  const sw = paragraphs.flatMap(sentences).map(words);
  // Cümle sınırı karar kaynağından: ontology/karar-kayitlari.json kaynaklar.cumleSiniri
  assert.ok(Math.max(...sw) <= PASSAGE_WORD_TARGETS[story.readingPathId].maxSentenceWords);
  const audit = auditStoryLength({ id: story.id, baslik: story.title, bolumler: story.sections.map((s) => ({ ad: s.title, metin: s.paragraphs.join("\n\n") })) }, story.readingPathId);
  assert.equal(audit.verdict, LENGTH_VERDICT.OK, audit.findings.map((f) => f.message).join(" · "));
  const avg = sw.reduce((a, b) => a + b, 0) / sw.length;
  assert.ok(avg >= 6 && avg <= 10, `ortalama ${avg}`);
  assert.ok(paragraphs.every((p) => sentences(p).length <= 3));
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.ok(story.glossary.every((g) => lower(body).includes(lower(g.word))));
  for (const w of ["kozalak", "sincap", "sandık", "rüzgâr", "paylaşmak"]) {
    assert.ok(story.glossary.some((g) => g.word === w), `brif sözlüğü eksik: ${w}`);
  }
  const p = story.editorialLanguageProfile;
  assert.deepEqual(p.idioms.map((i) => i.lemma), ["el ele vermek"]);
  assert.deepEqual(p.proverbs.map((i) => i.expression), ["Birlikten kuvvet doğar"]);
  for (const item of [...p.idioms, ...p.proverbs]) assert.ok(lower(body).includes(lower(item.expression)), item.expression);
  assert.equal(story.mebKademe, "okul_oncesi");
  assert.equal(story.mebSinif, "Ana Sınıfı");
  assert.equal(story.mebKazanim, "B2 açık");
  assert.equal(story.pirlsSureci, "B2 açık");
});

test(`${story.title}: ICERIK_METADATA önerisi ölçümü doğru yola yazar`, () => {
  assert.deepEqual([...metaProposal.segmentler], ["okumaya_hazirlik", "ses_farkindaligi"]);
  assert.ok(!metaProposal.segmentler.includes("dinleme"));
  assert.equal(story.icerikMetadataOnerisi, metaProposal);
});

test(`${story.title}: hak beyanı, taslak durumu ve insan onay kapısı kapalı`, () => {
  assert.equal(story.sourceTruth.rightsStatus, "okurio-ozgun-ai-destekli");
  assert.equal(story.sourceTruth.sourceUrl, null);
  assert.equal(story.contentStatus, "draft");
  assert.equal(story.releaseReady, false);
  assert.equal(story.contentQualityReview.status, "pending");
  assert.equal(story.contentQualityReview.reviewerName, "");
  assert.equal(story.ownerApproval.status, "pending");
  assert.equal(story.ownerApproval.ownerName, "");
  const r = evaluateContentQualityReview(story.contentQualityReview, { readingPathId: story.readingPathId });
  assert.equal(r.publicationReady, false);
  assert.deepEqual(
    [story.factualReview.status, story.originalityRightsReview.status, story.safeguardingLanguageReview.status],
    Array(3).fill("pending-human-review"),
  );
});
