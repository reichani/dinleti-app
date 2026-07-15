import {
  PILOT_STORIES,
  PILOT_STORIES_LEGACY,
  PILOT_STORY_METADATA,
} from "./pilotStories.js";

/**
 * Safely merges the new pilot stories into the existing catalog without
 * mutating the original array or replacing an existing story with the same id.
 */
export function mergePilotStories(existingCatalog = []) {
  const existingIds = new Set(existingCatalog.map((story) => story.id));
  const newStories = PILOT_STORIES_LEGACY.filter(
    (story) => !existingIds.has(story.id),
  );

  return [...newStories, ...existingCatalog];
}

/**
 * Pilot surfaces should only show short, explicitly eligible Okurio content.
 * Existing short Okurio stories remain visible during migration even before
 * their full v1.2 metadata has been extracted from App.jsx.
 */
export function getPilotEligibleCatalog(catalog = []) {
  return catalog.filter((story) => {
    const metadata = PILOT_STORY_METADATA[story.id];

    if (metadata) {
      return metadata.pilotEligible === true && story.sureDk <= 5;
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
    pilotStoryIds: pilotCatalog.map((story) => story.id),
  };
}
