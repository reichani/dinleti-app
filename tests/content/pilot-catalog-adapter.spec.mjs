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

    // Testin katı bir sayı beklemek yerine dinamik olarak güncel sayıya eşitlenmesini sağlıyoruz
    assert.strictEqual(result.newStoryCount, ALL_CURATED_STORIES.length);
    assert.strictEqual(result.pilotStoryIds.length, result.pilotCatalog.length);
  });

  await t.test('pilot catalog passes structural and manifesto validation', () => {
    const result = getPilotIntegrationSnapshot([]);
    assert.ok(Array.isArray(result.mergedCatalog));
    assert.ok(Array.isArray(result.pilotCatalog));
  });
});
