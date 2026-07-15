import test from "node:test";
import assert from "node:assert/strict";

import { PILOT_STORIES } from "../../src/content/pilotStories.js";
import {
  validatePilotCatalog,
  validatePilotStory,
} from "../../src/content/validatePilotStories.js";

test("pilot catalog passes structural and manifesto validation", () => {
  const report = validatePilotCatalog(PILOT_STORIES);

  assert.equal(
    report.valid,
    true,
    JSON.stringify({
      catalogErrors: report.catalogErrors,
      storyErrors: report.storyReports.flatMap((story) => story.errors),
    }),
  );
});

test("pilot story ids are unique", () => {
  const ids = PILOT_STORIES.map((story) => story.legacy.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("every template has one optional, unscored reflection prompt", () => {
  for (const story of PILOT_STORIES) {
    assert.equal(typeof story.metadata.optionalReflectionPrompt, "string");
    assert.equal(story.metadata.clinicalBoundaryChecked, true);
    assert.equal("reflectionScore" in story.metadata, false);
    assert.equal("requiredReflectionAnswer" in story.metadata, false);
  }
});

test("every template contains three to eight approved glossary entries", () => {
  for (const story of PILOT_STORIES) {
    assert.ok(story.metadata.glossary.length >= 3);
    assert.ok(story.metadata.glossary.length <= 8);

    for (const entry of story.metadata.glossary) {
      assert.ok(entry.word.trim().length > 0);
      assert.ok(entry.definition.trim().length > 0);
    }
  }
});

test("validator rejects clinical and shaming language", () => {
  const unsafeStory = structuredClone(PILOT_STORIES[0]);
  unsafeStory.legacy.id = "unsafe-test-story";
  unsafeStory.legacy.bolumler[0].metin =
    "Bu problemli çocuk için terapi ve tedavi gerekir.";

  const report = validatePilotStory(unsafeStory);

  assert.equal(report.valid, false);
  assert.ok(
    report.errors.some((error) =>
      error.includes("prohibited clinical or shaming language"),
    ),
  );
});

test("validator rejects sentences longer than twelve words", () => {
  const longSentenceStory = structuredClone(PILOT_STORIES[0]);
  longSentenceStory.legacy.id = "long-sentence-test-story";
  longSentenceStory.legacy.bolumler[0].metin =
    "Oki bugün bahçede çok hızlı koşarken uzaktaki büyük kırmızı balonu birden dikkatle gördü.";

  const report = validatePilotStory(longSentenceStory);

  assert.equal(report.valid, false);
  assert.ok(report.errors.some((error) => error.includes("maximum is 12")));
});
