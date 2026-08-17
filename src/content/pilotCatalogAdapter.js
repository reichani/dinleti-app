import {
  PILOT_STORIES,
  PILOT_STORIES_LEGACY,
  PILOT_STORY_METADATA,
} from "./pilotStories.js";
import { ODYSSEY_STORIES } from "./odysseyStories.js";
import { PRODUCTION_STORY_UPGRADES_BY_ID } from "./productionStoryUpgrades.js";
import {
  evaluateContentQualityReview,
  normalizeContentQualityReview,
  readingPathIdForAgeLabel,
} from "./contentQualityReview.js";

const BLOCKED_STORY_IDS = new Set([
  "mino-neden-uzuldu",
  "toto-bir-an-durdu",
  "mino-neden-uzuldu-v2",
  "toto-bir-an-durdu-v2",
  "oe-01-mino-neden-uzuldu",
  "os-01-toto-bir-an-durdu",
]);

const ALL_CURATED_STORIES = [...ODYSSEY_STORIES, ...PILOT_STORIES];
const PRODUCTION_VISIBLE_CURATED_STORIES = ALL_CURATED_STORIES.filter(
  ({ legacy }) => !BLOCKED_STORY_IDS.has(legacy.id),
);
const ALL_CURATED_STORIES_LEGACY = ALL_CURATED_STORIES.map(({ legacy }) => legacy);
const ALL_CURATED_STORY_METADATA = Object.fromEntries(
  ALL_CURATED_STORIES.map(({ legacy, metadata }) => [legacy.id, metadata]),
);

const attachReviewContract = (story) => {
  const metadata = ALL_CURATED_STORY_METADATA[story.id] ?? story.metadata ?? {};
  const readingPathId =
    metadata.readingPathId ??
    readingPathIdForAgeLabel(metadata.ageBand ?? story.yas);
  const sourceReview = story.contentQualityReview ?? metadata.contentQualityReview;
  const contentQualityReview = normalizeContentQualityReview(sourceReview, readingPathId);
  const review = evaluateContentQualityReview(contentQualityReview, { readingPathId });

  return {
    ...story,
    contentQualityReview,
    releaseReady: story.releaseReady === true && review.publicationReady,
  };
};

/**
 * Safely merges curated stories into the existing catalog without mutating the
 * original array. Approved production upgrades replace matching legacy story
 * ids so short placeholders can be renewed without editing the monolithic App.
 * Draft/rewrite-queue ids remain hidden until their human sign-off gate closes.
 */
export function mergePilotStories(existingCatalog = []) {
  const upgradedCatalog = existingCatalog
    .map((story) => PRODUCTION_STORY_UPGRADES_BY_ID[story.id] ?? story)
    .filter((story) => !BLOCKED_STORY_IDS.has(story.id));

  const existingIds = new Set(upgradedCatalog.map((story) => story.id));
  const newStories = PRODUCTION_VISIBLE_CURATED_STORIES.map(({ legacy }) => legacy).filter(
    (story) => !existingIds.has(story.id),
  );

  return [...newStories, ...upgradedCatalog].map(attachReviewContract);
}

/**
 * Returns exactly the curated records eligible for production validation.
 * Draft and rewrite-queue records are excluded by the same source-of-truth set
 * used by catalog merge, preventing build gates from validating hidden content.
 */
export function getProductionVisibleCuratedStories() {
  return PRODUCTION_VISIBLE_CURATED_STORIES;
}

/**
 * Pilot surfaces should only show short, explicitly eligible Okurio content.
 * Blocked draft content must never appear even if legacy metadata is present.
 */
export function getPilotEligibleCatalog(catalog = []) {
  return catalog.filter((story) => {
    if (BLOCKED_STORY_IDS.has(story.id)) return false;

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
    newStoryCount: PRODUCTION_VISIBLE_CURATED_STORIES.length,
    pilotStoryIds: pilotCatalog.map((story) => story.id),
  };
}

export {
  ALL_CURATED_STORIES,
  PRODUCTION_VISIBLE_CURATED_STORIES,
  ALL_CURATED_STORIES_LEGACY,
  ALL_CURATED_STORY_METADATA,
  PILOT_STORIES_LEGACY,
  PILOT_STORY_METADATA,
};
