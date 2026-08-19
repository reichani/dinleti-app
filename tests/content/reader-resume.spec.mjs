import test from "node:test";
import assert from "node:assert/strict";
import {
  cursorFromPosition,
  positionFromCursor,
  readingProgressSnapshot,
} from "../../src/reader-core.js";

const sections = [
  { metin: "bir iki üç dört beş altı yedi sekiz dokuz on" },
  { metin: Array.from({ length: 30 }, (_, i) => `kelime${i}`).join(" ") },
];

const durationForSection = (_section, index) => (index === 0 ? 20 : 60);

// App passes a one-argument duration function; use deterministic durations by reference.
const first = sections[0];
const duration = (section) => (section === first ? 20 : 60);

test("v2 reading snapshot preserves exact section and word cursor", () => {
  const snapshot = readingProgressSnapshot({
    storyId: "resume-book",
    sections,
    sectionIndex: 1,
    wordIndex: 18,
    durationForSection: duration,
    now: 1_700_000_000_000,
  });

  assert.equal(snapshot.version, 2);
  assert.equal(snapshot.storyId, "resume-book");
  assert.equal(snapshot.sectionIndex, 1);
  assert.equal(snapshot.wordIndex, 18);
  assert.ok(snapshot.pos > 20, "position should be inside the second section");
});

test("legacy position records still map to a valid cursor", () => {
  const cursor = cursorFromPosition(sections, 30, duration);
  assert.equal(cursor.sectionIndex, 1);
  assert.ok(cursor.wordIndex >= 0 && cursor.wordIndex < 30);
});

test("cursor position round-trip stays in the same section and near the same word", () => {
  const position = positionFromCursor(sections, 1, 18, duration);
  const restored = cursorFromPosition(sections, position, duration);
  assert.equal(restored.sectionIndex, 1);
  assert.ok(Math.abs(restored.wordIndex - 18) <= 1);
});
