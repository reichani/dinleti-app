import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { auditStoryLength, LENGTH_VERDICT } from "../../src/content/lengthOptimizationPolicy.js";
import { NEW_PRODUCTION_STORIES } from "../../src/content/productionStoryUpgrades.js";
import { mergePilotStories } from "../../src/content/pilotCatalogAdapter.js";
import { readingPathIdForAgeLabel } from "../../src/content/contentQualityReview.js";
import { detectTextLanguage } from "../../src/textLanguage.js";

const draftDir = new URL("../../src/content/drafts/", import.meta.url);
// Bu test v2.9.3 ile kataloğa bağlanan 15 özgün pilot taslağı kapsar; aynı tarihli
// başka taslaklar (ör. içerik planı 2026-10-18 taslakları) kendi testleriyle denetlenir.
const PILOT_FILES = new Set([
  "2026-10-18-eski-harita-calismasi.js",
  "2026-10-18-kenar-notlari.js",
  "2026-10-18-kirk-dakikalik-bahce.js",
  "2026-10-18-kus-yuvasi-defteri.js",
  "2026-10-18-lighthouse-logbook-en.js",
  "2026-10-18-lili-su-sesi.js",
  "2026-10-18-mahallenin-saatcisi.js",
  "2026-10-18-mino-mirildaniyor.js",
  "2026-10-18-nana-pazar-renkleri.js",
  "2026-10-18-oki-ayakkabi-teki.js",
  "2026-10-18-rainy-day-library-en.js",
  "2026-10-18-sabah-vapuru.js",
  "2026-10-18-tamirci-defteri.js",
  "2026-10-18-toto-ari-ariyor.js",
  // 2026-10-20: "Münazara Hazırlığı" yapay zekâ kullanımı konulu olduğu için ürün sahibi kararıyla çıkarıldı; yerine aynı rafa özgün hikâye girdi.
  "2026-10-20-dogu-ekspresi-defteri.js",
]);
const files = readdirSync(draftDir).filter((f) => PILOT_FILES.has(f));

test("2026-10-18 özgün pilot okumaları: 15 taslak, hepsi uzunluk politikasında UYGUN", async () => {
  assert.equal(files.length, 15);
  for (const file of files) {
    const mod = await import(new URL(file, draftDir));
    const draft = Object.values(mod).find((v) => Array.isArray(v?.sections));
    assert.ok(draft, file);
    const story = { id: draft.id, baslik: draft.title, bolumler: draft.sections.map((s) => ({ ad: s.title, metin: s.paragraphs.join("\n\n") })) };
    const result = auditStoryLength(story, draft.readingPathId);
    assert.equal(result.verdict, LENGTH_VERDICT.OK, `${file}: ${result.findings.map((f) => f.message).join(" · ")}`);
    assert.equal(draft.releaseReady, false);
    assert.equal(draft.contentQualityReview.status, "pending");
    assert.equal(draft.contentQualityReview.reviewerName, "");
    assert.equal(draft.sourceTruth.sourceType, "original");
    const text = draft.sections.flatMap((s) => s.paragraphs).join(" ").toLocaleLowerCase("tr-TR");
    for (const entry of draft.glossary) assert.ok(text.includes(entry.word.toLocaleLowerCase("tr-TR")), `${file}: sözlük "${entry.word}" metinde yok`);
    assert.equal(detectTextLanguage(text), draft.language === "en" ? "en" : "tr", `${file}: dil tespiti`);
  }
});

test("yeni okumalar kataloğa doğru yol ve dil ile bağlanır, insan onayı açık kalır", () => {
  const merged = mergePilotStories([]);
  for (const candidate of NEW_PRODUCTION_STORIES) {
    const story = merged.find((s) => s.id === candidate.id);
    assert.ok(story, candidate.id);
    assert.ok(readingPathIdForAgeLabel(story.yas), `${story.id}: yaş etiketi yola eşlenmeli (${story.yas})`);
    assert.equal(story.releaseReady, false);
    assert.equal(story.metadata.contentStatus, "candidate-deployed-human-review-pending");
    if (/-en$/u.test(story.id)) assert.equal(story.dil, "en", `${story.id}: İngilizce sesle okunmalı`);
  }
});
