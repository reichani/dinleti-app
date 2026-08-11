import assert from "node:assert/strict";
import test from "node:test";
import {
  PRODUCTION_STORY_UPGRADES_BY_ID,
  UZAY_KULUBU_PRODUCTION_CANDIDATE as candidate,
} from "../../src/content/productionStoryUpgrades.js";

const countWords = (text = "") => String(text).match(/[\p{L}\p{N}]+/gu)?.length ?? 0;

test("Uzay Kulübü Sunumu insan onayı olmadan production kataloğuna bağlanmaz", () => {
  assert.equal(candidate.metadata.releaseReady, false);
  assert.equal(candidate.metadata.contentQualityReview.status, "pending");
  assert.equal(PRODUCTION_STORY_UPGRADES_BY_ID["uzay-kulubu-piyesi"], undefined);
});

test("production adayı eksiksiz içerik ve özgünlük izini korur", () => {
  assert.equal(candidate.baslik, "Uzay Kulübü Sunumu");
  assert.equal(candidate.id, "uzay-kulubu-piyesi");
  assert.equal(candidate.icerikDurumu, "tam-metin");
  assert.equal(candidate.hakDurumu, "okurio-ozgun-ai-destekli");
  const words = candidate.bolumler.reduce((sum, section) => sum + countWords(section.metin), 0);
  assert.ok(words >= 700 && words <= 1200, `${words} words`);
  assert.equal(Math.ceil((words * 60) / 155), 275);
  assert.equal(candidate.metadata.thirdPartyRightsClearance, "not-required");
  assert.equal(candidate.metadata.originalityRightsReviewStatus, "not-required-original-okurio-work");
});

test("Okurio Kaynak İzi AI desteğini ve ana kaynakları açıklar", () => {
  const stamp = candidate.provenanceStamp;
  assert.equal(stamp.mark, "Okurio Kaynak İzi");
  assert.match(stamp.disclosure, /AI destekli/u);
  assert.match(stamp.disclosure, /Okurio için özgün/u);
  assert.equal(stamp.primarySources.length, 3);
  stamp.primarySources.forEach((source) => assert.match(source.url, /^https:\/\/science\.nasa\.gov\//u));
});
