import test from 'node:test';
import assert from 'node:assert/strict';
import { COMPLETED_ENGLISH_FABLES, countBodyWords } from '../../src/content/drafts/completed-english-fables.js';
import { evaluateContentQualityReview } from '../../src/content/contentQualityReview.js';

const sentences = text => text.split(/(?<=[.!?])\s+/u).filter(Boolean);
function errors(s) {
  const p = s.sections.flatMap(x => x.paragraphs);
  const w = countBodyWords(p.join(' '));
  const lengths = p.flatMap(sentences).map(countBodyWords);
  const average = lengths.reduce((a,b) => a+b,0)/lengths.length;
  const result = [];
  if (w < 500 || w > 900) result.push('age');
  if (s.sections.length < 3 || s.sections.length > 8) result.push('sections');
  if (s.sections.some(x => countBodyWords(x.paragraphs.join(' ')) < 30 || sentences(x.paragraphs.join(' ')).length < 2)) result.push('section-depth');
  if (Math.abs(s.declaredSeconds-w*60/155)/(w*60/155) > .15) result.push('duration');
  if (s.wordCount !== w || s.estimatedSeconds !== Math.ceil(w*60/155)) result.push('metadata');
  if (Math.max(...lengths)>12 || average<6 || average>10) result.push('sentences');
  if (p.some(x=>sentences(x).length>3)) result.push('paragraphs');
  if (!s.sourceTruth.sourceUrl || !s.sourceTruth.scope) result.push('source');
  if (!s.contentQualityReview) result.push('review');
  if (s.releaseReady && !evaluateContentQualityReview(s.contentQualityReview,{readingPathId:s.readingPathId}).publicationReady) result.push('unsafe-release');
  return result;
}
for (const s of COMPLETED_ENGLISH_FABLES) {
  test(`${s.title}: complete reading contract`,()=>assert.deepEqual(errors(s),[]));
  test(`${s.title}: human review stays pending`,()=>{
    assert.equal(s.releaseReady,false);
    assert.equal(s.contentQualityReview.status,'pending');
    for(const key of ['reviewerName','reviewedAt','reviewNotes']) assert.equal(s.contentQualityReview[key],'');
    assert.ok(Object.values(s.contentQualityReview.checklist).every(x=>x===false));
    assert.ok(s.glossary.length>=3 && s.glossary.length<=8);
    assert.ok(s.optionalReflectionPrompt.startsWith('If you wish'));
  });
}
test('negative fixtures cannot bypass the content contract',()=>{
  const s=COMPLETED_ENGLISH_FABLES[0];
  assert.ok(errors({...s,sections:[{paragraphs:['A short summary.']}]}).includes('age'));
  assert.ok(errors({...s,sections:s.sections.slice(0,2)}).includes('sections'));
  assert.ok(errors({...s,sections:Array(9).fill(s.sections[0])}).includes('sections'));
  assert.ok(errors({...s,sections:[{paragraphs:['One sentence.']},...s.sections.slice(1)]}).includes('section-depth'));
  assert.ok(errors({...s,declaredSeconds:20}).includes('duration'));
  assert.ok(errors({...s,sourceTruth:{}}).includes('source'));
  assert.ok(errors({...s,contentQualityReview:undefined}).includes('review'));
  assert.ok(errors({...s,releaseReady:true}).includes('unsafe-release'));
});
