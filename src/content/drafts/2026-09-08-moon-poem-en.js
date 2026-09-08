import { createPendingContentQualityReview } from '../contentQualityReview.js';

const sections = [
  { title: 'A Moon Calendar', paragraphs: [
    'Lili brought a blank calendar to the window. Oki placed blue pencils beside it. They wanted to write a Moon poem together.',
    'The first square needed a careful observation. A bright curved Moon hung above the roofs. Lili drew its shape and wrote the date.',
    'Oki suggested that the Moon made silver light. Nana asked how they could check that idea. The children opened a trusted science page.',
    'They learned that the Moon does not make its own light. Sunlight reaches its surface and reflects toward Earth. Their poem needed that fact.',
  ] },
  { title: 'Light on a Ball', paragraphs: [
    'Nana placed a lamp beside a plain ball. The lamp represented the Sun. The ball represented the Moon in their simple model.',
    'Lili stood where Earth might be. She saw only part of the bright side. Oki slowly moved the ball around their viewing place.',
    'Different bright shapes appeared as the position changed. The ball itself did not shrink or grow. Their viewpoint changed what they could see.',
    'The model helped, but it had limits. Their heads could block the lamp. Real objects were also much farther apart.',
    'They wrote a white fact card beside the calendar. Blue cards would hold creative lines. Color kept evidence separate from imagination.',
  ] },
  { title: 'Clouds Over One Square', paragraphs: [
    'Two evenings later, the bright part looked wider. Lili drew it in the next dated square. Oki noticed the change without naming every phase.',
    'On the following night, clouds covered the sky. They waited near the window, but the Moon stayed hidden. The empty square felt disappointing.',
    'Oki wanted to copy yesterday’s shape. Lili shook her head. A copied picture would pretend they had observed something new.',
    'They marked the square with a small cloud instead. Nana said missing evidence could stay visible. Honest gaps also belonged in an observation record.',
    'That choice changed their poem. The Moon had not vanished because clouds hid it. Their view had changed, and the calendar showed why.',
  ] },
  { title: 'Fact Cards and Poem Cards', paragraphs: [
    'The next clear evening brought another shape. The children compared three dated drawings. The bright portion had changed across their observations.',
    'They checked NASA’s phase guide again. Half of the Moon is always lit by the Sun. From Earth, we see different amounts of that half.',
    'Oki wrote the fact in plain language. Lili then chose an image for the poem. “Moonlight crosses our quiet glass,” she read.',
    '“A silver curve becomes more round. One cloudy square keeps truth safe. We draw what careful eyes have found.”',
    'The lines did not call the Moon a lamp. They also did not claim clouds changed its phase. Science and poetry worked side by side.',
  ] },
  { title: 'A Poem That Can Grow', paragraphs: [
    'On Friday, they displayed the calendar in the library. Each drawing had a date. The cloud mark remained between the clear observations.',
    'Lili explained the lamp and ball model. She also named its limits. Oki showed the white fact cards and blue poem cards.',
    'A visitor asked when the Moon would look fully round. The children did not guess. They added the question below next week’s empty squares.',
    'Then they read their finished poem aloud. Its ending invited another night of looking. Their answer had become a new, testable question.',
    'Nana helped them hang a pencil from the board. Future observers could add dated shapes. The poem was complete, while the calendar could continue.',
    'Before leaving, Oki checked the cloudy square again. It no longer looked like failure. It showed that honest records protect a shared discovery.',
  ] },
];

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const wordCount = words(sections.flatMap(section => section.paragraphs).join(' '));
const estimatedSeconds = Math.ceil(wordCount * 60 / 155);

export const MOON_POEM_EN_DRAFT = {
  id: 'moon-poem-en-v2-draft', replacesIdAfterApproval: 'moon-poem-en',
  title: 'Moon Poem', language: 'en', ageBand: '8-10',
  readingPathId: 'okuma_guveni_8_10', contentTrack: 'science-poetic-story',
  primaryTheme: 'Honest observation helps science and poetry grow together',
  contentStatus: 'draft', releaseReady: false, wordCount, estimatedSeconds,
  declaredSeconds: estimatedSeconds, estimatedWordsPerMinute: 155, sections,
  languageScope: 'A1–A2 oriented English with astronomy terms supported by a glossary. Human English and age-fit review remains mandatory.',
  editorialScope: 'The summary becomes a complete science-poetic story. Genre and shelf placement require human approval.',
  glossary: [
    { word: 'reflect', definition: 'To send light back from a surface.' },
    { word: 'phase', definition: 'A shape of the Moon that we see from Earth.' },
    { word: 'surface', definition: 'The outside part of an object.' },
    { word: 'viewpoint', definition: 'The place from which something is seen.' },
    { word: 'evidence', definition: 'Information that helps us check an idea.' },
  ],
  optionalReflectionPrompt: 'If you want, choose one calendar square and say what it proves.',
  reflectionOptional: true, reflectionScored: false,
  sourceTruth: {
    sourceType: 'factual-original',
    scope: 'Original narrative and verse informed by NASA Moon phase explainers; no source wording, outside poem, lyric, or translation was adapted.',
    sourceUrls: ['https://science.nasa.gov/moon/moon-phases/', 'https://spaceplace.nasa.gov/moon-phases/'],
    checkedAt: '2026-09-08', adaptationStatus: 'not-applicable', verificationStatus: 'pending-human-review',
  },
  factualReview: {
    status: 'pending-human-review',
    notes: 'Reflected sunlight, illumination geometry, phase changes, and model limitations require human science review.',
  },
  originalityRightsReview: {
    status: 'pending-human-review',
    notes: 'Narrative and verse are original; source pages supplied facts only. Human rights review remains required.',
  },
  safeguardingLanguageReview: {
    status: 'pending-human-review',
    notes: 'No performance pressure or shaming. English level, astronomy vocabulary, and accessibility tone need human review.',
  },
  contentQualityReview: createPendingContentQualityReview('okuma_guveni_8_10'),
};
