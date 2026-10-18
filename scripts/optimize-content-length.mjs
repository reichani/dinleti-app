#!/usr/bin/env node
/**
 * Okurio uzunluk optimizasyon denetimi.
 *
 * App.jsx kataloğunu (KATALOG, RAFLAR, okuma yolu filtresi) gerçek tarayıcı
 * mantığıyla birebir değerlendirir:
 *   1. Her okuma yolu × evre için kullanıcının göreceği raf ve kitap sayısı.
 *   2. Her içeriğin kendi yaş bandına göre toplam, pasaj ve cümle uzunluğu.
 *   3. Okuma yoluna uygun olduğu halde hiçbir rafta görünmeyen içerik.
 *
 * Kullanım:
 *   node scripts/optimize-content-length.mjs            → özet tablo
 *   node scripts/optimize-content-length.mjs --json     → makine okunur rapor
 *   node scripts/optimize-content-length.mjs --report   → docs/content/LENGTH-AUDIT-<tarih>.md
 *   node scripts/optimize-content-length.mjs --check    → kapsama eşiği altında çıkış kodu 1
 */
import { mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { rolldown } from "rolldown";
import { auditStoryLength, LENGTH_VERDICT } from "../src/content/lengthOptimizationPolicy.js";
import { readingPathIdForAgeLabel } from "../src/content/contentQualityReview.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MIN_BOOKS_PER_PATH_STAGE = Number(process.env.OKURIO_MIN_BOOKS ?? 3);
const args = new Set(process.argv.slice(2));

async function loadCatalog() {
  const outDir = join(ROOT, "node_modules", ".cache", "okurio-length-audit");
  mkdirSync(outDir, { recursive: true });
  const shim = join(ROOT, "src", "__lengthAuditEntry.jsx");
  const app = readFileSync(join(ROOT, "src", "App.jsx"), "utf8");
  writeFileSync(
    shim,
    `${app}\nexport const __lengthAudit = { KATALOG, RAFLAR, OKUMA_YOLLARI, kitapOkumaYolunaUygunMu, icerikSunumu, evreSecenekleri };\n`,
  );
  try {
    const bundle = await rolldown({
      input: shim,
      platform: "node",
      external: [/^react/, /^lucide-react/, /^mammoth/, /^pdfjs-dist/],
      moduleTypes: { ".jsx": "jsx" },
      logLevel: "silent",
    });
    const file = join(outDir, "catalog.mjs");
    await bundle.write({ file, format: "esm" });
    await bundle.close();
    // node_modules/.cache altında React çözümlenir; modül önbelleğini atla.
    const mod = await import(`${pathToFileURL(file).href}?t=${Date.now()}`);
    return mod.__lengthAudit;
  } finally {
    rmSync(shim, { force: true });
  }
}

const A = await loadCatalog();

const coverage = [];
for (const yol of A.OKUMA_YOLLARI) {
  for (const evre of A.evreSecenekleri(yol.id)) {
    const profile = { yolId: yol.id, evreId: evre.id };
    const shelves = A.RAFLAR
      .filter((raf) => !raf.yolIds || raf.yolIds.includes(yol.id))
      .map((raf) => ({
        ad: raf.ad,
        ids: raf.ids.filter((id) => {
          const kitap = A.KATALOG.find((k) => k.id === id);
          return kitap && A.kitapOkumaYolunaUygunMu(kitap, profile) && A.icerikSunumu(kitap).deployable;
        }),
      }))
      .filter((raf) => raf.ids.length > 0);
    const visible = new Set(shelves.flatMap((raf) => raf.ids));
    const orphan = A.KATALOG
      .filter((k) => !k.kullaniciIcerigi && A.kitapOkumaYolunaUygunMu(k, profile) && A.icerikSunumu(k).deployable && !visible.has(k.id))
      .map((k) => k.id);
    coverage.push({
      yolId: yol.id,
      yas: yol.yas,
      evreId: evre.id,
      shelfCount: shelves.length,
      bookCount: visible.size,
      englishCount: [...visible].filter((id) => A.KATALOG.find((k) => k.id === id)?.dil === "en").length,
      books: [...visible],
      orphan,
      ok: visible.size >= MIN_BOOKS_PER_PATH_STAGE,
    });
  }
}

const stories = A.KATALOG
  .filter((k) => !k.kullaniciIcerigi)
  .map((k) => {
    const yolId = readingPathIdForAgeLabel(k.yas);
    const result = auditStoryLength(k, yolId);
    return { ...result, yas: k.yas, dil: k.dil ?? "tr", deployable: A.icerikSunumu(k).deployable };
  });

const verdictCounts = stories.reduce((acc, s) => ({ ...acc, [s.verdict]: (acc[s.verdict] ?? 0) + 1 }), {});
const gaps = coverage.filter((c) => !c.ok);
const report = {
  generatedAt: new Date().toISOString(),
  minimumBooksPerPathStage: MIN_BOOKS_PER_PATH_STAGE,
  coverage,
  gaps,
  verdictCounts,
  stories,
};

if (args.has("--json")) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  console.log("\nOkuma yolu × evre kapsaması (kullanıcının raflarda gördüğü):");
  console.table(coverage.map(({ yolId, evreId, shelfCount, bookCount, englishCount, ok }) => ({ yolId, evreId, raf: shelfCount, kitap: bookCount, en: englishCount, durum: ok ? "OK" : "AÇIK" })));
  console.log("Uzunluk kararları:", verdictCounts);
  const actionable = stories.filter((s) => [LENGTH_VERDICT.TOO_SHORT, LENGTH_VERDICT.TOO_LONG, LENGTH_VERDICT.PASSAGE_FIX].includes(s.verdict));
  console.log(`Düzeltme gereken içerik: ${actionable.length}`);
}

if (args.has("--report")) {
  const day = new Date().toISOString().slice(0, 10);
  const lines = [
    `# Okurio Uzunluk Denetimi · ${day}`,
    "",
    `Kaynak: scripts/optimize-content-length.mjs, politika src/content/lengthOptimizationPolicy.js. Eşik: her okuma yolu × evre için en az ${MIN_BOOKS_PER_PATH_STAGE} rafta görünen tam okuma.`,
    "",
    "## Kapsama",
    "",
    "| Yol | Evre | Raf | Kitap | İngilizce | Durum |",
    "|---|---|---|---|---|---|",
    ...coverage.map((c) => `| ${c.yolId} | ${c.evreId} | ${c.shelfCount} | ${c.bookCount} | ${c.englishCount} | ${c.ok ? "OK" : "AÇIK"} |`),
    "",
    "## Düzeltme gereken içerikler",
    "",
    "| İçerik | Yaş | Kelime | Karar | Bulgular |",
    "|---|---|---|---|---|",
    ...stories
      .filter((s) => s.verdict !== LENGTH_VERDICT.OK && s.verdict !== LENGTH_VERDICT.NOT_APPLICABLE)
      .map((s) => `| ${s.id} | ${s.yas} | ${s.wordCount} | ${s.verdict} | ${s.findings.map((f) => f.message).join(" · ").replace(/\|/gu, "/")} |`),
    "",
  ];
  const out = join(ROOT, "docs", "content", `LENGTH-AUDIT-${day}.md`);
  writeFileSync(out, lines.join("\n"));
  console.log(`Rapor yazıldı: ${out}`);
}

if (args.has("--check") && gaps.length > 0) {
  console.error(`\nKapsama açığı: ${gaps.map((g) => `${g.yolId}/${g.evreId}=${g.bookCount}`).join(", ")}`);
  process.exit(1);
}
