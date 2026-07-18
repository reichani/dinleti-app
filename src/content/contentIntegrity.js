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

/** Count only the words a reader will actually encounter in the reading body. */
export function countStoryWords(story) {
  const matches = storyText(story).match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu);
  return matches?.length ?? 0;
}

/** Estimate spoken/read-aloud duration from the body word count, never from sureDk. */
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

  // These are exercises by product intent, even when their duration is under two minutes.
  // Short narrative content is deliberately not inferred as an exercise from duration alone.
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

/**
 * Classify catalog content without trusting hand-authored duration fields.
 *
 * Full readings shorter than two real minutes are retained as full readings but
 * marked non-deployable. This prevents a short excerpt from escaping the gate by
 * being silently reclassified as a micro exercise.
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
  if (
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

/**
 * Throw when a normal reading is too short for deployment.
 * Preparing placeholders and genuine letter/syllable/card exercises may coexist
 * with the catalog and do not weaken the normal-reading gate.
 */
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
      ...classifyContent(story, metadata),
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

