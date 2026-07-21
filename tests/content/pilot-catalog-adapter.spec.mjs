import test from "node:test";
import assert from "node:assert/strict";

import {
  findGlossaryEntry,
  getGlossaryForStory,
  getPilotEligibleCatalog,
  getPilotIntegrationSnapshot,
  getReflectionPromptForStory,
  isStoryReleaseReady,
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

test("review-stage pilot stories are not merged into the public catalog", () => {
  const before = structuredClone(existingCatalog);
  const merged = mergePilotStories(existingCatalog);

  assert.deepEqual(existingCatalog, before);
  assert.equal(merged.length, existingCatalog.length);
  assert.equal(merged.some((story) => story.id === "oe-01-mino-neden-uzuldu"), false);
  assert.equal(merged.some((story) => story.id === "os-01-toto-bir-an-durdu"), false);
});

test("mandatory human approvals and explicit releaseReady are required", () => {
  assert.equal(isStoryReleaseReady("oe-01-mino-neden-uzuldu"), false);
  assert.equal(isStoryReleaseReady("os-01-toto-bir-an-durdu"), false);
  assert.equal(isStoryReleaseReady("legacy-classic"), true);
});

test("duplicate catalog ids are not inserted twice", () => {
  const mergedOnce = mergePilotStories(existingCatalog);
  const mergedTwice = mergePilotStories(mergedOnce);

  assert.equal(mergedTwice.length, mergedOnce.length);
});

test("pilot surface hides review-stage, long and non-Okurio content", () => {
  const catalogWithDrafts = [
    ...existingCatalog,
    {
      id: "oe-01-mino-neden-uzuldu",
      baslik: "Mino Neden Üzüldü?",
      yazar: "Okurio Özgün Hikâyeler",
      sureDk: 3,
    },
  ];
  const pilotCatalog = getPilotEligibleCatalog(catalogWithDrafts);
  const ids = pilotCatalog.map((story) => story.id);

  assert.equal(ids.includes("oe-01-mino-neden-uzuldu"), false);
  assert.ok(ids.includes("existing-short-okurio"));
  assert.equal(ids.includes("existing-long-okurio"), false);
  assert.equal(ids.includes("legacy-classic"), false);
});

test("glossary lookup supports Turkish case normalization", () => {
  const entry = findGlossaryEntry("oe-01-mino-neden-uzuldu", "ÜZÜNTÜ");

  assert.equal(entry?.word, "üzüntü");
  assert.ok(entry?.definition.length > 0);
});

test("editor support data remains available while story is hidden", () => {
  const glossary = getGlossaryForStory("os-01-toto-bir-an-durdu");
  const reflection = getReflectionPromptForStory("os-01-toto-bir-an-durdu");

  assert.equal(glossary.length, 5);
  assert.equal(reflection, "Toto durunca ne değişti?");
});

test("integration snapshot reports drafts without publishing them", () => {
  const snapshot = getPilotIntegrationSnapshot(existingCatalog);

  assert.equal(snapshot.newStoryCount, 2);
  assert.equal(snapshot.releaseReadyStoryCount, 0);
  assert.equal(snapshot.pilotStoryIds.includes("oe-01-mino-neden-uzuldu"), false);
  assert.equal(snapshot.pilotStoryIds.includes("os-01-toto-bir-an-durdu"), false);
});
