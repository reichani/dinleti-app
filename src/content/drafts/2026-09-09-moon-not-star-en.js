import { createPendingContentQualityReview } from '../contentQualityReview.js';

const sections = [
  { title: 'The Silver Star Card', paragraphs: [
    'The library prepared a night-sky exhibition for Friday. Oki found one unfinished label beneath a Moon photograph. It read, “Our nearest silver star.”',
    'The phrase sounded beautiful, but Lili paused. She remembered that stars and moons belonged to different groups. Toto wanted to keep the label because visitors would notice it.',
    'Nana asked the team to separate beauty from classification. A poetic phrase could create an image. A science label needed evidence that another reader could check.',
    'The group placed a question card beside the photograph. “What kind of object is the Moon?” it asked. Their search now had one clear purpose.',
  ] },
  { title: 'What Makes a Star', paragraphs: [
    'Oki opened NASA’s introduction to stars. Stars are enormous objects made mostly from hydrogen and helium. Their hot centers release energy through nuclear fusion.',
    'Lili added “fusion” to their glossary. The process joins light atomic nuclei and releases energy. She kept the explanation short without calling a star ordinary fire.',
    'Toto drew a glowing circle for the label. Then he wrote that every bright object was a star. Oki tested that rule against their own Moon photograph.',
    'The Moon appeared bright but produced no energy like a star. Brightness alone could not decide an object’s scientific group. Their first rule had failed.',
    'They replaced it with a stronger question. Did this object make its own light? That question guided the next part of their investigation.',
  ] },
  { title: 'What the Moon Is', paragraphs: [
    'The team checked NASA’s Moon facts page. Earth’s Moon is a natural satellite. It travels around Earth and has a solid, rocky surface.',
    'Its surface carries many craters from past impacts. It also has a very thin atmosphere called an exosphere. Those facts described a world, not a shining star.',
    'Nana dimmed the table lamp and held a grey ball nearby. The lamp represented the Sun. Light reached one side of the ball and reflected toward Oki.',
    'When Toto blocked the lamp, the ball looked dark. The ball had not stopped being a moon model. Its visible brightness depended on incoming light and position.',
    'They wrote a second rule in plain English. The Moon reflects sunlight. It does not create light through fusion inside a hot stellar center.',
  ] },
  { title: 'A Model With Limits', paragraphs: [
    'Their model explained one important difference, but Lili noticed problems. The lamp and ball were much too close. Their sizes were also completely wrong.',
    'The model showed reflected light, not the real scale of space. It could not display the Moon’s craters clearly. It also could not reproduce a star’s interior.',
    'Toto had planned to present the model as proof of everything. He crossed out that claim without embarrassment. One useful model could answer only selected questions.',
    'They attached a yellow limits card beside the table. It named distance, size, surface detail, and stellar fusion. Visitors could now see where the comparison ended.',
    'The mistake became their turning point. A careful explanation needed facts, a model, and visible limits. Attractive objects alone could not carry the conclusion.',
  ] },
  { title: 'Two Labels, Two Purposes', paragraphs: [
    'The team returned to the original silver-star phrase. Oki still liked its quiet rhythm. Nana suggested keeping it on a blue creative card.',
    'The white science label used exact categories. “The Moon is Earth’s natural satellite,” it said. “Its rocky surface reflects sunlight toward our viewpoint.”',
    'A second white label described stars. They are huge objects that produce energy in their centers. Many look like tiny points because they are extremely distant.',
    'The blue card carried a short image instead. A silver visitor crossed their night. It borrowed sunlight for its path.',
    'Lili marked those words clearly as creative language. The card described a feeling, not a new scientific category.',
    'Nobody needed to choose between wonder and accuracy. Each label simply had a different job. Their colors helped readers recognize those jobs immediately.',
  ] },
  { title: 'The Question Wall', paragraphs: [
    'On Friday, visitors stopped beside the corrected photograph. Toto first showed the misleading label. He explained why brightness had fooled their original rule.',
    'Lili demonstrated the lamp model and its limits. Oki compared the science labels with the creative card. The audience could trace every conclusion to a source.',
    'One visitor asked whether other planets had moons. Another asked why Moon phases change. The team had not researched both questions deeply enough.',
    'Instead of guessing, they opened a question wall. Each new question received a date and an empty source line. Future answers would require another careful search.',
    'Before closing, Nana read the final science label aloud. The Moon was not a star, although both could brighten our sky. Their light reached us in different ways.',
    'Oki then read the creative card. Its borrowed-light image now rested beside accurate facts. The exhibition felt complete because wonder and evidence supported each other.',
    'Toto saved the crossed-out rule in their project folder. It showed how a confident claim could improve. Revision had become part of the discovery, not a punishment.',
  ] },
];

const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
const wordCount = words(sections.flatMap(section => section.paragraphs).join(' '));
const estimatedSeconds = Math.ceil(wordCount * 60 / 155);

export const MOON_NOT_STAR_EN_DRAFT = {
  id: 'moon-not-star-en-v2-draft', replacesIdAfterApproval: 'moon-not-star-en',
  title: 'The Moon Is Not a Star', language: 'en', ageBand: '10-12',
  readingPathId: 'akici_okuma_10_12', contentTrack: 'science-story',
  primaryTheme: 'Reliable classification requires evidence and clear language',
  contentStatus: 'draft', releaseReady: false, wordCount, estimatedSeconds,
  declaredSeconds: estimatedSeconds, estimatedWordsPerMinute: 155, sections,
  languageScope: 'A2-oriented English with selected astronomy terms supported by a glossary. Human English and age-fit review remains mandatory.',
  editorialScope: 'The short explanation becomes a complete science story while preserving its original question. Shelf placement requires human approval.',
  glossary: [
    { word: 'classification', definition: 'Placing something in a group using shared features.' },
    { word: 'satellite', definition: 'An object that travels around a larger object.' },
    { word: 'fusion', definition: 'A process where light nuclei join and release energy.' },
    { word: 'reflect', definition: 'To send light back from a surface.' },
    { word: 'crater', definition: 'A bowl-shaped hollow made by an impact.' },
    { word: 'evidence', definition: 'Information that supports or challenges an idea.' },
  ],
  optionalReflectionPrompt: 'If you want, identify one fact and one creative image in the exhibition.',
  reflectionOptional: true, reflectionScored: false,
  sourceTruth: {
    sourceType: 'factual-original',
    scope: 'Original story informed by NASA Moon facts and star basics; no source wording, outside story, poem, lyric, or translation was adapted.',
    sourceUrls: ['https://science.nasa.gov/moon/facts/', 'https://science.nasa.gov/universe/stars/'],
    checkedAt: '2026-09-09', adaptationStatus: 'not-applicable', verificationStatus: 'pending-human-review',
  },
  factualReview: {
    status: 'pending-human-review',
    notes: 'Natural-satellite classification, rocky surface, exosphere, reflected light, stellar composition, and fusion require human science review.',
  },
  originalityRightsReview: {
    status: 'pending-human-review',
    notes: 'Narrative and creative lines are original; NASA pages supplied facts only. Human rights review remains required.',
  },
  safeguardingLanguageReview: {
    status: 'pending-human-review',
    notes: 'A mistaken claim is revised without shame or performance pressure. English level and accessibility tone need human review.',
  },
  contentQualityReview: createPendingContentQualityReview('akici_okuma_10_12'),
};
