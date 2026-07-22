import test from "node:test";
import assert from "node:assert/strict";
import { ODYSSEY_STORIES } from "../../src/content/odysseyStories.js";

const MINIMUM_WORDS = Object.freeze({
  "7-10": 500,
  "11-16": 900,
  "16+": 1500,
});

const wordCount = (text) => text.trim().split(/\s+/u).filter(Boolean).length;

test("Odysseia deployment candidates satisfy release gates", () => {
  const blocked = ODYSSEY_STORIES.flatMap(({ legacy, metadata }) => {
    const sectionWords = legacy.bolumler.map((section) => wordCount(section.metin));
    const totalWords = sectionWords.reduce((sum, count) => sum + count, 0);
    const actualSeconds = Math.round((totalWords / 155) * 60);
    const declaredSeconds = metadata.estimatedMinutes * 60;
    const durationVariance = Math.abs(declaredSeconds - actualSeconds) / actualSeconds;
    const blockers = [];

    if (totalWords < MINIMUM_WORDS[metadata.ageBand]) blockers.push("below_age_minimum");
    if (sectionWords.some((count) => count < 30)) blockers.push("section_too_short");
    if (durationVariance > 0.15) blockers.push("declared_duration_mismatch");
    if (!metadata.contentQualityReview) blockers.push("content_quality_review_missing");
    if (
      metadata.contentStatus === "deployment-candidate"
      && (metadata.lexiconExpertReviewStatus !== "approved"
        || metadata.literaryEditorReviewStatus !== "approved")
    ) blockers.push("deployment_candidate_without_human_signoff");

    return blockers.length ? [{ id: legacy.id, totalWords, actualSeconds, blockers }] : [];
  });

  assert.deepEqual(blocked, [], JSON.stringify(blocked, null, 2));
});
