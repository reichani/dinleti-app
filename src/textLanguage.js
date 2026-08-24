const ENGLISH_MARKERS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "from",
  "had", "has", "have", "he", "her", "his", "i", "in", "is", "it", "not",
  "of", "on", "or", "our", "she", "that", "the", "their", "they", "this",
  "to", "was", "we", "were", "with", "you", "your",
]);

const TURKISH_MARKERS = new Set([
  "ama", "ben", "bir", "biz", "bu", "da", "de", "dedi", "diye", "en",
  "gibi", "ile", "için", "mi", "ne", "o", "olan", "olarak", "onun",
  "sen", "şu", "ve", "ya", "çok",
]);

/**
 * Detects the dominant language needed by the browser TTS engine.
 * Okurio currently supports Turkish and English reading voices. Ambiguous,
 * very short, numeric or proper-name-heavy text safely falls back to Turkish.
 */
export function detectTextLanguage(text) {
  const normalized = String(text || "").toLocaleLowerCase("tr-TR");
  const words = normalized.match(/[a-zçğıöşü]+(?:['’][a-zçğıöşü]+)?/giu) || [];
  if (words.length < 3) return "tr";

  let englishScore = 0;
  let turkishScore = 0;
  for (const rawWord of words) {
    const word = rawWord.replace(/[’'].+$/u, "");
    if (ENGLISH_MARKERS.has(word)) englishScore += 1;
    if (TURKISH_MARKERS.has(word)) turkishScore += 1;
  }

  const turkishCharacters = (normalized.match(/[çğıöşü]/gu) || []).length;
  turkishScore += Math.min(6, turkishCharacters * 2);

  // A single shared/accidental marker must not flip the document voice.
  return englishScore >= 2 && englishScore >= turkishScore * 1.5 ? "en" : "tr";
}
