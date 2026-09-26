import { createPendingContentQualityReview } from '../contentQualityReview.js';

export const HAPPY_PRINCE_DRAFT = {
  id: 'happy-prince-swallow-en-v2-draft',
  replacesIdAfterApproval: 'happy-prince-swallow-en',
  title: 'The Happy Prince and the Swallow',
  language: 'en',
  ageBand: '12-14',
  readingPathId: 'genc_okurlar_12_14',
  contentTrack: 'public-domain-graded-short-adaptation',
  primaryTheme: 'Empathy becomes meaningful through informed, sustained action.',
  contentStatus: 'draft',
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  declaredSeconds: 356,
  sections: [
    {
      title: 'Above the City',
      paragraphs: [
        'A golden statue stood high above the city. People called him the Happy Prince. Blue stones formed his eyes, and a red jewel decorated his sword.',
        'When alive, the Prince had lived behind palace walls. Music and comfort filled his days. He never saw hardship beyond the gates.',
        'From his tall column, however, he saw every street. He noticed tired workers, hungry families, and cold rooms. His metal heart felt heavy with sorrow.',
        'City leaders admired his bright surface from below. They praised beauty but rarely followed his gaze. The Prince could watch suffering, yet he could not move.',
        'His new knowledge challenged his old happiness. Comfort had protected him from difficult truths. Height now brought awareness without freedom to act.',
      ],
    },
    {
      title: 'A Traveller Rests',
      paragraphs: [
        'One evening, a Swallow landed between the statue’s feet. His flock had already flown toward warmer lands. He planned to follow them the next morning.',
        'A drop fell onto his feathers under the clear sky. Then another drop appeared. Looking upward, he discovered tears on the Prince’s golden face.',
        'The Prince described a seamstress working in a distant room. Her child was ill and thirsty. She lacked money for food and medicine.',
        'He asked the Swallow to carry his red jewel there. The bird worried about cold weather and his waiting friends. Still, he agreed to stay one night.',
        'The request was not an order between equals. The Prince depended on the mobile bird. The Swallow therefore considered both urgency and personal risk.',
      ],
    },
    {
      title: 'The First Delivery',
      paragraphs: [
        'The Swallow lifted the jewel carefully from the sword. He flew above bright houses and busy theatres. Warm rooms stood close to dark, narrow streets.',
        'At last, he reached the seamstress’s window. She had fallen asleep beside her unfinished work. The tired child moved restlessly in bed.',
        'The Swallow placed the jewel near her sewing tools. He cooled the child with gentle movements of his wings. Soon the room became quiet.',
        'When he returned, the Swallow felt unexpectedly warm. The Prince explained that helpful action can change the giver too. Neither claimed one gift solved poverty.',
        'They also lacked the family’s later news. Their choice responded to visible need, not guaranteed success. Care sometimes begins before outcomes are certain.',
      ],
    },
    {
      title: 'One More Night',
      paragraphs: [
        'The next evening, the Swallow prepared to leave again. The Prince pointed toward a cold attic. A young writer there could not finish his work.',
        'The Prince asked the bird to take one blue eye. The Swallow hesitated because removing it would limit the statue’s sight. Their choice carried a real cost.',
        'After listening carefully, the bird accepted the request. He delivered the blue stone through a gap in the roof. The writer could now buy food and fuel.',
        'The Swallow returned with mixed feelings. He valued the help, yet worried about the Prince. Compassion did not remove the difficulty of every decision.',
        'He asked whether another messenger could continue the work. None was nearby, and night was ending. The unfinished question followed him back.',
      ],
    },
    {
      title: 'Choosing to Stay',
      paragraphs: [
        'Another person needed help before the Swallow departed. A child selling matches had lost her goods in wet streets. She feared returning home without money.',
        'The Prince offered his remaining blue eye. The Swallow refused at first. Without it, the statue would become completely blind.',
        'The Prince repeated his request after hearing the concern. The Swallow carried the stone to the child. She hurried toward shelter with new hope.',
        'Now the Prince could no longer observe the streets. The Swallow chose to stay as his guide. Travel remained possible, but friendship changed his priority.',
        'He described rivers, deserts, birds, and distant buildings. Then the Prince asked about their own city. Wonder elsewhere should not hide hardship nearby.',
        'Their partnership changed as the statue lost sight. The Swallow became observer and messenger together. He now chose which details deserved careful attention.',
      ],
    },
    {
      title: 'Gold Leaf by Leaf',
      paragraphs: [
        'The Swallow flew across the city each day. He saw children seeking food and families sheltering from rain. He reported what he witnessed without exaggeration.',
        'The Prince asked him to remove the gold covering his body. Leaf by leaf, the bird carried it to people needing support. The shining statue slowly turned grey.',
        'Small gifts brought immediate relief, but the Swallow noticed wider problems. Safe housing, fair work, and dependable food required community decisions. Charity alone could not repair everything.',
        'The story offered no simple plan for those systems. It showed how attention can begin responsibility. Seeing clearly was only the first step.',
        'Neighbors also noticed the delivered gold, though they never met its donors. Relief moved quietly through several streets. Its hidden path contrasted with public praise.',
      ],
    },
    {
      title: 'What the City Valued',
      paragraphs: [
        'Winter deepened, and the Swallow grew weak. He had remained by choice, understanding the danger. After saying goodbye, he died beside the statue he loved.',
        'A crack sounded inside the Prince as his lead heart broke. The next morning, officials noticed his faded surface. They judged him useless because he was no longer beautiful.',
        'Workers removed the statue and tried melting its metal. The heart would not melt, so they placed it beside the bird. The city overlooked both sacrifices.',
        'In Wilde’s ending, an angel chooses the heart and bird as precious. This ending uses Christian imagery and an afterlife. Readers may interpret its symbols differently.',
        'The tale leaves a difficult question for the living city. Private kindness matters, but lasting justice needs shared action. Empathy should influence choices, rules, and institutions.',
        'Remembering the pair can inspire help without copying their suffering. Readers can seek safe, collective responses. No person must solve every injustice alone.',
      ],
    },
  ],
  glossary: [
    { word: 'seamstress', definition: 'A person whose work is sewing clothes.' },
    { word: 'hardship', definition: 'A condition that causes serious difficulty.' },
    { word: 'compassion', definition: 'Concern for suffering with a wish to help.' },
    { word: 'priority', definition: 'Something treated as more important than other choices.' },
    { word: 'charity', definition: 'Help given to people who need support.' },
    { word: 'institution', definition: 'An organized system or public body.' },
    { word: 'allegory', definition: 'A story whose events also represent larger ideas.' },
  ],
  optionalReflectionPrompt: 'If you wish, where does personal kindness end and shared responsibility begin?',
  reflectionOptional: true,
  reflectionScored: false,
  sourceTruth: {
    sourceType: 'public-domain-graded-short-adaptation',
    scope: "A graded-English short adaptation of selected events from Oscar Wilde's The Happy Prince. It is not the complete story or an exact translation. The systems framing and explicit explanation of the Christian allegory are Okurio editorial additions.",
    sourceUrls: [
      'https://www.gutenberg.org/files/902/902-h/902-h.htm',
      'https://en.wikisource.org/wiki/The_Happy_Prince_and_Other_Tales/The_Happy_Prince',
    ],
    checkedAt: '2026-09-20',
    verificationStatus: 'pending-human-review',
  },
  factualReview: {
    status: 'pending-human-review',
    notes: 'Event order, social-context framing and religious-allegory description require human literary review.',
  },
  originalityRightsReview: {
    status: 'pending-human-review',
    notes: 'Public-domain source scope, graded-retelling boundaries and country-specific rights require human review.',
  },
  safeguardingLanguageReview: {
    status: 'pending-human-review',
    notes: 'Illness, hunger, poverty, feared family violence and death require age, cultural and accessibility review.',
  },
  contentQualityReview: createPendingContentQualityReview('genc_okurlar_12_14'),
};
