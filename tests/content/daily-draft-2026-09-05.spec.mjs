import test from 'node:test';
import assert from 'node:assert/strict';
import { GOKYUZU_SIIRI_DRAFT as story } from '../../src/content/drafts/2026-09-05-gokyuzu-siiri.js';
import { evaluateContentQualityReview } from '../../src/content/contentQualityReview.js';

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = text => text.split(/(?<=[.!?])\s+/u).filter(Boolean);

function validate(candidate) {
  const paragraphs = candidate.sections.flatMap(section => section.paragraphs);
  const count = words(paragraphs.join(' '));
  const seconds = Math.ceil(count * 60 / 155);
  const sentenceLengths = paragraphs.flatMap(sentences).map(words);
  const errors = [];
  if (candidate.ageBand !== '8-10' || candidate.readingPathId !== 'okuma_guveni_8_10' || count < 500 || count > 900) errors.push('age');
  if (candidate.sections.length < 3 || candidate.sections.length > 8) errors.push('sections');
  if (candidate.sections.some(section => words(section.paragraphs.join(' ')) < 30 || sentences(section.paragraphs.join(' ')).length < 2)) errors.push('short-section');
  if (!Number.isFinite(candidate.declaredSeconds) || Math.abs(candidate.declaredSeconds - seconds) / seconds > .15) errors.push('duration');
  if (Math.max(...sentenceLengths) > 12 || count / sentenceLengths.length < 6 || count / sentenceLengths.length > 10 || paragraphs.some(p => sentences(p).length > 3)) errors.push('language');
  if (!candidate.contentQualityReview) errors.push('review-missing');
  if (candidate.sourceTruth?.sourceType === 'public-domain' && (!candidate.sourceTruth.sourceUrl || !candidate.sourceTruth.scope)) errors.push('source');
  const human = evaluateContentQualityReview(candidate.contentQualityReview, { readingPathId: candidate.readingPathId });
  const reviewsApproved = human.publicationReady && ['factualReview', 'originalityRightsReview', 'safeguardingLanguageReview'].every(key => candidate[key]?.status === 'approved');
  if (candidate.releaseReady && !reviewsApproved) errors.push('false-release');
  return { structuralValid: errors.length === 0, releaseReady: errors.length === 0 && reviewsApproved, errors };
}

test('Gökyüzü body satisfies ages 8–10 timing, sections and language contract', () => {
  assert.deepEqual(validate(story), { structuralValid: true, releaseReady: false, errors: [] });
  assert.equal(story.wordCount, words(story.sections.flatMap(section => section.paragraphs).join(' ')));
  assert.equal(story.estimatedSeconds, Math.ceil(story.wordCount * 60 / 155));
  assert.equal(story.declaredSeconds, story.estimatedSeconds);
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.equal(story.reflectionOptional, true);
  assert.equal(story.reflectionScored, false);
});

test('Gökyüzü remains an original draft pending real human review', () => {
  assert.equal(story.contentQualityReview.status, 'pending');
  for (const key of ['reviewerName', 'reviewedAt', 'reviewedCommit', 'reviewNotes']) assert.equal(story.contentQualityReview[key], '');
  assert.ok(Object.values(story.contentQualityReview.checklist).every(value => value === false));
  assert.ok(Object.values(story.contentQualityReview.readingPathChecklist).every(value => value === false));
  for (const key of ['factualReview', 'originalityRightsReview', 'safeguardingLanguageReview']) assert.equal(story[key].status, 'pending-human-review');
  assert.equal(story.sourceTruth.sourceType, 'original');
  assert.equal(story.sourceTruth.verificationStatus, 'pending-human-review');
});

test('negative fixtures reject every mandatory blocker', () => {
  const cases = [
    ['age', candidate => { candidate.sections = candidate.sections.slice(0, 2); }],
    ['sections', candidate => { candidate.sections = candidate.sections.slice(0, 2); }],
    ['sections', candidate => { candidate.sections = Array(9).fill(candidate.sections[0]); }],
    ['short-section', candidate => { candidate.sections[0].paragraphs = ['Kısa bir özet.']; }],
    ['duration', candidate => { candidate.declaredSeconds *= 2; }],
    ['duration', candidate => { delete candidate.declaredSeconds; }],
    ['review-missing', candidate => { delete candidate.contentQualityReview; }],
    ['false-release', candidate => { candidate.releaseReady = true; }],
    ['source', candidate => { candidate.sourceTruth = { sourceType: 'public-domain' }; }],
    ['language', candidate => { candidate.sections[0].paragraphs[0] += ' Bir cümle daha var. Bir cümle daha var.'; }],
  ];
  for (const [error, mutate] of cases) {
    const altered = structuredClone(story);
    mutate(altered);
    assert.ok(validate(altered).errors.includes(error), error);
  }
});
