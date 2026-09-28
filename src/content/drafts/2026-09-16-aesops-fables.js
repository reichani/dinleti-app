import { createPendingContentQualityReview } from '../contentQualityReview.js';

export const AESOPS_FABLES_DRAFT = {
  id: 'aesop-fables-en-v2-draft',
  replacesIdAfterApproval: 'aesop-fables-en',
  title: "Aesop's Fables",
  language: 'en',
  ageBand: '6-7',
  readingPathId: 'ilk_harfler_6_7',
  contentTrack: 'public-domain-graded-short-adaptation',
  primaryTheme: 'A useful lesson grows when readers ask questions.',
  contentStatus: 'draft',
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  declaredSeconds: 181,
  sections: [
    {
      title: 'Three Story Cards',
      paragraphs: [
        'Nana placed three animal cards on the table. Oki and Lili read each title slowly. Every card held one short fable.',
        'Nana explained that fables often carry a lesson. The children would not simply repeat each lesson. They would ask what each story showed.',
        'The first card showed a hare running fast. A tortoise waited beside the starting line. Lili opened the card, and the race began.',
      ],
    },
    {
      title: 'The Careful Race',
      paragraphs: [
        'The hare laughed at the slow tortoise. The tortoise calmly asked him to race. A fox marked the finish line.',
        'The hare ran far ahead, then stopped. He felt sure that he would win. Soon he slept beneath a tree.',
        'The tortoise kept taking small, steady steps. He passed the sleeping hare without stopping. The finish line came closer each minute.',
        'The hare woke and ran very fast. Still, the tortoise crossed the line first. Oki wrote steady effort on the card.',
        'Lili added another thought about respect. Speed gave the hare no right to mock. Then Nana opened the second card.',
      ],
    },
    {
      title: 'The Small Helper',
      paragraphs: [
        'A mouse ran across a sleeping lion. The lion woke and caught the mouse. The frightened mouse asked to leave safely.',
        'The mouse promised to help one day. The lion doubted such a tiny helper. However, he chose to free the mouse.',
        'Later, hunters trapped the lion in a net. His strong paws could not break it. The mouse heard his call nearby.',
        'She bit the ropes again and again. At last, the net opened wide. The lion thanked his small friend.',
        'Oki wrote that size does not set value. Lili added that kindness can return unexpectedly. One card still remained closed.',
      ],
    },
    {
      title: 'The Empty Alarm',
      paragraphs: [
        'A shepherd boy watched sheep near his village. He felt bored and wanted some fun. He shouted that a wolf was coming.',
        'The villagers hurried uphill to help. They found no wolf at all. The boy laughed at their worried faces.',
        'He repeated the trick another day. Again, people left their work and ran. Their trust became smaller each time.',
        'A real wolf finally entered the field. The boy called loudly for help. The villagers thought it was another trick.',
        'Nana paused before the old ending. Asking for help must remain safe. The children discussed truth without shaming the boy.',
      ],
    },
    {
      title: 'Lessons With Questions',
      paragraphs: [
        'The three cards now formed one row. Steady effort mattered in the race. Kindness changed the lion’s trouble.',
        'Truth helped a warning keep its meaning. Yet every lesson needed care. A lesson should guide, not shame someone.',
        'Nana wrote the source beneath the cards. She marked them as short adaptations. They were not complete versions or exact copies.',
        'Oki added one question to the display. Which choice changed each ending? Lili left space for many answers.',
        'The cards closed at the day’s end. Their questions stayed open for tomorrow. New readers could add their own ideas.',
      ],
    },
  ],
  glossary: [
    { word: 'fable', definition: 'A short story that carries an idea.' },
    { word: 'steady', definition: 'Continuing at a calm, even pace.' },
    { word: 'doubted', definition: 'Felt unsure that something was true.' },
    { word: 'trust', definition: 'Belief that someone will speak or act honestly.' },
    { word: 'adaptation', definition: 'A story changed for a new form or reader.' },
  ],
  optionalReflectionPrompt: 'If you wish, which choice would you change in one fable?',
  reflectionOptional: true,
  reflectionScored: false,
  sourceTruth: {
    sourceType: 'public-domain-graded-short-adaptation',
    scope: "A short, graded-English adaptation of selected events from The Hare and the Tortoise, The Lion and the Mouse, and The Shepherd Boy and the Wolf. It is not a complete reproduction or exact translation. The reading-card frame is original.",
    sourceUrls: ['https://www.gutenberg.org/files/19994/19994-h/19994-h.htm'],
    checkedAt: '2026-09-16',
    verificationStatus: 'pending-human-review',
  },
  factualReview: {
    status: 'pending-human-review',
    notes: 'Event order, attribution limits and the revised help-seeking frame require human review.',
  },
  originalityRightsReview: {
    status: 'pending-human-review',
    notes: 'Public-domain source scope, adaptation originality and country-specific rights require human review.',
  },
  safeguardingLanguageReview: {
    status: 'pending-human-review',
    notes: 'Mocking, trapping, fear, lying and help-seeking language require age and accessibility review.',
  },
  contentQualityReview: createPendingContentQualityReview('ilk_harfler_6_7'),
};
