import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
execFileSync(process.execPath, [new URL("audit-full-catalog.mjs", import.meta.url).pathname], {
  cwd: root,
  stdio: ["ignore", "ignore", "inherit"],
});

const report = JSON.parse(readFileSync(new URL("catalog-quality-audit.json", root), "utf8"));
const baseline = JSON.parse(readFileSync(new URL("catalog-quality-baseline.json", root), "utf8"));
const categories = {
  rewriteQueueIds: (item) => item.rewriteQueue,
  structuralBlockedIds: (item) => item.structuralBlockers.length > 0,
  provenanceBlockedIds: (item) => item.provenanceBlockers.length > 0,
  pendingHumanReviewIds: (item) => item.approvalBlockers.length > 0 && !item.publicationReady,
};
const regressions = [];

for (const [key, predicate] of Object.entries(categories)) {
  const allowed = new Set(baseline[key] ?? []);
  const current = report.reports.filter(predicate).map((item) => item.id);
  const added = current.filter((id) => !allowed.has(id));
  if (added.length > 0) regressions.push(`${key}: ${added.join(", ")}`);
}

const unsafe = report.reports
  .filter((item) => item.releaseReady && !item.publicationReady)
  .map((item) => item.id);
if (unsafe.length > 0) regressions.push(`unsafe releaseReady: ${unsafe.join(", ")}`);

if (regressions.length > 0) {
  console.error(`Tam katalog governance regresyonu:\n- ${regressions.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log(`Tam katalog governance PASS: ${report.fullReadingCount} tam okuma, ${report.rewriteQueueCount} yeniden-yazım kaydı; yeni borç yok.`);
}
