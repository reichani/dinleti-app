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

export const PRODUCT_OWNER_ACCEPTANCE_STATUS = Object.freeze({
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
});

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

  return {
    status: blockers.length === 0 ? AI_QUALITY_STATUS.PASS : AI_QUALITY_STATUS.BLOCKED,
    releaseReady: blockers.length === 0,
    blockers,
  };
}

/**
 * Product-owner acceptance is deliberately evaluated after deployment. It is
 * not part of the automated pre-deploy gate and therefore cannot be forged by
 * an AI/content record to make a candidate deployable.
 */
export function evaluateProductOwnerAcceptance(ownerAcceptance = {}, deployedCommit = "") {
  const blockers = [];
  const status = ownerAcceptance.status ?? PRODUCT_OWNER_ACCEPTANCE_STATUS.PENDING;

  if (!Object.values(PRODUCT_OWNER_ACCEPTANCE_STATUS).includes(status)) {
    blockers.push("Product-owner acceptance status is invalid.");
  }
  if (status !== PRODUCT_OWNER_ACCEPTANCE_STATUS.ACCEPTED) {
    blockers.push("Product owner has not accepted the deployed release.");
  }
  if (ownerAcceptance.ownerName !== "Reyhan Açar") {
    blockers.push("Product-owner acceptance must be recorded by Reyhan Açar.");
  }
  if (!isNonEmpty(ownerAcceptance.decidedAt)) blockers.push("Product-owner decision time is missing.");
  if (!isNonEmpty(ownerAcceptance.deployedCommit)) blockers.push("Accepted deployed commit is missing.");
  if (!isNonEmpty(ownerAcceptance.notes)) blockers.push("Product-owner decision notes are missing.");
  if (
    isNonEmpty(deployedCommit) &&
    isNonEmpty(ownerAcceptance.deployedCommit) &&
    ownerAcceptance.deployedCommit !== deployedCommit
  ) {
    blockers.push("Product-owner acceptance does not cover the deployed commit.");
  }

  return {
    status,
    accepted: blockers.length === 0,
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
