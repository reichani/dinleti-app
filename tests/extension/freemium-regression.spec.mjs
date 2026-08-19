import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function createStorage() {
  const syncStore = new Map();
  const localStore = new Map();
  const area = (store) => ({
    async get(defaults) {
      const result = {};
      for (const [key, fallback] of Object.entries(defaults || {})) {
        result[key] = store.has(key) ? store.get(key) : fallback;
      }
      return result;
    },
    async set(values) {
      for (const [key, value] of Object.entries(values || {})) store.set(key, value);
    }
  });
  return { sync: area(syncStore), local: area(localStore), syncStore, localStore };
}

function loadFreemiumContext() {
  const storage = createStorage();
  const context = vm.createContext({
    window: {},
    chrome: { storage: { sync: storage.sync, local: storage.local } },
    console,
    Date,
    Math,
    String,
    Set
  });
  vm.runInContext(fs.readFileSync('extension/entitlement.js', 'utf8'), context);
  vm.runInContext(fs.readFileSync('extension/usage.js', 'utf8'), context);
  return { context, storage };
}

test('existing accessibility controls remain present and outside the quota engine', () => {
  const popup = fs.readFileSync('extension/popup.html', 'utf8');
  for (const id of ['enabled','fontFamily','fontSize','lineHeight','letterSpacing','focusLine','simplify','reset']) {
    assert.match(popup, new RegExp(`id=["']${id}["']`), `missing existing control ${id}`);
  }
  const entitlement = fs.readFileSync('extension/entitlement.js', 'utf8');
  for (const feature of ['fontFamily','fontSize','lineHeight','letterSpacing','focusLine','simplify']) {
    assert.doesNotMatch(entitlement, new RegExp(`["']${feature}["']`), `${feature} must not become a metered premium entitlement`);
  }
});

test('free plan allows exactly 10 new Smart Read sessions per month', async () => {
  const { context } = loadFreemiumContext();
  for (let i = 0; i < 10; i++) {
    const result = await context.window.OkurioUsage.consumeSmartRead(`https://example.com/article-${i}`, 1_700_000_000_000 + i * 1000);
    assert.equal(result.counted, true);
    assert.equal(result.used, i + 1);
  }
  const blocked = await context.window.OkurioUsage.consumeSmartRead('https://example.com/article-10', 1_700_000_020_000);
  assert.equal(blocked.upgradeRequired, true);
  assert.equal(blocked.used, 10);
});

test('same URL within 30 minutes does not consume another Smart Read', async () => {
  const { context } = loadFreemiumContext();
  const now = Date.now();
  const first = await context.window.OkurioUsage.consumeSmartRead('https://example.com/a#section', now);
  const repeated = await context.window.OkurioUsage.consumeSmartRead('https://example.com/a#other', now + 5 * 60 * 1000);
  assert.equal(first.counted, true);
  assert.equal(repeated.counted, false);
  assert.equal(repeated.used, 1);
});

test('premium and school plans are unlimited without consuming local quota', async () => {
  for (const plan of ['individual_premium', 'school', 'staff']) {
    const { context } = loadFreemiumContext();
    await context.window.OkurioEntitlement.setEntitlement({ plan });
    const result = await context.window.OkurioUsage.consumeSmartRead(`https://example.com/${plan}`, Date.now());
    assert.equal(result.unlimited, true);
    assert.equal(result.counted, false);
    assert.equal(result.used, 0);
  }
});

test('unknown/tampered plan fails closed to free defaults', async () => {
  const { context } = loadFreemiumContext();
  const entitlement = await context.window.OkurioEntitlement.setEntitlement({ plan: 'god_mode', unlimited: true, premiumFeatures: true });
  assert.equal(entitlement.plan, 'god_mode');
  // Security assertion: normalizePlan must not allow an unknown plan to elevate privileges.
  assert.equal(entitlement.unlimited, false);
  assert.equal(entitlement.premiumFeatures, false);
});
