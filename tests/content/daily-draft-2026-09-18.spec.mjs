import test from 'node:test';
import assert from 'node:assert/strict';
import { UGLY_DUCKLING_DRAFT as story } from '../../src/content/drafts/2026-09-18-ugly-duckling.js';
import { evaluateContentQualityReview } from '../../src/content/contentQualityReview.js';

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = text => text.split(/(?<=[.!?])\s+/u).filter(Boolean);

test('Ugly Duckling draft meets 7–8 length, section, duration and language bounds', () => {
  const paragraphs = story.sections.flatMap(section => section.paragraphs);
  const count = words(paragraphs.join(' '));
  const seconds = Math.ceil(count * 60 / story.estimatedWordsPerMinute);
  const sentenceWords = paragraphs.flatMap(sentences).map(words);
  assert.ok(count >= 350 && count <= 650);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(story.sections.every(section => words(section.paragraphs.join(' ')) >= 30));
  assert.ok(paragraphs.every(paragraph => sentences(paragraph).length <= 3));
  assert.ok(Math.max(...sentenceWords) <= 12);
  assert.ok(count / sentenceWords.length >= 6 && count / sentenceWords.length <= 10);
  assert.ok(Math.abs(story.declaredSeconds - seconds) / seconds <= .15);
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
});

test('adaptation scope is explicit and publication remains human-blocked', () => {
  assert.equal(story.sourceTruth.sourceType, 'public-domain-graded-short-adaptation');
  assert.ok(story.sourceTruth.sourceUrls.length >= 2);
  assert.match(story.sourceTruth.scope, /not the complete story/u);
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
