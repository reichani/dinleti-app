import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";
import { COMPLETE_OKURIO_SESSIONS } from "../src/content/completeOkurioSessions.js";
import { PETER_RABBIT_FULL } from "../src/content/fullPublicDomainStories.js";
import { ANDERSEN_STORIES } from "../src/content/andersenStories.js";
import { mergePilotStories } from "../src/content/pilotCatalogAdapter.js";
import { evaluateContentQualityReview } from "../src/content/contentQualityReview.js";

const WORDS_PER_MINUTE = 155;
const DURATION_TOLERANCE = 0.15;

const AGE_TARGETS = Object.freeze({
  "3-4": { min: 150, max: 300 },
  "5-6": { min: 200, max: 400 },
  "6-7": { min: 250, max: 500 },
  "7-8": { min: 350, max: 650 },
  "8-10": { min: 500, max: 900 },
  "10-12": { min: 700, max: 1200 },
  "12-14": { min: 900, max: 1600 },
  "14-16": { min: 1200, max: 2000 },
  "16-18": { min: 1500, max: 2500 },
  "18+": { min: 1800, max: 3500 },
});

const READING_PATH_BY_AGE_BAND = Object.freeze({
  "3-4": "okul_oncesi_3_4",
  "5-6": "okumaya_hazirlik_5_6",
  "6-7": "ilk_harfler_6_7",
  "7-8": "ilk_cumleler_7_8",
  "8-10": "okuma_guveni_8_10",
  "10-12": "akici_okuma_10_12",
  "12-14": "genc_okurlar_12_14",
  "14-16": "klasiklere_hazirlik_14_16",
  "16-18": "lise_okuma_16_18",
  "18+": "yetiskin_odak_18",
});

const AGE_ALIASES = Object.freeze({
  "3-4": "3-4",
  "3-5": "3-4",
  "3-6": "5-6",
  "4-6": "5-6",
  "4-8": "6-7",
  "5-6": "5-6",
  "5-7": "6-7",
  "5-8": "6-7",
  "5-9": "7-8",
  "6-7": "6-7",
  "6-8": "7-8",
  "6-9": "7-8",
  "7-8": "7-8",
  "7-10": "8-10",
  "7-12": "10-12",
  "8-10": "8-10",
  "10-12": "10-12",
  "10+": "10-12",
  "11-16": "12-14",
  "12-14": "12-14",
  "12+": "12-14",
  "13+": "12-14",
  "14-18": "16-18",
  "16+": "16-18",
  "18+": "18+",
});

const normalizeAge = (value) =>
  String(value ?? "")
    .toLocaleLowerCase("tr-TR")
    .replace(/[–—]/gu, "-")
    .replace(/\s+/gu, "")
    .replace(/yaş|yas/gu, "");

const mapAgeBand = (value) => AGE_ALIASES[normalizeAge(value)] ?? "unmapped";

