#!/usr/bin/env node
/**
 * Taslak dosyasını yayın öncesi uzunluk politikasıyla ölçer.
 * Kullanım: node scripts/check-draft-length.mjs src/content/drafts/<dosya>.js [...]
 * Çıkış kodu 1: en az bir taslak "uygun" değil.
 */
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { auditStoryLength, LENGTH_VERDICT } from "../src/content/lengthOptimizationPolicy.js";

let failed = false;
for (const file of process.argv.slice(2)) {
  const mod = await import(pathToFileURL(resolve(file)).href);
  for (const [name, draft] of Object.entries(mod)) {
    if (!draft || typeof draft !== "object" || !Array.isArray(draft.sections)) continue;
    const story = {
      id: draft.id,
      baslik: draft.title,
      bolumler: draft.sections.map((s) => ({ ad: s.title, metin: (s.paragraphs ?? []).join("\n\n") })),
    };
    const result = auditStoryLength(story, draft.readingPathId);
    const ok = result.verdict === LENGTH_VERDICT.OK;
    if (!ok) failed = true;
    console.log(`${ok ? "UYGUN" : "DÜZELT"}  ${name}  ${draft.readingPathId}  ${result.wordCount} kelime  (${result.target?.minWords}-${result.target?.maxWords})`);
    for (const p of result.passages ?? []) console.log(`   bölüm ${p.index + 1}: ${p.words} kelime, en uzun cümle ${p.longestSentence}  ${p.title}`);
    for (const f of result.findings) console.log(`   - ${f.message}`);
  }
}
process.exit(failed ? 1 : 0);
