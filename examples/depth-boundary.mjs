// Show why an attractive top-of-book quote is insufficient without executable depth.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { analyzeContracts } from '../src/contracts.js';

const fixture = JSON.parse(await readFile(new URL('../data/demo.json', import.meta.url), 'utf8'));
const enough = analyzeContracts(structuredClone(fixture.contracts));
const shallowInput = structuredClone(fixture.contracts);
for (const market of shallowInput.markets) {
  for (const side of ['yes', 'no']) {
    if (market.quotes?.[side]) market.quotes[side].asks = market.quotes[side].asks.map(level => ({ ...level, size: Math.min(level.size, 1) }));
  }
}
const shallow = analyzeContracts(shallowInput);
assert.ok(enough.candidates > 0);
assert.equal(shallow.candidates, 0);
assert.ok(shallow.pairs.some(pair => pair.status === 'insufficient-depth'));
console.log(JSON.stringify({source: 'synthetic fixture; no orders or Jev', initialCandidates: enough.candidates, shallowCandidates: shallow.candidates, exclusion: 'insufficient-depth'}, null, 2));
