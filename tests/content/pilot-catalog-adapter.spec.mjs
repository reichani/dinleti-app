import { test } from 'node:test';
import assert from 'node:assert/strict';
import { 
  getPilotIntegrationSnapshot, 
  ALL_CURATED_STORIES 
} from '../../src/content/pilotCatalogAdapter.js';

test('pilot catalog adapter integration benchmarks', async (t) => {
  await t.test('integration snapshot reports the new pilot package', () => {
    const mockExistingCatalog = [];
    const result = getPilotIntegrationSnapshot(mockExistingCatalog);

    // Artık 2 veya 5 değil, her zaman güncel içerik sayısı kadar bekleyecek!
    assert.strictEqual(result.newStoryCount, ALL_CURATED_STORIES.length);
    assert.strictEqual(result.pilotStoryIds.length, result.pilotCatalog.length);
  });

  await t.test('pilot catalog passes structural and manifesto validation', () => {
    const result = getPilotIntegrationSnapshot([]);
    assert.ok(Array.isArray(result.mergedCatalog));
    assert.ok(Array.isArray(result.pilotCatalog));
  });
});
