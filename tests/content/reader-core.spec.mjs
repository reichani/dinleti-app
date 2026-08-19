import assert from "node:assert/strict";
import test from "node:test";
import {
  cursorFromPosition,
  positionFromCursor,
  readingProgressSnapshot,
  monotonicBoundaryWord,
  createSpeechWordTimeline,
  timelineWordFromElapsed,
} from "../../src/reader-core.js";

const sections = [
  { metin: "bir iki üç dört" },
  { metin: "beş altı yedi sekiz dokuz on" },
];
const durationForSection = (section) => section === sections[0] ? 40 : 60;

test("seconds map to an exact section and word cursor", () => {
  assert.deepEqual(cursorFromPosition(sections, 0, durationForSection), { sectionIndex: 0, wordIndex: 0 });
  assert.deepEqual(cursorFromPosition(sections, 20, durationForSection), { sectionIndex: 0, wordIndex: 2 });
  assert.deepEqual(cursorFromPosition(sections, 70, durationForSection), { sectionIndex: 1, wordIndex: 3 });
});

test("word cursor maps back to monotonic story progress", () => {
  assert.equal(positionFromCursor(sections, 0, 2, durationForSection), 20);
  assert.equal(positionFromCursor(sections, 1, 3, durationForSection), 70);
  assert.ok(positionFromCursor(sections, 1, 5, durationForSection) < 100);
});

test("persisted progress carries a versioned word anchor", () => {
  assert.deepEqual(readingProgressSnapshot({
    storyId: "story-1",
    sections,
    sectionIndex: 1,
    wordIndex: 3,
    durationForSection,
    now: 1234,
  }), {
    pos: 70,
    sectionIndex: 1,
    wordIndex: 3,
    storyId: "story-1",
    ts: 1234,
    version: 2,
  });
});

test("Samsung duplicate or backward boundary indices cannot reset progress", () => {
  const args = {
    utteranceText: "Yılın son gecesiymiş kar lapa lapa yağıyormuş",
    baseIndex: 0,
    endIndex: 6,
  };
  assert.equal(monotonicBoundaryWord({ ...args, charIndex: 0, currentIndex: 0 }), null);
  assert.equal(monotonicBoundaryWord({ ...args, charIndex: 0, currentIndex: 2 }), null);
  assert.equal(monotonicBoundaryWord({ ...args, charIndex: 10, currentIndex: 0 }), 2);
  assert.equal(monotonicBoundaryWord({ ...args, charIndex: 6, currentIndex: 2 }), null);
  assert.equal(monotonicBoundaryWord({ ...args, charIndex: 24, currentIndex: 2 }), 4);
});

test("fallback timeline uses absolute elapsed time and catches up without timer drift", () => {
  const startsAt = createSpeechWordTimeline(["bir", "iki", "uzunca", "dört"], () => 200, 1.25);
  assert.deepEqual(startsAt, [0, 250, 500, 750]);
  assert.equal(timelineWordFromElapsed({ startsAt, elapsedMs: 249, baseIndex: 8, currentIndex: 8, endIndex: 11 }), null);
  assert.equal(timelineWordFromElapsed({ startsAt, elapsedMs: 520, baseIndex: 8, currentIndex: 8, endIndex: 11 }), 10);
  assert.equal(timelineWordFromElapsed({ startsAt, elapsedMs: 900, baseIndex: 8, currentIndex: 10, endIndex: 11 }), 11);
});

test("speech timeline clamps unsafe calibration values", () => {
  assert.deepEqual(createSpeechWordTimeline(["bir", "iki"], () => 100, 10), [0, 200]);
  assert.deepEqual(createSpeechWordTimeline(["bir", "iki"], () => 100, 0.1), [0, 50]);
});
