import test from 'node:test';
import assert from 'node:assert/strict';
import { YILDIZ_GEZEGEN_DRAFT as story } from '../../src/content/drafts/2026-09-02-yildiz-mi-gezegen-mi.js';
const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const sentences = text => text.split(/(?<=[.!?])\s+/u).filter(Boolean);
function validate(s) {
  const p = s.sections.flatMap(x => x.paragraphs);
  const count = words(p.join(' '));
  const seconds = Math.ceil(count * 60 / 155);
  const lengths = p.flatMap(sentences).map(words);
  const errors = [];
  if (count < 500 || count > 900) errors.push('age');
  if (s.sections.length < 3 || s.sections.length > 8) errors.push('sections');
  if (s.sections.some(x => words(x.paragraphs.join(' ')) < 30 || sentences(x.paragraphs.join(' ')).length < 2)) errors.push('short-section');
  if (Math.abs(s.declaredSeconds - seconds) / seconds > .15) errors.push('duration');
  if (Math.max(...lengths) > 12 || count / lengths.length < 6 || count / lengths.length > 10 || p.some(x => sentences(x).length > 3)) errors.push('language');
  if (!s.contentQualityReview) errors.push('review-missing');
  if (s.sourceTruth?.sourceType === 'public-domain' && (!s.sourceTruth.sourceUrl || !s.sourceTruth.scope)) errors.push('source');
  const r = s.contentQualityReview;
  const humanApproved = r?.status === 'approved' && r.reviewerName?.trim() && r.reviewedAt && r.reviewNotes?.trim() && Object.values(r.checklist ?? {}).length >= 8 && Object.values(r.checklist).every(x => x === true);
  if (s.releaseReady && !humanApproved) errors.push('false-release');
  return { structuralValid: errors.length === 0, releaseReady: errors.length === 0 && Boolean(humanApproved) && ['factualReview', 'originalityRightsReview', 'safeguardingLanguageReview'].every(key => s[key]?.status === 'approved'), errors };
}
test('draft meets age, measured timing, section and language contract', () => {
  assert.deepEqual(validate(story), { structuralValid: true, releaseReady: false, errors: [] });
  assert.equal(story.wordCount, words(story.sections.flatMap(s => s.paragraphs).join(' ')));
  assert.equal(story.estimatedSeconds, Math.ceil(story.wordCount * 60 / 155));
  assert.equal(story.declaredSeconds, story.estimatedSeconds);
  assert.ok(story.glossary.length >= 3 && story.glossary.length <= 8);
  assert.equal(story.reflectionOptional, true);
  assert.equal(story.reflectionScored, false);
});
test('draft cannot impersonate human approval', () => {
  assert.equal(story.contentQualityReview.status, 'pending');
  for (const key of ['reviewerName', 'reviewedAt', 'reviewNotes']) assert.equal(story.contentQualityReview[key], '');
  assert.ok(Object.values(story.contentQualityReview.checklist).every(x => x === false));
  for (const key of ['factualReview', 'originalityRightsReview', 'safeguardingLanguageReview']) assert.equal(story[key].status, 'pending-human-review');
});
test('negative fixtures reject all mandatory failure categories', () => {
  const cases = [
    ['age', s => { s.sections = s.sections.slice(0, 3); }],
    ['sections', s => { s.sections = s.sections.slice(0, 2); }],
    ['sections', s => { s.sections = Array(9).fill(s.sections[0]); }],
    ['short-section', s => { s.sections[0].paragraphs = ['Kısa bir özet.']; }],
    ['duration', s => { s.declaredSeconds *= 2; }],
    ['review-missing', s => { delete s.contentQualityReview; }],
    ['false-release', s => { s.releaseReady = true; }],
    ['source', s => { s.sourceTruth = { sourceType: 'public-domain' }; }],
  ];
  for (const [error, mutate] of cases) {
    const altered = structuredClone(story); mutate(altered);
    assert.ok(validate(altered).errors.includes(error), error);
  }
});
