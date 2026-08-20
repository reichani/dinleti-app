import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

function gitCommit() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

const manifest = {
  product: "Okurio",
  version: "2.9.0",
  commit: process.env.GITHUB_SHA || process.env.CF_PAGES_COMMIT_SHA || gitCommit(),
  builtAt: new Date().toISOString(),
  channel: process.env.CF_PAGES_BRANCH === "main" || process.env.GITHUB_REF_NAME === "main" ? "production" : "candidate",
};

mkdirSync("dist", { recursive: true });
writeFileSync("dist/release.json", `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Release manifest: ${manifest.version} ${manifest.commit}`);
