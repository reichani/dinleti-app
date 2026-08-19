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
  const normalized = normalizeReadingProgress({
    sections,
    progress: { version: 2, sectionIndex, wordIndex },
    durationForSection,
  });
  return {
    pos: normalized.pos,
    sectionIndex: normalized.sectionIndex,
    wordIndex: normalized.wordIndex,
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
