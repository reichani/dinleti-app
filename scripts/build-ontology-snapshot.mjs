/**
 * Okurio içerik ontolojisi — katalog ölçüm anlık görüntüsü (v0.1).
 *
 * src/App.jsx içindeki kontrollü sözlükleri (okuma yolları, evreler, destekler,
 * içerik türleri) ve birleşik kataloğu okur; her içerik için ölçüm üretir ve
 * ontology/snapshots/catalog-metrics-<tarih>.json dosyasına yazar.
 *
 * Kullanım: node scripts/build-ontology-snapshot.mjs [--date YYYY-MM-DD] [--stdout]
 *
 * Yöntem notları:
 * - Kelime sayımı katalog denetimiyle aynı düzenli ifadeyi kullanır.
 * - "Kök yaklaşığı" Türkçe için 5 harflik önek kesmedir (F5). Biçimbirim
 *   çözümleyicinin (Zemberek) yerine geçmez; v0.2'de değiştirilecek.
 * - "Yeni kök katkısı": içerik, kendi okuma yolundan ÖNCEKİ yolların tüm
 *   içeriklerinde görülmemiş köklerin sayısıdır (katalog içi ölçüm). Dış bir
 *   yaş/sınıf sıklık listesi henüz yoktur; ontolojide boşluk olarak işaretlidir.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { contentFingerprint, evaluateAiEvidenceReview } from "../src/content/aiEvidenceReview.js";
import vm from "node:vm";
import { COMPLETE_OKURIO_SESSIONS } from "../src/content/completeOkurioSessions.js";
import { PETER_RABBIT_FULL } from "../src/content/fullPublicDomainStories.js";
import { ANDERSEN_STORIES } from "../src/content/andersenStories.js";
import { mergePilotStories, getStoryMetadata, getGlossaryForStory } from "../src/content/pilotCatalogAdapter.js";
import { TR_SCHOOL_GRADE_MAP } from "../src/content/schoolGradeMapping.js";
import { READING_LEVEL_WORD_TARGETS } from "../src/content/readingLevelPolicy.js";

const args = process.argv.slice(2);
const dateArg = args.includes("--date") ? args[args.indexOf("--date") + 1] : new Date().toISOString().slice(0, 10);
const source = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");

function literal(name) {
  const token = `const ${name} = `;
  const start = source.indexOf(token);
  if (start < 0) throw new Error(`${name} bulunamadı`);
  let i = start + token.length;
  const open = source[i];
  const close = open === "[" ? "]" : open === "{" ? "}" : null;
  if (!close) throw new Error(`${name} düz bir literal değil`);
  let depth = 0; let inStr = null; let esc = false;
  for (; i < source.length; i += 1) {
    const ch = source[i];
    if (inStr) {
      if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") { inStr = ch; continue; }
    if (ch === open) depth += 1;
    else if (ch === close) { depth -= 1; if (depth === 0) break; }
  }
  return vm.runInNewContext(`(${source.slice(start + token.length, i + 1)})`, {});
}

function loadCatalog() {
  const startToken = "const KATALOG = mergePilotStories([";
  const start = source.indexOf(startToken);
  const end = source.indexOf("\n]);\n\nconst RAFLAR", start);
  return vm.runInNewContext(source.slice(start + "const KATALOG = ".length, end + 3), {
    COMPLETE_OKURIO_SESSIONS, PETER_RABBIT_FULL, ANDERSEN_STORIES, mergePilotStories,
  });
}

const tokens = (text) => String(text ?? "").match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];
const lower = (w, dil) => (dil === "en" ? w.toLowerCase() : w.toLocaleLowerCase("tr-TR"));
const stem = (w, dil) => {
  const base = lower(w, dil).replace(/['’].*$/u, "");
  if (/^\d+$/u.test(base)) return null;
  return dil === "en" ? base : base.slice(0, 5);
};
const sentenceLengths = (text) =>
  String(text ?? "").split(/(?<=[.!?…])\s+/u).map((s) => tokens(s).length).filter((n) => n > 0);

// Katalog denetimiyle (scripts/audit-full-catalog.mjs) aynı mikro alıştırma kuralı.
const isMicroExercise = (story) => {
  const tr = (v) => String(v ?? "").toLocaleLowerCase("tr-TR");
  const id = tr(story?.id); const title = tr(story?.baslik); const category = tr(story?.kategori);
  const declaredType = tr(story?.icerikTuru ?? story?.icerikDurumu);
  const sectionNames = tr((story?.bolumler ?? []).map((b) => b?.ad ?? "").join(" "));
  return (
    /(?:^|-)oki-ses-(?:[a-z0-9]+)(?:-|$)/u.test(id) ||
    /(?:heceler|kelimeler|word-card|words-card)/u.test(id) ||
    /^[a-zçğıöşü] sesi$/u.test(title) ||
    /(?:kelime kart|word card|english card|bilmece|tekerleme|ritim oyunu)/u.test(category) ||
    /(?:mikro alıştırma|micro exercise|kelime kart|word card|harf kart|hece kart)/u.test(declaredType) ||
    /(?:hece kartları|kelime kartları|harf ve hece|heceye geç)/u.test(sectionNames)
  );
};

const OKUMA_YOLLARI = literal("OKUMA_YOLLARI");
const EVRE_SECENEKLERI = literal("EVRE_SECENEKLERI");
const EVRE_SECENEKLERI_BY_YOL = literal("EVRE_SECENEKLERI_BY_YOL");
const DESTEK_SECENEKLERI = literal("DESTEK_SECENEKLERI");
const YOL_SEGMENT_GRUPLARI = literal("YOL_SEGMENT_GRUPLARI");
const YOL_ICERIK_TURLERI = literal("YOL_ICERIK_TURLERI");
const ICERIK_METADATA = literal("ICERIK_METADATA");
const OQL_SEVIYELERI = literal("OQL_SEVIYELERI");
const catalog = loadCatalog();

const yolSirasi = OKUMA_YOLLARI.map((y) => y.id);
const segmentToYollar = {};
for (const [yolId, segs] of Object.entries(YOL_SEGMENT_GRUPLARI)) {
  for (const s of segs) (segmentToYollar[s] ??= []).push(yolId);
}
// İçeriğin "ana yolu": metadata segmentlerinin işaret ettiği en erken yol.
const anaYol = (meta) => {
  const adaylar = (meta?.segmentler ?? []).flatMap((s) => segmentToYollar[s] ?? []);
  const sirali = adaylar.map((y) => yolSirasi.indexOf(y)).filter((i) => i >= 0).sort((a, b) => a - b);
  return sirali.length ? yolSirasi[sirali[0]] : null;
};

// K-2026-10-18-07: AI kanıt onayı kayıtları (insan onayı değildir).
const aiKayitDizini = new URL("../ontology/reviews/ai-kanit/", import.meta.url);
const aiKayitlari = existsSync(aiKayitDizini)
  ? Object.fromEntries(readdirSync(aiKayitDizini).filter((f) => f.endsWith(".json") && f !== "SABLON.json").map((f) => {
      const r = JSON.parse(readFileSync(new URL(f, aiKayitDizini), "utf8"));
      return [r.icerikId, r];
    }))
  : {};

const kayitlar = catalog.map((story) => {
  const meta = ICERIK_METADATA[story.id] ?? null;
  const dil = story.dil === "en" ? "en" : "tr";
  const metin = (story.bolumler ?? []).map((b) => b.metin ?? "").join("\n");
  const kelimeler = tokens(metin);
  const kokler = new Set(kelimeler.map((w) => stem(w, dil)).filter(Boolean));
  const yuzeyler = new Set(kelimeler.map((w) => lower(w, dil)));
  const cumle = sentenceLengths(metin);
  const pilotMeta = getStoryMetadata(story.id) ?? story.metadata ?? {};
  const sozluk = getGlossaryForStory(story.id) ?? pilotMeta.glossary ?? [];
  const dilProfili = pilotMeta.editorialLanguageProfile ?? {};
  const yol = anaYol(meta);
  const sinif = TR_SCHOOL_GRADE_MAP.find((g) => g.yolId === yol) ?? null;
  return {
    id: story.id,
    baslik: story.baslik,
    dil,
    yasEtiketi: story.yas ?? null,
    anaOkumaYolu: yol,
    mebKademe: sinif?.mebKademe ?? null,
    sinif: sinif?.okulSinifAraligi ?? null,
    icerikTuru: meta?.icerikTuru ?? null,
    mikroAlistirma: isMicroExercise(story),
    okumaEvreleri: meta?.okumaEvreleri ?? [],
    oql: meta?.oql ?? null,
    icerikDurumu: story.icerikDurumu ?? null,
    hakDurumu: story.hakDurumu ?? story.metadata?.rightsStatus ?? pilotMeta.rightsStatus ?? null,
    kaynakVar: Boolean(story.kaynak?.url || story.kaynak?.ad),
    bolumSayisi: (story.bolumler ?? []).length,
    kelimeSayisi: kelimeler.length,
    benzersizYuzey: yuzeyler.size,
    benzersizKokYaklasigi: kokler.size,
    turBelirtkeOrani: kelimeler.length ? Number((yuzeyler.size / kelimeler.length).toFixed(3)) : 0,
    ortCumleKelime: cumle.length ? Number((cumle.reduce((a, b) => a + b, 0) / cumle.length).toFixed(1)) : 0,
    enUzunCumle: cumle.length ? Math.max(...cumle) : 0,
    sozlukGirdisi: sozluk.length,
    deyim: (dilProfili.idioms ?? []).length,
    atasozu: (dilProfili.proverbs ?? []).length,
    kulturelOge: (dilProfili.culturalObjects ?? []).length,
    insanOnayi: story.contentQualityReview?.status ?? "yok",
    aiKanitOnayi: (() => {
      const r = aiKayitlari[story.id];
      if (!r) return { durum: "yok" };
      const e = evaluateAiEvidenceReview(r, { fingerprint: contentFingerprint(story.bolumler ?? []) });
      return { durum: e.aiApproved ? "ai-onayli" : e.valid ? r.status : "gecersiz-kayit", engeller: e.blockers.length, hatalar: e.errors.length, tarih: r.reviewedAt };
    })(),
    releaseReady: story.releaseReady === true,
    _kokler: kokler,
  };
});

// Yeni kök katkısı: kendi yolundan önceki yollardaki tüm içeriklerde görülmemiş kökler (aynı dil).
for (const k of kayitlar) {
  const sira = yolSirasi.indexOf(k.anaOkumaYolu);
  if (sira < 0) { k.yeniKokKatkisi = null; continue; }
  const onceki = new Set();
  for (const d of kayitlar) {
    const ds = yolSirasi.indexOf(d.anaOkumaYolu);
    if (d.dil === k.dil && ds >= 0 && ds < sira) d._kokler.forEach((s) => onceki.add(s));
  }
  let yeni = 0;
  k._kokler.forEach((s) => { if (!onceki.has(s)) yeni += 1; });
  k.yeniKokKatkisi = yeni;
  k.yeniKokOrani = k._kokler.size ? Number((yeni / k._kokler.size).toFixed(3)) : 0;
}
kayitlar.forEach((k) => delete k._kokler);

// Gerçek ortanca: çift sayılı listede ortadaki iki değerin ortalaması (v0.1.1 düzeltmesi).
const med = (arr) => {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Number(((s[m - 1] + s[m]) / 2).toFixed(1));
};

// Yaş etiketi aralığı ("5-9 yaş", "5–6", "18+") → [alt, üst].
const yasAraligi = (etiket) => {
  const m = String(etiket ?? "").match(/(\d+)\s*[-–]\s*(\d+)/u);
  if (m) return [Number(m[1]), Number(m[2])];
  const p = String(etiket ?? "").match(/(\d+)\s*\+/u);
  return p ? [Number(p[1]), 99] : null;
};
const yolYasi = Object.fromEntries(OKUMA_YOLLARI.map((y) => [y.id, yasAraligi(y.yas)]));

// K-2026-10-18-04 yeni kök bandı yöntemi (ontology/karar-kayitlari.json):
// örneklem = yolun Türkçe tam okumaları içinden yaş etiketi aralığı yolun yaş
// aralığıyla kesişenler; n >= 3 ise bant = gerçek ortanca ±%25, değilse null.
const BANT_MIN_ORNEKLEM = 3;
const yasUyumlu = (k) => {
  const y = yolYasi[k.anaOkumaYolu]; const e = yasAraligi(k.yasEtiketi);
  if (!y || !e) return false;
  return e[0] <= y[1] && e[1] >= y[0];
};
const yasYolTutarsizliklari = kayitlar
  .filter((k) => !k.mikroAlistirma && k.anaOkumaYolu && yasAraligi(k.yasEtiketi) && !yasUyumlu(k))
  .map((k) => ({ id: k.id, yasEtiketi: k.yasEtiketi, anaOkumaYolu: k.anaOkumaYolu, yolYasi: OKUMA_YOLLARI.find((y) => y.id === k.anaOkumaYolu)?.yas ?? null }));

const yolOzeti = yolSirasi.map((yolId) => {
  const tum = kayitlar.filter((k) => k.anaOkumaYolu === yolId);
  const ic = tum.filter((k) => !k.mikroAlistirma);
  const hedef = READING_LEVEL_WORD_TARGETS[yolId] ?? null;
  const orneklem = ic.filter((k) => k.dil === "tr" && yasUyumlu(k));
  const bantMedyan = orneklem.length >= BANT_MIN_ORNEKLEM ? med(orneklem.map((k) => k.yeniKokKatkisi ?? 0)) : null;
  const yeniKokBandi = bantMedyan === null
    ? { alt: null, ust: null, orneklem: orneklem.map((k) => k.id), durum: "yetersiz-orneklem", karar: "K-2026-10-18-04" }
    : { alt: Math.round(bantMedyan * 0.75), ust: Math.round(bantMedyan * 1.25), medyan: bantMedyan, orneklem: orneklem.map((k) => k.id), durum: "hesaplandi", karar: "K-2026-10-18-04" };
  return {
    yolId,
    icerikSayisi: tum.length,
    tamOkuma: ic.length,
    mikroAlistirma: tum.length - ic.length,
    hedefKelime: hedef,
    medyanKelime: med(ic.map((k) => k.kelimeSayisi)),
    hedefAraligindaki: hedef ? ic.filter((k) => k.kelimeSayisi >= hedef.minWords && k.kelimeSayisi <= hedef.maxWords).length : 0,
    medyanYeniKok: med(ic.map((k) => k.yeniKokKatkisi ?? 0)),
    sozluguOlan: ic.filter((k) => k.sozlukGirdisi > 0).length,
    deyimAtasozuOlan: ic.filter((k) => k.deyim + k.atasozu > 0).length,
    insanOnayli: ic.filter((k) => k.insanOnayi === "approved").length,
    aiKanitOnayli: ic.filter((k) => k.aiKanitOnayi?.durum === "ai-onayli").length,
    yeniKokBandi,
  };
});

const kapsam = {
  toplamIcerik: kayitlar.length,
  tamOkuma: kayitlar.filter((k) => !k.mikroAlistirma).length,
  metadataEslesen: kayitlar.filter((k) => ICERIK_METADATA[k.id]).length,
  okumaYoluAtanan: kayitlar.filter((k) => k.anaOkumaYolu).length,
  sozluguOlan: kayitlar.filter((k) => k.sozlukGirdisi > 0).length,
  deyimAtasozuBeyanli: kayitlar.filter((k) => k.deyim + k.atasozu > 0).length,
  kaynakBeyanli: kayitlar.filter((k) => k.kaynakVar).length,
  hakDurumuBeyanli: kayitlar.filter((k) => k.hakDurumu).length,
  insanOnayli: kayitlar.filter((k) => k.insanOnayi === "approved").length,
  aiKanitOnayli: kayitlar.filter((k) => k.aiKanitOnayi?.durum === "ai-onayli").length,
  mebKazanimKoduOlan: 0,
};

const snapshot = {
  ontologyVersion: "0.1.1",
  olusturuldu: dateArg,
  kaynak: "src/App.jsx (KATALOG, ICERIK_METADATA ve kontrollü sözlükler), src/content/*",
  yontem: {
    kelime: "[\\p{L}\\p{N}]+(?:['’][\\p{L}\\p{N}]+)* (katalog denetimiyle aynı)",
    kokYaklasigi: "Türkçe 5 harflik önek (F5); İngilizce küçük harf yüzey biçimi",
    yeniKokKatkisi: "Önceki okuma yollarındaki aynı dildeki içeriklerde görülmemiş kök sayısı",
    medyan: "Gerçek ortanca (çift sayıda ortadaki iki değerin ortalaması)",
    yeniKokBandi: "K-2026-10-18-04: yaş etiketi aralığı yolun yaş aralığıyla kesişen Türkçe tam okumalar; n>=3 ise gerçek ortanca ±%25, değilse yetersiz-orneklem",
  },
  kontrolluSozlukler: {
    okumaYollari: OKUMA_YOLLARI.map(({ id, baslik, yas, mod, evre }) => ({ id, baslik, yas, mod, varsayilanEvre: evre })),
    evreler: EVRE_SECENEKLERI,
    yolEvreleri: EVRE_SECENEKLERI_BY_YOL,
    destekler: DESTEK_SECENEKLERI,
    yolSegmentleri: YOL_SEGMENT_GRUPLARI,
    yolIcerikTurleri: YOL_ICERIK_TURLERI,
    oqlSeviyeleri: OQL_SEVIYELERI,
  },
  kapsam,
  yolOzeti,
  yasYolTutarsizliklari,
  icerikler: kayitlar,
};

// AI kanıt denetimi girdisi: node scripts/build-ontology-snapshot.mjs --icerik <id>
if (args.includes("--icerik")) {
  const id = args[args.indexOf("--icerik") + 1];
  const story = catalog.find((x) => x.id === id);
  if (!story) { console.error(`İçerik bulunamadı: ${id}`); process.exit(1); }
  const k = kayitlar.find((x) => x.id === id);
  const pilotMeta = getStoryMetadata(id) ?? story.metadata ?? {};
  process.stdout.write(JSON.stringify({
    icerikId: id, baslik: story.baslik, dil: k.dil, anaOkumaYolu: k.anaOkumaYolu, yasEtiketi: story.yas ?? null,
    hakDurumu: k.hakDurumu, kaynak: story.kaynak ?? null, contentFingerprint: contentFingerprint(story.bolumler ?? []),
    sozluk: getGlossaryForStory(id) ?? pilotMeta.glossary ?? [], editorialLanguageProfile: pilotMeta.editorialLanguageProfile ?? null,
    bolumler: (story.bolumler ?? []).map((b) => ({ ad: b.ad, metin: b.metin })),
    mevcutAiKaydi: k.aiKanitOnayi,
  }, null, 2));
  process.exit(0);
}

const json = JSON.stringify(snapshot, null, 2);
if (args.includes("--stdout")) process.stdout.write(json);
else {
  mkdirSync(new URL("../ontology/snapshots/", import.meta.url), { recursive: true });
  const out = new URL(`../ontology/snapshots/catalog-metrics-${dateArg}.json`, import.meta.url);
  writeFileSync(out, json + "\n");
  console.log(`Yazıldı: ontology/snapshots/catalog-metrics-${dateArg}.json`);
  console.log(JSON.stringify({ kapsam, yolOzeti }, null, 1));
}
