export const WORDS_PER_MINUTE = 155;

export const AGE_WORD_TARGETS = Object.freeze({
  "3-4": [150, 300],
  "5-6": [200, 400],
  "6-7": [250, 500],
  "7-8": [350, 650],
  "8-10": [500, 900],
  "10-12": [700, 1200],
  "12-14": [900, 1600],
  "14-16": [1200, 2000],
  "16-18": [1500, 2500],
  "18+": [1800, 3500],
});

export const REVIEW_CHECKLIST_KEYS = Object.freeze([
  "narrativeArc",
  "ageFit",
  "sectionContinuity",
  "characterConsistency",
  "languageQuality",
  "factualAccuracy",
  "originalityRights",
  "accessibilityTone",
]);

const REVIEW_STATUSES = new Set([
  "pending",
  "approved",
  "changes_requested",
  "rejected",
]);

const PROHIBITED_LANGUAGE = [
  /tedavi/iu,
  /terapi/iu,
  /\btanı\b/iu,
  /teşhis/iu,
  /bozukluk/iu,
  /yaramaz/iu,
  /kötü çocuk/iu,
];

export function countWords(text = "") {
  return text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

export function splitSentences(text = "") {
  return text
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function estimateSeconds(wordCount, wordsPerMinute = WORDS_PER_MINUTE) {
  return wordCount === 0 ? 0 : Math.ceil((wordCount * 60) / wordsPerMinute);
}

export function storyMetrics(story) {
  const sections = story?.legacy?.bolumler ?? story?.bolumler ?? [];
  const sectionWords = sections.map((section) => countWords(section.metin));
  const totalWords = sectionWords.reduce((sum, value) => sum + value, 0);
  const seconds = estimateSeconds(totalWords);
  const sentences = sections.flatMap((section) => splitSentences(section.metin));
  const sentenceWords = sentences.map(countWords);

  return {
    totalWords,
    seconds,
    minutes: Number((seconds / 60).toFixed(2)),
    sectionWords,
    sectionPercentages: sectionWords.map((value) =>
      totalWords ? Number(((value / totalWords) * 100).toFixed(1)) : 0,
    ),
    sentenceCount: sentences.length,
    averageSentenceWords: sentences.length
      ? Number((totalWords / sentences.length).toFixed(2))
      : 0,
    longestSentenceWords: sentenceWords.length ? Math.max(...sentenceWords) : 0,
  };
}

export function validateContentQuality(story) {
  const errors = [];
  const warnings = [];
  const legacy = story?.legacy ?? story ?? {};
  const metadata = story?.metadata ?? {};
  const sections = legacy.bolumler ?? [];
  const metrics = storyMetrics(story);
  const ageBand = metadata.ageBand;
  const target = AGE_WORD_TARGETS[ageBand];
  const fullText = sections.map((section) => section.metin ?? "").join(" ");

  if (!target) errors.push(`Unknown age band: ${ageBand ?? "missing"}.`);
  if (target && metrics.totalWords < target[0]) {
    errors.push(`${legacy.id} has ${metrics.totalWords} words; ${ageBand} requires at least ${target[0]}.`);
  }
  if (target && metrics.totalWords > target[1]) {
    errors.push(`${legacy.id} has ${metrics.totalWords} words; ${ageBand} allows at most ${target[1]}.`);
  }

  if (sections.length < 3 || sections.length > 8) {
    errors.push(`${legacy.id} must contain 3 to 8 meaningful sections.`);
  }

  sections.forEach((section, index) => {
    const sentenceCount = splitSentences(section.metin).length;
    const words = metrics.sectionWords[index];
    if (sentenceCount < 2 || words < 30) {
      errors.push(`Section "${section.ad ?? index + 1}" is too short (${words} words, ${sentenceCount} sentences).`);
    }
    const paragraphs = String(section.metin ?? "").split(/\n\s*\n/u).filter(Boolean);
    paragraphs.forEach((paragraph, paragraphIndex) => {
      if (splitSentences(paragraph).length > 3) {
        errors.push(`Section "${section.ad ?? index + 1}", paragraph ${paragraphIndex + 1} exceeds three sentences.`);
      }
    });
  });

  for (const sentence of splitSentences(fullText)) {
    const words = countWords(sentence);
    if (words > 12) errors.push(`Sentence exceeds 12 words (${words}): ${sentence}`);
  }
  if (metrics.averageSentenceWords < 6 || metrics.averageSentenceWords > 10) {
    errors.push(`Average sentence length is ${metrics.averageSentenceWords}; target is 6 to 10.`);
  }

  const declaredSeconds = Number(legacy.sureDk) * 60;
  if (!Number.isFinite(declaredSeconds) || declaredSeconds <= 0) {
    errors.push(`${legacy.id} is missing a generated declared duration.`);
  } else {
    const variance = Math.abs(declaredSeconds - metrics.seconds) / metrics.seconds;
    if (variance > 0.15) {
      errors.push(`Declared duration differs from word duration by ${(variance * 100).toFixed(1)}%.`);
    }
  }

  if (!Array.isArray(metadata.glossary) || metadata.glossary.length < 3 || metadata.glossary.length > 8) {
    errors.push(`${legacy.id} must contain 3 to 8 glossary entries.`);
  }
  if (!metadata.primaryTheme) errors.push(`${legacy.id} must declare one primary theme.`);
  if (metadata.contentScope === "public-domain" && (!metadata.sourceOfTruth?.url || !metadata.sourceOfTruth?.scope)) {
    errors.push(`${legacy.id} public-domain source and scope are required.`);
  }
  if (metadata.contentType === "factual" && !metadata.sourceOfTruth?.url) {
    errors.push(`${legacy.id} factual content requires a source-of-truth URL.`);
  }

  for (const pattern of PROHIBITED_LANGUAGE) {
    if (pattern.test(fullText)) errors.push(`${legacy.id} contains prohibited language: ${pattern}.`);
  }

  const review = metadata.contentQualityReview;
  if (!review || !REVIEW_STATUSES.has(review.status)) {
    errors.push(`${legacy.id} requires contentQualityReview with a valid status.`);
  } else {
    for (const key of REVIEW_CHECKLIST_KEYS) {
      if (typeof review.checklist?.[key] !== "boolean") {
        errors.push(`${legacy.id} review checklist is missing ${key}.`);
      }
    }
  }

  const hasHumanApproval =
    review?.status === "approved" &&
    Boolean(review.reviewerName?.trim()) &&
    Boolean(review.reviewedAt) &&
    Boolean(review.reviewNotes?.trim()) &&
    REVIEW_CHECKLIST_KEYS.every((key) => review.checklist?.[key] === true);

  if (metadata.releaseReady === true && !hasHumanApproval) {
    errors.push(`${legacy.id} cannot be releaseReady without complete human approval.`);
  }
  if (!hasHumanApproval) warnings.push(`${legacy.id} is waiting for human content-quality approval.`);

  return {
    structuralValid: errors.length === 0,
    releaseReady: errors.length === 0 && hasHumanApproval && metadata.releaseReady === true,
    errors,
    warnings,
    metrics,
  };
}
