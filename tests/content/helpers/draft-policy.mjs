// Taslak testleri için okuma yolu sınırları. Tek kaynak: src/content/readingLevelPolicy.js
// (toplam kelime) ve src/content/lengthOptimizationPolicy.js (pasaj ve cümle sınırı).
// 2026-10-19 bağlama PR'ı: eski taslak testlerindeki sabit sınırlar buradan okunur.
import { READING_LEVEL_WORD_TARGETS } from "../../../src/content/readingLevelPolicy.js";
import { passageTargetForPath } from "../../../src/content/lengthOptimizationPolicy.js";

export function limits(draftOrPathId) {
  const yolId = typeof draftOrPathId === "string" ? draftOrPathId : draftOrPathId?.readingPathId;
  const total = READING_LEVEL_WORD_TARGETS[yolId];
  if (!total) throw new Error(`Okuma yolu için politika sınırı yok: ${yolId}`);
  const passage = passageTargetForPath(yolId);
  return {
    minWords: total.minWords,
    maxWords: total.maxWords,
    maxSentenceWords: passage.maxSentenceWords,
    passageMinWords: passage.minWords,
    passageMaxWords: passage.maxWords,
  };
}
