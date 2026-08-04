import assert from "node:assert/strict";
import test from "node:test";
import { classifyContent, CONTENT_STATUS } from "../../src/content/contentIntegrity.js";

const andersenLegacy = {
  id: "andersen-masallari",
  baslik: "Andersen Masalları",
  kategori: "Klasikler",
  bolumler: [
    { ad: "Çirkin Ördek Yavrusu", metin: "Bir zamanlar küçük bir ördek yavrusu varmış." },
    { ad: "Kibritçi Kız", metin: "Yılın son gecesiymiş, kar lapa lapa yağıyormuş." },
    { ad: "Kralın Yeni Giysileri", metin: "Bir kral yeni giysileri çok severmiş." },
  ],
};

test("legacy short summaries cannot bypass the runtime full-reading gate", () => {
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  globalThis.window = {};
  globalThis.document = {};

  try {
    const report = classifyContent(andersenLegacy);
    assert.equal(report.status, CONTENT_STATUS.FULL_READING);
    assert.equal(report.deployable, false);
    assert.ok(report.seconds < 120);
    assert.match(report.blockers[0], /minimum is 120s/);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
});
