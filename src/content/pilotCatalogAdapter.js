import {
  PILOT_STORIES,
  PILOT_STORIES_LEGACY,
  PILOT_STORY_METADATA,
} from "./pilotStories.js";
import { ODYSSEY_STORIES } from "./odysseyStories.js";
import { classifyContent, CONTENT_STATUS } from "./contentIntegrity.js";

const ALL_CURATED_STORIES = [...ODYSSEY_STORIES, ...PILOT_STORIES];
const ALL_CURATED_STORIES_LEGACY = ALL_CURATED_STORIES.map(({ legacy }) => legacy);
const ALL_CURATED_STORY_METADATA = Object.fromEntries(
  ALL_CURATED_STORIES.map(({ legacy, metadata }) => [legacy.id, metadata]),
);

/**
 * Keep genuine micro exercises, complete readings and explicit placeholders.
 * Short narrative excerpts are hidden from reader-facing catalog surfaces until
 * the content team expands them to at least two real minutes of body text.
 */
export function getDeployableReaderCatalog(catalog = []) {
  return catalog.filter((story) => {
    const metadata = ALL_CURATED_STORY_METADATA[story.id] ?? {};
    const report = classifyContent(story, metadata);

    if (report.status === CONTENT_STATUS.MICRO_EXERCISE) return true;
    if (report.status === CONTENT_STATUS.PREPARING) return false;
    return report.deployable;
  });
}

/**
 * Safely merges curated stories into the existing catalog without mutating the
 * original array or replacing an existing story with the same id. Reader-facing
 * output is quality-gated so 20-second narrative fragments cannot appear as a
 * finished story.
 */
export function mergePilotStories(existingCatalog = []) {
  const existingIds = new Set(existingCatalog.map((story) => story.id));
  const newStories = ALL_CURATED_STORIES_LEGACY.filter(
    (story) => !existingIds.has(story.id),
  );

  return getDeployableReaderCatalog([...newStories, ...existingCatalog]);
}

/**
 * Pilot surfaces should only show explicitly eligible Okurio content that also
 * passes the content integrity gate. Micro exercises may stay short by design;
 * narratives must contain at least two real minutes of reading body.
 */
export function getPilotEligibleCatalog(catalog = []) {
  return getDeployableReaderCatalog(catalog).filter((story) => {
    const metadata = ALL_CURATED_STORY_METADATA[story.id];
    const report = classifyContent(story, metadata ?? {});

    if (metadata) {
      return metadata.pilotEligible === true && report.minutes <= 5;
    }

    const isExistingOkurioContent =
      typeof story.yazar === "string" && story.yazar.startsWith("Okurio");

    return isExistingOkurioContent && report.minutes <= 5;
  });
}

export function getStoryMetadata(storyId) {
  return ALL_CURATED_STORY_METADATA[storyId] ?? null;
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
    newStoryCount: ALL_CURATED_STORIES.length,
    pilotStoryIds: pilotCatalog.map((story) => story.id),
  };
}

export {
  ALL_CURATED_STORIES,
  ALL_CURATED_STORIES_LEGACY,
  ALL_CURATED_STORY_METADATA,
  PILOT_STORIES_LEGACY,
  PILOT_STORY_METADATA,
};