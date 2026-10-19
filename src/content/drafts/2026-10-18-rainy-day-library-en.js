import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "Lili and the Rainy Day Library",
  scope: "Original Okurio easy English (CEFR A1) story about writing a first book in a library",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [],
});

export const RAINY_DAY_LIBRARY_EN_DRAFT = {
  id: "rainy-day-library-en-draft",
  title: "Lili and the Rainy Day Library",
  language: "en",
  cefrLevel: "A1",
  ageBand: "8-10",
  readingPathId: "okuma_guveni_8_10",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Everyone has a story, and a quiet rainy day is a good time to write it",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "A Grey Saturday",
      paragraphs: [
        "It is Saturday morning. Lili looks out of the window. The sky is grey, and it is raining.",
        "Lili wants to go to the park with Oki. She wants to ride her red bike. But the rain does not stop.",
        "\"What can we do today?\" Lili asks. Nana smiles and puts on her yellow coat. \"Let's go to the library,\" she says.",
        "Lili puts on her boots and her blue coat. Oki takes his big green umbrella. They walk to the library with Nana.",
        "The streets are wet. Oki jumps in a puddle, and water goes everywhere.",
        "\"Oki!\" Lili says. She laughs, and Nana laughs too. Soon they see the old library at the end of the street.",
        "The library has a big wooden door and tall windows. The windows are warm and yellow. It looks like a friendly house.",
      ],
    },
    {
      title: "The Quiet Room",
      paragraphs: [
        "Inside, the library is warm and dry. It smells of paper and wood. Many people are reading on soft chairs.",
        "A kind woman sits at the front desk. She has short white hair. She is the librarian.",
        "\"Good morning,\" the librarian says in a quiet voice. \"Welcome to the library.\" She has a special table for children today.",
        "She shows them a long table by the window. There is a sign on it with big letters. It says \"Make Your Own Book\" in red.",
        "On the table there are colour pencils and white paper. There is a stapler and some string too. Two children are drawing there.",
        "Lili looks at all the books on the shelves. There are books about cats, ships, and stars. There are books about the sea.",
        "\"Who writes all these books?\" Lili asks. \"People like you,\" the librarian says.",
      ],
    },
    {
      title: "A Story About Rain",
      paragraphs: [
        "Lili sits down at the long table. Oki sits next to her. Nana reads a newspaper on a sofa nearby.",
        "Lili takes a white page and a pencil. But her head feels empty. \"I don't have a story,\" she says.",
        "Oki looks out of the window. Rain is falling on the glass. Small drops run down like tiny cars.",
        "\"Look, Lili,\" Oki says. \"The drops are racing.\" One drop is big and slow. One drop is very fast.",
        "Then Lili has an idea. She smiles and starts to write. Her story is about a little raindrop called Pip.",
        "Pip lives in a big grey cloud. One day, Pip falls down to the town. He lands on a red umbrella.",
        "Lili writes slowly and carefully. Sometimes she stops and thinks. She rubs out a word and tries again.",
      ],
    },
    {
      title: "Pictures and Pages",
      paragraphs: [
        "Lili writes four pages. On each page, Pip goes to a new place. He visits a garden, a river, and a cat.",
        "Oki wants to help. \"Can I draw the pictures?\" he asks. \"Yes, please,\" Lili says happily.",
        "Oki draws Pip with big round eyes. He uses a light blue pencil. He draws the cat with orange stripes.",
        "Lili has a problem. She cannot spell the word \"umbrella\" well. She goes to the librarian for help.",
        "The librarian gives her a small dictionary. Together they find the word. Lili writes it again, letter by letter.",
        "Then the librarian shows them how to make a cover. They fold a thick green paper in two. Lili writes the title on it.",
        "The title is \"Pip the Little Raindrop\" in big letters. Under it, she writes \"By Lili and Oki\" in small letters. The librarian staples the pages together.",
      ],
    },
    {
      title: "A Book on the Shelf",
      paragraphs: [
        "Now the book is ready. Lili holds it in her hands. It is small, but it is her very own book.",
        "The librarian has a surprise. \"Can you read it to the other children?\" she asks.",
        "Lili feels a little shy.",
        "Oki holds her hand. \"I can show the pictures,\" he says. Lili takes a deep breath. Then she says yes.",
        "Five children sit on the carpet. Lili reads the story slowly. Oki holds up each picture. The children listen and smile.",
        "At the end, Pip goes back up to the cloud. The sun comes out, and there is a rainbow. Everyone claps.",
        "The librarian puts the book on a special shelf. The shelf says \"Books by Our Readers.\" Lili cannot stop smiling.",
        "When they go home, the rain stops. The sky is blue again. \"I love rainy days now,\" Lili says.",
        "That night, Lili tells Nana about her day. \"This morning I was sad,\" she says. \"Then I wrote a book!\"",
      ],
    },
  ],
  glossary: [
    { word: "library", definition: "A place with many books. You can read them or take them home." },
    { word: "librarian", definition: "A person who works in a library and helps readers." },
    { word: "puddle", definition: "A small pool of water on the ground after rain." },
    { word: "raindrop", definition: "One small drop of rain." },
    { word: "dictionary", definition: "A book that tells you how to spell words and what they mean." },
    { word: "cover", definition: "The outside part of a book, at the front and the back." },
  ],
  optionalReflectionPrompt:
    "If you write a book on a rainy day, what will your story be about?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("okuma_guveni_8_10"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = RAINY_DAY_LIBRARY_EN_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
RAINY_DAY_LIBRARY_EN_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
RAINY_DAY_LIBRARY_EN_DRAFT.estimatedSeconds = Math.ceil(
  RAINY_DAY_LIBRARY_EN_DRAFT.wordCount * 60 / 155,
);
RAINY_DAY_LIBRARY_EN_DRAFT.declaredSeconds =
  RAINY_DAY_LIBRARY_EN_DRAFT.estimatedSeconds;
