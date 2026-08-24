const pendingContentQualityReview = () => ({
  status: "pending",
  reviewerName: "",
  reviewedAt: "",
  reviewNotes: "",
  checklist: {
    narrativeArc: false,
    ageFit: false,
    sectionContinuity: false,
    characterConsistency: false,
    languageQuality: false,
    factualAccuracy: false,
    originalityRights: false,
    accessibilityTone: false,
  },
});

const pendingRoleReview = () => ({
  status: "pending",
  reviewerName: "",
  reviewedAt: "",
  reviewNotes: "",
});

const pendingExperienceCouncilReview = () => ({
  contentProductOwner: pendingRoleReview(),
  accessibilityProductOwner: pendingRoleReview(),
  dyslexiaExperienceLead: pendingRoleReview(),
  adhdExperienceLead: pendingRoleReview(),
  socialEmotionalReadingLead: pendingRoleReview(),
});

export const THE_MOON_IS_NOT_A_STAR_DRAFT = {
  legacy: {
    id: "moon-not-star-en",
    baslik: "The Moon Is Not a Star",
    yazar: "Okurio Original Science Stories",
    seslendiren: "Okurio Narrator",
    kategori: "English Science",
    dil: "en",
    yas: "10-12 yaş",
    renk: ["#172B4D", "#A8C7FA"],
    puan: 5,
    sureDk: 4.78,
    ozet: "Mira tests a bright-sky guess and discovers how moonlight works.",
    bolumler: [
      {
        ad: "A Bright Object Before Sunset",
        estimatedSeconds: 48,
        metin: `Mira noticed the Moon before sunset. It looked pale against the blue sky. A bright point appeared nearby.

Mira called both objects stars. Her brother Leon paused beside the window.

He asked how they could test that idea. Mira opened their observation notebook. She drew the Moon as a wide circle.

She marked the bright point with one dot. The shapes clearly looked different.

Shape alone could not settle the question. Distant objects can look like bright points. Mira needed evidence about light and motion.

She wrote one careful question below her drawing. Does the Moon make its own light? That question guided their next observation.

They planned to test one claim at a time. Clear notes would keep their guesses separate.`,
      },
      {
        ad: "The Lamp and the Paper Ball",
        estimatedSeconds: 47,
        metin: `Leon placed a lamp across the room. Mira held a paper ball nearby. The lamp shone from one direction.

Half of the ball became bright. The other half stayed dark.

The paper ball made no light itself. Its surface only returned the lamp's light. Mira slowly moved around the ball.

She saw different portions of brightness. The ball never changed its round shape.

Their model offered a useful clue. Sunlight reaches the Moon in space. The Moon reflects some sunlight toward Earth.

That reflected sunlight creates what we call moonlight. The Moon can look bright without being a star. Mira crossed out her first answer gently.

Their model was simple, not a perfect Moon. Still, it tested the light claim clearly.`,
      },
      {
        ad: "Why the Shape Seems to Change",
        estimatedSeconds: 48,
        metin: `The next evening showed a curved crescent. Mira compared it with yesterday's drawing. The Moon had not lost a piece.

The Sun still lit half its surface. Their viewing angle had changed.

The Moon travels around Earth. We see different amounts of its sunlit half. These views are called lunar phases.

A complete cycle takes about twenty-nine and a half days. The pattern then begins again.

Mira arranged eight phase cards in order. Leon checked them against a NASA diagram. The cards moved from new Moon onward.

They passed crescent, quarter, and gibbous views. Then came the full Moon. The later cards showed the bright part shrinking.

Mira dated each card before closing the notebook. Future drawings could test the repeating order.`,
      },
      {
        ad: "A Star Makes a Different Kind of Light",
        estimatedSeconds: 47,
        metin: `Their question now turned toward stars. The Sun is also a star. It produces energy deep inside its hot interior.

Some energy leaves as light and heat. Other stars make their own light too.

The Moon works differently. It is Earth's natural satellite. It travels around Earth while reflecting sunlight.

It has rock, dust, plains, and many craters. It does not produce starlight inside itself.

Distance can hide important size differences. Faraway stars appear as tiny points. The much closer Moon shows a round disk.

Closer images can reveal lunar surface details. Those details do not change the evidence. Reflected light still reaches Mira's eyes.

Leon wrote star and satellite in separate columns. Their properties now had clear boundaries.`,
      },
      {
        ad: "Two Common Traps",
        estimatedSeconds: 45,
        metin: `Mira found two confusing claims online. One said phases came from Earth's shadow. Another said the far side stayed dark.

Neither claim matched their model.

Earth's shadow causes a lunar eclipse. It does not cause the monthly phases. Most months, the Moon misses that shadow.

Its orbit is tilted compared with Earth's path. That tilt prevents an eclipse every month.

The far side also receives sunlight. It has days and nights like other regions. We call it far because it faces away from Earth.

It is not permanently dark. Mira added both corrections to the notebook. She labeled them claims needing stronger evidence.

The corrections improved the notebook's explanation. Mira marked which evidence supported each change.`,
      },
      {
        ad: "The Answer in the Evening Sky",
        estimatedSeconds: 54,
        metin: `One week later, Mira saw the Moon again. This time it stood higher after sunset. Its bright portion had grown.

The sequence matched the phase cards in their notebook.

Mira reviewed every step in their investigation. Shape had started the question. A model explained reflected light.

Repeated drawings revealed a phase pattern. Reliable diagrams corrected two misleading claims. Each kind of evidence had a separate job.

She wrote their final answer carefully. The Moon is not a star. It reflects sunlight and travels around Earth.

Its changing appearance follows a predictable viewing pattern. Mira left space beneath that answer. Tomorrow's sky might bring another useful question.

Leon added the date and weather beside her last drawing. The bright point remained unidentified.

They needed more evidence before naming that object. Their notebook preserved every step of the Moon investigation.`,
      },
    ],
  },
  metadata: {
    ageBand: "10-12",
    estimatedSeconds: 287,
    estimatedMinutes: 4.78,
    contentTrack: "english-science",
    englishProficiencyTarget: "CEFR B1",
    primaryTheme: "testing-claims-with-evidence",
    contentStatus: "content-quality-review",
    structuralValid: true,
    releaseReady: false,
    sourceType: "original-science-narrative",
    sourceScope: "Original Okurio narrative; factual claims use the linked NASA sources.",
    sourceUrls: [
      "https://science.nasa.gov/moon/moon-phases/",
      "https://science.nasa.gov/moon/top-moon-questions/",
      "https://science.nasa.gov/moon/eclipses/",
      "https://science.nasa.gov/moon/lunar-craters/",
      "https://science.nasa.gov/sun/facts/",
    ],
    factualReviewStatus: "pending-human-review",
    originalityRightsReviewStatus: "pending-human-review",
    englishLanguageReviewStatus: "pending-human-review",
    glossary: [
      { word: "reflect", definition: "To send light back from a surface." },
      { word: "satellite", definition: "An object that travels around another object." },
      { word: "lunar phase", definition: "A view of the Moon's sunlit portion." },
      { word: "crescent", definition: "A thin, curved shape of visible moonlight." },
      { word: "gibbous", definition: "A Moon view larger than half, but not full." },
      { word: "lunar eclipse", definition: "An event when the Moon moves through Earth's shadow." },
      { word: "evidence", definition: "Information used to test an idea or claim." },
    ],
    optionalReflectionPrompt: "Which observation best showed that the Moon is not a star?",
    reflectionIsOptional: true,
    reflectionIsScored: false,
    contentQualityReview: pendingContentQualityReview(),
    experienceCouncilReview: pendingExperienceCouncilReview(),
  },
};

export default THE_MOON_IS_NOT_A_STAR_DRAFT;
