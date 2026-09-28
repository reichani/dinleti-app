import test from 'node:test';
import assert from 'node:assert/strict';
import { LA_FONTAINE_FABLES_DRAFT as story } from '../../src/content/drafts/2026-09-15-la-fontaine-fabllari.js';
import { evaluateContentQualityReview } from '../../src/content/contentQualityReview.js';

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = text => text.split(/(?<=[.!?])\s+/u).filter(Boolean);

test('La Fontaine draft meets 6–7 length, section, duration and language bounds', () => {
  const paragraphs = story.sections.flatMap(section => section.paragraphs);
  const count = words(paragraphs.join(' '));
  const seconds = Math.ceil(count * 60 / story.estimatedWordsPerMinute);
  const sentenceWords = paragraphs.flatMap(sentences).map(words);
  assert.ok(count >= 250 && count <= 500);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(story.sections.every(section => words(section.paragraphs.join(' ')) >= 30));
  assert.ok(paragraphs.every(paragraph => sentences(paragraph).length <= 3));
  assert.ok(Math.max(...sentenceWords) <= 12);
  assert.ok(count / sentenceWords.length >= 6 && count / sentenceWords.length <= 10);
  assert.ok(Math.abs(story.declaredSeconds - seconds) / seconds <= .15);
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
});

test('public-domain scope is explicit and release remains human-blocked', () => {
  assert.equal(story.sourceTruth.sourceType, 'public-domain-short-adaptation');
  assert.ok(story.sourceTruth.sourceUrls.length >= 1);
  assert.match(story.sourceTruth.scope, /kısa uyarlama/u);
  assert.equal(story.releaseReady, false);
  assert.equal(story.contentQualityReview.status, 'pending');
  const review = evaluateContentQualityReview(story.contentQualityReview, { readingPathId: story.readingPathId });
  assert.equal(review.candidateDeployReady, true);
  assert.equal(review.publicationReady, false);
  assert.deepEqual(
    [story.factualReview.status, story.originalityRightsReview.status, story.safeguardingLanguageReview.status],
    Array(3).fill('pending-human-review'),
  );
});
