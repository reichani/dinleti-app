import { createPendingContentQualityReview } from "../contentQualityReview.js";

const sourceTruth = Object.freeze({
  work: "The Lighthouse Logbook",
  scope: "Original Okurio story for young readers (CEFR A2-B1); daily records, archives and patient reading",
  sourceType: "original",
  rightsHolder: "Okurio",
  adaptationStatus: "not-applicable",
  verificationStatus: "pending-human-review",
  references: [
    {
      label: "U.S. National Archives · General Considerations for Rehousing and Preservation",
      url: "https://www.archives.gov/preservation/holdings-maintenance/considerations",
      scope: "Handling old paper records with clean, dry hands and careful storage",
    },
  ],
});

export const LIGHTHOUSE_LOGBOOK_EN_DRAFT = {
  id: "lighthouse-logbook-en-draft",
  title: "The Lighthouse Logbook",
  language: "en",
  ageBand: "14-16",
  cefrLevel: "A2-B1",
  readingPathId: "klasiklere_hazirlik_14_16",
  contentTrack: "okurio-original-pilot",
  primaryTheme: "Small daily records, read with patience, can tell a much larger story",
  contentStatus: "draft",
  structuralValid: true,
  releaseReady: false,
  estimatedWordsPerMinute: 155,
  sections: [
    {
      title: "A Box on the Kitchen Table",
      paragraphs: [
        "Mira arrived at her aunt's house on the first day of summer. The house stood on a small hill above a quiet harbour. From the kitchen window, she could see the old white lighthouse.",
        "Aunt Ruth worked at the town museum. She was a careful woman with grey hair and paint on her fingers. She always carried a pencil behind her ear.",
        "On the kitchen table there was a large cardboard box. Inside it lay a thick book with a dark green cover. The corners were soft and the pages were yellow.",
        "\"This is the lighthouse logbook,\" said Aunt Ruth. \"The keepers wrote in it every day for many years. The museum wants to put it online.\"",
        "Mira looked at the book without much interest. She had hoped for a summer of swimming and sleeping late. Reading an old diary did not sound exciting.",
        "\"Will you help me?\" asked her aunt. \"I need someone to photograph each page. Then we type the words into a computer file.\"",
        "Mira shrugged and said yes. She did not want to be rude. Also, she had nothing else to do on rainy days.",
        "Aunt Ruth gave her a pair of soft cotton gloves. \"Old paper is fragile,\" she said. \"Turn each page slowly, from the top corner.\"",
        "Mira put on the gloves and opened the cover. The first page was full of small, neat handwriting. At the top, someone had written a date and a name: Keeper Thomas Hale.",
      ],
    },
    {
      title: "Wind, Weather and Oil",
      paragraphs: [
        "The next morning, Mira set up the camera on a stand. Aunt Ruth showed her how to keep the light even. Each photo had to be sharp and clear.",
        "After ten pages, Mira started to read the words. They were not very interesting at first. Every entry followed the same pattern.",
        "\"Wind from the west. Sea calm. Lamp lit at seven. Oil used: two cans.\" The next day said almost the same thing. So did the day after that.",
        "Mira typed the entries into the computer. She felt a little bored, but she kept going. The work had a slow, steady rhythm.",
        "By lunchtime she had finished thirty pages. She noticed that her typing was faster now. She could also read the old handwriting more easily.",
        "\"Why did they write the same things every day?\" she asked during lunch. Aunt Ruth smiled and passed her the bread.",
        "\"Ships needed the light every single night,\" she said. \"The keepers had to prove that the lamp was working. The log was their promise.\"",
        "Mira thought about this for a moment. A promise written every day for years seemed strange to her. But it also seemed strong.",
        "That afternoon she read the entries more slowly. She began to notice small changes. Some days the wind was stronger, and the keeper used more oil.",
      ],
    },
    {
      title: "The Storm of October",
      paragraphs: [
        "In the second week, Mira reached the autumn pages. The handwriting suddenly looked different. The letters were bigger and less neat.",
        "\"Wind from the north-east. Very strong. Rain all night. Lamp lit at five, early.\" Below this line, there was a short note in a hurry.",
        "\"Small fishing boat seen near the rocks. Rang the bell for one hour. Boat turned back to the harbour safely.\"",
        "Mira stopped typing and read the lines again. She imagined the keeper in the dark tower. She imagined the cold wind and the loud bell.",
        "The next entry was calm again. \"Wind falling. Sea rough. Oil used: four cans. Keeper tired but well.\"",
        "Mira laughed softly at the last words. They were so simple, yet they told her so much. The keeper had worked all night to protect strangers.",
        "She called her aunt to the table. Aunt Ruth read the page with her glasses on her nose. \"I have never seen this part,\" she said quietly.",
        "\"So the logbook is not only about oil and wind,\" said Mira. \"It is about people.\" Her aunt nodded slowly.",
        "That night, Mira could not stop thinking about the small boat. Who was on it? Did they ever know about the keeper and the bell?",
        "Mira wrote the date of the storm on a small card. She put the card next to her bed.",
      ],
    },
    {
      title: "Looking for Patterns",
      paragraphs: [
        "The next day, Mira had a new idea. She wanted to find more stories hidden in the daily lines. She made a simple table on the computer.",
        "In the first column she put the date. In the second, she wrote the wind and weather. In the third, she noted anything unusual.",
        "At first the third column was almost empty. Then she began to find small surprises. One day, a keeper wrote about a broken window.",
        "Another day, he mentioned a visit from a doctor. A week later, the doctor came again. Mira wondered if someone in the lighthouse was ill.",
        "She read on carefully. A few pages later, the keeper wrote, \"Daughter well again. Walked on the beach today.\" Mira felt happy for this unknown girl.",
        "Aunt Ruth looked at the table over Mira's shoulder. \"This is real research,\" she said. \"You are reading between the lines.\"",
        "Mira liked the phrase. It meant reading not only the words, but also what they suggested. A short line could hide a long story.",
        "She noticed something else, too. Long books had always felt heavy to her. But this book was teaching her to read one small piece at a time.",
        "By the end of the week, her table had three full pages. Each unusual line was a small door into the past.",
      ],
    },
    {
      title: "A Missing Month",
      paragraphs: [
        "One rainy morning, Mira found a problem. The entries jumped from March to May. There was nothing at all for April.",
        "She checked the page numbers carefully. No pages were missing from the book. The keeper had simply not written for a month.",
        "Mira felt worried. The log was a promise, and someone had broken it. Had something bad happened at the lighthouse?",
        "Aunt Ruth suggested they look for other records. \"A good researcher never trusts only one source,\" she said. They walked to the museum in the rain.",
        "In the museum's back room, there was a cabinet of old town newspapers. Aunt Ruth found the right year and opened the April pages.",
        "Mira read a short article on page four. The lighthouse lamp had been repaired that month. A new, brighter lens had arrived from the city.",
        "While engineers worked, a lightship lit the harbour instead. The keeper's family had stayed in town for a few weeks.",
        "Mira let out a long breath. Nothing bad had happened after all. The empty month had a simple and happy reason.",
        "\"You see?\" said Aunt Ruth. \"Silence in a record is also a clue. We just have to ask the right questions.\"",
        "Mira wrote this idea in her notebook. Then she added the newspaper article to her table.",
      ],
    },
    {
      title: "The Last Keeper",
      paragraphs: [
        "In the final weeks of summer, Mira reached the last pages. The handwriting was different again. A new keeper had taken over.",
        "Her name was Ellen Hale, the daughter of Thomas. Mira gasped when she saw the name. It was the girl from the doctor's visits.",
        "Ellen had grown up in the lighthouse. Now she was the keeper herself. Her entries were short, clear and sometimes a little funny.",
        "\"Wind from the south. A seagull sat on the lamp room roof all morning. He did not pay rent.\" Mira laughed out loud at this line.",
        "Ellen kept the log for many years. Then, one day, an entry said the lamp would become automatic. Machines would turn the light on and off.",
        "Ellen's last entry was only three lines long. \"Lamp lit at eight. Sea calm. Thank you, old light, for every night.\"",
        "Mira sat very still after reading it. She felt as if she knew Ellen and her father. She had followed their lives through small daily notes.",
        "The book had seemed boring on the first day. Now it felt like a long novel with real people inside. The story had grown slowly, line by line.",
        "Aunt Ruth sat beside her and read the last page too. Neither of them spoke for a while.",
      ],
    },
    {
      title: "Online for Everyone",
      paragraphs: [
        "On the last day of summer, the museum put the logbook online. Mira's photos and typed pages were all there. Her table of unusual events was there too.",
        "Aunt Ruth wrote a short introduction for the website. At the end, she thanked her niece for her careful work. Mira read her own name with surprise.",
        "That evening, they walked up the hill to the lighthouse. The light was automatic now, but it still turned every night. Its beam moved slowly across the water.",
        "\"Do you think anyone will read the logbook?\" asked Mira. Aunt Ruth smiled. \"Someone will,\" she said. \"Maybe a student, like you.\"",
        "Mira thought about her school reading list at home. There were long, old books on it that she had always avoided. They had seemed slow and difficult.",
        "Now she understood something new. A long text is often made of many small moments. If you read patiently, the larger story appears.",
        "She took out her notebook and wrote a short list. Read one part at a time. Ask questions. Look for patterns. Check other sources.",
        "On the train home, Mira opened the first book from her list. She read the first page slowly and wrote a small note in the margin.",
        "It was just the date and three words: \"Wind from the west.\" She smiled. It felt like a good way to begin.",
      ],
    },
  ],
  glossary: [
    { word: "logbook", definition: "A book where people write what happens every day at work." },
    { word: "keeper", definition: "A person who looks after a lighthouse and its lamp." },
    { word: "fragile", definition: "Easy to break or damage." },
    { word: "entry", definition: "One short piece of writing in a diary or record." },
    { word: "pattern", definition: "Something that happens again and again in the same way." },
    { word: "source", definition: "A place where information comes from, like a book or newspaper." },
    { word: "automatic", definition: "Working by itself, without a person controlling it." },
  ],
  optionalReflectionPrompt:
    "What small daily record from your own life could tell a bigger story one day?",
  sourceTruth,
  contentQualityReview: createPendingContentQualityReview("klasiklere_hazirlik_14_16"),
};

// Timing follows the actual reading body, excluding headings and glossary.
const body = LIGHTHOUSE_LOGBOOK_EN_DRAFT.sections
  .flatMap((section) => section.paragraphs).join(" ");
LIGHTHOUSE_LOGBOOK_EN_DRAFT.wordCount =
  body.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
LIGHTHOUSE_LOGBOOK_EN_DRAFT.estimatedSeconds = Math.ceil(
  LIGHTHOUSE_LOGBOOK_EN_DRAFT.wordCount * 60 / 155,
);
LIGHTHOUSE_LOGBOOK_EN_DRAFT.declaredSeconds =
  LIGHTHOUSE_LOGBOOK_EN_DRAFT.estimatedSeconds;
