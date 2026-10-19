/**
 * Okurio uzunluk optimizasyon politikası (v1.0, 2026-10-18).
 *
 * Toplam metin hedefi readingLevelPolicy.js READING_LEVEL_WORD_TARGETS ile
 * aynıdır. Bu dosya ek olarak pasaj (bölüm) ve cümle düzeyinde hedef verir:
 * yaşa göre çok kısa pasaj okuma akışını keser, çok uzun pasaj disleksi ve
 * DEHB okurunu yorar. Uzunluk optimizasyon ajanı (.claude/agents/
 * okurio-uzunluk-optimizasyon-ajani.md) ve scripts/optimize-content-length.mjs
 * bu tabloyu kullanır; kendi metin bölümleme de aynı hedefe bağlanır.
 */
import { READING_LEVEL_WORD_TARGETS } from "./readingLevelPolicy.js";

export const PASSAGE_WORD_TARGETS = Object.freeze({
  okul_oncesi_3_4: Object.freeze({ minWords: 40, maxWords: 110, idealWords: 70, maxSentenceWords: 12 }),
  okumaya_hazirlik_5_6: Object.freeze({ minWords: 50, maxWords: 120, idealWords: 80, maxSentenceWords: 12 }),
  ilk_harfler_6_7: Object.freeze({ minWords: 50, maxWords: 130, idealWords: 85, maxSentenceWords: 12 }),
  ilk_cumleler_7_8: Object.freeze({ minWords: 70, maxWords: 170, idealWords: 110, maxSentenceWords: 14 }),
  okuma_guveni_8_10: Object.freeze({ minWords: 90, maxWords: 220, idealWords: 140, maxSentenceWords: 18 }),
  akici_okuma_10_12: Object.freeze({ minWords: 110, maxWords: 260, idealWords: 170, maxSentenceWords: 20 }),
  // K-2026-10-18-02 (Reyhan Açar): SOP-CONTENT-001 orta-ileri sınırı, 18 kelime. ontology/karar-kayitlari.json
  genc_okurlar_12_14: Object.freeze({ minWords: 120, maxWords: 300, idealWords: 190, maxSentenceWords: 18 }),
  klasiklere_hazirlik_14_16: Object.freeze({ minWords: 140, maxWords: 350, idealWords: 220, maxSentenceWords: 30 }),
  lise_okuma_16_18: Object.freeze({ minWords: 160, maxWords: 400, idealWords: 250, maxSentenceWords: 35 }),
  yetiskin_odak_18: Object.freeze({ minWords: 180, maxWords: 450, idealWords: 280, maxSentenceWords: 35 }),
});

export const LENGTH_VERDICT = Object.freeze({
  OK: "uygun",
  TOO_SHORT: "kisa",
  TOO_LONG: "uzun",
  PASSAGE_FIX: "pasaj-duzeltme",
  NOT_APPLICABLE: "kapsam-disi",
});

const countWords = (text) =>
  String(text ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

const sentenceWordCounts = (text) =>
  String(text ?? "")
    .split(/(?<=[.!?…])\s+/u)
    .map((sentence) => countWords(sentence))
    .filter((n) => n > 0);

export function passageTargetForPath(yolId) {
  return PASSAGE_WORD_TARGETS[yolId] ?? PASSAGE_WORD_TARGETS.okuma_guveni_8_10;
}

/**
 * Kendi metin (kullanıcı içeriği) bölümleme eşiği: okuma yolunun ideal pasaj
 * uzunluğu. v2.9.2'de her yol için sabit 90 kelimeydi; 14+ okurlar için
 * aşırı kısa pasaj ve sık bölüm geçişi üretiyordu.
 */
export function ownTextChunkWords(yolId) {
  return passageTargetForPath(yolId).idealWords;
}

/**
 * Bir hikâyeyi hedef okuma yoluna göre toplam, pasaj ve cümle düzeyinde ölçer.
 * Dosya değiştirmez; ajan ve CI için öneri üretir.
 */
export function auditStoryLength(story, yolId) {
  const total = READING_LEVEL_WORD_TARGETS[yolId];
  const passage = PASSAGE_WORD_TARGETS[yolId];
  const sections = story?.bolumler ?? [];
  if (!total || !passage || sections.length === 0) {
    return { id: story?.id ?? null, yolId, verdict: LENGTH_VERDICT.NOT_APPLICABLE, findings: [] };
  }

  const wordCount = sections.reduce((t, s) => t + countWords(s.metin), 0);
  const findings = [];
  if (wordCount < total.minWords) {
    findings.push({ level: "total", code: "below-min", message: `Toplam ${wordCount} kelime; ${yolId} için en az ${total.minWords}.`, missingWords: total.minWords - wordCount });
  }
  if (wordCount > total.maxWords) {
    findings.push({ level: "total", code: "above-max", message: `Toplam ${wordCount} kelime; ${yolId} için en çok ${total.maxWords}.`, extraWords: wordCount - total.maxWords });
  }

  const passages = sections.map((section, index) => {
    const words = countWords(section.metin);
    const sentences = sentenceWordCounts(section.metin);
    const longest = sentences.length ? Math.max(...sentences) : 0;
    if (words < passage.minWords) {
      findings.push({ level: "passage", index, code: "passage-too-short", message: `Bölüm ${index + 1} "${section.ad}" ${words} kelime; en az ${passage.minWords}. Komşu bölümle birleştir veya genişlet.` });
    }
    if (words > passage.maxWords) {
      findings.push({ level: "passage", index, code: "passage-too-long", message: `Bölüm ${index + 1} "${section.ad}" ${words} kelime; en çok ${passage.maxWords}. Anlam sınırında ikiye böl.` });
    }
    if (longest > passage.maxSentenceWords) {
      findings.push({ level: "sentence", index, code: "sentence-too-long", message: `Bölüm ${index + 1} en uzun cümle ${longest} kelime; sınır ${passage.maxSentenceWords}.` });
    }
    return { index, title: section.ad, words, longestSentence: longest };
  });

  let verdict = LENGTH_VERDICT.OK;
  if (findings.some((f) => f.code === "below-min")) verdict = LENGTH_VERDICT.TOO_SHORT;
  else if (findings.some((f) => f.code === "above-max")) verdict = LENGTH_VERDICT.TOO_LONG;
  else if (findings.length > 0) verdict = LENGTH_VERDICT.PASSAGE_FIX;

  return { id: story.id, title: story.baslik, yolId, wordCount, target: total, passageTarget: passage, passages, verdict, findings };
}
