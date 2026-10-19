/**
 * Okurio toplu AI denetimi (Anthropic Message Batches API).
 *
 * Kipler:
 *   review   Her içeriğe bağımsız AI denetimi: dil düzeyi, hak/özgünlük riski, yaşa uygunluk.
 *   kazanim  Her içeriğe MEB okuma kazanımı eşleme önerisi (ontology/vocab/meb-kazanim.json gerekir).
 *
 * Çıktı ontology/ai-reviews/<kip>-<tarih>.json dosyasıdır. Sonuçlar yalnız KANITTIR:
 * reviewerKind "ai" olarak yazılır; contentQualityReview.reviewerName, ownerApproval.ownerName
 * ve releaseReady alanlarına hiçbir koşulda dokunulmaz (docs/AI-ASSISTED-QUALITY-GATE-v1.0.md).
 *
 * Kullanım:
 *   node scripts/ai-batch-review.mjs --mode review --limit 5 --max-usd 2 --dry-run
 *   ANTHROPIC_API_KEY=... node scripts/ai-batch-review.mjs --mode kazanim --limit 80 --max-usd 15
 * Anahtar yalnız ortam değişkeninden okunur; dosyaya veya günlüğe yazılmaz.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { loadCatalog, storyText } from "./lib/okurio-catalog.mjs";

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
};
const MODE = arg("mode", "review");
const LIMIT = Number(arg("limit", "5"));
const MAX_USD = Number(arg("max-usd", "2"));
const MODEL = arg("model", "claude-opus-5-5");
const DRY = process.argv.includes("--dry-run");
const DATE = arg("date", new Date().toISOString().slice(0, 10));
const ONLY = arg("only", "");

// Batch fiyatı, USD / milyon token (platform.claude.com/docs/en/about-claude/pricing, 2026-10-18).
const PRICE = {
  "claude-opus-5-5": { in: 2, out: 10 },
  "claude-sonnet-5-5": { in: 1, out: 5 },
  "claude-haiku-5-5": { in: 0.05, out: 0.25 },
};
const MAX_OUT = MODE === "review" ? 3000 : 2000;
if (!["review", "kazanim"].includes(MODE)) throw new Error(`Bilinmeyen kip: ${MODE}`);
if (!PRICE[MODEL]) throw new Error(`Fiyatı tanımsız model: ${MODEL}`);

const ontology = JSON.parse(readFileSync(new URL("../ontology/okurio-ontology.v0.1.json", import.meta.url), "utf8"));
const snapDir = new URL("../ontology/snapshots/", import.meta.url);
const snapshotFile = arg("snapshot", readdirSync(snapDir).filter((f) => f.startsWith("catalog-metrics-")).sort().at(-1));
const snapshot = JSON.parse(readFileSync(new URL(snapshotFile, snapDir), "utf8"));
const metrics = new Map(snapshot.icerikler.map((k) => [k.id, k]));
const yolMap = new Map(snapshot.kontrolluSozlukler.okumaYollari.map((y) => [y.id, y]));

let kazanimlar = null;
const kazanimPath = new URL("../ontology/vocab/meb-kazanim.json", import.meta.url);
if (MODE === "kazanim") {
  if (!existsSync(kazanimPath)) throw new Error("ontology/vocab/meb-kazanim.json yok (boşluk B2). Önce kazanım listesi eklenmeli.");
  kazanimlar = JSON.parse(readFileSync(kazanimPath, "utf8"));
}

const SYSTEM_REVIEW = `Sen Okurio okuma uygulaması için bağımsız bir içerik denetçisisin. Okurio disleksi, DEHB ve görme güçlüğü yaşayan okurlara okuma desteği verir. Görevin bir metni okuma yolunun yaş hedefine göre denetlemek ve yalnız JSON döndürmek. Onay vermezsin; bulguların insan incelemesine kanıt olarak gider.
JSON şeması: {"dilDuzeyi":{"sonuc":"uygun|duzeltme|yol_degismeli","gerekce":"en fazla 3 cümle","zorKelimeler":["en fazla 10"]},"dogallik":{"sonuc":"uygun|duzeltme","sorunluCumleler":["en fazla 5 alıntı"]},"hakOzgunluk":{"sonuc":"temiz|kaynak_eksik|telif_riski","gerekce":"..."},"guvenlik":{"sonuc":"uygun|duzeltme","bulgular":["..."]},"disleksiDehbYuku":{"sonuc":"uygun|duzeltme","gerekce":"..."},"deyimAtasozu":[{"ifade":"...","dogruKullanim":true}],"oneriler":["en fazla 5 kısa öneri"]}`;

const SYSTEM_KAZANIM = `Sen Türkçe öğretmeni gözüyle çalışan bir müfredat eşleştiricisisin. Sana bir okuma metni ve resmî MEB Türkçe programından ilgili sınıfların okuma kazanımları verilecek. Yalnız verilen listedeki kodları kullan; listede olmayan kod üretme. Yalnız JSON döndür.
JSON şeması: {"eslesmeler":[{"kod":"listeden","gerekce":"bir cümle","guven":"yuksek|orta|dusuk"}],"uygunSinifAraligi":"ör. 3-4","not":"varsa kısa not"}. En fazla 3 eşleşme ver.`;

function userPrompt(story, m) {
  const yol = yolMap.get(m?.anaOkumaYolu);
  const head = [
    `İçerik: ${story.baslik} (${story.id})`,
    `Dil: ${m?.dil}; okuma yolu: ${m?.anaOkumaYolu} (${yol?.yas ?? "?"}); MEB: ${m?.mebKademe ?? "-"} ${m?.sinif ?? ""}`,
    `Ölçüm: ${m?.kelimeSayisi} kelime, ort. cümle ${m?.ortCumleKelime}, en uzun cümle ${m?.enUzunCumle}, yeni kök ${m?.yeniKokKatkisi}`,
    `Hak durumu: ${m?.hakDurumu ?? "beyan yok"}; kaynak: ${story.kaynak?.ad ?? story.kaynak?.url ?? "yok"}`,
  ].join("\n");
  if (MODE === "review") return `${head}\n\nMetin:\n${storyText(story)}`;
  const siniflar = (kazanimlar.siniflar ?? []).filter((s) => {
    const n = Number(String(m?.sinif ?? "").match(/\d+/)?.[0] ?? 0);
    return n === 0 ? s.sinif <= 2 : Math.abs(s.sinif - n) <= 1;
  });
  const liste = siniflar.flatMap((s) => (s.kazanimlar ?? []).map((k) => `${k.kod ?? "kodsuz"} | ${s.sinif}. sınıf | ${k.beceri ?? ""} | ${k.metin}`));
  return `${head}\n\nAday kazanımlar:\n${liste.join("\n")}\n\nMetin:\n${storyText(story)}`;
}

const catalog = loadCatalog()
  .filter((s) => !ONLY || ONLY.split(",").includes(s.id))
  .filter((s) => MODE === "review" || !metrics.get(s.id)?.mikroAlistirma)
  .slice(0, LIMIT);
const system = MODE === "review" ? SYSTEM_REVIEW : SYSTEM_KAZANIM;
const safeId = (id) => id.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 64);
const requests = catalog.map((story) => ({
  custom_id: safeId(story.id),
  params: {
    model: MODEL,
    max_tokens: MAX_OUT,
    system,
    messages: [{ role: "user", content: userPrompt(story, metrics.get(story.id)) }],
  },
}));

// Kaba tahmin: Türkçe için ~3 karakter / token.
const inTok = requests.reduce((a, r) => a + Math.ceil((r.params.system.length + r.params.messages[0].content.length) / 3), 0);
const outTok = requests.length * MAX_OUT;
const usd = (inTok * PRICE[MODEL].in + outTok * PRICE[MODEL].out) / 1e6;
console.log(JSON.stringify({ mode: MODE, model: MODEL, istek: requests.length, tahminiGirdiToken: inTok, enFazlaCiktiToken: outTok, tahminiUstSinirUSD: Number(usd.toFixed(2)), butceUSD: MAX_USD }));
if (usd > MAX_USD) { console.error(`Tahmini üst sınır ${usd.toFixed(2)} USD, bütçe ${MAX_USD} USD. Durduruldu.`); process.exit(2); }
if (DRY) process.exit(0);

const KEY = process.env.ANTHROPIC_API_KEY;
if (!KEY) throw new Error("ANTHROPIC_API_KEY ortam değişkeni yok.");
const H = { "x-api-key": KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" };
const api = async (path, init = {}) => {
  const r = await fetch(`https://api.anthropic.com/v1${path}`, { ...init, headers: { ...H, ...(init.headers ?? {}) } });
  if (!r.ok) throw new Error(`${path}: HTTP ${r.status} ${await r.text()}`);
  return r;
};

const batch = await (await api("/messages/batches", { method: "POST", body: JSON.stringify({ requests }) })).json();
console.log(`Batch: ${batch.id}`);
let state = batch;
const deadline = Date.now() + 5 * 3600 * 1000;
while (state.processing_status !== "ended") {
  if (Date.now() > deadline) throw new Error(`Batch ${batch.id} 5 saatte bitmedi; sonra --resume ile alınabilir.`);
  await new Promise((r) => setTimeout(r, 60_000));
  state = await (await api(`/messages/batches/${batch.id}`)).json();
  console.log(JSON.stringify(state.request_counts));
}

const lines = (await (await api(`/messages/batches/${batch.id}/results`)).text()).trim().split("\n");
const idByCustom = new Map(catalog.map((s) => [safeId(s.id), s.id]));
let usageIn = 0, usageOut = 0;
const sonuclar = lines.map((line) => {
  const row = JSON.parse(line);
  const id = idByCustom.get(row.custom_id) ?? row.custom_id;
  if (row.result?.type !== "succeeded") return { id, hata: row.result?.type ?? "bilinmiyor" };
  const msg = row.result.message;
  usageIn += msg.usage?.input_tokens ?? 0; usageOut += msg.usage?.output_tokens ?? 0;
  const text = (msg.content ?? []).filter((c) => c.type === "text").map((c) => c.text).join("");
  let veri = null;
  try { veri = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)); } catch { veri = { hamMetin: text }; }
  if (MODE === "kazanim" && veri?.eslesmeler) {
    const gecerli = new Set((kazanimlar.siniflar ?? []).flatMap((s) => (s.kazanimlar ?? []).map((k) => k.kod)).filter(Boolean));
    veri.eslesmeler = veri.eslesmeler.map((e) => ({ ...e, kodListedeVar: gecerli.has(e.kod) }));
  }
  return { id, ...veri };
});

const out = {
  mod: MODE, model: MODEL, tarih: DATE, batchId: batch.id, ontologyVersion: ontology.version,
  reviewerKind: "ai",
  not: "Bu dosya kanıttır, onay değildir. İnsan onayı contentQualityReview ve ownerApproval alanlarında Reyhan tarafından verilir.",
  kullanim: { girdiToken: usageIn, ciktiToken: usageOut, gercekUSD: Number(((usageIn * PRICE[MODEL].in + usageOut * PRICE[MODEL].out) / 1e6).toFixed(3)) },
  sonuclar,
};
mkdirSync(new URL("../ontology/ai-reviews/", import.meta.url), { recursive: true });
const file = `ontology/ai-reviews/${MODE}-${DATE}.json`;
writeFileSync(new URL(`../${file}`, import.meta.url), JSON.stringify(out, null, 2) + "\n");
console.log(`Yazıldı: ${file}`, JSON.stringify(out.kullanim));
