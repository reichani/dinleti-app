import assert from "node:assert/strict";
import test from "node:test";
import {
  OKURIO_POSITIONING,
  OKURIO_SCHOOL_PRICING_ARCHITECTURE,
  OKURIO_STRATEGIC_GUARDRAILS,
  OKURIO_VALUE_LAYERS,
} from "../src/product-strategy.js";

test("Okurio is positioned as a vertical adaptive reading platform", () => {
  assert.equal(OKURIO_POSITIONING.category, "Kişiselleştirilmiş Okuma Platformu");
  assert.match(OKURIO_POSITIONING.oneLiner, /yaşına ve okuma yoluna uygun/u);
  assert.match(OKURIO_POSITIONING.oneLiner, /öğretmenlerin bireyselleştirilmiş okumayı sınıfta ölçeklemesini/u);
});

test("commodity accessibility features are not treated as the monetization moat", () => {
  for (const item of ["font", "spacing", "text-to-speech", "browser-extension"]) {
    assert.ok(OKURIO_VALUE_LAYERS.commodity.includes(item));
    assert.ok(!OKURIO_VALUE_LAYERS.differentiation.includes(item));
    assert.ok(!OKURIO_VALUE_LAYERS.monetization.includes(item));
  }
  assert.ok(OKURIO_VALUE_LAYERS.differentiation.includes("age-based-reading-paths"));
  assert.ok(OKURIO_VALUE_LAYERS.differentiation.includes("turkish-age-fit-word-support"));
});

test("school pricing architecture includes teachers and extension in the platform license", () => {
  assert.equal(OKURIO_SCHOOL_PRICING_ARCHITECTURE.model, "platform-fee-plus-active-student-band");
  assert.equal(OKURIO_SCHOOL_PRICING_ARCHITECTURE.teacherAccounts, "included");
  assert.equal(OKURIO_SCHOOL_PRICING_ARCHITECTURE.browserExtension, "included");
  assert.equal(OKURIO_SCHOOL_PRICING_ARCHITECTURE.pilot, "separate-paid-program");
});

test("strategy keeps clinical claims out of the product positioning", () => {
  const joined = [
    OKURIO_POSITIONING.oneLiner,
    OKURIO_POSITIONING.consumerLine,
    OKURIO_POSITIONING.schoolPromise,
  ].join(" ").toLocaleLowerCase("tr-TR");
  assert.doesNotMatch(joined, /tanı|tedavi|terapi|iyileştirir/u);
  assert.ok(OKURIO_STRATEGIC_GUARDRAILS.some((item) => item.includes("clinical")));
});
