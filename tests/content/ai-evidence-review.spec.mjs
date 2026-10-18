import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { evaluateAiEvidenceReview, PUBLIC_LABEL, FORBIDDEN_PUBLIC_CLAIMS } from "../../src/content/aiEvidenceReview.js";

const dir = new URL("../../ontology/reviews/ai-kanit/", import.meta.url);
const read = (f) => JSON.parse(readFileSync(new URL(f, dir), "utf8"));
const template = read("SABLON.json");

const valid = () => ({
  ...structuredClone(template),
  icerikId: "ornek", model: "test-model", reviewedAt: "2026-10-18T00:00:00Z", reviewedCommit: "abc123", contentFingerprint: "sha256:x",
  iddialar: [{ iddia: "Serçe saçak altına yuva yapar.", tur: "olgusal", sonuc: "destekleniyor",
    kanit: [{ kaynak: "resmi-kurum", baslik: "House Sparrow", yil: 2020, url: "https://example.org", kanitGucu: "orta" }] }],
});

test("geçerli AI kaydı ai-onayli sayılır, insan onayı vermez", () => {
  const r = evaluateAiEvidenceReview(valid(), { fingerprint: "sha256:x" });
  assert.deepEqual(r.errors, []);
  assert.equal(r.aiApproved, true);
});

test("insan onayı alanı içeren AI kaydı reddedilir", () => {
  for (const f of ["reviewerName", "ownerApproval", "releaseReady"]) {
    const rec = { ...valid(), [f]: "x" };
    assert.equal(evaluateAiEvidenceReview(rec).valid, false, f);
  }
});

test("kanıtsız 'destekleniyor' iddiası ve doğrulanamayan iddia onayı engeller", () => {
  const a = valid(); a.iddialar[0].kanit = [];
  assert.equal(evaluateAiEvidenceReview(a).aiApproved, false);
  const b = valid(); b.iddialar[0].sonuc = "dogrulanamadi"; b.status = "ai-duzeltme-gerekli";
  const rb = evaluateAiEvidenceReview(b);
  assert.equal(rb.aiApproved, false); assert.ok(rb.blockers.length > 0);
});

test("metin değişince AI onayı düşer", () => {
  assert.equal(evaluateAiEvidenceReview(valid(), { fingerprint: "sha256:baska" }).aiApproved, false);
});

test("kamuya açık ifade dürüst ve şablonla aynı", () => {
  assert.equal(template.kamuyaAciklama, PUBLIC_LABEL);
  for (const bad of FORBIDDEN_PUBLIC_CLAIMS) assert.ok(!PUBLIC_LABEL.toLocaleLowerCase("tr-TR").includes(bad));
});

test("depodaki bütün AI kayıtları şemaya uyar ve metin parmak iziyle eşleşir", () => {
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "SABLON.json") : [];
  const snap = JSON.parse(execFileSync("node", ["scripts/build-ontology-snapshot.mjs", "--stdout"], { encoding: "utf8" }));
  for (const f of files) {
    const rec = read(f);
    assert.equal(`${rec.icerikId}.json`, f);
    const r = evaluateAiEvidenceReview(rec);
    assert.deepEqual(r.errors, [], `${f}: ${r.errors.join("; ")}`);
    const k = snap.icerikler.find((x) => x.id === rec.icerikId);
    assert.ok(k, `${f}: katalogda yok`);
    if (rec.status === "ai-onayli") assert.equal(k.aiKanitOnayi.durum, "ai-onayli", `${f}: metin değişmiş olabilir`);
    assert.notEqual(k.insanOnayi, "approved-by-ai");
  }
});
