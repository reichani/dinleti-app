const ENGLISH_MARKERS = new Set([
  "a", "about", "after", "all", "an", "and", "are", "as", "at", "be", "because",
  "been", "but", "by", "can", "could", "did", "do", "for", "from", "had", "has",
  "have", "he", "her", "him", "his", "how", "i", "if", "in", "into", "is", "it",
  "its", "my", "no", "not", "of", "on", "one", "or", "our", "said", "she", "so",
  "that", "the", "their", "them", "then", "there", "they", "this", "to", "up",
  "very", "was", "we", "were", "what", "when", "which", "who", "will", "with",
  "would", "you", "your",
]);

const TURKISH_MARKERS = new Set([
  "ama", "ben", "bir", "biz", "bu", "çok", "da", "daha", "de", "dedi", "diye",
  "gibi", "için", "ile", "kadar", "mi", "mı", "ne", "o", "olan", "olarak",
  "onu", "onun", "sen", "sonra", "şu", "ve", "ya", "yok", "var",
]);

// Yalnız Türkçede görülen harfler. "ı" ve "i" bilinçli olarak dışarıda:
// İngilizce büyük "I" harfi Türkçe yerel ayarla küçültülünce "ı" olur ve
// eski sürümde İngilizce metni Türkçe gösteriyordu (v2.9.3 düzeltmesi).
const TURKISH_ONLY_LETTERS = /[çğöşüİ]/gu;
const TURKISH_DOTLESS_I = /ı/gu;

/**
 * Detects the dominant language needed by the browser TTS engine.
 * Okurio supports Turkish and English reading voices. Ambiguous, very short,
 * numeric or proper-name-heavy text safely falls back to Turkish.
 *
 * Normalisation is locale-neutral on purpose: `toLocaleLowerCase("tr-TR")`
 * turns English "I", "It", "In", "Is" into "ı", "ıt", "ın", "ıs", which
 * removed English markers and inflated the Turkish score.
 */
export function detectTextLanguage(text) {
  const raw = String(text || "");
  const words = raw.match(/[\p{L}]+(?:['’][\p{L}]+)?/gu) || [];
  if (words.length < 3) return "tr";

  let englishScore = 0;
  let turkishScore = 0;
  for (const rawWord of words) {
    const base = rawWord.replace(/[’'].+$/u, "");
    const neutral = base.toLowerCase();
    const turkish = base.toLocaleLowerCase("tr-TR");
    if (ENGLISH_MARKERS.has(neutral)) englishScore += 1;
    if (TURKISH_MARKERS.has(turkish)) turkishScore += 1;
  }

  // Türkçe karakterler: büyük "I" kaynaklı yanlış "ı" sayılmaz; yalnız
  // metinde gerçekten küçük yazılmış "ı" ve Türkçeye özgü harfler sayılır.
  const turkishCharacters =
    (raw.match(TURKISH_ONLY_LETTERS) || []).length +
    (raw.match(TURKISH_DOTLESS_I) || []).length;
  turkishScore += Math.min(8, turkishCharacters);

  // A single shared/accidental marker must not flip the document voice.
  return englishScore >= 2 && englishScore >= turkishScore * 1.5 ? "en" : "tr";
}
