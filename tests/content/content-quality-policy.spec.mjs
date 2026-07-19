import assert from "node:assert/strict";
import test from "node:test";

import { REVIEW_CHECKLIST_KEYS, validateContentQuality } from "../../src/content/contentQualityPolicy.js";
import { OKI_MOON_MAP_QUALITY_DRAFT } from "../../src/content/qualityDrafts.js";

test("moon-map draft is structurally valid but remains blocked for human review", () => {
  const report = validateContentQuality(OKI_MOON_MAP_QUALITY_DRAFT);

  assert.equal(report.structuralValid, true);
  assert.equal(report.releaseReady, false);
  assert.equal(report.metrics.totalWords, 756);
  assert.equal(report.metrics.seconds, 293);
  assert.deepEqual(report.metrics.sectionWords, [128, 144, 178, 145, 161]);
  assert.deepEqual(report.metrics.sectionPercentages, [16.9, 19, 23.5, 19.2, 21.3]);
  assert.match(report.warnings.join(" "), /human content-quality approval/u);
});

test("quality gate rejects under-length stories and duration mismatches", () => {
  const story = structuredClone(OKI_MOON_MAP_QUALITY_DRAFT);
  story.legacy.bolumler = story.legacy.bolumler.slice(0, 2);
  story.legacy.sureDk = 8;

  const report = validateContentQuality(story);
  assert.equal(report.structuralValid, false);
  assert.match(report.errors.join(" "), /requires at least 700/u);
  assert.match(report.errors.join(" "), /3 to 8 meaningful sections/u);
  assert.match(report.errors.join(" "), /Declared duration differs/u);
});

test("quality gate rejects releaseReady without a named human approval", () => {
  const story = structuredClone(OKI_MOON_MAP_QUALITY_DRAFT);
  story.metadata.releaseReady = true;

  const report = validateContentQuality(story);
  assert.equal(report.releaseReady, false);
  assert.match(report.errors.join(" "), /cannot be releaseReady/u);
});

test("every mandatory human-review checklist field is present", () => {
  const review = OKI_MOON_MAP_QUALITY_DRAFT.metadata.contentQualityReview;
  assert.equal(review.status, "pending");
  assert.equal(review.reviewerName, "");
  for (const key of REVIEW_CHECKLIST_KEYS) assert.equal(review.checklist[key], false);
});
