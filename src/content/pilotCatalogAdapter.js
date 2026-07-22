import {
  PILOT_STORIES,
  PILOT_STORIES_LEGACY,
  PILOT_STORY_METADATA,
} from "./pilotStories.js";
import { ODYSSEY_STORIES } from "./odysseyStories.js";

const ALL_CURATED_STORIES = [...ODYSSEY_STORIES, ...PILOT_STORIES];
const ALL_CURATED_STORIES_LEGACY = ALL_CURATED_STORIES.map(({ legacy }) => legacy);
const ALL_CURATED_STORY_METADATA = Object.fromEntries(
  ALL_CURATED_STORIES.map(({ legacy, metadata }) => [legacy.id, metadata]),
);

const RETIRED_PRODUCTION_TITLES = new Set([
  "Mino Neden Üzüldü?",
  "Toto Bir An Durdu",
]);

function isRetiredProductionStory(story) {
  return RETIRED_PRODUCTION_TITLES.has(String(story?.baslik || "").trim());
}

/**
 * Safely merges curated stories into the existing catalog without mutating the
 * original array or replacing an existing story with the same id.
 * Retired or incomplete production cards are removed before the catalog is
 * exposed to any user-facing surface.
 */
export function mergePilotStories(existingCatalog = []) {
  const productionSafeCatalog = existingCatalog.filter(
    (story) => !isRetiredProductionStory(story),
  );
  const existingIds = new Set(productionSafeCatalog.map((story) => story.id));
  const newStories = ALL_CURATED_STORIES_LEGACY.filter(
    (story) => !existingIds.has(story.id) && !isRetiredProductionStory(story),
  );

  return [...newStories, ...productionSafeCatalog];
}

/**
 * Pilot surfaces should only show short, explicitly eligible Okurio content.
 * Existing short Okurio stories remain visible during migration even before
 * their full metadata has been extracted from App.jsx.
 */
export function getPilotEligibleCatalog(catalog = []) {
  return catalog.filter((story) => {
    if (isRetiredProductionStory(story)) return false;

    const metadata = ALL_CURATED_STORY_METADATA[story.id];

    if (metadata) {
      return metadata.pilotEligible === true && story.sureDk <= 5;
    }

    const isExistingOkurioContent =
      typeof story.yazar === "string" && story.yazar.startsWith("Okurio");

    return isExistingOkurioContent && story.sureDk <= 5;
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
  RETIRED_PRODUCTION_TITLES,
};