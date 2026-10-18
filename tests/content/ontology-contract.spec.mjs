import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const ontology = JSON.parse(readFileSync(new URL("../../ontology/okurio-ontology.v0.1.json", import.meta.url), "utf8"));
const snapshot = JSON.parse(execFileSync("node", ["scripts/build-ontology-snapshot.mjs", "--stdout"], { encoding: "utf8" }));

test("ontoloji sürümü ve değişiklik günlüğü tutarlı", () => {
  assert.match(ontology.version, /^\d+\.\d+\.\d+$/);
  assert.equal(ontology.degisiklikGunlugu.at(-1).surum, ontology.version);
  assert.equal(snapshot.ontologyVersion, ontology.version);
});

test("katalogdaki her içerik bir okuma yoluna bağlı ve ölçülmüş", () => {
  assert.ok(snapshot.icerikler.length > 0);
  for (const k of snapshot.icerikler) {
    assert.ok(k.anaOkumaYolu, `${k.id} okuma yoluna bağlı değil`);
    assert.ok(Number.isInteger(k.kelimeSayisi));
  }
});

test("hak durumu değerleri ontoloji sözlüğünde tanımlı", () => {
  const izinli = new Set(ontology.kontrolluSozlukler.HakDurumu);
  for (const k of snapshot.icerikler) {
    if (k.hakDurumu) assert.ok(izinli.has(k.hakDurumu), `${k.id}: bilinmeyen hak durumu ${k.hakDurumu}`);
  }
});

test("ajan rolleri insan onayı alanlarını doldurmayacaklarını belirtir", () => {
  const dir = new URL("../../.claude/agents/", import.meta.url);
  const files = readdirSync(dir).filter((f) => f.startsWith("okurio-"));
  assert.ok(files.length >= 6);
  const yazar = readFileSync(new URL("okurio-icerik-yazari.md", dir), "utf8");
  const yayin = readFileSync(new URL("okurio-yayin-hazirlayici.md", dir), "utf8");
  for (const metin of [yazar, yayin]) {
    assert.match(metin, /reviewerName/);
    assert.match(metin, /ownerName/);
  }
  assert.match(yayin, /main'e yazmazsın/);
});

test("AI batch betiği bütçeyi aşınca durur ve onay alanlarına yazmaz", () => {
  const src = readFileSync(new URL("../../scripts/ai-batch-review.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(src, /reviewerName\s*[:=]/);
  assert.doesNotMatch(src, /ownerName\s*[:=]/);
  assert.doesNotMatch(src, /releaseReady\s*[:=]/);
  assert.match(src, /reviewerKind: "ai"/);
  let code = 0;
  try {
    execFileSync("node", ["scripts/ai-batch-review.mjs", "--mode", "review", "--limit", "80", "--max-usd", "0.01", "--dry-run"], { stdio: "pipe" });
  } catch (e) { code = e.status; }
  assert.equal(code, 2);
});
