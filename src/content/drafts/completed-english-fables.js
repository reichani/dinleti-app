import { createPendingContentQualityReview } from '../contentQualityReview.js';

export const countBodyWords = text => (text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length;

function draft(id, title, theme, sections, glossary, reflection, adaptationNotes) {
  const wordCount = countBodyWords(sections.flatMap(s => s.paragraphs).join(' '));
  const estimatedSeconds = Math.ceil(wordCount * 60 / 155);
  return {
    id: `${id}-completed-draft`, replacesIdAfterApproval: id, title,
    ageBand: '8-10', readingPathId: 'okuma_guveni_8_10', language: 'en',
    contentTrack: 'english-fable', primaryTheme: theme, contentStatus: 'draft',
    releaseReady: false, estimatedWordsPerMinute: 155, wordCount,
    estimatedSeconds, declaredSeconds: estimatedSeconds, sections, glossary,
    optionalReflectionPrompt: reflection,
    sourceTruth: {
      sourceType: 'public-domain-adaptation', work: title,
      sourceUrl: 'https://www.gutenberg.org/cache/epub/28/pg28-images.html',
      scope: 'Complete Okurio expanded retelling of one fable; not a verbatim source edition.',
      adaptationStatus: 'expanded-retelling', adaptationNotes,
      verificationStatus: 'pending-human-review',
    },
    factualReview: { status: 'pending-human-review', notes: 'Talking animals are fictional. Check fidelity to the named fable and explicit adaptation changes.' },
    originalityRightsReview: { status: 'pending-human-review', notes: 'New AI-assisted English wording based on an old Aesop narrative. Source edition and territorial rights require human review; no modern translation copied.' },
    safeguardingLanguageReview: { status: 'pending-human-review', notes: 'Review threat intensity, unscored reflection and age-appropriate English vocabulary. No clinical or performance claims.' },
    contentQualityReview: createPendingContentQualityReview('okuma_guveni_8_10'),
  };
}

export const COMPLETED_ENGLISH_FABLES = [
  draft('fox-and-grapes-en', 'The Fox and the Grapes', 'Separating disappointment from what we actually know', [
    { title: 'A Purple Bunch', paragraphs: [
      'Fox followed a narrow path beside an old garden. The afternoon was warm, and his paws felt dusty. He hoped to find something before walking home.',
      'Near the gate, a green vine covered a wooden frame. Purple grapes hung beneath its wide, curling leaves. Fox stopped and lifted his nose towards them.',
      'One bunch looked especially large from the path below. A small drop of water shone on its skin. Fox imagined the sweet juice before tasting a single grape.',
      'He stepped through the open gate and studied the frame. The lowest bunch hung just beyond his reach. Fox thought one quick jump would solve the problem.',
    ] },
    { title: 'A Different Place', paragraphs: [
      'Fox bent his legs and jumped towards the grapes. His nose brushed a leaf, but nothing fell. He landed on the path and looked up again.',
      'Perhaps he had chosen the wrong place to stand. He moved around the frame and tried the other side. Here the ground rose slightly beside a thick root.',
      'Fox placed his paws carefully on the higher ground. He jumped again, stretching towards the purple bunch. This time he touched only the edge of another leaf.',
      'The grapes swung gently, still fixed to their thin stem. Fox watched until the bunch stopped moving above him. The extra height had helped, but not enough.',
    ] },
    { title: 'The Last Attempt', paragraphs: [
      'A sparrow landed on the garden gate nearby. She watched Fox step backwards along the dusty path. He was looking for room to take a running jump.',
      'Fox checked the ground for loose stones and branches. Then he ran forward and pushed upwards with both legs. For a moment, the grapes seemed very close indeed.',
      'But his paws came down without a single grape. Fox sat beside the frame, breathing more quickly now. His legs needed rest after the repeated jumps.',
      'He noticed a broken crate behind the garden gate. One side leaned sharply, and a board was missing. Fox left it alone instead of climbing onto it.',
      'The sparrow asked whether he wanted another attempt. Fox looked at the bunch and shook his head. He had tried several ways and was ready to leave.',
    ] },
    { title: 'An Untasted Answer', paragraphs: [
      'Fox turned away, brushing dust from his front paws. Those grapes must be sour, he told the sparrow. He said he had never wanted them very much.',
      'The sparrow tilted her head towards the purple bunch. She asked whether he had tasted even one grape. Fox opened his mouth, then looked at his empty paws.',
      'He remembered imagining sweet juice when he first arrived. Nothing about the grapes had changed during his attempts. Only his own feelings about reaching them had changed.',
      'Fox did not have an answer about their taste. He knew they were high and difficult to reach. He also knew that leaving without them felt disappointing.',
    ] },
    { title: 'Leaving the Garden', paragraphs: [
      'Fox looked back at the vine one last time. He told the sparrow that he had not tasted them. He could leave without deciding what their flavour was.',
      'The sparrow stayed on the gate as Fox walked out. Nobody asked him to jump again or prove anything. The grapes remained above the path, untouched and untested.',
      'At the corner, Fox paused beside a patch of shade. He rested his tired paws before continuing towards home. He still wanted the grapes, but his story had changed.',
      'He had not discovered a garden full of sour fruit. He had found a bunch he could not reach. That was enough to tell about this afternoon.',
    ] },
  ], [
    { word: 'vine', definition: 'A plant with long stems that climb or spread.' },
    { word: 'bunch', definition: 'A group of things growing or held together.' },
    { word: 'stem', definition: 'The narrow part that supports a leaf or fruit.' },
    { word: 'sour', definition: 'Having a sharp taste, like a lemon.' },
    { word: 'attempt', definition: 'One try at doing something.' },
  ], 'If you wish, consider: what did Fox know about the grapes?',
  'Preserves unreachable grapes and the unsupported sour-grapes claim. Adds a sparrow, distinct attempts and a reflective ending; these are Okurio additions, not claims about the source text.'),

  draft('lion-and-mouse-graded-en', 'The Lion and the Mouse', 'Noticing a useful ability in an unexpected helper', [
    { title: 'Under the Tree', paragraphs: [
      'Mouse carried a dry seed along the woodland path. She was looking for a quiet place to eat. Ahead, a fallen branch blocked her usual narrow route.',
      'She went around it through the long grass. Beyond the grass, Lion was sleeping beneath a tree. Mouse noticed his broad paw too late to stop.',
      'Her small feet brushed the fur beside his nose. Lion woke suddenly and put his paw across her path. Mouse stood still, holding the seed against her chest.',
      'She explained that she had not meant to wake him. The fallen branch had sent her the wrong way. Lion lowered his head so he could hear her clearly.',
    ] },
    { title: 'A Small Promise', paragraphs: [
      'Mouse asked Lion to move his paw aside. She wanted to return to the path beyond the grass. Lion watched her small face and slowly lifted his paw.',
      'Mouse stepped back into the shade of the tree. She thanked him and offered to help him someday. Lion looked at her tiny feet with a puzzled expression.',
      'He could move fallen branches with one strong shoulder. His long legs carried him across the woodland quickly. He wondered what help such a small neighbour could offer.',
      'But he did not ask Mouse to make a promise. He moved farther from the path and settled down. Mouse collected her seed and continued through the grass.',
      'Before leaving, she remembered the tree beside his resting place. Its trunk divided into two wide branches above him. That unusual shape would be easy to recognise again.',
    ] },
    { title: 'The Tightening Net', paragraphs: [
      'Several mornings later, Mouse heard a deep, broken roar. She stopped beside a fern and listened for another sound. The next roar came from near the divided tree.',
      'Mouse hurried along the path towards the familiar trunk. Lion lay beneath a net stretched between the surrounding roots. Thick ropes crossed his back and held his legs close.',
      'The net was a trap someone had left there. Lion had walked into it while crossing the clearing. Each hard pull had drawn the ropes more tightly together.',
      'Mouse stayed outside the net while Lion struggled. She asked him to stop pulling for a moment. When he rested, the ropes stopped moving across the ground.',
      'Now she could see where the strands joined. One lower rope held several other strands in place. Mouse followed it with her eyes towards a large knot.',
    ] },
    { title: 'One Strand at a Time', paragraphs: [
      'Mouse could not lift the net with her paws. She could, however, reach a strand beside the knot. She began biting through its rough outer fibres.',
      'Lion watched quietly instead of pulling against the ropes. Mouse worked on one small place until it loosened. Then she paused and checked the opening she had made.',
      'The first strand broke, but the net still held. Mouse moved to the next strand beside the same knot. Her teeth could do something Lion could not manage there.',
      'After another strand broke, a small opening appeared below. Lion shifted his paw slowly towards the new gap. Mouse stepped clear before he moved any farther.',
      'The knot loosened, and the opening became much wider. Lion drew one leg free, then lowered his head. At last, he slipped out without another hard pull.',
    ] },
    { title: 'Back on the Path', paragraphs: [
      'Lion stood beside the tree and stretched his legs. Mouse waited on a root beyond the loose net. He thanked her for noticing where the ropes could open.',
      'He remembered wondering how a small mouse could help. Her size had let her reach the narrow knot. Her patient work had made the opening he needed.',
      'Mouse said she had been glad to find him. Lion had let her go without asking for anything. Today she had seen a way to help him.',
      'They left the clearing by the same woodland path. Lion took long steps while Mouse followed the grassy edge. At the divided tree, each waited for the other.',
    ] },
  ], [
    { word: 'route', definition: 'The way taken from one place to another.' },
    { word: 'strand', definition: 'One thin length of material in a rope.' },
    { word: 'knot', definition: 'A place where rope is tied together.' },
    { word: 'clearing', definition: 'An open space among trees.' },
    { word: 'loosen', definition: 'To make something less tight.' },
  ], 'If you wish, consider: how did Lion and Mouse work together?',
  'Preserves the released mouse and later rescue by gnawing a net. Adds the seed, route, landmark and cooperative rescue details. Removes the threat of eating Mouse; this is a non-graphic adaptation, not natural-history guidance.'),
];
