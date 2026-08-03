import assert from "node:assert/strict";
import test from "node:test";

import { PILOT_STORIES } from "../../src/content/drafts/2026-08-02-pilot-five-candidate.js";

const WORDS_PER_MINUTE = 155;

const AGE_WORD_TARGETS = Object.freeze({
  "3-4": [150, 300],
  "5-6": [200, 400],
  "6-7": [250, 500],
  "7-8": [350, 650],
  "8-10": [500, 900],
  "10-12": [700, 1200],
  "12-14": [900, 1600],
  "14-16": [1200, 2000],
  "16-18": [1500, 2500],
  "18+": [1800, 3500],
});

const EXPECTED_STORIES = new Map([
  ["or-01-oki-a-sesini-buluyor", "Oki A Sesini Buluyor"],
  ["of-01-sessiz-ormandaki-ses", "Sessiz Ormandaki Ses"],
  ["oe-01-mino-neden-uzuldu", "Mino Neden Üzüldü?"],
  ["op-01-oki-yanlis-anladi", "Oki Yanlış Anladı"],
  ["os-01-toto-bir-an-durdu", "Toto Bir An Durdu"],
]);

const REVIEW_CHECKLIST_KEYS = Object.freeze([
  "narrativeArc",
  "ageFit",
  "sectionContinuity",
  "characterConsistency",
  "languageQuality",
  "factualAccuracy",
  "originalityRights",
  "accessibilityTone",
]);

const COUNCIL_REVIEW_KEYS = Object.freeze([
  "contentProductOwner",
  "accessibilityProductOwner",
  "dyslexiaExperienceLead",
  "adhdExperienceLead",
  "socialEmotionalReadingLead",
]);

const countWords = (text = "") =>
  String(text).match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

const splitSentences = (text = "") =>
  String(text)
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

const sectionParagraphs = (section) => {
  if (Array.isArray(section?.paragraphs)) return section.paragraphs;
  return String(section?.metin ?? "").split(/\n\s*\n/u).filter(Boolean);
};

const sectionText = (section) => sectionParagraphs(section).join(" ");

test("candidate package contains the five exact pilot stories", () => {
  assert.equal(PILOT_STORIES.length, EXPECTED_STORIES.size);

  const actual = new Map(
    PILOT_STORIES.map((story) => [story.legacy?.id, story.legacy?.baslik]),
  );
  assert.deepEqual(actual, EXPECTED_STORIES);
});

