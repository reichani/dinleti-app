import { createPendingContentQualityReview } from '../contentQualityReview.js';

export const UGLY_DUCKLING_DRAFT = {
  id: 'ugly-duckling-en-v2-draft',
  replacesIdAfterApproval: 'ugly-duckling-en',
  title: 'The Ugly Duckling',
  language: 'en',
  ageBand: '7-8',
  readingPathId: 'ilk_cumleler_7_8',
  contentTrack: 'public-domain-graded-short-adaptation',
  primaryTheme: 'A harsh label cannot decide who someone becomes.',
  contentStatus: 'draft',
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  declaredSeconds: 157,
  sections: [
    {
      title: 'The Last Egg',
      paragraphs: [
        'A mother duck waited beside her nest. One large egg opened after all the others. A tall grey duckling stepped into the sun.',
        'The family crossed the yard together. The grey duckling could swim very well. Still, some birds stared at his different shape.',
        'They called him ugly and pushed him away. Their words hurt, but they were only labels. They did not tell his whole story.',
      ],
    },
    {
      title: 'Beyond the Yard',
      paragraphs: [
        'The duckling left the noisy yard alone. He rested near wild ducks in a marsh. Sudden loud sounds made every bird scatter.',
        'He kept away from hunters and dogs. At dusk, he found a small cottage. An old woman lived there with a cat and a hen.',
        'The cat could purr, and the hen laid eggs. They asked what the duckling could do. He answered that he loved open water.',
        'They did not understand that wish. The duckling thanked them for shelter. Then he continued toward the quiet lake.',
      ],
    },
    {
      title: 'White Birds Above',
      paragraphs: [
        'Autumn cooled the reeds around the lake. One evening, shining white birds flew overhead. Their long necks moved with calm grace.',
        'The duckling had never seen such birds. Their call stirred a deep feeling inside him. He watched until they vanished southward.',
        'Cold weather soon covered the water with ice. The duckling kept a small circle open. A farmer found him and carried him indoors.',
        'Warmth helped him recover, yet the busy house frightened him. When spring arrived, he returned safely to the wide fields.',
      ],
    },
    {
      title: 'The Lake in Spring',
      paragraphs: [
        'Fresh leaves appeared beside the lake. The duckling spread his wings and rose. They carried him farther than ever before.',
        'He landed near three white birds. He feared another cruel greeting. Even so, he chose to approach them slowly.',
        'The birds welcomed him without laughter. The duckling lowered his head toward the water. A clear reflection looked back.',
        'He now had white feathers and a long neck. He was a young swan. His strong wings had grown through the difficult winter.',
      ],
    },
    {
      title: 'More Than a Label',
      paragraphs: [
        'Children beside the lake noticed the new swan. They admired him, but praise felt strange after so much rejection.',
        'The swan remembered the lonely yard and marsh. He also remembered every safe place. Those experiences had shaped his careful courage.',
        'He joined the other swans on the water. He did not need to become worthy. He had always deserved safety and respect.',
        'The old label no longer followed him. It had never described his value. Across the bright lake, the swans moved together.',
      ],
    },
  ],
  glossary: [
    { word: 'label', definition: 'A name placed on someone or something.' },
    { word: 'marsh', definition: 'Soft, wet land with grasses and water.' },
    { word: 'shelter', definition: 'A safe place away from danger or weather.' },
    { word: 'reflection', definition: 'An image seen in water or a mirror.' },
    { word: 'rejection', definition: 'The experience of being refused or left out.' },
  ],
  optionalReflectionPrompt: 'If you wish, which kind action could change one scene?',
  reflectionOptional: true,
  reflectionScored: false,
  sourceTruth: {
    sourceType: 'public-domain-graded-short-adaptation',
    scope: "A graded-English short adaptation of selected events from Hans Christian Andersen's The Ugly Duckling. It is not the complete story or an exact translation. The dignity and safety framing is an Okurio editorial adaptation.",
    sourceUrls: [
      'https://andersen.sdu.dk/vaerk/hersholt/TheUglyDuckling_e.html',
      'https://www.gutenberg.org/ebooks/search/?query=Hans+Andersen%27s+Fairy+Tales',
    ],
    checkedAt: '2026-09-18',
    verificationStatus: 'pending-human-review',
  },
  factualReview: {
    status: 'pending-human-review',
    notes: 'Selected-event order and adaptation fidelity require human literary review.',
  },
  originalityRightsReview: {
    status: 'pending-human-review',
    notes: 'Public-domain source scope, translation boundaries and country-specific rights require human review.',
  },
  safeguardingLanguageReview: {
    status: 'pending-human-review',
    notes: 'Bullying, hunters, winter danger, identity and appearance language require age and accessibility review.',
  },
  contentQualityReview: createPendingContentQualityReview('ilk_cumleler_7_8'),
};
