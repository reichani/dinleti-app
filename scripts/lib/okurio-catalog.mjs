// App.jsx içindeki birleşik kataloğu ve sabit literalleri derleme zamanında okur.
// scripts/audit-full-catalog.mjs ve scripts/build-ontology-snapshot.mjs ile aynı yöntem.
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { COMPLETE_OKURIO_SESSIONS } from "../../src/content/completeOkurioSessions.js";
import { PETER_RABBIT_FULL } from "../../src/content/fullPublicDomainStories.js";
import { ANDERSEN_STORIES } from "../../src/content/andersenStories.js";
import { mergePilotStories } from "../../src/content/pilotCatalogAdapter.js";

const source = readFileSync(new URL("../../src/App.jsx", import.meta.url), "utf8");

export function loadCatalog() {
  const start = source.indexOf("const KATALOG = mergePilotStories([");
  const end = source.indexOf("\n]);\n\nconst RAFLAR", start);
  if (start < 0 || end < 0) throw new Error("App.jsx KATALOG sınırı bulunamadı.");
  return vm.runInNewContext(source.slice(start + "const KATALOG = ".length, end + 3), {
    COMPLETE_OKURIO_SESSIONS, PETER_RABBIT_FULL, ANDERSEN_STORIES, mergePilotStories,
  });
}

export const storyText = (story) =>
  (story?.bolumler ?? []).map((b) => `## ${b.ad ?? ""}\n${b.metin ?? ""}`).join("\n\n");
