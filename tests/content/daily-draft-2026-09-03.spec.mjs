import test from 'node:test';
import assert from 'node:assert/strict';
import { LILI_AY_ISIGI_DRAFT as story } from '../../src/content/drafts/2026-09-03-lili-ay-isigi.js';
import { evaluateContentQualityReview } from '../../src/content/contentQualityReview.js';
const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = text => text.split(/(?<=[.!?])\s+/u).filter(Boolean);
function validate(s) {
  const p = s.sections.flatMap(x => x.paragraphs);
  const count = words(p.join(' '));
  const seconds = Math.ceil(count * 60 / 155);
  const lengths = p.flatMap(sentences).map(words);
  const errors = [];
  if (s.ageBand !== '5-6' || s.readingPathId !== 'okumaya_hazirlik_5_6' || count < 200 || count > 400) errors.push('age');
  if (s.sections.length < 3 || s.sections.length > 8) errors.push('sections');
  if (s.sections.some(x => words(x.paragraphs.join(' ')) < 30 || sentences(x.paragraphs.join(' ')).length < 2)) errors.push('short-section');
  if (!Number.isFinite(s.declaredSeconds) || Math.abs(s.declaredSeconds - seconds) / seconds > .15) errors.push('duration');
  if (Math.max(...lengths) > 12 || count / lengths.length < 6 || count / lengths.length > 10 || p.some(x => sentences(x).length > 3)) errors.push('language');
  if (!s.contentQualityReview) errors.push('review-missing');
  if (s.sourceTruth?.sourceType === 'public-domain' && (!s.sourceTruth.sourceUrl || !s.sourceTruth.scope)) errors.push('source');
  const human = evaluateContentQualityReview(s.contentQualityReview, {readingPathId: s.readingPathId});
  const reviewsApproved = human.publicationReady && ['factualReview', 'originalityRightsReview', 'safeguardingLanguageReview'].every(key => s[key]?.status === 'approved');
  if (s.releaseReady && !reviewsApproved) errors.push('false-release');
  return { structuralValid: errors.length === 0, releaseReady: errors.length === 0 && reviewsApproved, errors };
}
test('Lili body satisfies preschool preparation age, timing and language contract', () => {
  assert.deepEqual(validate(story), { structuralValid: true, releaseReady: false, errors: [] });
  assert.equal(story.wordCount, words(story.sections.flatMap(s => s.paragraphs).join(' ')));
  assert.equal(story.estimatedSeconds, Math.ceil(story.wordCount * 60 / 155));
  assert.equal(story.declaredSeconds, story.estimatedSeconds);
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.equal(story.reflectionOptional, true);
  assert.equal(story.reflectionScored, false);
});
test('Lili remains an original draft pending real human review', () => {
  assert.equal(story.contentQualityReview.status, 'pending');
  for (const key of ['reviewerName', 'reviewedAt', 'reviewedCommit', 'reviewNotes']) assert.equal(story.contentQualityReview[key], '');
  assert.ok(Object.values(story.contentQualityReview.checklist).every(x => x === false));
  assert.ok(Object.values(story.contentQualityReview.readingPathChecklist).every(x => x === false));
  for (const key of ['factualReview', 'originalityRightsReview', 'safeguardingLanguageReview']) assert.equal(story[key].status, 'pending-human-review');
  assert.equal(story.sourceTruth.sourceType, 'original');
  assert.equal(story.sourceTruth.verificationStatus, 'pending-human-review');
});
test('negative fixtures reject mandatory blockers without changing approval evidence', () => {
  const cases = [
    ['age', s => { s.sections = s.sections.slice(0, 2); }],
    ['sections', s => { s.sections = s.sections.slice(0, 2); }],
    ['sections', s => { s.sections = Array(9).fill(s.sections[0]); }],
    ['short-section', s => { s.sections[0].paragraphs = ['Kısa bir özet.']; }],
    ['duration', s => { s.declaredSeconds *= 2; }],
    ['duration', s => { delete s.declaredSeconds; }],
    ['review-missing', s => { delete s.contentQualityReview; }],
    ['false-release', s => { s.releaseReady = true; }],
    ['source', s => { s.sourceTruth = { sourceType: 'public-domain' }; }],
    ['language', s => { s.sections[0].paragraphs[0] += ' Bir cümle daha var. Bir cümle daha var.'; }],
  ];
  for (const [error, mutate] of cases) {
    const altered = structuredClone(story); mutate(altered);
    assert.ok(validate(altered).errors.includes(error), error);
  }
});
