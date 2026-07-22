import { ALL_CURATED_STORIES } from "../src/content/pilotCatalogAdapter.js";

const MIN_FULL_READING_SECONDS = 120;
const WORDS_PER_MINUTE = 155;

const normalize = (value) =>
  String(value ?? "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .replace(/ı/gu, "i")
    .replace(/[^a-z0-9]+/gu, " ")
    .trim();

const storyText = (story) =>
  (story?.legacy?.bolumler ?? story?.bolumler ?? [])
    .map((section) => section?.metin ?? "")
    .join(" ")
    .trim();

const countWords = (text) =>
  text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

const isPreparing = (story) => {
  const source = story?.legacy ?? story ?? {};
  const metadata = story?.metadata ?? {};
  const state = normalize(
    metadata.status ??
      metadata.contentStatus ??
      metadata.icerikDurumu ??
      source.icerikDurumu ??
      source.status,
  );
  return !storyText(story) || /\b(hazirlaniyor|preparing|placeholder|coming soon)\b/u.test(state);
};

const isMicroExercise = (story) => {
  const source = story?.legacy ?? story ?? {};
  const metadata = story?.metadata ?? {};
  const value = normalize(
    metadata.contentType ??
      metadata.icerikTuru ??
      source.icerikTuru ??
      source.icerikDurumu ??
      source.kategori ??
      source.baslik,
  );
  return /\b(mikro alistirma|micro exercise|harf|hece|kelime karti|word card|bilmece|tekerleme|ritim oyunu)\b/u.test(value);
};

const reports = ALL_CURATED_STORIES.map((story) => {
  const source = story?.legacy ?? story ?? {};
  const wordCount = countWords(storyText(story));
  const seconds = wordCount === 0 ? 0 : Math.ceil((wordCount * 60) / WORDS_PER_MINUTE);
  const preparing = isPreparing(story);
  const microExercise = isMicroExercise(story);
  const blockers = [];

  if (preparing) blockers.push("Hazırlanıyor/boş içerik aktif katalogda.");
  if (!preparing && !microExercise && seconds < MIN_FULL_READING_SECONDS) {
    blockers.push(`Tam okuma ${seconds} sn; minimum ${MIN_FULL_READING_SECONDS} sn.`);
  }

  return {
    id: source.id ?? null,
    title: source.baslik ?? source.title ?? null,
    wordCount,
    seconds,
    preparing,
    microExercise,
    blockers,
  };
});

const blocked = reports.filter((report) => report.blockers.length > 0);
console.table(
  reports.map(({ id, title, wordCount, seconds, preparing, microExercise, blockers }) => ({
    id,
    title,
    wordCount,
    seconds,
    preparing,
    microExercise,
    status: blockers.length ? "BLOCKED" : "READY",
  })),
);

if (blocked.length > 0) {
  console.error("\nProduction katalog kapısı başarısız:");
  for (const report of blocked) {
    console.error(`- ${report.title ?? report.id}: ${report.blockers.join(" ")}`);
  }
  process.exit(1);
}

console.log("\nProduction katalog kapısı geçti: hazırlanıyor veya kısa normal içerik yok.");
