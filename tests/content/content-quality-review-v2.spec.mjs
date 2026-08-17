import assert from "node:assert/strict";
import test from "node:test";
import {
  CONTENT_QUALITY_REVIEW_STATUSES,
  READING_PATH_REVIEW_CRITERIA,
  UNIVERSAL_REVIEW_CHECKS,
  createPendingContentQualityReview,
  evaluateContentQualityReview,
  normalizeContentQualityReview,
  readingPathIdForAgeLabel,
} from "../../src/content/contentQualityReview.js";

test("all ten reading paths have dedicated human review criteria", () => {
  assert.equal(Object.keys(READING_PATH_REVIEW_CRITERIA).length, 10);
  for (const criteria of Object.values(READING_PATH_REVIEW_CRITERIA)) {
    assert.ok(criteria.length >= 4);
  }
});

test("candidate deployment permits pending human review but publication does not", () => {
  const review = createPendingContentQualityReview("genc_okurlar_12_14");
  const result = evaluateContentQualityReview(review, {
    readingPathId: "genc_okurlar_12_14",
    deployedCommit: "abc123",
  });
  assert.equal(result.candidateDeployReady, true);
  assert.equal(result.publicationReady, false);
  assert.match(result.approvalBlockers.join(" "), /not approved/);
});

test("legacy and missing reviews normalize to pending without inventing a reviewer", () => {
  const legacy = normalizeContentQualityReview(
    { status: "approved", note: "Eski serbest metin notu" },
    "ilk_harfler_6_7",
  );
  assert.equal(legacy.status, "pending");
  assert.equal(legacy.reviewerName, "");
  assert.equal(legacy.reviewNotes, "Eski serbest metin notu");
  assert.equal(normalizeContentQualityReview(null, "okul_oncesi_3_4").status, "pending");
});

test("publication requires named human evidence, every checklist and deployed commit", () => {
  const readingPathId = "genc_okurlar_12_14";
  const review = createPendingContentQualityReview(readingPathId);
  review.status = "approved";
  review.reviewerName = "Reyhan Açar";
  review.reviewedAt = "2026-08-17T12:00:00+03:00";
  review.reviewedCommit = "candidate-sha";
  review.reviewNotes = "Çalışan aday ortamında okundu; yaş tonu ve bölüm akışı uygun.";
  review.checklist = Object.fromEntries(UNIVERSAL_REVIEW_CHECKS.map((key) => [key, true]));
  review.readingPathChecklist = Object.fromEntries(
    READING_PATH_REVIEW_CRITERIA[readingPathId].map((key) => [key, true]),
  );

  assert.equal(
    evaluateContentQualityReview(review, { readingPathId, deployedCommit: "candidate-sha" }).publicationReady,
    true,
  );
  assert.equal(
    evaluateContentQualityReview(review, { readingPathId, deployedCommit: "different-sha" }).publicationReady,
    false,
  );
});

test("only the four governed review statuses are accepted", () => {
  assert.deepEqual(CONTENT_QUALITY_REVIEW_STATUSES, [
    "pending",
    "approved",
    "changes_requested",
    "rejected",
  ]);
});

test("catalog age labels resolve to one of the ten governed reading paths", () => {
  assert.equal(readingPathIdForAgeLabel("3–4 yaş"), "okul_oncesi_3_4");
  assert.equal(readingPathIdForAgeLabel("7-12 yaş"), "akici_okuma_10_12");
  assert.equal(readingPathIdForAgeLabel("12+"), "genc_okurlar_12_14");
  assert.equal(readingPathIdForAgeLabel("18+ yaş"), "yetiskin_odak_18");
});
