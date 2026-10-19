import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SEMAVER_UYARLAMA_DRAFT as story } from "../../src/content/drafts/2026-10-19-semaver-uyarlama.js";
import { evaluateContentQualityReview } from "../../src/content/contentQualityReview.js";
import { READING_LEVEL_WORD_TARGETS } from "../../src/content/readingLevelPolicy.js";
import { PASSAGE_WORD_TARGETS, auditStoryLength, LENGTH_VERDICT } from "../../src/content/lengthOptimizationPolicy.js";
import { TR_SCHOOL_GRADE_MAP } from "../../src/content/schoolGradeMapping.js";

const words = (t) => String(t ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = (t) => String(t ?? "").split(/(?<=[.!?])\s+/u).map((s) => s.trim()).filter(Boolean);
const paragraphs = story.sections.flatMap((s) => s.paragraphs);
const body = paragraphs.join(" ");
const lower = (t) => t.toLocaleLowerCase("tr-TR");

test(`${story.title}: okuma yolu, uzunluk ve süre sözleşmesi`, () => {
  const target = READING_LEVEL_WORD_TARGETS[story.readingPathId];
  const n = words(body);
  assert.equal(story.readingPathId, "klasiklere_hazirlik_14_16");
  assert.ok(n >= target.minWords && n <= target.maxWords, `kelime ${n}`);
  // Brif 3 önerisi: 1300-1600 kelime (docs/content-plans/2026-10-19.md).
  assert.ok(n >= 1300 && n <= 1600, `brif önerisi dışında: ${n}`);
  assert.equal(story.wordCount, n);
  assert.equal(story.estimatedSeconds, Math.ceil((n * 60) / 155));
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
});

test(`${story.title}: cümle, paragraf, sözlük ve dil profili sözleşmesi`, () => {
  const sw = paragraphs.flatMap(sentences).map(words);
  // Cümle sınırı karar kaynağından: src/content/lengthOptimizationPolicy.js (klasiklere_hazirlik_14_16: 30).
  assert.ok(Math.max(...sw) <= PASSAGE_WORD_TARGETS[story.readingPathId].maxSentenceWords);
  const audit = auditStoryLength({ id: story.id, baslik: story.title, bolumler: story.sections.map((s) => ({ ad: s.title, metin: s.paragraphs.join("\n\n") })) }, story.readingPathId);
  assert.equal(audit.verdict, LENGTH_VERDICT.OK, audit.findings.map((f) => f.message).join(" · "));
  const avg = sw.reduce((a, b) => a + b, 0) / sw.length;
  assert.ok(avg >= 6 && avg <= 10, `ortalama ${avg}`);
  assert.ok(paragraphs.every((p) => sentences(p).length <= 3));
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.ok(story.glossary.every((g) => lower(body).includes(lower(g.word))));
  for (const w of ["semaver", "vardiya", "buğu", "kömür", "avlu", "hasret"]) {
    assert.ok(story.glossary.some((g) => g.word === w), `brif sözlüğü: ${w}`);
  }
  const p = story.editorialLanguageProfile;
  assert.equal(p.idioms.length, 1);
  assert.equal(p.idioms[0].lemma, "içi cız etmek");
  assert.equal(p.proverbs.length, 0);
  for (const item of [...p.idioms, ...p.proverbs]) assert.ok(lower(body).includes(lower(item.expression)), item.expression);
});

test(`${story.title}: müfredat eşlemesi ve B2 açık alanları`, () => {
  const grade = TR_SCHOOL_GRADE_MAP.find((g) => g.yolId === story.readingPathId);
  assert.equal(story.mebKademe, grade.mebKademe);
  assert.equal(story.mebSinif, grade.okulSinifAraligi);
  assert.equal(story.mebKazanim, "B2 açık");
  assert.equal(story.pirlsSureci, "B2 açık");
});

test(`${story.title}: hak beyanı, birincil kaynak ve insan onay kapısı kapalı`, () => {
  const st = story.sourceTruth;
  assert.equal(st.rightsStatus, "kamu-mali");
  assert.equal(st.authorDeathYear, 1954);
  // FSEK md.27: ölümü izleyen yıldan itibaren 70 yıl; 1954 + 70 = 2024 sonu.
  assert.ok(st.authorDeathYear + 70 < 2026);
  assert.match(st.rightsBasis, /K-2026-10-19-02/u);
  assert.ok(st.sourceUrls.length >= 1 && st.sourceUrls.every((u) => u.startsWith("https://")));
  assert.match(st.firstPublication, /1935/u);
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

test(`${story.title}: taslak App.jsx kataloğuna bağlı değil`, () => {
  const app = readFileSync(new URL("../../src/App.jsx", import.meta.url), "utf8");
  assert.ok(!app.includes("semaver-uyarlama"));
  assert.ok(!app.includes("SEMAVER_UYARLAMA_DRAFT"));
});
