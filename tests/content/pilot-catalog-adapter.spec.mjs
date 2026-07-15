import test from "node:test";
import assert from "node:assert/strict";

import {
  findGlossaryEntry,
  getGlossaryForStory,
  getPilotEligibleCatalog,
  getPilotIntegrationSnapshot,
  getReflectionPromptForStory,
  mergePilotStories,
} from "../../src/content/pilotCatalogAdapter.js";

const existingCatalog = [
  {
    id: "existing-short-okurio",
    baslik: "Kısa Okurio Hikâyesi",
    yazar: "Okurio İlk Okuma",
    sureDk: 4,
  },
  {
    id: "existing-long-okurio",
    baslik: "Uzun Okurio Hikâyesi",
    yazar: "Okurio Özgün Hikâyeler",
    sureDk: 12,
  },
  {
    id: "legacy-classic",
    baslik: "Uzun Klasik",
    yazar: "Başka Yazar",
    sureDk: 40,
  },
];

test("pilot stories merge without mutating the existing catalog", () => {
  const before = structuredClone(existingCatalog);
  const merged = mergePilotStories(existingCatalog);

  assert.deepEqual(existingCatalog, before);
  assert.equal(merged.length, existingCatalog.length + 2);
  assert.equal(merged[0].id, "oe-01-mino-neden-uzuldu");
  assert.equal(merged[1].id, "os-01-toto-bir-an-durdu");
});

test("duplicate pilot story ids are not inserted twice", () => {
  const mergedOnce = mergePilotStories(existingCatalog);
  const mergedTwice = mergePilotStories(mergedOnce);

  assert.equal(mergedTwice.length, mergedOnce.length);
});

test("pilot surface hides long and non-Okurio content", () => {
  const merged = mergePilotStories(existingCatalog);
  const pilotCatalog = getPilotEligibleCatalog(merged);
  const ids = pilotCatalog.map((story) => story.id);

  assert.ok(ids.includes("oe-01-mino-neden-uzuldu"));
  assert.ok(ids.includes("os-01-toto-bir-an-durdu"));
  assert.ok(ids.includes("existing-short-okurio"));
  assert.equal(ids.includes("existing-long-okurio"), false);
  assert.equal(ids.includes("legacy-classic"), false);
});

test("glossary lookup supports Turkish case normalization", () => {
  const entry = findGlossaryEntry("oe-01-mino-neden-uzuldu", "ÜZÜNTÜ");

  assert.equal(entry?.word, "üzüntü");
  assert.ok(entry?.definition.length > 0);
});

test("story support data is available without touching reading state", () => {
  const glossary = getGlossaryForStory("os-01-toto-bir-an-durdu");
  const reflection = getReflectionPromptForStory("os-01-toto-bir-an-durdu");

  assert.equal(glossary.length, 5);
  assert.equal(reflection, "Toto durunca ne değişti?");
});

test("integration snapshot reports the new pilot package", () => {
  const snapshot = getPilotIntegrationSnapshot(existingCatalog);

  assert.equal(snapshot.newStoryCount, 2);
  assert.ok(snapshot.pilotStoryIds.includes("oe-01-mino-neden-uzuldu"));
  assert.ok(snapshot.pilotStoryIds.includes("os-01-toto-bir-an-durdu"));
});
