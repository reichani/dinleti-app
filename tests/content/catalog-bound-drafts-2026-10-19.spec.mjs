// 2026-10-19 bağlama PR'ı: konsolidasyondaki 19 taslak (PR #163) kataloğa aday olarak bağlanır.
// Sınırlar src/content/lengthOptimizationPolicy.js ve readingLevelPolicy.js'den okunur.
import test from "node:test";
import assert from "node:assert/strict";
import { PRODUCTION_STORY_UPGRADES_BY_ID } from "../../src/content/productionStoryUpgrades.js";
import { auditStoryLength, LENGTH_VERDICT } from "../../src/content/lengthOptimizationPolicy.js";
import { evaluateStoryForReadingLevel, READING_LEVEL_WORD_TARGETS } from "../../src/content/readingLevelPolicy.js";

const BAGLANAN = {
  "mino-nerede": "ilk_harfler_6_7",
  "ela-el-ele": "ilk_harfler_6_7",
  "oki-el-ele": "ilk_harfler_6_7",
  "yagmur-tip-tip-siiri": "ilk_cumleler_7_8",
  "oki-ayi-gordu": "ilk_cumleler_7_8",
  "fox-and-grapes-en": "okuma_guveni_8_10",
  "lion-and-mouse-graded-en": "okuma_guveni_8_10",
  "yildiz-mi-gezegen-mi": "okuma_guveni_8_10",
  "lili-ay-isigi": "okumaya_hazirlik_5_6",
  "oki-ay-siiri": "ilk_harfler_6_7",
  "gokyuzu-siiri": "okuma_guveni_8_10",
  "little-star-poem-en": "ilk_cumleler_7_8",
  "space-poem-en": "akici_okuma_10_12",
  "moon-poem-en": "okuma_guveni_8_10",
  "diyet": "klasiklere_hazirlik_14_16",
  "oki-pegasus": "okuma_guveni_8_10",
  "yuksek-okceler": "akici_okuma_10_12",
  "alice-rabbit-hole-en": "akici_okuma_10_12",
  "la-fontaine-fugue": "ilk_harfler_6_7",
};
const YOLLAR = Object.keys(READING_LEVEL_WORD_TARGETS);

for (const [id, yolId] of Object.entries(BAGLANAN)) {
  test(`${id}: aday olarak bağlı, politika uzunluğunda ve yalnız ${yolId} yolunda`, () => {
    const story = PRODUCTION_STORY_UPGRADES_BY_ID[id];
    assert.ok(story, `${id} kataloğa bağlı değil`);
    assert.equal(story.icerikDurumu, "tam-metin");
    assert.equal(story.releaseReady, false);
    assert.equal(story.metadata.contentStatus, "candidate-deployed-human-review-pending");
    assert.equal(story.contentQualityReview.status, "pending");
    assert.equal(story.contentQualityReview.reviewerName, "");

    const audit = auditStoryLength(story, yolId);
    assert.equal(audit.verdict, LENGTH_VERDICT.OK, `${id}: ${audit.findings.map((f) => f.message).join(" · ")}`);

    const acik = YOLLAR.filter((y) => evaluateStoryForReadingLevel(story, {}, y).eligible);
    assert.deepEqual(acik, [yolId], `${id} açık yollar: ${acik.join(", ")}`);
  });
}

test("Diyet 14 yaş altı hiçbir okuma yolunda gösterilmez; kamu malı kaynağı kayıtlı", () => {
  const diyet = PRODUCTION_STORY_UPGRADES_BY_ID.diyet;
  for (const y of ["okul_oncesi_3_4", "okumaya_hazirlik_5_6", "ilk_harfler_6_7", "ilk_cumleler_7_8", "okuma_guveni_8_10", "akici_okuma_10_12", "genc_okurlar_12_14"]) {
    assert.equal(evaluateStoryForReadingLevel(diyet, {}, y).eligible, false, y);
  }
  assert.equal(diyet.hakDurumu, "kamu-mali");
  assert.match(diyet.kaynak.url, /wikisource\.org/u);
});
