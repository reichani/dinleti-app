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

test("MEB kazanım sözlüğü resmî kod biçiminde ve aday eşleme yalnız sözlükteki kodları kullanır", () => {
  const vocab = JSON.parse(readFileSync(new URL("../../ontology/vocab/meb-kazanim.json", import.meta.url), "utf8"));
  assert.deepEqual(vocab.siniflar.map((s) => s.sinif), [1, 2, 3, 4, 5, 6, 7, 8]);
  const kodlar = new Set();
  for (const s of vocab.siniflar) for (const k of s.kazanimlar) {
    assert.match(k.kod, new RegExp(`^T\\.O\\.${s.sinif}\\.\\d+\\.$`));
    kodlar.add(k.kod);
    for (const b of k.surecBilesenleri ?? []) kodlar.add(b.altKodTuretilmis);
  }
  execFileSync("node", ["scripts/build-curriculum-candidates.mjs"], { stdio: "pipe" });
  const map = JSON.parse(readFileSync(new URL("../../ontology/mappings/icerik-kazanim-aday.json", import.meta.url), "utf8"));
  assert.equal(map.kayitlar.length, snapshot.icerikler.length);
  for (const k of map.kayitlar) {
    assert.ok(["aday-kural-tabanli", "kapsam-disi"].includes(k.durum));
    for (const a of k.adayKazanimlar ?? []) assert.ok(kodlar.has(a.kod), `${k.id}: sözlükte olmayan kod ${a.kod}`);
  }
});

test("her MEB beceri etiketi PIRLS/PISA köprüsünde tanımlı ve kodlar çerçevede var", () => {
  const vocab = JSON.parse(readFileSync(new URL("../../ontology/vocab/meb-kazanim.json", import.meta.url), "utf8"));
  const intl = JSON.parse(readFileSync(new URL("../../ontology/vocab/uluslararasi-cerceveler.json", import.meta.url), "utf8"));
  const pirls = new Set(intl.cerceveler.PIRLS2026.surecler.map((s) => s.kod));
  const pisa = new Set(intl.cerceveler.PISA2018.surecler.flatMap((s) => [s.kod, ...(s.alt ?? []).map((a) => a.kod)]));
  for (const s of vocab.siniflar) for (const k of s.kazanimlar) {
    const e = intl.beceriKopru.eslesme[k.beceri];
    assert.ok(e, `köprüde olmayan beceri: ${k.beceri}`);
    for (const c of [...(e.pirls ?? []), ...(e.kural?.pirls ?? [])]) assert.ok(pirls.has(c), c);
    for (const c of e.pisa ?? []) assert.ok(pisa.has(c), c);
  }
  assert.ok(Array.isArray(ontology.metodolojiReferanslari) && ontology.metodolojiReferanslari.length >= 5);
});
