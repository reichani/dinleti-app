const ENGLISH_MARKERS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "from",
  "had", "has", "have", "he", "her", "his", "i", "in", "is", "it", "not",
  "of", "on", "or", "our", "she", "that", "the", "their", "they", "this",
  "to", "was", "we", "were", "with", "you", "your",
  // v2.10: ders kitabı ve günlük dil için ek işlev kelimeleri.
  "my", "me", "do", "does", "did", "can", "will", "what", "where", "when",
  "how", "there", "these", "those", "then", "every", "some", "very", "about",
  "into", "would", "should", "could", "his", "him", "them", "its", "am",
]);

const TURKISH_MARKERS = new Set([
  "ama", "ben", "bir", "biz", "bu", "da", "de", "dedi", "diye", "en",
  "gibi", "ile", "için", "mi", "ne", "o", "olan", "olarak", "onun",
  "sen", "şu", "ve", "ya", "çok",
  "var", "yok", "daha", "kadar", "sonra", "önce", "her", "değil", "mı",
  "mi", "mu", "mü", "veya", "ise", "bunu", "şey", "oldu", "olur",
]);

/**
 * Detects the dominant language needed by the browser TTS engine.
 * Okurio currently supports Turkish and English reading voices. Ambiguous,
 * very short, numeric or proper-name-heavy text safely falls back to Turkish.
 */
export function detectTextLanguage(text) {
  const raw = String(text || "");
  // v2.10: Türkçe yerelinde küçük harfe çevirmek İngilizce "I" harfini "ı" yapıyordu;
  // "I have, I walk" gibi cümleler Türkçe harf puanı alıp Türkçe sesle okunuyordu.
  // Kelimeler yerelden bağımsız küçültülür; Türkçe harfler özgün metinden sayılır.
  const normalized = raw.replace(/İ/g, "i").replace(/I/g, "i").toLowerCase();
  const words = normalized.match(/[a-zçğıöşü]+(?:['’][a-zçğıöşü]+)?/giu) || [];
  if (words.length < 3) return "tr";

  let englishScore = 0;
  let turkishScore = 0;
  for (const rawWord of words) {
    const word = rawWord.replace(/[’'].+$/u, "");
    if (ENGLISH_MARKERS.has(word)) englishScore += 1;
    if (TURKISH_MARKERS.has(word)) turkishScore += 1;
  }

  const turkishCharacters = (raw.match(/[çğıöşüÇĞÖŞÜİ]/gu) || []).length;
  turkishScore += Math.min(6, turkishCharacters * 2);

  // A single shared/accidental marker must not flip the document voice.
  return englishScore >= 2 && englishScore >= turkishScore * 1.5 ? "en" : "tr";
}
