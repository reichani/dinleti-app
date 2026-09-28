import assert from "node:assert/strict";
import test from "node:test";
import {
  AGENT_CONTENT_CHECKS,
  PRODUCTION_UX_CHECKS,
  createPendingAgentContentReview,
  createPendingProductionAcceptance,
  evaluateReleaseGovernance,
} from "../../src/content/releaseGovernance.js";
import { CONTENT_REVIEW_QUEUE, validateContentReviewQueue } from "../../src/content/contentReviewQueue.js";

const commit = "0123456789abcdef";
const approvedAgentReview = {
  ...createPendingAgentContentReview(),
  status: "approved",
  agentVersion: "1.0.0",
  reviewedAt: "2026-09-28T03:30:00Z",
  reviewedCommit: commit,
  reviewNotes: "Narrative, age, language, source-risk and accessibility checks passed.",
  checklist: Object.fromEntries(AGENT_CONTENT_CHECKS.map((key) => [key, true])),
};
const acceptedProduction = {
  ...createPendingProductionAcceptance(),
  status: "accepted",
  ownerName: "Reyhan Açar",
  deployedCommit: commit,
  productionUrl: "https://example.invalid/okurio",
  testedAt: "2026-09-28T04:00:00Z",
  acceptanceNotes: "Production reading journey accepted end to end.",
  evidence: Object.fromEntries(PRODUCTION_UX_CHECKS.map((key) => [key, true])),
};

test("agent approval and green automation create a deploy candidate without publication", () => {
  const result = evaluateReleaseGovernance({
    agentContentReview: approvedAgentReview,
    productionAcceptance: createPendingProductionAcceptance(),
    candidateCommit: commit,
    automatedChecksPassed: true,
  });
  assert.equal(result.candidateDeployReady, true);
  assert.equal(result.publicationReady, false);
  assert.equal(result.releaseState, "DEPLOY_CANDIDATE");
});

test("only exact-commit production UX acceptance publishes", () => {
  const result = evaluateReleaseGovernance({
    agentContentReview: approvedAgentReview,
    productionAcceptance: acceptedProduction,
    candidateCommit: commit,
    deployedCommit: commit,
    automatedChecksPassed: true,
  });
  assert.equal(result.publicationReady, true);
  assert.equal(result.releaseState, "PUBLISHED");
});

test("acceptance for another SHA fails closed", () => {
  const result = evaluateReleaseGovernance({
    agentContentReview: approvedAgentReview,
    productionAcceptance: acceptedProduction,
    candidateCommit: commit,
    deployedCommit: "different-commit",
    automatedChecksPassed: true,
  });
  assert.equal(result.publicationReady, false);
  assert.equal(result.releaseState, "DEPLOYED_AWAITING_PO");
});

test("canonical review queue contains one candidate per production story", () => {
  const result = validateContentReviewQueue(CONTENT_REVIEW_QUEUE);
  assert.equal(result.valid, true, result.errors.join("\n"));
  assert.equal(new Set(CONTENT_REVIEW_QUEUE.map((item) => item.productionStoryId)).size, CONTENT_REVIEW_QUEUE.length);
});
