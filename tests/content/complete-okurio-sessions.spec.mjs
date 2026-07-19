import assert from "node:assert/strict";
import test from "node:test";

import {
  COMPLETE_OKURIO_SESSIONS,
  FIRST_GROUP_GUIDED_SESSION,
  LILI_SEED_MAP_STORY,
  okurioSessionIntegrity,
} from "../../src/content/completeOkurioSessions.js";

const REQUIRED_FIELDS = [
  "id",
  "baslik",
  "yazar",
  "seslendiren",
  "kategori",
  "yas",
  "renk",
  "puan",
  "sureDk",
  "icerikDurumu",
  "hakDurumu",
  "kaynak",
  "ozet",
  "bolumler",
];

test("complete Okurio sessions match the current catalog contract", () => {
  assert.equal(COMPLETE_OKURIO_SESSIONS.length, 2);

  for (const session of COMPLETE_OKURIO_SESSIONS) {
    for (const field of REQUIRED_FIELDS) {
      assert.ok(field in session, `${session.id} is missing ${field}`);
    }
    assert.equal(session.yas, "6-7 yaş");
    assert.ok(Array.isArray(session.renk));
    assert.ok(Array.isArray(session.bolumler));
    assert.ok(session.bolumler.length >= 3);
  }
});

test("first group guided session provides at least three real reading minutes", () => {
  const integrity = okurioSessionIntegrity(FIRST_GROUP_GUIDED_SESSION);

  assert.equal(FIRST_GROUP_GUIDED_SESSION.kategori, "1. Grup Rehberli Okuma Oturumu");
  assert.equal(FIRST_GROUP_GUIDED_SESSION.icerikDurumu, "tam-oturum");
  assert.ok(integrity.wordCount >= 465, `expected 465 words, got ${integrity.wordCount}`);
  assert.ok(integrity.actualMinutes >= 3, `expected 3 minutes, got ${integrity.actualMinutes}`);
  assert.equal(integrity.isOriginal, true);
});

test("complete Turkish Okurio story provides at least three real reading minutes", () => {
  const integrity = okurioSessionIntegrity(LILI_SEED_MAP_STORY);

  assert.equal(LILI_SEED_MAP_STORY.icerikDurumu, "tam-metin");
  assert.ok(integrity.wordCount >= 465, `expected 465 words, got ${integrity.wordCount}`);
  assert.ok(integrity.actualMinutes >= 3, `expected 3 minutes, got ${integrity.actualMinutes}`);
  assert.equal(integrity.isOriginal, true);
});

test("all sentences stay short and age-appropriate", () => {
  for (const session of COMPLETE_OKURIO_SESSIONS) {
    const integrity = okurioSessionIntegrity(session);

    assert.ok(
      integrity.longestSentenceWords <= 12,
      `${session.id} has a ${integrity.longestSentenceWords}-word sentence`,
    );
    assert.ok(
      integrity.averageSentenceWords >= 6 && integrity.averageSentenceWords <= 10,
      `${session.id} average is ${integrity.averageSentenceWords.toFixed(2)} words`,
    );
  }
});

test("declared duration agrees with the measured duration", () => {
  for (const session of COMPLETE_OKURIO_SESSIONS) {
    const integrity = okurioSessionIntegrity(session);
    const roundedMeasuredMinutes = Math.ceil(integrity.actualMinutes);

    assert.equal(session.sureDk, roundedMeasuredMinutes);
  }
});
