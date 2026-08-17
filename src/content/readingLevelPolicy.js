import { CONTENT_STATUS, classifyContent } from "./contentIntegrity.js";
import { readingPathIdForAgeLabel } from "./contentQualityReview.js";

export const WORDS_PER_MINUTE = 155;

export const READING_LEVEL_WORD_TARGETS = Object.freeze({
  okul_oncesi_3_4: Object.freeze({ minWords: 150, maxWords: 300 }),
  okumaya_hazirlik_5_6: Object.freeze({ minWords: 200, maxWords: 400 }),
  ilk_harfler_6_7: Object.freeze({ minWords: 250, maxWords: 500 }),
  ilk_cumleler_7_8: Object.freeze({ minWords: 350, maxWords: 650 }),
  okuma_guveni_8_10: Object.freeze({ minWords: 500, maxWords: 900 }),
  akici_okuma_10_12: Object.freeze({ minWords: 700, maxWords: 1200 }),
  genc_okurlar_12_14: Object.freeze({ minWords: 900, maxWords: 1600 }),
  klasiklere_hazirlik_14_16: Object.freeze({ minWords: 1200, maxWords: 2000 }),
  lise_okuma_16_18: Object.freeze({ minWords: 1500, maxWords: 2500 }),
  yetiskin_odak_18: Object.freeze({ minWords: 1800, maxWords: 3500 }),
});

export function readingLevelTarget(yolId) {
  return READING_LEVEL_WORD_TARGETS[yolId] ?? null;
}

export function evaluateStoryForReadingLevel(story, metadata = {}, yolId) {
  if (metadata.icerikTuru === "kullanici_metni") {
    return { eligible: true, reason: null, target: null };
  }

  const target = readingLevelTarget(yolId);
  if (!target) return { eligible: false, reason: "unknown-reading-level", target: null };

  const classification = classifyContent(story, {
    ...metadata,
    wordsPerMinute: WORDS_PER_MINUTE,
    minimumFullReadingSeconds: Math.ceil((target.minWords * 60) / WORDS_PER_MINUTE),
  });

  if (classification.status !== CONTENT_STATUS.FULL_READING) {
    return {
      eligible: false,
      reason: classification.status,
      target,
      ...classification,
    };
  }

  const declaredReadingPathId =
    metadata.readingPathId ??
    readingPathIdForAgeLabel(metadata.ageBand ?? story?.yas);
  if (declaredReadingPathId && declaredReadingPathId !== yolId) {
    return {
      eligible: false,
      reason: "reading-path-mismatch",
      declaredReadingPathId,
      requestedReadingPathId: yolId,
      target,
      ...classification,
    };
  }

  if (classification.wordCount < target.minWords) {
    return { eligible: false, reason: "below-level-minimum", target, ...classification };
  }
  if (classification.wordCount > target.maxWords) {
    return { eligible: false, reason: "above-level-maximum", target, ...classification };
  }

  return { eligible: true, reason: null, target, ...classification };
}
