import test from 'node:test';
import assert from 'node:assert/strict';
import { OKI_VE_PEGASUS_DRAFT as story } from '../../src/content/drafts/2026-09-11-oki-ve-pegasus.js';
import { evaluateContentQualityReview } from '../../src/content/contentQualityReview.js';

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = text => text.split(/(?<=[.!?])\s+/u).filter(Boolean);

test('Oki ve Pegasus 8–10 yaş yapı ve dil kapılarını karşılar', () => {
  const paragraphs = story.sections.flatMap(section => section.paragraphs);
  const count = words(paragraphs.join(' '));
  const calculatedSeconds = Math.ceil(count * 60 / 155);
  const lengths = paragraphs.flatMap(sentences).map(words);
  assert.ok(count >= 500 && count <= 900);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(story.sections.every(section => words(section.paragraphs.join(' ')) >= 30));
  assert.ok(Math.abs(story.declaredSeconds - calculatedSeconds) / calculatedSeconds <= .15);
  assert.ok(Math.max(...lengths) <= 12);
  assert.ok(count / lengths.length >= 6 && count / lengths.length <= 10);
  assert.ok(paragraphs.every(paragraph => sentences(paragraph).length <= 3));
});

test('taslak kaynak kapsamını açıklar ve insan onayını bekler', () => {
  assert.equal(story.sourceTruth.sourceType, 'original-myth-inspired-fiction');
  assert.match(story.sourceTruth.scope, /özgün Okurio/i);
  assert.equal(story.releaseReady, false);
  assert.equal(story.contentQualityReview.status, 'pending');
  assert.equal(evaluateContentQualityReview(story.contentQualityReview, { readingPathId: story.readingPathId }).publicationReady, false);
  assert.deepEqual([story.factualReview.status, story.originalityRightsReview.status, story.safeguardingLanguageReview.status], Array(3).fill('pending-human-review'));
});
