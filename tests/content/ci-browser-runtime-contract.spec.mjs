import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const crossPlatform = fs.readFileSync(".github/workflows/cross-platform-reader.yml", "utf8");
const regression = fs.readFileSync(".github/workflows/playwright.yml", "utf8");

test("browser jobs use the repository Playwright version and preinstalled browsers", () => {
  for (const workflow of [crossPlatform, regression]) {
    assert.match(workflow, /mcr\.microsoft\.com\/playwright:v1\.55\.0-noble/);
    assert.match(workflow, /PLAYWRIGHT_BROWSERS_PATH:\s*\/ms-playwright/);
    assert.doesNotMatch(workflow, /playwright install/);
  }
});

test("browser jobs keep bounded but realistic fail-closed timeouts", () => {
  assert.match(crossPlatform, /timeout-minutes:\s*18/);
  assert.match(regression, /timeout-minutes:\s*30/);
});

test("the cross-platform matrix still runs every required reader viewport", () => {
  assert.match(crossPlatform, /project:\s*\[samsung-s24, iphone-safari, ipad-safari\]/);
  assert.match(crossPlatform, /reader-cross-platform-contract\.spec\.js/);
});
