import { createPendingContentQualityReview } from '../contentQualityReview.js';

const sections = [
  { title: 'One Bright Point', paragraphs: [
    'Oki and Lili sat beside the window. The room was warm and quiet. Outside, the evening sky slowly grew dark.',
    'A small bright point appeared above the roofs. Oki called it the first little star. Lili opened their sky notebook.',
    'They did not know its real name. Nana said they could record only what they saw. Oki drew a dot beside the date.',
    'The dot looked lonely on the page. Oki wanted to write a poem beside it. He waited for simple words to arrive.',
  ] },
  { title: 'Words for the Night', paragraphs: [
    'Lili described the sky as a dark blanket. Oki thought the light looked like a tiny window. Nana wrote both ideas below the drawing.',
    'Oki read the words aloud very slowly. The blanket idea felt too heavy to him. The tiny window felt warm and clear.',
    'They chose the image that matched their feeling. Then Oki made the first two lines. Nana wrote each line carefully.',
    'Little light above the street. Tiny window, calm and sweet.',
    'The poem had started, but it needed movement. Oki watched the bright point again. It seemed to move beside a passing cloud.',
  ] },
  { title: 'The Missing Light', paragraphs: [
    'A wide cloud crossed the darkening sky. The bright point disappeared behind it. Oki thought their poem had become wrong.',
    'Lili showed him the dated drawing. It still recorded the earlier view. A changing sky did not erase their first observation.',
    'They waited without guessing what happened behind the cloud. Nana brought a small lamp for the table. Everyone stayed beside the closed window.',
    'After several minutes, the cloud moved away. The bright point appeared in the same area. Oki added two new lines.',
    'Clouds may hide your quiet glow. Still, our waiting helps us know.',
  ] },
  { title: 'A Second Look', paragraphs: [
    'The next evening, they returned at the same time. The sky was clear, but the bright point looked different. It sat closer to the roof line.',
    'Lili checked yesterday’s page before drawing again. They used a new page for the second view. Each picture kept its own date.',
    'Oki wanted to call every bright point a star. Nana explained that guessing was not needed. Their poem could keep its friendly title.',
    'The notebook could use a more careful label. Lili wrote bright point under both drawings. They would ask an expert another day.',
    'Oki liked having two kinds of language. A poem could hold a feeling. A notebook could hold a careful observation.',
  ] },
  { title: 'The Finished Page', paragraphs: [
    'Oki placed the four lines on blue paper. Lili added both dated drawings underneath. They left space for the future answer.',
    'Nana read the whole poem once. The beginning showed wonder and warmth. The ending showed patience during the cloud.',
    'Oki did not add a grand final claim. He wrote one short closing line instead. Questions can shine beside an answer.',
    'They placed the page inside their sky folder. The poem was complete, although their investigation could continue. Nothing needed a rushed name.',
    'Before bedtime, Oki looked through the glass again. More bright points now filled the sky. Each one could begin another careful page.',
    'Lili closed the notebook and turned off the lamp. Their little poem stayed inside the folder. Tomorrow could bring a different view.',
  ] },
];

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const wordCount = words(sections.flatMap(section => section.paragraphs).join(' '));
const estimatedSeconds = Math.ceil(wordCount * 60 / 155);

export const LITTLE_STAR_POEM_EN_DRAFT = {
  id: 'little-star-poem-en-v2-draft', replacesIdAfterApproval: 'little-star-poem-en',
  title: 'Little Star Poem', language: 'en', ageBand: '7-8',
  readingPathId: 'ilk_cumleler_7_8', contentTrack: 'poetic-story',
  primaryTheme: 'Using careful observation and simple poetic language together',
  contentStatus: 'draft', releaseReady: false, wordCount, estimatedSeconds,
  declaredSeconds: estimatedSeconds, estimatedWordsPerMinute: 155, sections,
  languageScope: 'Short A1-oriented sentences with repeated concrete words. Final CEFR and ages 7–8 fit require human English review.',
  editorialScope: 'The short poem becomes a complete poetic story with five original verse lines. Genre and shelf placement require human approval.',
  glossary: [
    { word: 'point', definition: 'A very small mark or spot.' },
    { word: 'record', definition: 'To save information for later.' },
    { word: 'observation', definition: 'Something noticed by careful looking.' },
    { word: 'label', definition: 'A word that names or explains something.' },
    { word: 'investigation', definition: 'Careful work to find an answer.' },
  ],
  optionalReflectionPrompt: 'If you want, describe one small light you have seen at night.',
  reflectionOptional: true, reflectionScored: false,
  sourceTruth: {
    sourceType: 'original',
    scope: 'The story and verse lines were written for this draft. No outside poem, lyric, translation, or public-domain text was adapted.',
    adaptationStatus: 'not-applicable', verificationStatus: 'pending-human-review',
  },
  factualReview: {
    status: 'pending-human-review',
    notes: 'The bright point remains unidentified. The story distinguishes an observation label from a poetic title and makes no astronomy claim.',
  },
  originalityRightsReview: {
    status: 'pending-human-review',
    notes: 'No outside text was used. A human must still complete originality and rights review.',
  },
  safeguardingLanguageReview: {
    status: 'pending-human-review',
    notes: 'The children observe indoors with Nana beside a closed window. English level, accessibility tone, and performance pressure require human review.',
  },
  contentQualityReview: createPendingContentQualityReview('ilk_cumleler_7_8'),
};
