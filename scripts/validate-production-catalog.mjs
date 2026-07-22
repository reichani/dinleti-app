import { ALL_CURATED_STORIES } from "../src/content/pilotCatalogAdapter.js";

const WORDS_PER_MINUTE = 155;

const AGE_BANDS = [
  { id: "3-5", pattern: /\b(3|4|5)(?:\s*-\s*(4|5))?\s*yas\b/u, minimumSeconds: 120 },
  { id: "6-7", pattern: /\b6\s*-\s*7\s*yas\b/u, minimumSeconds: 180 },
  { id: "8-10", pattern: /\b8\s*-\s*10\s*yas\b/u, minimumSeconds: 240 },
  { id: "11-13", pattern: /\b11\s*-\s*13\s*yas\b/u, minimumSeconds: 300 },
  { id: "14-17", pattern: /\b14\s*-\s*17\s*yas\b/u, minimumSeconds: 360 },
  { id: "18+", pattern: /\b(18\+|yetiskin|16\+)\b/u, minimumSeconds: 360 },
];

const DEFAULT_MINIMUM_SECONDS = 120;

const normalize = (value) =>
  String(value ?? "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .replace(/ı/gu, "i")
    .replace(/[^a-z0-9+]+/gu, " ")
    .trim();

const storyText = (story) =>
  (story?.legacy?.bolumler ?? story?.bolumler ?? [])
    .map((section) => section?.metin ?? "")
    .join(" ")
    .trim();

const countWords = (text) =>
  text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

const resolveAgeBand = (story) => {
  const source = story?.legacy ?? story ?? {};
  const metadata = story?.metadata ?? {};
  const ageLabel = normalize(
    metadata.ageBand ?? metadata.ageGroup ?? metadata.yas ?? source.yas ?? source.age,
  );
  const band = AGE_BANDS.find((candidate) => candidate.pattern.test(ageLabel));
  return {
    ageLabel: source.yas ?? metadata.ageBand ?? metadata.ageGroup ?? "belirsiz",
    ageBand: band?.id ?? "belirsiz",
    minimumSeconds: band?.minimumSeconds ?? DEFAULT_MINIMUM_SECONDS,
  };
};

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
  const { ageLabel, ageBand, minimumSeconds } = resolveAgeBand(story);
  const blockers = [];

  if (preparing) blockers.push("Hazırlanıyor/boş içerik aktif katalogda.");
  if (!preparing && !microExercise && seconds < minimumSeconds) {
    blockers.push(
      `Yaş grubu ${ageBand} için tam okuma ${seconds} sn; minimum ${minimumSeconds} sn.`,
    );
  }

  return {
    id: source.id ?? null,
    title: source.baslik ?? source.title ?? null,
    ageLabel,
    ageBand,
    wordCount,
    seconds,
    minimumSeconds,
    preparing,
    microExercise,
    blockers,
  };
});

const blocked = reports.filter((report) => report.blockers.length > 0);
console.table(
  reports.map(
    ({ id, title, ageBand, wordCount, seconds, minimumSeconds, preparing, microExercise, blockers }) => ({
      id,
      title,
      ageBand,
      wordCount,
      seconds,
      minimumSeconds,
      preparing,
      microExercise,
      status: blockers.length ? "BLOCKED" : "READY",
    }),
  ),
);

const ageSummary = Object.values(
  reports.reduce((summary, report) => {
    const key = report.ageBand;
    summary[key] ??= { ageBand: key, contentCount: 0, blockedCount: 0, shortestSeconds: null };
    summary[key].contentCount += 1;
    summary[key].blockedCount += report.blockers.length > 0 ? 1 : 0;
    summary[key].shortestSeconds =
      summary[key].shortestSeconds === null
        ? report.seconds
        : Math.min(summary[key].shortestSeconds, report.seconds);
    return summary;
  }, {}),
);
console.log("\nYaş grubu özeti:");
console.table(ageSummary);

if (blocked.length > 0) {
  console.error("\nProduction katalog kapısı başarısız:");
  for (const report of blocked) {
    console.error(`- [${report.ageBand}] ${report.title ?? report.id}: ${report.blockers.join(" ")}`);
  }
  process.exit(1);
}

console.log("\nProduction katalog kapısı geçti: yaş grubuna göre aşırı kısa veya hazırlanan içerik yok.");
