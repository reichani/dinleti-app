import test from 'node:test';
import assert from 'node:assert/strict';
import { DIYET_DRAFT as story } from '../../src/content/drafts/2026-09-10-diyet.js';
import { evaluateContentQualityReview } from '../../src/content/contentQualityReview.js';

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = text => text.split(/(?<=[.!?])\s+/u).filter(Boolean);

function validate(candidate) {
  const paragraphs = candidate.sections.flatMap(section => section.paragraphs);
  const count = words(paragraphs.join(' '));
  const seconds = Math.ceil(count * 60 / 155);
  const lengths = paragraphs.flatMap(sentences).map(words);
  const errors = [];
  if (candidate.language !== 'tr' || candidate.ageBand !== '14-16' || candidate.readingPathId !== 'klasiklere_hazirlik_14_16' || count < 1200 || count > 2000) errors.push('age-language');
  if (candidate.sections.length < 3 || candidate.sections.length > 8) errors.push('sections');
  if (candidate.sections.some(section => words(section.paragraphs.join(' ')) < 30 || sentences(section.paragraphs.join(' ')).length < 2)) errors.push('short-section');
  if (!Number.isFinite(candidate.declaredSeconds) || Math.abs(candidate.declaredSeconds - seconds) / seconds > .15) errors.push('duration');
  if (Math.max(...lengths) > 12 || count / lengths.length < 6 || count / lengths.length > 10 || paragraphs.some(p => sentences(p).length > 3)) errors.push('language');
  if (!candidate.contentQualityReview) errors.push('review-missing');
  if (candidate.sourceTruth?.sourceType?.startsWith('public-domain') && (!Array.isArray(candidate.sourceTruth.sourceUrls) || candidate.sourceTruth.sourceUrls.length < 2 || candidate.sourceTruth.adaptationStatus !== 'short-adaptation' || !candidate.sourceTruth.scope)) errors.push('source');
  if (!candidate.contentAdvisory || !candidate.safeguardingLanguageReview) errors.push('safeguarding');
  const human = evaluateContentQualityReview(candidate.contentQualityReview, { readingPathId: candidate.readingPathId });
  const reviewsApproved = human.publicationReady && ['factualReview', 'originalityRightsReview', 'safeguardingLanguageReview'].every(key => candidate[key]?.status === 'approved');
  if (candidate.releaseReady && !reviewsApproved) errors.push('false-release');
  return { structuralValid: errors.length === 0, releaseReady: errors.length === 0 && reviewsApproved, errors };
}

test('Diyet satisfies ages 14–16 structure, timing and language gates', () => {
  assert.deepEqual(validate(story), { structuralValid: true, releaseReady: false, errors: [] });
  assert.equal(story.wordCount, words(story.sections.flatMap(section => section.paragraphs).join(' ')));
  assert.equal(story.estimatedSeconds, Math.ceil(story.wordCount * 60 / 155));
  assert.equal(story.declaredSeconds, story.estimatedSeconds);
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.equal(story.reflectionOptional, true);
  assert.equal(story.reflectionScored, false);
});

test('Diyet identifies adaptation scope and keeps every human review pending', () => {
  assert.equal(story.sourceTruth.sourceType, 'public-domain-short-adaptation');
  assert.equal(story.sourceTruth.adaptationStatus, 'short-adaptation');
  assert.match(story.sourceTruth.scope, /tam metin.*değildir/u);
  assert.equal(story.sourceTruth.sourceUrls.length, 2);
  assert.equal(story.contentQualityReview.status, 'pending');
  for (const key of ['reviewerName', 'reviewedAt', 'reviewedCommit', 'reviewNotes']) assert.equal(story.contentQualityReview[key], '');
  assert.ok(Object.values(story.contentQualityReview.checklist).every(value => value === false));
  assert.ok(Object.values(story.contentQualityReview.readingPathChecklist).every(value => value === false));
  for (const key of ['factualReview', 'originalityRightsReview', 'safeguardingLanguageReview']) assert.equal(story[key].status, 'pending-human-review');
});

test('negative fixtures reject mandatory blocker classes', () => {
  const cases = [
    ['age-language', value => { value.ageBand = '10-12'; }],
    ['sections', value => { value.sections = value.sections.slice(0, 2); }],
    ['sections', value => { value.sections = Array(9).fill(value.sections[0]); }],
    ['short-section', value => { value.sections[0].paragraphs = ['Tek cümlelik özet.']; }],
    ['duration', value => { value.declaredSeconds *= 2; }],
    ['review-missing', value => { delete value.contentQualityReview; }],
    ['false-release', value => { value.releaseReady = true; }],
    ['source', value => { value.sourceTruth = { sourceType: 'public-domain-short-adaptation' }; }],
    ['safeguarding', value => { delete value.contentAdvisory; }],
    ['language', value => { value.sections[0].paragraphs[0] += ' Fazladan bir cümle. Fazladan bir cümle.'; }],
  ];
  for (const [error, mutate] of cases) {
    const altered = structuredClone(story); mutate(altered);
    assert.ok(validate(altered).errors.includes(error), error);
  }
});
