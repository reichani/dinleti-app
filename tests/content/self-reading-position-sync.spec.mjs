import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../../src/self-reading-position-sync.js', import.meta.url), 'utf8');

test('self-reading sync uses elapsed and remaining time to advance the reader position', () => {
  assert.match(source, /elapsed \/ total/);
  assert.match(source, /dispatchEvent\(new MouseEvent\('click'/);
  assert.match(source, /Kendim Okuyorum/);
  assert.match(source, /duraklat\|pause/);
});

test('self-reading sync does not repeatedly seek within the same second', () => {
  assert.match(source, /progress\.elapsed === lastSecond/);
  assert.match(source, /setInterval\(syncSelfReadingPosition, 500\)/);
});
