import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { UC_BALONUN_SIRRI_DRAFT as story } from "../../src/content/drafts/2026-10-19-uc-balonun-sirri.js";
import { evaluateContentQualityReview } from "../../src/content/contentQualityReview.js";
import { READING_LEVEL_WORD_TARGETS } from "../../src/content/readingLevelPolicy.js";
import { PASSAGE_WORD_TARGETS, auditStoryLength, LENGTH_VERDICT } from "../../src/content/lengthOptimizationPolicy.js";

const words = (t) => String(t ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = (t) => String(t ?? "").split(/(?<=[.!?])\s+/u).map((s) => s.trim()).filter(Boolean);
const paragraphs = story.sections.flatMap((s) => s.paragraphs);
const body = paragraphs.join(" ");
const lower = (t) => t.toLocaleLowerCase("tr-TR");

test(`${story.title}: okuma yolu, tür, uzunluk ve süre sözleşmesi`, () => {
  const target = READING_LEVEL_WORD_TARGETS[story.readingPathId];
  const n = words(body);
  assert.equal(story.readingPathId, "genc_okurlar_12_14");
  assert.equal(story.icerikTuru, "bilim_hikayesi");
  assert.ok(n >= target.minWords && n <= target.maxWords, `kelime ${n}`);
  // Brif 2 önerisi: 1000-1300 kelime (docs/content-plans/2026-10-19.md)
  assert.ok(n >= 1000 && n <= 1300, `brif önerisi dışında: ${n}`);
  assert.equal(story.wordCount, n);
  assert.equal(story.estimatedSeconds, Math.ceil((n * 60) / 155));
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
});

test(`${story.title}: cümle, paragraf, sözlük ve dil profili sözleşmesi`, () => {
  const sw = paragraphs.flatMap(sentences).map(words);
  // Cümle sınırı karar kaynağından: K-2026-10-18-02, src/content/lengthOptimizationPolicy.js
  assert.ok(Math.max(...sw) <= PASSAGE_WORD_TARGETS[story.readingPathId].maxSentenceWords);
  const audit = auditStoryLength({ id: story.id, baslik: story.title, bolumler: story.sections.map((s) => ({ ad: s.title, metin: s.paragraphs.join("\n\n") })) }, story.readingPathId);
  assert.equal(audit.verdict, LENGTH_VERDICT.OK, audit.findings.map((f) => f.message).join(" · "));
  const avg = sw.reduce((a, b) => a + b, 0) / sw.length;
  assert.ok(avg >= 6 && avg <= 10, `ortalama ${avg}`);
  assert.ok(paragraphs.every((p) => sentences(p).length <= 3));
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.ok(story.glossary.every((g) => lower(body).includes(lower(g.word))));
  for (const w of ["gözlem", "hipotez", "veri", "mikroskop", "deney", "sonuç"]) {
    assert.ok(story.glossary.some((g) => g.word === w), `brif sözlüğü eksik: ${w}`);
  }
  const p = story.editorialLanguageProfile;
  assert.deepEqual(p.idioms.map((i) => i.expression), ["gözden kaçırmak"]);
  assert.deepEqual(p.proverbs.map((i) => i.expression), ["Sabreden derviş muradına ermiş"]);
  for (const item of [...p.idioms, ...p.proverbs]) assert.ok(lower(body).includes(lower(item.expression)), item.expression);
  assert.equal(story.mebKademe, "ortaokul");
  assert.equal(story.mebSinif, "7. ve 8. Sınıf");
  assert.equal(story.mebKazanim, "B2 açık");
});

test(`${story.title}: olgusal iddialar kaynaklı`, () => {
  const claims = story.factualReview.claims;
  assert.ok(claims.length >= 5);
  for (const c of claims) {
    assert.ok(c.sources.length >= 1 && c.sources.every((u) => u.startsWith("https://")), c.claim);
    assert.equal(c.result, "destekleniyor", c.claim);
  }
});

test(`${story.title}: hak beyanı, insan onay kapısı kapalı ve katalogda değil`, () => {
  assert.equal(story.sourceTruth.rightsStatus, "okurio-ozgun-ai-destekli");
  assert.equal(story.sourceTruth.sourceUrl, null);
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
  const app = readFileSync(new URL("../../src/App.jsx", import.meta.url), "utf8");
  assert.ok(!app.includes("uc-balonun-sirri"), "taslak App.jsx kataloğuna bağlanmamalı");
});
