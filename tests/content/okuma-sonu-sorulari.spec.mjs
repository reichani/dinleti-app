// Okuma sonu sorusu, okurun gerçekten okuduğu metne dayanmalı. Bir taslak eski kaydın yerine
// geçtiğinde (productionStoryUpgrades) soru da yenilenmelidir. 2026-10-20: Mino Nerede? sorusu
// eski 22 kelimelik metinden kalmıştı ve doğru cevap seçeneklerde yoktu.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { PRODUCTION_STORY_UPGRADES, NEW_PRODUCTION_STORIES } from "../../src/content/productionStoryUpgrades.js";

const source = readFileSync(new URL("../../src/App.jsx", import.meta.url), "utf8");
const start = source.indexOf("const SORU_BANKASI = {");
const end = source.indexOf("\n};", start);
const SORU_BANKASI = vm.runInNewContext(`(${source.slice(start + "const SORU_BANKASI = ".length, end + 2)})`);
const normalize = (t) => String(t).replace(/\s+/gu, " ").trim();

for (const story of [...PRODUCTION_STORY_UPGRADES, ...NEW_PRODUCTION_STORIES]) {
  const sorular = SORU_BANKASI[story.id];
  if (!sorular) continue;
  test(`${story.id}: okuma sonu sorusu yayındaki metne dayanır`, () => {
    const metin = normalize(story.bolumler.map((b) => b.metin).join(" "));
    for (const s of sorular) {
      assert.ok(s.secenekler.includes(s.cevap), `${story.id}: doğru cevap seçeneklerde yok`);
      assert.equal(new Set(s.secenekler).size, s.secenekler.length, `${story.id}: tekrar eden seçenek`);
      assert.ok(metin.includes(normalize(s.destek)), `${story.id}: destek cümlesi metinde yok: "${s.destek}"`);
    }
  });
}
