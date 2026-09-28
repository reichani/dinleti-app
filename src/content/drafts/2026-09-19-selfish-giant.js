import { createPendingContentQualityReview } from '../contentQualityReview.js';

export const SELFISH_GIANT_DRAFT = {
  id: 'selfish-giant-graded-en-v2-draft',
  replacesIdAfterApproval: 'selfish-giant-graded-en',
  title: 'The Selfish Giant',
  language: 'en',
  ageBand: '10-12',
  readingPathId: 'akici_okuma_10_12',
  contentTrack: 'public-domain-graded-short-adaptation',
  primaryTheme: 'A shared place can protect boundaries while creating belonging.',
  contentStatus: 'draft',
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  declaredSeconds: 280,
  sections: [
    {
      title: 'After-School Garden',
      paragraphs: [
        'Every afternoon, children crossed a beautiful garden after school. Soft grass covered the ground, and peach trees shaded them. Birds sang above twelve bright blossoms.',
        'The garden belonged to a Giant who lived far away. Nobody had seen him for seven years. The children treated his quiet garden carefully.',
        'They raced along the paths without breaking any branches. They shared fallen fruit and listened to birds. The open place felt welcoming to everyone.',
        'Older children showed younger ones where roots crossed the path. Nobody owned their games or favorite corners. Space remained for quiet reading too.',
      ],
    },
    {
      title: 'A Wall and a Sign',
      paragraphs: [
        'One afternoon, the Giant returned from a long visit. He saw the children beneath his trees. Their voices surprised him after years of silence.',
        'He wanted privacy and complete control of his land. He sent the children away at once. Then he built a high wall.',
        'A warning sign said nobody could enter without permission. The children understood that gardens need care and boundaries. Yet this boundary offered no welcome or conversation.',
        'They tried playing beside the dusty road instead. Cars passed, and sharp stones hurt their feet. They missed the safe grass and singing birds.',
        'Their new games ended quickly whenever traffic approached. Even the Giant heard those distant interruptions. However, he still defended his silent wall.',
      ],
    },
    {
      title: 'Winter That Stayed',
      paragraphs: [
        'Spring arrived across the country, but not inside the wall. Snow covered the grass, and frost painted every tree. A cold wind rattled the windows.',
        'The Giant waited for warm rain and fresh leaves. Hail struck the roof instead. Each grey morning looked exactly like the last.',
        'He wondered why spring avoided his garden. He had protected every tree from strangers. Still, a garden without visitors felt strangely lifeless.',
        'Outside, the children remembered each path and branch. They did not damage the wall or climb dangerously. They simply hoped for a kind invitation.',
        'Weeks passed, but the weather never softened inside. The Giant began studying both sides of his wall. One side looked bright and alive.',
      ],
    },
    {
      title: 'Spring in Small Places',
      paragraphs: [
        'One morning, music woke the Giant. A small bird was singing near his window. He had almost forgotten that gentle sound.',
        'The children had found a safe gap beneath the wall. They entered quietly and sat in the trees. Around each child, branches opened into blossom.',
        'One corner remained frozen beside a little boy. He could not reach the lowest branch. The tree bent down, but he was still too small.',
        'The Giant watched the boy try again and fail. At last, he understood the lasting winter. Exclusion had frozen more than the garden.',
        'He also noticed careful footprints between the flower beds. The children had protected every plant. His fear of careless visitors began changing.',
      ],
    },
    {
      title: 'The Gate Opens',
      paragraphs: [
        'The Giant walked outside slowly, so nobody felt chased. The other children ran away, and winter returned. The smallest boy stayed because tears blurred his sight.',
        'The Giant lifted him gently onto the branch. Blossoms opened, and birds gathered overhead. The boy thanked him with a warm hug.',
        'The Giant then opened the main gate. He removed the harsh warning sign. In its place, he posted simple rules for shared care.',
        'Visitors would protect plants, use safe paths, and leave before dark. The garden still had boundaries. Now those boundaries supported safety instead of loneliness.',
        'He added a bench beside the gate for anyone needing rest. Children could report broken branches there. Shared care now had clear, practical steps.',
      ],
    },
    {
      title: 'Seasons Shared',
      paragraphs: [
        'The children returned after school and followed the new rules. Some gathered fallen twigs, while others watered young plants. The Giant repaired paths and welcomed questions.',
        'Summer brought fruit, and autumn colored the leaves. Winter also returned in its proper season. Nobody feared it would stay forever.',
        'Years passed, and the Giant grew old. He watched new children learn the garden rules. Each group added care without claiming the place alone.',
        'He once believed ownership meant keeping everyone outside. Now he understood a deeper responsibility. A place becomes richer when welcome and care grow together.',
        'The open gate did not erase every limit. It showed why fair limits mattered. Beyond it, laughter, birdsong, and changing seasons filled the garden.',
        'The Giant kept a private room inside his home. The garden followed different rules because it served many people. Welcome never required giving up every boundary.',
      ],
    },
  ],
  glossary: [
    { word: 'boundary', definition: 'A limit that marks where something begins or ends.' },
    { word: 'privacy', definition: 'Time or space away from other people.' },
    { word: 'permission', definition: 'An agreement that allows someone to do something.' },
    { word: 'exclusion', definition: 'The act of keeping someone outside a group or place.' },
    { word: 'responsibility', definition: 'A duty to care for a person, place, or task.' },
    { word: 'belonging', definition: 'The feeling of being accepted and included.' },
  ],
  optionalReflectionPrompt: 'If you wish, what rule could make a shared place both safe and welcoming?',
  reflectionOptional: true,
  reflectionScored: false,
  sourceTruth: {
    sourceType: 'public-domain-graded-short-adaptation',
    scope: "A graded-English short adaptation of selected events from Oscar Wilde's The Selfish Giant. It is not the complete story or an exact translation. The final religious allegory is outside this draft's scope, and the shared-boundaries framing is an Okurio editorial adaptation.",
    sourceUrls: [
      'https://www.gutenberg.org/files/902/902-h/902-h.htm',
      'https://en.wikisource.org/wiki/The_Happy_Prince_and_Other_Tales/The_Selfish_Giant',
    ],
    checkedAt: '2026-09-19',
    verificationStatus: 'pending-human-review',
  },
  factualReview: {
    status: 'pending-human-review',
    notes: 'Selected-event order, omitted ending and adaptation fidelity require human literary review.',
  },
  originalityRightsReview: {
    status: 'pending-human-review',
    notes: 'Public-domain source scope, graded-retelling boundaries and country-specific rights require human review.',
  },
  safeguardingLanguageReview: {
    status: 'pending-human-review',
    notes: 'Exclusion, property, child safety, physical assistance and moral framing require age and accessibility review.',
  },
  contentQualityReview: createPendingContentQualityReview('akici_okuma_10_12'),
};
