import assert from "node:assert/strict";
import test from "node:test";
import {
  READING_LEVEL_WORD_TARGETS,
  evaluateStoryForReadingLevel,
  readingLevelTarget,
} from "../../src/content/readingLevelPolicy.js";

const storyWithWords = (wordCount, overrides = {}) => ({
  id: `story-${wordCount}`,
  baslik: `${wordCount} kelimelik öykü`,
  kategori: "Kısa Hikâye",
  bolumler: [{ ad: "Başlangıç", metin: Array(wordCount).fill("kelime").join(" ") }],
  ...overrides,
});

const metadata = {
  icerikTuru: "kisa_hikaye",
  status: "draft",
};

test("canonical targets cover every reading path", () => {
  assert.equal(Object.keys(READING_LEVEL_WORD_TARGETS).length, 10);
  assert.deepEqual(readingLevelTarget("genc_okurlar_12_14"), {
    minWords: 900,
    maxWords: 1600,
  });
});

test("young readers only receive full readings in the 900-1600 word band", () => {
  assert.equal(
    evaluateStoryForReadingLevel(storyWithWords(899), metadata, "genc_okurlar_12_14").reason,
    "below-level-minimum",
  );
  assert.equal(evaluateStoryForReadingLevel(storyWithWords(900), metadata, "genc_okurlar_12_14").eligible, true);
  assert.equal(evaluateStoryForReadingLevel(storyWithWords(1600), metadata, "genc_okurlar_12_14").eligible, true);
  assert.equal(
    evaluateStoryForReadingLevel(storyWithWords(1601), metadata, "genc_okurlar_12_14").reason,
    "above-level-maximum",
  );
});

test("short metadata-tagged story cannot leak into Young Readers", () => {
  const result = evaluateStoryForReadingLevel(
    storyWithWords(48, { id: "yildiz-mi-gezegen-mi", yas: "8-14 yaş" }),
    metadata,
    "genc_okurlar_12_14",
  );
  assert.equal(result.eligible, false);
  assert.equal(result.reason, "below-level-minimum");
});

test("micro exercises are not presented as long-form Young Readers content", () => {
  const result = evaluateStoryForReadingLevel(
    storyWithWords(950, { kategori: "Bilmece" }),
    { icerikTuru: "bilmece" },
    "genc_okurlar_12_14",
  );
  assert.equal(result.eligible, false);
  assert.equal(result.reason, "micro-exercise");
});

test("personal reading remains available regardless of catalog word target", () => {
  const result = evaluateStoryForReadingLevel(
    storyWithWords(20),
    { icerikTuru: "kullanici_metni" },
    "genc_okurlar_12_14",
  );
  assert.equal(result.eligible, true);
});
