import assert from "node:assert/strict";
import test from "node:test";
import {
  AI_QUALITY_CHECKS,
  evaluateAiAssistedQualityGate,
  assertAiAssistedReleaseReady,
} from "../../src/content/aiQualityGate.js";
import story from "../../src/content/drafts/2026-08-04-uzay-kulubu-piyesi.js";

test("independent AI evidence does not impersonate or replace human approval", () => {
  const metadata = story.metadata;
  assert.equal(metadata.aiQualityReview.reviewerKind, "ai");
  assert.equal(metadata.contentQualityReview.status, "pending");
  assert.equal(metadata.contentQualityReview.reviewerName, "");
  assert.equal(metadata.ownerApproval.status, "pending");
  assert.equal(metadata.releaseReady, false);
  assert.equal(evaluateAiAssistedQualityGate(metadata).releaseReady, false);
});

test("all eight AI checks carry explicit evidence and conservative statuses", () => {
  const checks = story.metadata.aiQualityReview.checks;
  assert.deepEqual(Object.keys(checks).sort(), [...AI_QUALITY_CHECKS].sort());
  for (const check of Object.values(checks)) {
    assert.ok(["PASS", "FAIL", "BLOCKED", "NOT_RUN"].includes(check.status));
    assert.ok(check.evidence.trim().length > 0);
  }
  assert.equal(checks.audioHighlightScroll.status, "BLOCKED");
  assert.equal(checks.mobileUsability.status, "BLOCKED");
  assert.equal(checks.originalityRights.status, "BLOCKED");
});

test("release assertion fails closed while any AI or owner evidence is incomplete", () => {
  assert.throws(
    () => assertAiAssistedReleaseReady(story.metadata),
    (error) => error.code === "AI_QUALITY_GATE_BLOCKED" && error.report.blockers.length > 0,
  );
});
