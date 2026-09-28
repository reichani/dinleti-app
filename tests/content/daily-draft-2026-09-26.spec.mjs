import test from 'node:test';
import assert from 'node:assert/strict';
import { ARILAR_NEDEN_DANS_EDER_DRAFT as story } from '../../src/content/drafts/2026-09-26-arilar-neden-dans-eder.js';
import { evaluateContentQualityReview } from '../../src/content/contentQualityReview.js';

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = text => text.split(/(?<=[.!?])\s+/u).filter(Boolean);

test('Arılar Neden Dans Eder yaş, süre, bölüm ve dil sözleşmesini karşılar', () => {
  const paragraphs = story.sections.flatMap(section => section.paragraphs);
  const count = words(paragraphs.join(' '));
  const sentenceWords = paragraphs.flatMap(sentences).map(words);
  const calculatedSeconds = Math.ceil(count * 60 / story.estimatedWordsPerMinute);
  assert.ok(count >= 700 && count <= 1200);
  assert.ok(story.sections.length >= 3 && story.sections.length <= 8);
  assert.ok(story.sections.every(section => words(section.paragraphs.join(' ')) >= 30));
  assert.ok(paragraphs.every(paragraph => sentences(paragraph).length <= 3));
  assert.ok(Math.max(...sentenceWords) <= 12);
  assert.ok(count / sentenceWords.length >= 6 && count / sentenceWords.length <= 10);
  assert.ok(Math.abs(story.declaredSeconds - calculatedSeconds) / calculatedSeconds <= 0.15);
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
});

test('kaynak ve insan kalite kapıları fail-closed kalır', () => {
  assert.equal(story.sourceTruth.sourceUrls.length, 3);
  assert.equal(story.sourceTruth.verificationStatus, 'source-scope-checked-human-factual-review-pending');
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
