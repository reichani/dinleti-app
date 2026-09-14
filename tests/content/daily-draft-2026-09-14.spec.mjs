import test from 'node:test';
import assert from 'node:assert/strict';
import { OKI_LABIRENT_DRAFT as story } from '../../src/content/drafts/2026-09-14-oki-labirentin-izi.js';
import { evaluateContentQualityReview } from '../../src/content/contentQualityReview.js';

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = text => text.split(/(?<=[.!?])\s+/u).filter(Boolean);

test('Oki labyrinth draft meets length, sections, time and language bounds', () => {
  const paragraphs = story.sections.flatMap(section => section.paragraphs);
  const count = words(paragraphs.join(' '));
  const seconds = Math.ceil(count * 60 / 155);
  const sentenceWords = paragraphs.flatMap(sentences).map(words);
  assert.ok(count >= 700 && count <= 1200);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(story.sections.every(section => words(section.paragraphs.join(' ')) >= 30));
  assert.ok(paragraphs.every(paragraph => sentences(paragraph).length <= 3));
  assert.ok(Math.max(...sentenceWords) <= 12);
  assert.ok(count / sentenceWords.length >= 6 && count / sentenceWords.length <= 10);
  assert.ok(Math.abs(story.declaredSeconds - seconds) / seconds <= .15);
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
});

test('myth motif scope and independent human review remain pending', () => {
  assert.equal(story.sourceTruth.sourceType, 'original-myth-inspired-fiction');
  assert.ok(story.sourceTruth.contextUrls.length);
  assert.equal(story.releaseReady, false);
  assert.equal(story.contentQualityReview.status, 'pending');
  assert.equal(evaluateContentQualityReview(story.contentQualityReview, { readingPathId: story.readingPathId }).publicationReady, false);
  assert.deepEqual([story.factualReview.status, story.originalityRightsReview.status, story.safeguardingLanguageReview.status], Array(3).fill('pending-human-review'));
});
