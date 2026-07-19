import { PILOT_STORIES } from "../src/content/pilotStories.js";
import { ODYSSEY_STORIES } from "../src/content/odysseyStories.js";
import { validatePilotCatalog } from "../src/content/validatePilotStories.js";

const curatedStories = [...ODYSSEY_STORIES, ...PILOT_STORIES];
const report = validatePilotCatalog(curatedStories);

console.log("\nOkurio Curated Content Validation\n");
console.log(JSON.stringify(report.summary, null, 2));

for (const storyReport of report.storyReports) {
  const id = storyReport.metrics?.storyId || "unknown";
  console.log(`\n${storyReport.valid ? "PASS" : "FAIL"} ${id}`);
  console.log(JSON.stringify(storyReport.metrics, null, 2));

  for (const warning of storyReport.warnings) {
    console.warn(`  WARNING: ${warning}`);
  }

  for (const error of storyReport.errors) {
    console.error(`  ERROR: ${error}`);
  }
}

for (const error of report.catalogErrors) {
  console.error(`CATALOG ERROR: ${error}`);
}

if (!report.valid) {
  process.exitCode = 1;
}
