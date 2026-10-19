const words = (text = "") => text.trim().split(/\s+/u).filter(Boolean);

export function cursorFromPosition(sections, positionSeconds, durationForSection) {
  if (!Array.isArray(sections) || sections.length === 0) return { sectionIndex: 0, wordIndex: 0 };
  const target = Math.max(0, Number(positionSeconds) || 0);
  let elapsed = 0;

  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex += 1) {
    const duration = Math.max(1, Number(durationForSection(sections[sectionIndex])) || 1);
    const next = elapsed + duration;
    if (target < next || sectionIndex === sections.length - 1) {
      const count = Math.max(1, words(sections[sectionIndex]?.metin).length);
      const ratio = Math.max(0, Math.min(0.999999, (target - elapsed) / duration));
      return { sectionIndex, wordIndex: Math.min(count - 1, Math.floor(ratio * count)) };
    }
    elapsed = next;
  }

  return { sectionIndex: sections.length - 1, wordIndex: 0 };
}

export function positionFromCursor(sections, sectionIndex, wordIndex, durationForSection) {
  if (!Array.isArray(sections) || sections.length === 0) return 0;
  const safeSection = Math.max(0, Math.min(sections.length - 1, Number(sectionIndex) || 0));
  let elapsed = 0;
  for (let index = 0; index < safeSection; index += 1) {
    elapsed += Math.max(1, Number(durationForSection(sections[index])) || 1);
  }

  const section = sections[safeSection];
  const duration = Math.max(1, Number(durationForSection(section)) || 1);
  const count = Math.max(1, words(section?.metin).length);
  const safeWord = Math.max(0, Math.min(count - 1, Number(wordIndex) || 0));
  return Math.min(elapsed + duration, elapsed + (safeWord / count) * duration);
}

export function normalizeReadingProgress({ sections, progress, durationForSection }) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return { sectionIndex: 0, wordIndex: 0, pos: 0 };
  }

  const storedPos = Math.max(0, Number(progress?.pos) || 0);
  if (progress?.version !== 2) {
    const cursor = cursorFromPosition(sections, storedPos, durationForSection);
    return { ...cursor, pos: storedPos };
  }

  const sectionIndex = Math.max(
    0,
    Math.min(sections.length - 1, Number(progress.sectionIndex) || 0),
  );
  const count = Math.max(1, words(sections[sectionIndex]?.metin).length);
  const wordIndex = Math.max(
    0,
    Math.min(count - 1, Number(progress.wordIndex) || 0),
  );

  return {
    sectionIndex,
    wordIndex,
    pos: positionFromCursor(sections, sectionIndex, wordIndex, durationForSection),
  };
}

export function readingProgressSnapshot({
  storyId,
  sections,
  sectionIndex,
  wordIndex,
  durationForSection,
  now = Date.now(),
}) {
  return {
    pos: positionFromCursor(sections, sectionIndex, wordIndex, durationForSection),
    sectionIndex: Math.max(0, Number(sectionIndex) || 0),
    wordIndex: Math.max(0, Number(wordIndex) || 0),
    storyId,
    ts: now,
    version: 2,
  };
}

export function monotonicBoundaryWord({
  utteranceText,
  charIndex,
  baseIndex,
  currentIndex,
  endIndex,
}) {
  if (!Number.isFinite(charIndex) || charIndex < 0) return null;
  const prefix = String(utteranceText || "").slice(0, charIndex).trim();
  const candidate = Math.min(
    Math.max(baseIndex, endIndex),
    baseIndex + (prefix ? prefix.split(/\s+/u).length : 0),
  );
  return candidate > currentIndex ? candidate : null;
}

export function createSpeechWordTimeline(words, durationForWord, calibration = 1) {
  const safeCalibration = Math.max(0.5, Math.min(2, Number(calibration) || 1));
  let elapsed = 0;
  return words.map((word) => {
    const startsAt = elapsed;
    elapsed += Math.max(40, Number(durationForWord(word)) || 0) * safeCalibration;
    return startsAt;
  });
}

export function timelineWordFromElapsed({
  startsAt,
  elapsedMs,
  baseIndex,
  currentIndex,
  endIndex,
}) {
  if (!Array.isArray(startsAt) || startsAt.length === 0) return null;
  const elapsed = Math.max(0, Number(elapsedMs) || 0);
  let localIndex = 0;
  for (let index = 1; index < startsAt.length; index += 1) {
    if (startsAt[index] > elapsed) break;
    localIndex = index;
  }
  const candidate = Math.min(endIndex, baseIndex + localIndex);
  return candidate > currentIndex ? candidate : null;
}

/* v2.10.1 — Cümle bazlı atlama. Okuyucunun cümle sınırı kuralıyla aynıdır
 * (kelime . ! ? … ile biterse cümle biter). delta: -1 önceki cümle, 0 bu cümlenin
 * başı (tekrarla), +1 sonraki cümle. Bölüm sınırında komşu bölüme geçer. */
export function sentenceStarts(text = "") {
  const list = words(text);
  const starts = [];
  let start = 0;
  list.forEach((word, index) => {
    if (/[.!?…]$/u.test(word) || index === list.length - 1) {
      starts.push(start);
      start = index + 1;
    }
  });
  return starts.length ? starts : [0];
}

export function cursorForSentenceStep(sections, sectionIndex, wordIndex, delta) {
  if (!Array.isArray(sections) || sections.length === 0) return { sectionIndex: 0, wordIndex: 0 };
  const s = Math.max(0, Math.min(sections.length - 1, Number(sectionIndex) || 0));
  const starts = sentenceStarts(sections[s]?.metin);
  const w = Math.max(0, Number(wordIndex) || 0);
  let current = 0;
  starts.forEach((start, i) => { if (start <= w) current = i; });
  const target = current + Math.sign(Number(delta) || 0);
  if (target < 0) {
    if (s === 0) return { sectionIndex: 0, wordIndex: 0 };
    const prev = sentenceStarts(sections[s - 1]?.metin);
    return { sectionIndex: s - 1, wordIndex: prev[prev.length - 1] };
  }
  if (target >= starts.length) {
    if (s === sections.length - 1) return { sectionIndex: s, wordIndex: starts[starts.length - 1] };
    return { sectionIndex: s + 1, wordIndex: 0 };
  }
  return { sectionIndex: s, wordIndex: starts[target] };
}
