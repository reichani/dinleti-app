import test from "node:test";
import assert from "node:assert/strict";
import {
  PRODUCTION_STORY_UPGRADES,
  PRODUCTION_STORY_UPGRADES_BY_ID,
} from "../../src/content/productionStoryUpgrades.js";
import { mergePilotStories } from "../../src/content/pilotCatalogAdapter.js";

const DURATION_RULES_BY_AGE = {
  "3-4 yaş": { minimumSeconds: 120, wordsPerMinute: 110 },
  "3-5 yaş": { minimumSeconds: 120, wordsPerMinute: 110 },
  "5-6 yaş": { minimumSeconds: 77, wordsPerMinute: 155 },
  "6-7 yaş": { minimumSeconds: 97, wordsPerMinute: 155 },
  "10-12 yaş": { minimumSeconds: 271, wordsPerMinute: 155 },
};

function countWords(story) {
  const text = story.bolumler.map((section) => section.metin).join(" ");
  return text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function seconds(story) {
  const rule = DURATION_RULES_BY_AGE[story.yas];
  assert.ok(rule, `${story.baslik}: tanımsız yaş grubu ${story.yas}`);
  return Math.ceil((countWords(story) * 60) / rule.wordsPerMinute);
}

test("yenilenen hikâyeler yaş grubunun gerçek minimum süresini karşılar", () => {
  assert.ok(PRODUCTION_STORY_UPGRADES.length >= 3);

  for (const story of PRODUCTION_STORY_UPGRADES) {
    const rule = DURATION_RULES_BY_AGE[story.yas];
    assert.ok(rule, `${story.baslik}: tanımsız yaş grubu ${story.yas}`);
    assert.ok(
      seconds(story) >= rule.minimumSeconds,
      `${story.baslik}: ${countWords(story)} kelime / ${seconds(story)} sn; minimum ${rule.minimumSeconds} sn (${rule.wordsPerMinute} kelime/dk)`,
    );
    assert.ok(story.bolumler.length >= 4, `${story.baslik}: en az dört anlatı bölümü gerekli`);
    assert.equal(story.icerikDurumu, "tam-metin");
    assert.ok(
      ["okurio-ozgun", "okurio-ozgun-ai-destekli"].includes(story.hakDurumu),
      `${story.baslik}: tanımsız hak durumu ${story.hakDurumu}`,
    );
  }
});

test("katalog birleştirme kısa metni tam metin ve review v2 sözleşmesiyle değiştirir", () => {
  const legacy = {
    id: "oki-sesleri-dinliyor",
    baslik: "Eski kısa sürüm",
    yazar: "Okurio",
    sureDk: 1,
    bolumler: [{ ad: "Kısa", dk: 1, metin: "Oki dinledi." }],
  };

  const merged = mergePilotStories([legacy]);
  const upgraded = merged.find((story) => story.id === legacy.id);

  assert.deepEqual(upgraded.bolumler, PRODUCTION_STORY_UPGRADES_BY_ID[legacy.id].bolumler);
  assert.notEqual(upgraded.baslik, legacy.baslik);
  assert.ok(seconds(upgraded) >= 120);
  assert.equal(upgraded.contentQualityReview.schemaVersion, "2.0");
  assert.equal(upgraded.contentQualityReview.status, "pending");
  assert.equal(upgraded.contentQualityReview.reviewerName, "");
  assert.equal(upgraded.releaseReady, false);
});

test("yapısal olarak hazır yedi taslak placeholder yerine kataloğa bağlanır", () => {
  const expectedIds = [
    "oki-gunesin-hikayesi",
    "oki-ati-taniyor",
    "kutup-tilkisi-yolculugu",
    "oki-ay-haritasi",
    "labirentte-uc-ses",
    "uzay-kulubu-piyesi",
    "nana-anlatiyor",
  ];
  const placeholders = expectedIds.map((id) => ({
    id,
    baslik: "Hazırlanıyor",
    yazar: "Okurio",
    sureDk: 0.3,
    icerikDurumu: "ozet",
    bolumler: [{ ad: "Kısa", dk: 0.3, metin: "Kısa taslak." }],
  }));

  const merged = mergePilotStories(placeholders);
  for (const id of expectedIds) {
    const story = merged.find((item) => item.id === id);
    assert.ok(story, `${id}: katalogda bulunmalı`);
    assert.equal(story.icerikDurumu, "tam-metin", `${id}: tam metin olmalı`);
    assert.ok(story.bolumler.length >= 3, `${id}: anlamlı bölüm yapısı eksik`);
    assert.equal(story.contentQualityReview.status, "pending");
    assert.equal(story.releaseReady, false);
  }
});
