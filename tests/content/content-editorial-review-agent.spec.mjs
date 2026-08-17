import assert from "node:assert/strict";
import test from "node:test";
import { ODYSSEY_STORIES } from "../../src/content/odysseyStories.js";
import { runContentEditorialPreReview } from "../../src/content/contentEditorialReviewAgent.js";

test("dil ve kültür editörü Odysseia sürümlerini okuma yoluna göre ön-inceler", () => {
  for (const { legacy, metadata } of ODYSSEY_STORIES) {
    const review = runContentEditorialPreReview(legacy, metadata);
    assert.equal(review.status, "PASS", `${legacy.id}: ${review.blockers.join(", ")}`);
    assert.equal(review.checks.grammarAndPunctuation.status, "PASS");
    assert.equal(review.checks.idiomUsage.status, "PASS");
    assert.equal(review.checks.proverbUsage.status, "PASS");
    assert.equal(review.checks.culturalObjectUsage.status, "PASS");
    assert.equal(review.checks.ageAndReadingPathFit.status, "PASS");
  }
});

test("AI editör insan onayı taklit edemez", () => {
  const { legacy, metadata } = ODYSSEY_STORIES[0];
  const review = runContentEditorialPreReview(legacy, metadata);
  assert.equal(review.reviewerKind, "ai-editorial-pre-review");
  assert.equal(review.humanApproval, false);
  assert.equal(review.canSetContentQualityReviewApproved, false);
  assert.equal(review.publicationReady, false);
});
