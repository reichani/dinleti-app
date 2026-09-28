import assert from "node:assert/strict";
import test from "node:test";

import { sectionParagraphs, sentenceList } from "../../src/content/contentStructure.js";

test("uses authored paragraph boundaries", () => {
  assert.deepEqual(sectionParagraphs({ metin: "Bir. İki.\n\nÜç." }), ["Bir. İki.", "Üç."]);
});

test("adapts legacy flat text to visible paragraphs of at most three sentences", () => {
  const source = "Bir. İki. Üç. Dört. Beş. Altı. Yedi.";
  const paragraphs = sectionParagraphs({ metin: source });

  assert.deepEqual(paragraphs, ["Bir. İki. Üç.", "Dört. Beş. Altı.", "Yedi."]);
  assert.ok(paragraphs.every((paragraph) => sentenceList(paragraph).length <= 3));
  assert.equal(paragraphs.join(" "), source);
});
