import test from 'node:test';
import assert from 'node:assert/strict';
import { ALICE_RABBIT_HOLE_DRAFT as story } from '../../src/content/drafts/2026-09-13-alice-rabbit-hole.js';
import { evaluateContentQualityReview } from '../../src/content/contentQualityReview.js';

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = text => text.split(/(?<=[.!?])\s+/u).filter(Boolean);

test('Alice graded adaptation meets age, sections, timing and manifesto bounds', () => {
  const paragraphs = story.sections.flatMap(section => section.paragraphs);
  const count = words(paragraphs.join(' '));
  const duration = Math.ceil(count * 60 / 155);
  const lengths = paragraphs.flatMap(sentences).map(words);
  assert.ok(count >= 700 && count <= 1200);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(story.sections.every(section => words(section.paragraphs.join(' ')) >= 30));
  assert.ok(paragraphs.every(paragraph => sentences(paragraph).length <= 3));
  assert.ok(Math.max(...lengths) <= 12);
  assert.ok(count / lengths.length >= 6 && count / lengths.length <= 10);
  assert.ok(Math.abs(story.declaredSeconds - duration) / duration <= .15);
});

test('source scope and human release gates remain closed', () => {
  assert.equal(story.sourceTruth.adaptationStatus, 'short-adaptation');
  assert.ok(story.sourceTruth.sourceUrls.length >= 1);
  assert.equal(story.releaseReady, false);
  assert.equal(story.contentQualityReview.status, 'pending');
  assert.equal(evaluateContentQualityReview(story.contentQualityReview, { readingPathId: story.readingPathId }).publicationReady, false);
  assert.deepEqual([story.factualReview.status, story.originalityRightsReview.status, story.safeguardingLanguageReview.status], Array(3).fill('pending-human-review'));
});
