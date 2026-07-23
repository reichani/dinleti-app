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
  "6-7 yaş": { minimumSeconds: 180, wordsPerMinute: 125 },
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
    assert.equal(story.hakDurumu, "okurio-ozgun");
  }
});

test("katalog birleştirme aynı kimlikli kısa metni onaylı tam metinle değiştirir", () => {
  const legacy = {
    id: "oki-sesleri-dinliyor",
    baslik: "Eski kısa sürüm",
    yazar: "Okurio",
    sureDk: 1,
    bolumler: [{ ad: "Kısa", dk: 1, metin: "Oki dinledi." }],
  };

  const merged = mergePilotStories([legacy]);
  const upgraded = merged.find((story) => story.id === legacy.id);

  assert.equal(upgraded, PRODUCTION_STORY_UPGRADES_BY_ID[legacy.id]);
  assert.notEqual(upgraded.baslik, legacy.baslik);
  assert.ok(seconds(upgraded) >= 120);
});