const countWords = (text) =>
  String(text ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

const storyBody = (story) =>
  (story?.bolumler ?? story?.sections ?? [])
    .map((section) => section?.metin ?? section?.text ?? "")
    .join(" ")
    .trim();

const sentenceList = (text) =>
  String(text ?? "")
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

const isMicroExercise = (story) => {
  const id = String(story?.id ?? "").toLocaleLowerCase("tr-TR");
  const title = String(story?.baslik ?? "").toLocaleLowerCase("tr-TR");
  const category = String(story?.kategori ?? "").toLocaleLowerCase("tr-TR");
  const declaredType = String(
    story?.icerikTuru ?? story?.icerikDurumu ?? "",
  ).toLocaleLowerCase("tr-TR");
  const sectionNames = (story?.bolumler ?? [])
    .map((section) => section?.ad ?? "")
    .join(" ")
    .toLocaleLowerCase("tr-TR");

  return (
    /(?:^|-)oki-ses-(?:[a-z0-9]+)(?:-|$)/u.test(id) ||
    /(?:heceler|kelimeler|word-card|words-card)/u.test(id) ||
    /^[a-zçğıöşü] sesi$/u.test(title) ||
    /(?:kelime kart|word card|english card|bilmece|tekerleme|ritim oyunu)/u.test(
      category,
    ) ||
    /(?:mikro alıştırma|micro exercise|kelime kart|word card|harf kart|hece kart)/u.test(
      declaredType,
    ) ||
    /(?:hece kartları|kelime kartları|harf ve hece|heceye geç)/u.test(sectionNames)
  );
};

function loadMergedCatalog() {
  const source = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
  const startToken = "const KATALOG = mergePilotStories([";
  const endToken = "\n]);\n\nconst RAFLAR";
  const start = source.indexOf(startToken);
  const end = source.indexOf(endToken, start);
  if (start < 0 || end < 0) throw new Error("App.jsx KATALOG sınırı bulunamadı.");

  const expression = source.slice(start + "const KATALOG = ".length, end + 3);
  return vm.runInNewContext(expression, {
    COMPLETE_OKURIO_SESSIONS,
    PETER_RABBIT_FULL,
    ANDERSEN_STORIES,
    mergePilotStories,
  });
}

const catalog = loadMergedCatalog();
const reports = catalog.map((story) => {
  const body = storyBody(story);
  const wordCount = countWords(body);
  const estimatedSeconds = wordCount === 0 ? 0 : Math.ceil((wordCount * 60) / WORDS_PER_MINUTE);
  const declaredSeconds = Number(story?.sureDk) > 0 ? Number(story.sureDk) * 60 : null;
  const durationDelta =
    declaredSeconds && estimatedSeconds
      ? Math.abs(declaredSeconds - estimatedSeconds) / estimatedSeconds
      : null;
  const ageBand = mapAgeBand(story?.yas);
  const target = AGE_TARGETS[ageBand] ?? null;
  const microExercise = isMicroExercise(story);
  const sections = story?.bolumler ?? [];
  const sectionWords = sections.map((section) => countWords(section?.metin ?? ""));
  const paragraphs = sections.flatMap((section) =>
    String(section?.metin ?? "")
      .split(/\n\s*\n/u)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
  );
  const sentences = sentenceList(body);
  const sentenceWords = sentences.map(countWords);
  const review = story?.contentQualityReview ?? story?.metadata?.contentQualityReview ?? null;
  const readingPathId = READING_PATH_BY_AGE_BAND[ageBand] ?? null;
  const reviewEvaluation = evaluateContentQualityReview(review, { readingPathId });
  const rightsStatus = story?.hakDurumu ?? story?.metadata?.rightsStatus ?? "missing";
  const sourceUrl =
    story?.kaynak?.url ??
    story?.kaynak?.sourceUrl ??
    story?.metadata?.sourceTruth?.primaryText?.url ??
    null;
  const sourceScope =
    story?.icerikDurumu ??
    story?.metadata?.adaptationScope ??
    story?.metadata?.contentStatus ??
    null;
  const publicDomain =
    /(?:kamu-mali|public-domain)/u.test(String(rightsStatus).toLocaleLowerCase("tr-TR")) ||
    /public domain/iu.test(String(story?.kategori ?? ""));
  const blockers = [];

  if (!microExercise && target && wordCount < target.min) {
    blockers.push(`age-minimum:${wordCount}<${target.min}`);
  }
  if (!microExercise && (sections.length < 3 || sections.length > 8)) {
    blockers.push(`section-count:${sections.length}`);
  }
  if (!microExercise && sectionWords.some((count) => count < 30)) {
    blockers.push("short-section");
  }
  if (durationDelta !== null && durationDelta > DURATION_TOLERANCE) {
    blockers.push(`duration-delta:${Math.round(durationDelta * 100)}%`);
  }
  if (!microExercise && !reviewEvaluation.publicationReady) {
    blockers.push(...reviewEvaluation.schemaBlockers.map((item) => `content-review-schema:${item}`));
    blockers.push(...reviewEvaluation.approvalBlockers.map((item) => `content-review:${item}`));
  }
  if (publicDomain && (!sourceUrl || !sourceScope)) {
    blockers.push("public-domain-source-or-scope-missing");
  }
  if (story?.releaseReady === true && review?.status !== "approved") {
    blockers.push("releaseReady-without-human-approval");
  }

  return {
    id: story?.id ?? null,
    title: story?.baslik ?? story?.title ?? null,
    category: story?.kategori ?? null,
    ageLabel: story?.yas ?? null,
    ageBand,
    wordCount,
    target,
    estimatedSeconds,
    declaredSeconds,
    durationDeltaPercent: durationDelta === null ? null : Number((durationDelta * 100).toFixed(1)),
    microExercise,
    sectionCount: sections.length,
    sectionWords,
    averageSentenceWords:
      sentenceWords.length > 0
        ? Number(
            (
              sentenceWords.reduce((sum, count) => sum + count, 0) / sentenceWords.length
            ).toFixed(2),
          )
        : 0,
    longestSentenceWords: sentenceWords.length > 0 ? Math.max(...sentenceWords) : 0,
    paragraphOverThreeSentences: paragraphs.filter(
      (paragraph) => sentenceList(paragraph).length > 3,
    ).length,
    contentQualityReviewStatus: review?.status ?? "missing",
    readingPathId,
    candidateDeployReady: reviewEvaluation.candidateDeployReady,
    publicationReady: reviewEvaluation.publicationReady,
    rightsStatus,
    publicDomain,
    sourceUrl,
    sourceScope,
    releaseReady: story?.releaseReady ?? false,
    blockers,
  };
});

const fullReadings = reports.filter((report) => !report.microExercise);
const ageSummary = Object.entries(AGE_TARGETS).map(([ageBand, target]) => {
  const items = fullReadings.filter((report) => report.ageBand === ageBand);
  const counts = items.map((item) => item.wordCount).sort((a, b) => a - b);
  const median =
    counts.length === 0
      ? 0
      : counts.length % 2
        ? counts[(counts.length - 1) / 2]
        : (counts[counts.length / 2 - 1] + counts[counts.length / 2]) / 2;
  return {
    ageBand,
    target,
    storyCount: items.length,
    averageWords:
      counts.length === 0
        ? 0
        : Number((counts.reduce((sum, count) => sum + count, 0) / counts.length).toFixed(1)),
    medianWords: median,
    belowMinimum: items.filter((item) => item.wordCount < target.min).length,
  };
});

const output = {
  generatedAt: new Date().toISOString(),
  wordsPerMinute: WORDS_PER_MINUTE,
  durationTolerancePercent: DURATION_TOLERANCE * 100,
  catalogCount: reports.length,
  fullReadingCount: fullReadings.length,
  microExerciseCount: reports.length - fullReadings.length,
  underOrEqual20Seconds: fullReadings.filter((report) => report.estimatedSeconds <= 20).length,
  blockedFullReadings: fullReadings.filter((report) => report.blockers.length > 0).length,
  ageSummary,
  reports,
};

writeFileSync(
  new URL("../catalog-quality-audit.json", import.meta.url),
  `${JSON.stringify(output, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(output, null, 2));

if (output.blockedFullReadings > 0) {
  process.exitCode = 1;
}
