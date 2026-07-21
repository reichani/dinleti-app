import {
  PILOT_STORIES,
  PILOT_STORIES_LEGACY,
  PILOT_STORY_METADATA,
} from "./pilotStories.js";

function hasRequiredHumanApprovals(metadata) {
  return (
    metadata?.productOwnerApproved === true &&
    metadata?.accessibilityApproved === true &&
    metadata?.dyslexiaExperienceApproved === true &&
    metadata?.adhdExperienceApproved === true
  );
}

/**
 * A story is public only when it has passed all mandatory release gates.
 * Draft, review and changes-required content stays available to editors through
 * metadata APIs, but is never merged into the learner-facing catalog.
 */
export function isStoryReleaseReady(storyId) {
  const metadata = PILOT_STORY_METADATA[storyId];
  if (!metadata) return true;

  const explicitReleaseReady = metadata.releaseReady === true;
  const approvedStatus = metadata.contentStatus === "approved";
  const humanApprovalsComplete = hasRequiredHumanApprovals(metadata);
  const legalChecksComplete =
    metadata.clinicalBoundaryChecked === true &&
    metadata.copyrightChecked === true;

  return (
    explicitReleaseReady &&
    approvedStatus &&
    humanApprovalsComplete &&
    legalChecksComplete
  );
}

/**
 * Safely merges only release-ready pilot stories into the public catalog without
 * mutating the original array or replacing an existing story with the same id.
 */
export function mergePilotStories(existingCatalog = []) {
  const existingIds = new Set(existingCatalog.map((story) => story.id));
  const newStories = PILOT_STORIES_LEGACY.filter(
    (story) => !existingIds.has(story.id) && isStoryReleaseReady(story.id),
  );

  return [...newStories, ...existingCatalog];
}

/**
 * Pilot surfaces show only explicitly eligible and release-ready Okurio content.
 * Legacy catalog entries without extracted metadata remain visible during
 * migration; every new governed story must pass the release gate above.
 */
export function getPilotEligibleCatalog(catalog = []) {
  return catalog.filter((story) => {
    const metadata = PILOT_STORY_METADATA[story.id];

    if (metadata) {
      return (
        metadata.pilotEligible === true &&
        isStoryReleaseReady(story.id) &&
        story.sureDk <= 5
      );
    }

    const isExistingOkurioContent =
      typeof story.yazar === "string" && story.yazar.startsWith("Okurio");

    return isExistingOkurioContent && story.sureDk <= 5;
  });
}

export function getStoryMetadata(storyId) {
  return PILOT_STORY_METADATA[storyId] ?? null;
}

export function getGlossaryForStory(storyId) {
  return getStoryMetadata(storyId)?.glossary ?? [];
}

export function getReflectionPromptForStory(storyId) {
  return getStoryMetadata(storyId)?.optionalReflectionPrompt ?? null;
}

export function findGlossaryEntry(storyId, rawWord) {
  const normalizedWord = String(rawWord || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");

  if (!normalizedWord) return null;

  return (
    getGlossaryForStory(storyId).find(
      (entry) =>
        entry.word.toLocaleLowerCase("tr-TR") === normalizedWord,
    ) ?? null
  );
}

export function getPilotIntegrationSnapshot(existingCatalog = []) {
  const mergedCatalog = mergePilotStories(existingCatalog);
  const pilotCatalog = getPilotEligibleCatalog(mergedCatalog);

  return {
    mergedCatalog,
    pilotCatalog,
    newStoryCount: PILOT_STORIES.length,
    releaseReadyStoryCount: PILOT_STORIES.filter(({ legacy }) =>
      isStoryReleaseReady(legacy.id),
    ).length,
    pilotStoryIds: pilotCatalog.map((story) => story.id),
  };
}
