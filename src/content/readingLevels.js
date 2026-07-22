export const READING_LEVELS = Object.freeze([
  {
    id: "L0",
    name: "Ses ve Kelime Başlangıcı",
    ageGuidance: "5-7",
    minWords: 0,
    maxWords: 120,
    targetMinutes: "1-2",
    sentenceWords: [2, 7],
    newWordRatioMax: 0.02,
    narrative: "Tek olay, yoğun tekrar, somut sözcükler ve açık kapanış.",
  },
  {
    id: "L1",
    name: "İlk Kısa Hikâye",
    ageGuidance: "6-8",
    minWords: 121,
    maxWords: 300,
    targetMinutes: "2-4",
    sentenceWords: [4, 9],
    newWordRatioMax: 0.03,
    narrative: "Başlangıç-gelişme-sonuç; tek ana karakter ve tek sorun.",
  },
  {
    id: "L2",
    name: "Akıcı Hikâye",
    ageGuidance: "7-10",
    minWords: 301,
    maxWords: 600,
    targetMinutes: "4-7",
    sentenceWords: [6, 12],
    newWordRatioMax: 0.04,
    narrative: "İki veya üç sahne, neden-sonuç ilişkisi, sınırlı betimleme.",
  },
  {
    id: "L3",
    name: "Zenginleşen Anlatı",
    ageGuidance: "9-12",
    minWords: 601,
    maxWords: 1000,
    targetMinutes: "7-11",
    sentenceWords: [8, 15],
    newWordRatioMax: 0.05,
    narrative: "Yan karakter, küçük sürpriz, duygu ve ortam betimlemesi.",
  },
  {
    id: "L4",
    name: "Çok Katmanlı Hikâye",
    ageGuidance: "11-14",
    minWords: 1001,
    maxWords: 1700,
    targetMinutes: "11-18",
    sentenceWords: [9, 18],
    newWordRatioMax: 0.06,
    narrative: "Birden çok sahne, karakter motivasyonu, mecaz ve çıkarım.",
  },
  {
    id: "L5",
    name: "Genç ve Yetişkin Okuma",
    ageGuidance: "14+",
    minWords: 1701,
    maxWords: Number.POSITIVE_INFINITY,
    targetMinutes: "18+",
    sentenceWords: [10, 24],
    newWordRatioMax: 0.07,
    narrative: "Tema, alt metin, bakış açısı ve daha geniş söz varlığı.",
  },
]);

export function countWords(text = "") {
  return String(text).match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

export function getStoryWordCount(story) {
  const sections = story?.bolumler ?? story?.sections ?? [];
  const text = Array.isArray(sections)
    ? sections.map((section) => section?.metin ?? section?.text ?? "").join(" ")
    : story?.metin ?? story?.text ?? "";
  return countWords(text);
}

export function getReadingLevelByWordCount(wordCount) {
  const safeCount = Math.max(0, Number(wordCount) || 0);
  return READING_LEVELS.find(
    (level) => safeCount >= level.minWords && safeCount <= level.maxWords,
  ) ?? READING_LEVELS[READING_LEVELS.length - 1];
}

export function enrichStoryWithReadingLevel(story) {
  const wordCount = getStoryWordCount(story);
  const level = getReadingLevelByWordCount(wordCount);
  return {
    ...story,
    okumaSeviyesi: level.id,
    kelimeAdedi: wordCount,
    seviyeAdi: level.name,
  };
}

export function buildProgressiveReadingPath(stories = []) {
  return stories
    .map(enrichStoryWithReadingLevel)
    .sort((a, b) => {
      const levelA = READING_LEVELS.findIndex((level) => level.id === a.okumaSeviyesi);
      const levelB = READING_LEVELS.findIndex((level) => level.id === b.okumaSeviyesi);
      return levelA - levelB || a.kelimeAdedi - b.kelimeAdedi;
    });
}
