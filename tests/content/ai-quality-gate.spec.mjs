import assert from "node:assert/strict";
import test from "node:test";
import {
  AI_QUALITY_CHECKS,
  AI_QUALITY_STATUS,
  evaluateAiAssistedQualityGate,
  evaluateProductOwnerAcceptance,
  assertAiAssistedReleaseReady,
} from "../../src/content/aiQualityGate.js";
import story from "../../src/content/drafts/2026-08-04-uzay-kulubu-piyesi.js";

const completeAutomatedMetadata = () => ({
  aiQualityReview: {
    reviewerKind: "ai",
    agentName: "okurio-quality-gate",
    reviewedAt: "2026-08-19T10:00:00.000Z",
    reviewedCommit: "abc123",
    checks: Object.fromEntries(
      AI_QUALITY_CHECKS.map((name) => [name, {
        status: AI_QUALITY_STATUS.PASS,
        evidence: `${name} automated evidence`,
      }]),
    ),
  },
  ownerApproval: { status: "pending" },
});

test("complete automated evidence can pass before product-owner acceptance", () => {
  const result = evaluateAiAssistedQualityGate(completeAutomatedMetadata());
  assert.equal(result.status, AI_QUALITY_STATUS.PASS);
  assert.equal(result.releaseReady, true);
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
  assert.equal(checks.originalityRights.status, "PASS");
});

test("automated release assertion fails closed while AI evidence is incomplete", () => {
  assert.throws(
    () => assertAiAssistedReleaseReady(story.metadata),
    (error) => error.code === "AI_QUALITY_GATE_BLOCKED" && error.report.blockers.length > 0,
  );
});

test("only Reyhan can accept the exact deployed commit after deployment", () => {
  const accepted = evaluateProductOwnerAcceptance({
    status: "accepted",
    ownerName: "Reyhan Açar",
    decidedAt: "2026-08-19T10:05:00.000Z",
    deployedCommit: "abc123",
    notes: "Samsung S24+ production kabulü geçti.",
  }, "abc123");
  assert.equal(accepted.accepted, true);

  const wrongCommit = evaluateProductOwnerAcceptance({
    status: "accepted",
    ownerName: "Reyhan Açar",
    decidedAt: "2026-08-19T10:05:00.000Z",
    deployedCommit: "old456",
    notes: "Eski build.",
  }, "abc123");
  assert.equal(wrongCommit.accepted, false);
});
