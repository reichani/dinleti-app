import test from "node:test";
import assert from "node:assert/strict";

import { detectTextLanguage } from "../../src/textLanguage.js";

test("detects an English imported document for the TTS voice", () => {
  assert.equal(
    detectTextLanguage("The little fox was in the garden, and she looked at the stars with her friend."),
    "en",
  );
});

test("keeps a Turkish imported document on the Turkish TTS voice", () => {
  assert.equal(
    detectTextLanguage("Küçük tilki bahçedeydi ve arkadaşı ile gökyüzündeki yıldızlara baktı."),
    "tr",
  );
});

test("does not misclassify short or ambiguous personal text", () => {
  assert.equal(detectTextLanguage("Ali ile Ada"), "tr");
  assert.equal(detectTextLanguage("2026 araştırma notları"), "tr");
});

test("uses the dominant language in realistic academic text", () => {
  assert.equal(
    detectTextLanguage("This study examines how attention changes during reading. The results are discussed in relation to earlier research, and the method is described in detail."),
    "en",
  );
});