test("every pilot story meets age, duration, section and readability gates", () => {
  for (const story of PILOT_STORIES) {
    const { legacy, metadata } = story;
    const label = `${legacy?.id} (${legacy?.baslik})`;
    const target = AGE_WORD_TARGETS[metadata?.ageBand];
    assert.ok(target, `${label}: unknown age band ${metadata?.ageBand}`);

    assert.ok(Array.isArray(legacy?.bolumler), `${label}: sections must be an array`);
    assert.ok(
      legacy.bolumler.length >= 3 && legacy.bolumler.length <= 8,
      `${label}: expected 3–8 sections, found ${legacy.bolumler.length}`,
    );

    const fullText = legacy.bolumler.map(sectionText).join(" ");
    const totalWords = countWords(fullText);
    const sentences = splitSentences(fullText);
    const sentenceWordCounts = sentences.map(countWords);
    const estimatedSeconds = Math.ceil((totalWords * 60) / WORDS_PER_MINUTE);
    const averageSentenceWords = totalWords / sentences.length;
    const declaredSeconds = Number(legacy.sureDk) * 60;
    const durationVariance = Math.abs(declaredSeconds - estimatedSeconds) / estimatedSeconds;

    assert.ok(
      estimatedSeconds >= 120 && estimatedSeconds <= 300,
      `${label}: calculated duration ${estimatedSeconds}s is outside 2–5 minutes`,
    );
    assert.ok(
      Number.isFinite(declaredSeconds) && declaredSeconds > 0,
      `${label}: declared duration is missing`,
    );
    assert.ok(
      durationVariance <= 0.15,
      `${label}: declared duration differs from 155 WPM duration by ${(durationVariance * 100).toFixed(1)}%`,
    );
    assert.ok(
      totalWords >= target[0] && totalWords <= target[1],
      `${label}: ${totalWords} words is outside ${metadata.ageBand} target ${target[0]}–${target[1]}`,
    );
    assert.equal(
      fullText.includes(";"),
      false,
      `${label}: semicolon joins are not allowed in narrated pilot text`,
    );

    for (const [sectionIndex, section] of legacy.bolumler.entries()) {
      const text = sectionText(section);
      const words = countWords(text);
      const sectionSentences = splitSentences(text);
      const calculatedSectionSeconds = Math.ceil((words * 60) / WORDS_PER_MINUTE);
      const declaredSectionSeconds = Number(section.dk) * 60;
      const sectionDurationVariance =
        Math.abs(declaredSectionSeconds - calculatedSectionSeconds) / calculatedSectionSeconds;
      assert.ok(words >= 30, `${label}: section ${sectionIndex + 1} has only ${words} words`);
      assert.ok(
        sectionSentences.length >= 2,
        `${label}: section ${sectionIndex + 1} has fewer than two sentences`,
      );
      assert.equal(
        section.wordCount,
        words,
        `${label}: section ${sectionIndex + 1} wordCount must be derived from text`,
      );
      assert.equal(
        section.estimatedSeconds,
        calculatedSectionSeconds,
        `${label}: section ${sectionIndex + 1} estimatedSeconds must use 155 WPM`,
      );
      assert.ok(
        sectionDurationVariance <= 0.15,
        `${label}: section ${sectionIndex + 1} duration differs by ${(sectionDurationVariance * 100).toFixed(1)}%`,
      );
      assert.ok(
        words / totalWords <= 0.35,
        `${label}: section ${sectionIndex + 1} carries more than 35% of the story`,
      );

      for (const [paragraphIndex, paragraph] of sectionParagraphs(section).entries()) {
        assert.ok(
          splitSentences(paragraph).length <= 3,
          `${label}: section ${sectionIndex + 1}, paragraph ${paragraphIndex + 1} exceeds three sentences`,
        );
      }
    }

    for (const [sentenceIndex, wordCount] of sentenceWordCounts.entries()) {
      assert.ok(
        wordCount <= 12,
        `${label}: sentence ${sentenceIndex + 1} has ${wordCount} words; maximum is 12`,
      );
    }
    assert.ok(
      averageSentenceWords >= 6 && averageSentenceWords <= 10,
      `${label}: average sentence length ${averageSentenceWords.toFixed(2)} is outside 6–10`,
    );
  }
});

test("every pilot story has a controlled glossary and remains human-review blocked", () => {
  for (const story of PILOT_STORIES) {
    const { legacy, metadata } = story;
    const label = `${legacy?.id} (${legacy?.baslik})`;
    assert.ok(Array.isArray(metadata?.glossary), `${label}: glossary must be an array`);
    assert.ok(
      metadata.glossary.length >= 3 && metadata.glossary.length <= 8,
      `${label}: glossary must contain 3–8 entries`,
    );
    for (const [index, entry] of metadata.glossary.entries()) {
      assert.ok(entry.word?.trim(), `${label}: glossary entry ${index + 1} is missing a word`);
      assert.ok(entry.definition?.trim(), `${label}: glossary entry ${index + 1} is missing a definition`);
    }

    const review = metadata.contentQualityReview;
    assert.equal(review?.status, "pending", `${label}: content-quality review must remain pending`);
    assert.equal(review?.reviewerName, "", `${label}: automation must not invent a reviewer`);
    assert.ok(
      review?.reviewedAt === "" || review?.reviewedAt === null,
      `${label}: reviewedAt must remain empty before human review`,
    );
    assert.equal(review?.reviewNotes, "", `${label}: review notes must remain empty before human review`);
    for (const key of REVIEW_CHECKLIST_KEYS) {
      assert.equal(review?.checklist?.[key], false, `${label}: review checklist ${key} must remain false`);
    }
    for (const role of COUNCIL_REVIEW_KEYS) {
      const roleReview = metadata.experienceCouncilReview?.[role];
      assert.equal(roleReview?.status, "pending", `${label}: ${role} must remain pending`);
      assert.equal(roleReview?.reviewerName, "", `${label}: ${role} reviewer must remain empty`);
      assert.ok(
        roleReview?.reviewedAt === "" || roleReview?.reviewedAt === null,
        `${label}: ${role} reviewedAt must remain empty`,
      );
      assert.equal(roleReview?.reviewNotes, "", `${label}: ${role} notes must remain empty`);
    }
    assert.equal(metadata.releaseReady, false, `${label}: unapproved story cannot be releaseReady`);
  }
});
