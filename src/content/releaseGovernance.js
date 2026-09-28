export const GOVERNANCE_SCHEMA_VERSION = "3.0";

export const AGENT_REVIEW_STATUSES = Object.freeze([
  "pending",
  "approved",
  "changes_requested",
  "blocked",
]);

export const PRODUCTION_ACCEPTANCE_STATUSES = Object.freeze([
  "pending",
  "accepted",
  "rejected",
]);

export const AGENT_CONTENT_CHECKS = Object.freeze([
  "narrativeArc",
  "ageFit",
  "sectionContinuity",
  "characterConsistency",
  "languageQuality",
  "factualAccuracy",
  "originalityRightsRisk",
  "accessibilityTone",
]);

export const PRODUCTION_UX_CHECKS = Object.freeze([
  "storyOpened",
  "mobileReadable",
  "ttsCorrect",
  "highlightingCorrect",
  "pauseResumeCorrect",
  "progressPreserved",
  "ageExperienceAcceptable",
  "overallExperienceAcceptable",
]);

const nonEmpty = (value) => typeof value === "string" && value.trim().length > 0;
const everyTrue = (record, keys) => keys.every((key) => record?.[key] === true);

export function createPendingAgentContentReview() {
  return {
    schemaVersion: GOVERNANCE_SCHEMA_VERSION,
    status: "pending",
    reviewerKind: "agent",
    agentName: "okurio-content-quality-agent",
    agentVersion: "",
    reviewedAt: "",
    reviewedCommit: "",
    reviewNotes: "",
    checklist: Object.fromEntries(AGENT_CONTENT_CHECKS.map((key) => [key, false])),
  };
}

export function createPendingProductionAcceptance() {
  return {
    schemaVersion: GOVERNANCE_SCHEMA_VERSION,
    status: "pending",
    ownerName: "",
    deployedCommit: "",
    productionUrl: "",
    testedAt: "",
    acceptanceNotes: "",
    evidence: Object.fromEntries(PRODUCTION_UX_CHECKS.map((key) => [key, false])),
  };
}

export function evaluateAgentContentReview(review, { candidateCommit = "" } = {}) {
  const source = { ...createPendingAgentContentReview(), ...(review ?? {}) };
  const blockers = [];

  if (source.schemaVersion !== GOVERNANCE_SCHEMA_VERSION) blockers.push("Agent review schemaVersion must be 3.0.");
  if (!AGENT_REVIEW_STATUSES.includes(source.status)) blockers.push("Agent review status is invalid.");
  if (source.reviewerKind !== "agent") blockers.push("Agent review must identify reviewerKind=agent.");
  if (!nonEmpty(source.agentName)) blockers.push("Agent name is missing.");
  if (!nonEmpty(source.agentVersion)) blockers.push("Agent version is missing.");
  if (!nonEmpty(source.reviewedAt)) blockers.push("Agent review time is missing.");
  if (!nonEmpty(source.reviewedCommit)) blockers.push("Agent reviewed commit is missing.");
  if (!nonEmpty(source.reviewNotes)) blockers.push("Agent review notes are missing.");
  if (source.status !== "approved") blockers.push(`Agent content review is ${source.status}.`);
  if (!everyTrue(source.checklist, AGENT_CONTENT_CHECKS)) blockers.push("Agent content checklist is incomplete.");
  if (nonEmpty(candidateCommit) && source.reviewedCommit !== candidateCommit) {
    blockers.push("Agent review does not cover the candidate commit.");
  }

  return { approved: blockers.length === 0, normalized: source, blockers };
}

export function evaluateProductionAcceptance(acceptance, { deployedCommit = "" } = {}) {
  const source = { ...createPendingProductionAcceptance(), ...(acceptance ?? {}) };
  const blockers = [];

  if (source.schemaVersion !== GOVERNANCE_SCHEMA_VERSION) blockers.push("Production acceptance schemaVersion must be 3.0.");
  if (!PRODUCTION_ACCEPTANCE_STATUSES.includes(source.status)) blockers.push("Production acceptance status is invalid.");
  if (source.status !== "accepted") blockers.push(`Production acceptance is ${source.status}.`);
  if (!nonEmpty(source.ownerName)) blockers.push("Production owner name is missing.");
  if (!nonEmpty(source.deployedCommit)) blockers.push("Deployed commit is missing.");
  if (!nonEmpty(source.productionUrl)) blockers.push("Production URL is missing.");
  if (!nonEmpty(source.testedAt)) blockers.push("Production test time is missing.");
  if (!nonEmpty(source.acceptanceNotes)) blockers.push("Production acceptance notes are missing.");
  if (!everyTrue(source.evidence, PRODUCTION_UX_CHECKS)) blockers.push("Production UX evidence is incomplete.");
  if (nonEmpty(deployedCommit) && source.deployedCommit !== deployedCommit) {
    blockers.push("Production acceptance does not cover the deployed commit.");
  }

  return { accepted: blockers.length === 0, normalized: source, blockers };
}

export function evaluateReleaseGovernance({
  agentContentReview,
  productionAcceptance,
  candidateCommit = "",
  deployedCommit = "",
  automatedChecksPassed = false,
} = {}) {
  const agent = evaluateAgentContentReview(agentContentReview, { candidateCommit });
  const acceptance = evaluateProductionAcceptance(productionAcceptance, { deployedCommit });
  const exactCommitMatches = nonEmpty(candidateCommit) && nonEmpty(deployedCommit) && candidateCommit === deployedCommit;
  const candidateDeployReady = agent.approved && automatedChecksPassed === true;
  const publicationReady = candidateDeployReady && exactCommitMatches && acceptance.accepted;

  return {
    schemaVersion: GOVERNANCE_SCHEMA_VERSION,
    candidateDeployReady,
    deployedAwaitingProductOwner: candidateDeployReady && nonEmpty(deployedCommit) && !publicationReady,
    publicationReady,
    releaseState: publicationReady
      ? "PUBLISHED"
      : candidateDeployReady && nonEmpty(deployedCommit)
        ? acceptance.normalized.status === "rejected" ? "REJECTED" : "DEPLOYED_AWAITING_PO"
        : candidateDeployReady ? "DEPLOY_CANDIDATE" : "DRAFT",
    blockers: [
      ...agent.blockers,
      ...(automatedChecksPassed ? [] : ["Automated checks have not passed."]),
      ...(exactCommitMatches || !nonEmpty(deployedCommit) ? [] : ["Candidate and deployed commits differ."]),
      ...(publicationReady || !nonEmpty(deployedCommit) ? [] : acceptance.blockers),
    ],
    agent,
    acceptance,
  };
}
