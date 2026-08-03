export const CONTENT_STATUS = Object.freeze({
  MICRO_EXERCISE: "micro-exercise",
  FULL_READING: "full-reading",
  PREPARING: "preparing",
});

const STATUS_LABELS = Object.freeze({
  [CONTENT_STATUS.MICRO_EXERCISE]: "Mikro alıştırma",
  [CONTENT_STATUS.FULL_READING]: "Tam okuma",
  [CONTENT_STATUS.PREPARING]: "Hazırlanıyor",
});

const DEFAULT_WORDS_PER_MINUTE = 155;
const DEFAULT_MINIMUM_FULL_READING_SECONDS = 120;

const normalizeLabel = (value) =>
  String(value ?? "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .replace(/ı/gu, "i")
    .replace(/[^a-z0-9]+/gu, " ")
    .trim();

const unwrapStory = (story) => story?.legacy ?? story ?? {};

const storyText = (story) => {
  if (typeof story === "string") return story;

  const source = unwrapStory(story);
  const sections = source.bolumler ?? source.sections ?? source.chapters;

  if (Array.isArray(sections)) {
    return sections
      .map((section) => section?.metin ?? section?.text ?? section?.content ?? "")
      .join(" ");
  }

  return source.metin ?? source.text ?? source.content ?? "";
};

export function countStoryWords(story) {
  const matches = storyText(story).match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu);
  return matches?.length ?? 0;
}

export function estimateStorySeconds(story, wpm = DEFAULT_WORDS_PER_MINUTE) {
  if (!Number.isFinite(wpm) || wpm <= 0) {
    throw new TypeError("wpm must be a positive finite number.");
  }

  const wordCount = countStoryWords(story);
  return wordCount === 0 ? 0 : Math.ceil((wordCount * 60) / wpm);
}

const includesAny = (value, patterns) => patterns.some((pattern) => pattern.test(value));

const isPreparing = (source, metadata, wordCount) => {
  const declaredState = normalizeLabel(
    metadata.status ??
      metadata.contentStatus ??
      metadata.icerikDurumu ??
      source.icerikDurumu ??
      source.contentStatus ??
      source.status,
  );

  return (
    metadata.preparing === true ||
    wordCount === 0 ||
    includesAny(declaredState, [
      /\bhazirlaniyor\b/u,
      /\bpreparing\b/u,
      /\bcoming soon\b/u,
      /\bplaceholder\b/u,
    ])
  );
};

const isMicroExercise = (source, metadata) => {
  if (metadata.isMicroExercise === true) return true;

  const declaredType = normalizeLabel(
    metadata.contentType ??
      metadata.type ??
      metadata.icerikTuru ??
      source.icerikTuru ??
      source.icerikDurumu ??
      source.contentType,
  );

  if (
    includesAny(declaredType, [
      /\bmikro alistirma\b/u,
      /\bmicro exercise\b/u,
      /\bword card\b/u,
      /\bkelime karti\b/u,
      /\bhece karti\b/u,
      /\bharf karti\b/u,
    ])
  ) {
    return true;
  }

  const id = normalizeLabel(source.id);
  const title = normalizeLabel(source.baslik ?? source.title);
  const category = normalizeLabel(source.kategori ?? source.category);
  const sectionNames = normalizeLabel(
    (source.bolumler ?? source.sections ?? [])
      .map((section) => section?.ad ?? section?.title ?? "")
      .join(" "),
  );

  return (
    includesAny(id, [
      /(^| )oki ses [a-z0-9]+($| )/u,
      /\bhece(ler)?\b/u,
      /\bkelime kart/u,
      /\bword card/u,
    ]) ||
    includesAny(title, [/^[a-z0-9] sesi$/u, /\bhece kart/u, /\bkelime kart/u]) ||
    includesAny(category, [
      /\benglish card\b/u,
      /\bword card\b/u,
      /\bkelime kart/u,
      /\bharf kart/u,
      /\bhece kart/u,
      /\bbilmece\b/u,
      /\btekerleme\b/u,
      /\britim oyunu\b/u,
    ]) ||
    includesAny(sectionNames, [
      /\bharf ve hece\b/u,
      /\bheceye gec\b/u,
      /\bhece kartlari\b/u,
      /\bkelime kartlari\b/u,
    ])
  );
};

const isBrowserRuntime = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Classify catalog content without trusting hand-authored duration fields.
 *
 * Node-based validation remains strict: normal readings under the minimum are
 * reported as blockers. The reader runtime does not convert already-published,
 * non-empty legacy catalog items into disabled "Hazırlanıyor" cards. Explicit
 * preparing/placeholder records and empty content remain blocked everywhere.
 */
export function classifyContent(story, metadata = {}) {
  const source = unwrapStory(story);
  const wordCount = countStoryWords(source);
  const wordsPerMinute = metadata.wordsPerMinute ?? DEFAULT_WORDS_PER_MINUTE;
  const minimumFullReadingSeconds =
    metadata.minimumFullReadingSeconds ?? DEFAULT_MINIMUM_FULL_READING_SECONDS;
  const seconds = estimateStorySeconds(source, wordsPerMinute);

  let status = CONTENT_STATUS.FULL_READING;
  if (isPreparing(source, metadata, wordCount)) {
    status = CONTENT_STATUS.PREPARING;
  } else if (isMicroExercise(source, metadata)) {
    status = CONTENT_STATUS.MICRO_EXERCISE;
  }

  const blockers = [];
  const enforceDurationGate = metadata.enforceDurationGate === true || !isBrowserRuntime();
  if (
    enforceDurationGate &&
    status === CONTENT_STATUS.FULL_READING &&
    seconds < minimumFullReadingSeconds
  ) {
    blockers.push(
      `Normal reading "${source.baslik ?? source.title ?? source.id ?? "untitled"}" is ${seconds}s; minimum is ${minimumFullReadingSeconds}s.`,
    );
  }

  return {
    status,
    label: STATUS_LABELS[status],
    wordCount,
    seconds,
    minutes: Number((seconds / 60).toFixed(1)),
    deployable: blockers.length === 0,
    blockers,
  };
}

export function assertDeployableCatalog(stories, metadataById = {}) {
  if (!Array.isArray(stories)) {
    throw new TypeError("stories must be an array.");
  }

  const reports = stories.map((story) => {
    const source = unwrapStory(story);
    const metadata = metadataById[source.id] ?? story?.metadata ?? {};
    return {
      id: source.id ?? null,
      title: source.baslik ?? source.title ?? null,
      ...classifyContent(story, { ...metadata, enforceDurationGate: true }),
    };
  });
  const blockers = reports.flatMap((report) =>
    report.blockers.map((message) => ({ id: report.id, message })),
  );
  const result = {
    deployable: blockers.length === 0,
    reports,
    blockers,
    summary: {
      storyCount: reports.length,
      fullReadingCount: reports.filter(
        (report) => report.status === CONTENT_STATUS.FULL_READING,
      ).length,
      microExerciseCount: reports.filter(
        (report) => report.status === CONTENT_STATUS.MICRO_EXERCISE,
      ).length,
      preparingCount: reports.filter(
        (report) => report.status === CONTENT_STATUS.PREPARING,
      ).length,
      blockerCount: blockers.length,
    },
  };

  if (!result.deployable) {
    const error = new Error(
      `Content integrity blocked deployment (${blockers.length} item${blockers.length === 1 ? "" : "s"}).`,
    );
    error.name = "ContentIntegrityError";
    error.code = "CONTENT_INTEGRITY_BLOCKED";
    error.report = result;
    throw error;
  }

  return result;
}
