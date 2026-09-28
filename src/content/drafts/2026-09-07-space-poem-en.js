import { createPendingContentQualityReview } from '../contentQualityReview.js';

const sections = [
  { title: 'A Question on the Board', paragraphs: [
    'Oki entered the library after the final lesson. Lili and Toto waited beside the science board. Their club needed a poem for Friday.',
    'The board already showed several space photographs. One image contained a comet with a glowing tail. Another showed many bright stars.',
    'Oki read the old poem from their folder. It asked where a comet went. It also asked how a small star glowed.',
    'Those questions sounded useful, but the poem stopped there. It offered no journey or careful ending. The club decided to build a complete piece.',
    'Nana gave them three blank research cards. Each card needed one claim and one source. Creative comparisons would use different blue cards.',
  ] },
  { title: 'The Comet Card', paragraphs: [
    'Lili opened NASA’s page about comets. The page described comets as frozen gas, rock, and dust. It also said they travel around the Sun.',
    'The group wrote that description in shorter language. They avoided calling every comet a dirty snowball. That phrase could hide important details.',
    'They learned that a comet warms near the Sun. Dust and gas can then form a glowing head. They can also create a long tail.',
    'Toto wanted the tail to chase the comet. Oki checked the source before writing that line. The tail was not simply following like a pet.',
    'They replaced the chase with a careful image. “Light opens behind a travelling stone,” Oki suggested. Nana marked it as poetry, not a fact.',
  ] },
  { title: 'The Star Card', paragraphs: [
    'Next, they studied NASA’s introduction to stars. Stars are giant objects made mostly from hydrogen and helium. Their centers produce energy through nuclear fusion.',
    'That explanation contained difficult words for younger readers. Lili kept “fusion” for the glossary. She described it as nuclei joining and releasing energy.',
    'Oki first wrote that stars were burning fires. Toto noticed that ordinary fire needs different conditions. They removed the misleading comparison from the science card.',
    'The poem could still describe warmth and light. However, it could not teach that stars were campfires. The club kept imagination beside accurate labels.',
    'Their second research card now had one clear message. Stars make energy within their hot centers. Their distance makes them look tiny from Earth.',
  ] },
  { title: 'A Model That Failed', paragraphs: [
    'The group built a table model before writing further. A lamp represented the Sun. A cold paper ball represented the comet’s solid center.',
    'Silver threads formed a bright imaginary tail. Toto placed the threads behind the moving ball. The model looked convincing from his chair.',
    'Then Lili moved the comet around the lamp. The threads still pointed behind its movement. Their model suggested a rule they had not verified.',
    'They returned to the source and found the problem. A comet’s tails generally extend away from the Sun. Direction of travel alone was not enough.',
    'Oki felt disappointed by the attractive model. Nana called the mistake useful evidence. They changed the threads and added a note about the model’s limits.',
    'The failed model created the poem’s turning point. Beauty had made one wrong idea seem true. Checking the source changed both model and verse.',
  ] },
  { title: 'Two Kinds of Language', paragraphs: [
    'The club placed white research cards on one side. Blue poetry cards went on the other side. Every sentence now had a visible purpose.',
    'One white card explained comet materials and orbit. Another explained heating near the Sun. The third described how stars produce energy.',
    'The blue cards held images, rhythm, and questions. Oki read the new opening aloud. Its meaning stayed clear without copying the research sentences.',
    '“Across the dark, a question flies. An icy traveller rounds our Sun.”',
    '“Warmth wakes dust around its path. A shining tail points from the Sun.”',
    'Lili added two lines about stars. “Far stars gather gas with gravity. Deep inside, joined nuclei release light.”',
    'The lines sounded less simple than their old poem. Still, each image carried a reason. The difficult terms would receive short glossary support.',
  ] },
  { title: 'The Open Door', paragraphs: [
    'On Friday, the club arranged its cards for visitors. The poem occupied the center panel. Research cards and source links stood beside it.',
    'Oki began with the comet question. Toto moved the corrected table model. Lili showed why its tail faced away from the lamp.',
    'One visitor asked whether every star lived equally long. The group had read that mass changes a star’s life. They had not studied enough details.',
    'Instead of guessing, Lili recorded the new question. She placed it under the “Next Investigation” sign. The unfinished answer did not weaken their work.',
    'Nana then read the final lines. “One answer opens another door. We map one light, then search for more.”',
    'The poem ended, but the board remained active. Visitors added questions on small cards. The club answered only those supported by its sources.',
    'At closing time, Oki saved every card. He kept the failed model note as well. It showed why checking could improve a beautiful idea.',
    'The old poem had offered two quick questions. Their new poem carried research, revision, and a satisfying end. Curiosity now had a careful path.',
  ] },
];

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const wordCount = words(sections.flatMap(section => section.paragraphs).join(' '));
const estimatedSeconds = Math.ceil(wordCount * 60 / 155);

export const SPACE_POEM_EN_DRAFT = {
  id: 'space-poem-en-v2-draft', replacesIdAfterApproval: 'space-poem-en',
  title: 'Space Poem', language: 'en', ageBand: '10-12',
  readingPathId: 'akici_okuma_10_12', contentTrack: 'science-poetic-story',
  primaryTheme: 'Creative language becomes stronger when scientific claims are checked',
  contentStatus: 'draft', releaseReady: false, wordCount, estimatedSeconds,
  declaredSeconds: estimatedSeconds, estimatedWordsPerMinute: 155, sections,
  languageScope: 'A2-oriented English with selected science terms supported by a glossary. Human English and age-fit review remains mandatory.',
  editorialScope: 'The summary becomes a complete science-poetic story. Genre and shelf placement require human approval.',
  glossary: [
    { word: 'comet', definition: 'An icy object that travels around the Sun.' },
    { word: 'orbit', definition: 'The curved path of one object around another.' },
    { word: 'nucleus', definition: 'The solid central part of a comet.' },
    { word: 'fusion', definition: 'A process where nuclei join and release energy.' },
    { word: 'gravity', definition: 'The force that pulls objects toward each other.' },
    { word: 'evidence', definition: 'Information that supports or challenges an idea.' },
  ],
  optionalReflectionPrompt: 'If you want, choose one poem line and identify its fact or comparison.',
  reflectionOptional: true, reflectionScored: false,
  sourceTruth: {
    sourceType: 'factual-original',
    scope: 'Original narrative and verse informed by NASA comet and star explainers; no source wording, outside poem, lyric, or translation was adapted.',
    sourceUrls: ['https://science.nasa.gov/solar-system/comets/', 'https://science.nasa.gov/universe/stars/'],
    checkedAt: '2026-09-07', adaptationStatus: 'not-applicable', verificationStatus: 'pending-human-review',
  },
  factualReview: {
    status: 'pending-human-review',
    notes: 'Comet composition, heating, tails away from the Sun, star composition, fusion, and mass-dependent lifetimes require human science review.',
  },
  originalityRightsReview: {
    status: 'pending-human-review',
    notes: 'Narrative and verse are original; source pages supplied facts only. Human rights review remains required.',
  },
  safeguardingLanguageReview: {
    status: 'pending-human-review',
    notes: 'No performance pressure or shaming. English level, dense science vocabulary, and accessibility tone need human review.',
  },
  contentQualityReview: createPendingContentQualityReview('akici_okuma_10_12'),
};
