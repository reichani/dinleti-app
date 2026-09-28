import test from "node:test";
import assert from "node:assert/strict";
import { ODYSSEY_STORIES } from "../../src/content/odysseyStories.js";

const minimumWords = {
  "7-10 yaş": 500,
  "11-16 yaş": 900,
  "16+ yaş": 1500,
};

const countWords = (text) =>
  text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

for (const { legacy, metadata } of ODYSSEY_STORIES) {
  test(`${legacy.baslik} release kapılarını karşılar`, () => {
    const wordCount = countWords(
      legacy.bolumler.map((section) => section.metin).join(" "),
    );
    const calculatedSeconds = Math.ceil((wordCount * 60) / 155);
    const announcedSeconds = legacy.sureDk * 60;
    const durationDifference =
      Math.abs(announcedSeconds - calculatedSeconds) / calculatedSeconds;

    assert.ok(
      wordCount >= minimumWords[legacy.yas],
      `${wordCount} kelime; ${legacy.yas} minimumu ${minimumWords[legacy.yas]}`,
    );
    assert.ok(
      durationDifference <= 0.15,
      `ilan ${announcedSeconds} sn, hesaplanan ${calculatedSeconds} sn`,
    );
    assert.ok(
      legacy.bolumler.length >= 3 && legacy.bolumler.length <= 8,
    );
    assert.ok(
      legacy.bolumler.every(
        (section) => countWords(section.metin) >= 30,
      ),
    );
    assert.ok(metadata.contentQualityReview);
    assert.equal(metadata.contentQualityReview.status, "pending");
    assert.equal(metadata.productOwnerApproved, false);
    assert.equal(metadata.accessibilityApproved, false);
    assert.equal(metadata.dyslexiaExperienceApproved, false);
    assert.equal(metadata.adhdExperienceApproved, false);
  });
}
