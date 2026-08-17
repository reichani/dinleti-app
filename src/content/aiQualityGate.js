import { evaluateContentQualityReview } from "./contentQualityReview.js";

export const AI_QUALITY_STATUS = Object.freeze({
  PASS: "PASS",
  FAIL: "FAIL",
  BLOCKED: "BLOCKED",
  NOT_RUN: "NOT_RUN",
});

export const AI_QUALITY_CHECKS = Object.freeze([
  "narrativeComplete",
  "ageFit",
  "sectionContinuity",
  "audioHighlightScroll",
  "factualAccuracy",
  "originalityRights",
  "safeLanguage",
  "mobileUsability",
]);

const isNonEmpty = (value) => typeof value === "string" && value.trim().length > 0;

export function evaluateAiAssistedQualityGate(metadata = {}) {
  const review = metadata.aiQualityReview ?? {};
  const checks = review.checks ?? {};
  const blockers = [];

  if (review.reviewerKind !== "ai") blockers.push("AI review must identify reviewerKind=ai.");
  if (!isNonEmpty(review.agentName)) blockers.push("AI review agentName is missing.");
  if (!isNonEmpty(review.reviewedAt)) blockers.push("AI review reviewedAt is missing.");
  if (!isNonEmpty(review.reviewedCommit)) blockers.push("AI review reviewedCommit is missing.");

  for (const name of AI_QUALITY_CHECKS) {
    const check = checks[name];
    if (!check) {
      blockers.push(`${name}: review evidence is missing.`);
      continue;
    }
    if (!Object.values(AI_QUALITY_STATUS).includes(check.status)) {
      blockers.push(`${name}: invalid status.`);
    }
    if (!isNonEmpty(check.evidence)) blockers.push(`${name}: evidence is missing.`);
    if (check.status !== AI_QUALITY_STATUS.PASS) {
      blockers.push(`${name}: ${check.status}.`);
    }
  }

  const owner = metadata.ownerApproval ?? {};
  if (owner.status !== "approved") blockers.push("Owner approval is not approved.");
  if (!isNonEmpty(owner.ownerName)) blockers.push("Owner approval ownerName is missing.");
  if (!isNonEmpty(owner.approvedAt)) blockers.push("Owner approval approvedAt is missing.");
  if (!isNonEmpty(owner.approvedCommit)) blockers.push("Owner approval approvedCommit is missing.");
  if (!isNonEmpty(owner.approvalNotes)) blockers.push("Owner approval approvalNotes is missing.");

  const humanReview = evaluateContentQualityReview(metadata.contentQualityReview, {
    readingPathId: metadata.readingPathId,
    deployedCommit: review.reviewedCommit,
  });
  blockers.push(...humanReview.schemaBlockers, ...humanReview.approvalBlockers);
  if (humanReview.normalized.reviewerName === review.agentName) {
    blockers.push("AI agent cannot be recorded as the human reviewer.");
  }

  const reviewedCommit = review.reviewedCommit;
  if (isNonEmpty(reviewedCommit) && isNonEmpty(owner.approvedCommit) && reviewedCommit !== owner.approvedCommit) {
    blockers.push("AI review and owner approval do not cover the same commit.");
  }

  return {
    status: blockers.length === 0 ? AI_QUALITY_STATUS.PASS : AI_QUALITY_STATUS.BLOCKED,
    releaseReady: blockers.length === 0,
    blockers,
  };
}

export function assertAiAssistedReleaseReady(metadata = {}) {
  const result = evaluateAiAssistedQualityGate(metadata);
  if (!result.releaseReady) {
    const error = new Error(`AI-assisted quality gate blocked release (${result.blockers.length} blockers).`);
    error.name = "AiAssistedQualityGateError";
    error.code = "AI_QUALITY_GATE_BLOCKED";
    error.report = result;
    throw error;
  }
  return result;
}
