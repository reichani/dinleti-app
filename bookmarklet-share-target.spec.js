import {
  PILOT_STORIES,
  PILOT_STORIES_LEGACY,
  PILOT_STORY_METADATA,
} from "./pilotStories.js";
import { ODYSSEY_STORIES } from "./odysseyStories.js";
import { PRODUCTION_STORY_UPGRADES_BY_ID } from "./productionStoryUpgrades.js";

const BLOCKED_STORY_IDS = new Set([
  "mino-neden-uzuldu",
  "toto-bir-an-durdu",
  "mino-neden-uzuldu-v2",
  "toto-bir-an-durdu-v2",
  "oe-01-mino-neden-uzuldu",
  "os-01-toto-bir-an-durdu",
  // 2026-08-06: scripts/validate-production-catalog.mjs içindeki yaş-bandı regex hatası
  // düzeltildi ve bu üç Odysseia hikâyesinde iki gerçek QC ihlali ortaya çıktı: süre eşiği
  // (11-16 yaş: 235sn<300sn; 18+: 258sn<360sn) ve cümle uzunluğu politikası (cocuk sürümünde
  // 6 cümle "temel-zenginleşen" 12 kelime limitini aşıyordu).
  //
  // 2026-08-06 (devam): İçerik revize edildi — üçü de artık otomatik QC'den geçiyor:
  //   - odysseia-01-cocuk-truvadan-ayrilis: 6 uzun cümle, anlam korunarak ikiye bölündü
  //     (12 kelime/cümle limiti, ihlal yok). Süre zaten geçiyordu (231sn > 210sn).
  //   - odysseia-01-genc-truvadan-ayrilis: "İlk Sabahın Dersi" ve "Uzak Kıyının İşareti"
  //     adında 2 yeni bölüm eklendi (SOURCE_TRUTH.adaptationPolicy'ye uygun, dönüş
  //     yolculuğunun genel çerçevesinden özgün anlatım — yeni bir mitolojik olay/kaynak
  //     iddiası yok). Süre 235sn'den 311sn'e çıktı (min 300sn, +11sn pay). 1 uzun cümle
  //     de ayrıca ikiye bölündü (18 kelime/cümle limiti, ihlal yok).
  //   - odysseia-01-yetiskin-truvadan-ayrilis: "Payların Adaleti", "Bilinmeyen Kıyının
  //     Sınaması", "Geceye Bırakılan Sorular" adında 3 yeni bölüm eklendi (aynı kapsam
  //     ilkesiyle). Süre 258sn'den 372sn'e çıktı (min 360sn, +12sn pay).
  // sureDk ve metadata.estimatedMinutes alanları yeni gerçek sürelerle güncellendi.
  //
  // Üçü de hâlâ bloklu: metadata.humanExpertSignoff üçünde de "pending" ve bu, otomatik
  // QC'den bağımsız bir kapı — AI bu imzayı taklit edemez/geçemez (bkz. Dinleti_SOP_v1_1.md,
  // "AI never declares device/expert-verified"). Reyhan + ilgili konu uzmanı (Türkçe dil ve
  // çocuk edebiyatı / gençlik edebiyatı / sözlükbilim-edebiyat, ageBand'e göre) onayı
  // verdiğinde bu üç id buradan çıkarılabilir.
  "odysseia-01-genc-truvadan-ayrilis",
  "odysseia-01-yetiskin-truvadan-ayrilis",
  "odysseia-01-cocuk-truvadan-ayrilis",
]);

const ALL_CURATED_STORIES = [...ODYSSEY_STORIES, ...PILOT_STORIES];
const PRODUCTION_VISIBLE_CURATED_STORIES = ALL_CURATED_STORIES.filter(
  ({ legacy }) => !BLOCKED_STORY_IDS.has(legacy.id),
);
const ALL_CURATED_STORIES_LEGACY = ALL_CURATED_STORIES.map(({ legacy }) => legacy);
const ALL_CURATED_STORY_METADATA = Object.fromEntries(
  ALL_CURATED_STORIES.map(({ legacy, metadata }) => [legacy.id, metadata]),
);

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

  return [...newStories, ...upgradedCatalog];
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
