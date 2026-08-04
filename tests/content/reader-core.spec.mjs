import assert from "node:assert/strict";
import test from "node:test";
import {
  cursorFromPosition,
  positionFromCursor,
  readingProgressSnapshot,
  monotonicBoundaryWord,
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
