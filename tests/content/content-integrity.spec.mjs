import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTENT_STATUS,
  assertDeployableCatalog,
  classifyContent,
  countStoryWords,
  estimateStorySeconds,
} from "../../src/content/contentIntegrity.js";

const makeWords = (count) => Array.from({ length: count }, (_, index) => `kelime${index + 1}`).join(" ");

test("counts body words across sections and estimates duration from words, not sureDk", () => {
  const story = {
    sureDk: 99,
    bolumler: [
      { metin: "Oki bugün okudu." },
      { metin: "Lili de dikkatle dinledi." },
    ],
  };

  assert.equal(countStoryWords(story), 7);
  assert.equal(estimateStorySeconds(story), 3);
  assert.equal(estimateStorySeconds({ metin: makeWords(155) }), 60);
});

test("classifies letter and syllable cards as deployable micro exercises", () => {
  const letterCard = {
    id: "oki-ses-a",
    baslik: "A Sesi",
    kategori: "İlk Okuma",
    sureDk: 2,
    bolumler: [{ ad: "Harf ve Hece", metin: "a. an. al. at. Oki a sesini duydu." }],
  };
  const syllableCard = {
    id: "oki-heceler-1",
    baslik: "an en al el at et",
    kategori: "İlk Okuma",
    bolumler: [{ ad: "Hece Kartları", metin: "an. en. al. el. at. et." }],
  };

  for (const content of [letterCard, syllableCard]) {
    const result = classifyContent(content);
    assert.equal(result.status, CONTENT_STATUS.MICRO_EXERCISE);
    assert.equal(result.label, "Mikro alıştırma");
    assert.ok(result.seconds < 120);
    assert.equal(result.deployable, true);
  }
});

test("does not silently reclassify a short normal story as a micro exercise", () => {
  const shortStory = {
    id: "pembe-incili-kaftan",
    baslik: "Pembe İncili Kaftan",
    kategori: "Hikâye",
    sureDk: 41,
    bolumler: [{ ad: "Örnek", metin: makeWords(57) }],
  };

  const result = classifyContent(shortStory);

  assert.equal(result.status, CONTENT_STATUS.FULL_READING);
  assert.equal(result.wordCount, 57);
  assert.equal(result.seconds, 23);
  assert.equal(result.deployable, false);
  assert.match(result.blockers[0], /minimum is 120s/u);
});

test("accepts a normal reading only when the estimated body reaches two minutes", () => {
  const story = {
    id: "two-minute-story",
    baslik: "İki Dakikalık Hikâye",
    kategori: "Hikâye",
    bolumler: [{ metin: makeWords(310) }],
  };

  const result = classifyContent(story);

  assert.equal(result.status, CONTENT_STATUS.FULL_READING);
  assert.equal(result.seconds, 120);
  assert.equal(result.deployable, true);
});

test("classifies empty or explicitly planned content as preparing", () => {
  const empty = classifyContent({ id: "coming-soon", baslik: "Yeni Hikâye", bolumler: [] });
  const explicit = classifyContent(
    { id: "planned", baslik: "Planlanan Hikâye", bolumler: [{ metin: "Kısa taslak." }] },
    { status: "hazırlanıyor" },
  );

  for (const result of [empty, explicit]) {
    assert.equal(result.status, CONTENT_STATUS.PREPARING);
    assert.equal(result.label, "Hazırlanıyor");
    assert.equal(result.deployable, true);
  }
});

test("catalog deployment assertion reports every short normal reading blocker", () => {
  const micro = {
    id: "hece-karti",
    baslik: "Hece Kartı",
    bolumler: [{ ad: "Hece Kartları", metin: "an. en. al. el." }],
  };
  const shortStory = {
    id: "short-story",
    baslik: "Kısa Hikâye",
    kategori: "Hikâye",
    bolumler: [{ metin: makeWords(40) }],
  };

  assert.throws(
    () => assertDeployableCatalog([micro, shortStory]),
    (error) => {
      assert.equal(error.code, "CONTENT_INTEGRITY_BLOCKED");
      assert.equal(error.report.deployable, false);
      assert.equal(error.report.summary.microExerciseCount, 1);
      assert.equal(error.report.summary.blockerCount, 1);
      assert.equal(error.report.blockers[0].id, "short-story");
      return true;
    },
  );
});

test("metadata overrides can explicitly mark non-narrative cards", () => {
  const content = {
    id: "custom-practice",
    baslik: "Kısa Pratik",
    bolumler: [{ metin: "Bir iki üç." }],
  };

  const report = assertDeployableCatalog([content], {
    "custom-practice": { isMicroExercise: true },
  });

  assert.equal(report.deployable, true);
  assert.equal(report.reports[0].status, CONTENT_STATUS.MICRO_EXERCISE);
});
