import assert from "node:assert/strict";
import test from "node:test";

import {
  PETER_RABBIT_FULL,
  publicDomainIntegrity,
} from "../../src/content/fullPublicDomainStories.js";

test("verified public-domain full text is not a 20-second preview", () => {
  const integrity = publicDomainIntegrity(PETER_RABBIT_FULL);

  assert.equal(PETER_RABBIT_FULL.icerikDurumu, "tam-metin");
  assert.equal(PETER_RABBIT_FULL.hakDurumu, "kamu-mali");
  assert.match(PETER_RABBIT_FULL.kaynak.url, /^https:\/\/www\.gutenberg\.org\//u);
  assert.match(PETER_RABBIT_FULL.kaynak.lisansUrl, /^https:\/\/www\.gutenberg\.org\//u);
  assert.ok(integrity.wordCount >= 500, `expected at least 500 words, got ${integrity.wordCount}`);
  assert.ok(integrity.actualSeconds >= 180, `expected at least 180 seconds, got ${integrity.actualSeconds}`);
  assert.equal(integrity.isPublishableFullText, true);
});

test("a short excerpt cannot pass the full-text publication gate", () => {
  const excerpt = {
    ...PETER_RABBIT_FULL,
    bolumler: [{ ad: "Preview", metin: "Peter ran into the garden." }],
  };

  assert.equal(publicDomainIntegrity(excerpt).isPublishableFullText, false);
});
