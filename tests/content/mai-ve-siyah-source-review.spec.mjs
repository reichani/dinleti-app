import test from 'node:test';
import assert from 'node:assert/strict';
import { MAI_VE_SIYAH_DRAFT } from '../../src/content/drafts/2026-09-23-mai-ve-siyah.js';

test('Mai ve Siyah source-of-truth uses a specific first-edition catalog record', () => {
  const source = MAI_VE_SIYAH_DRAFT.sourceTruth;
  assert.deepEqual(source.sourceUrls, ['https://catalog.hathitrust.org/Record/100423683']);
  assert.match(source.sourceEdition, /1897/);
  assert.match(source.sourceEdition, /231 sayfa/);
  assert.equal(source.verificationStatus, 'catalog-record-verified-full-view-text-comparison-pending');
});

test('Mai ve Siyah remains fail-closed until human text and quality review', () => {
  assert.equal(MAI_VE_SIYAH_DRAFT.structuralValid, true);
  assert.equal(MAI_VE_SIYAH_DRAFT.releaseReady, false);
  assert.equal(MAI_VE_SIYAH_DRAFT.contentQualityReview.status, 'pending');
  assert.equal(MAI_VE_SIYAH_DRAFT.factualReview.status, 'pending-human-review');
  assert.match(MAI_VE_SIYAH_DRAFT.sourceTruth.sourceLimitation, /insan edebiyat editörü/);
});
