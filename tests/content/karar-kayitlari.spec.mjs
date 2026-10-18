import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { PASSAGE_WORD_TARGETS } from "../../src/content/lengthOptimizationPolicy.js";

const kayit = JSON.parse(readFileSync(new URL("../../ontology/karar-kayitlari.json", import.meta.url), "utf8"));
const snapshot = JSON.parse(execFileSync("node", ["scripts/build-ontology-snapshot.mjs", "--stdout"], { encoding: "utf8" }));

test("karar kayıtları tekil kimlikli ve durumları tanımlı", () => {
  const ids = kayit.kararlar.map((k) => k.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const k of kayit.kararlar) {
    assert.match(k.id, /^K-\d{4}-\d{2}-\d{2}-\d{2}$/);
    assert.ok(Object.hasOwn(kayit.durumSozlugu, k.durum), `${k.id} durumu`);
    assert.ok(k.veren && k.karar);
  }
});

test("K-2026-10-18-02: genc_okurlar_12_14 cümle sınırı 18", () => {
  assert.equal(PASSAGE_WORD_TARGETS.genc_okurlar_12_14.maxSentenceWords, 18);
});

test("K-2026-10-18-04: yeni kök bandı anlık görüntüde yönteme uygun", () => {
  for (const y of snapshot.yolOzeti) {
    const b = y.yeniKokBandi;
    assert.equal(b.karar, "K-2026-10-18-04");
    if (b.orneklem.length >= 3) {
      assert.equal(b.durum, "hesaplandi");
      assert.equal(b.alt, Math.round(b.medyan * 0.75));
      assert.equal(b.ust, Math.round(b.medyan * 1.25));
    } else {
      assert.equal(b.durum, "yetersiz-orneklem");
      assert.equal(b.alt, null);
    }
  }
  assert.ok(Array.isArray(snapshot.yasYolTutarsizliklari));
});

test("rol dosyaları karar kaynağını gösteriyor ve erişilebilirlik editörü tanımlı", () => {
  assert.ok(existsSync(new URL("../../.claude/agents/okurio-erisilebilirlik-editoru.md", import.meta.url)));
  for (const f of ["okurio-icerik-planlayici", "okurio-dil-seviye-denetcisi", "okurio-icerik-yazari", "okurio-erisilebilirlik-editoru"]) {
    const s = readFileSync(new URL(`../../.claude/agents/${f}.md`, import.meta.url), "utf8");
    assert.match(s, /ontology\/karar-kayitlari\.json/u, f);
  }
});
