import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getPilotIntegrationSnapshot,
  PRODUCTION_VISIBLE_CURATED_STORIES,
} from "../../src/content/pilotCatalogAdapter.js";

const BLOCKED_DRAFT_IDS = [
  "oe-01-mino-neden-uzuldu",
  "os-01-toto-bir-an-durdu",
  "mino-neden-uzuldu-v2",
  "toto-bir-an-durdu-v2",
];

test("pilot catalog adapter integration benchmarks", async (t) => {
  await t.test("integration snapshot reports only production-visible curated stories", () => {
    const result = getPilotIntegrationSnapshot([]);

    assert.strictEqual(
      result.newStoryCount,
      PRODUCTION_VISIBLE_CURATED_STORIES.length,
    );
    assert.strictEqual(result.pilotStoryIds.length, result.pilotCatalog.length);
  });

  await t.test("blocked draft and rewrite-queue stories stay outside reader surfaces", () => {
    const result = getPilotIntegrationSnapshot([]);
    const mergedIds = new Set(result.mergedCatalog.map((story) => story.id));
    const pilotIds = new Set(result.pilotStoryIds);

    for (const storyId of BLOCKED_DRAFT_IDS) {
      assert.equal(mergedIds.has(storyId), false, `${storyId} merged catalogda görünmemeli`);
      assert.equal(pilotIds.has(storyId), false, `${storyId} pilot katalogda görünmemeli`);
    }
  });

  await t.test("pilot catalog passes structural validation", () => {
    const result = getPilotIntegrationSnapshot([]);
    assert.ok(Array.isArray(result.mergedCatalog));
    assert.ok(Array.isArray(result.pilotCatalog));
  });
});
