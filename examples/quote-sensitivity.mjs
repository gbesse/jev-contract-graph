// Demonstrate how a stale synthetic order book excludes a candidate.
import {readFile} from 'node:fs/promises';
import {analyzeContracts} from '../src/contracts.js';

const fixture = JSON.parse(await readFile(new URL('../data/demo.json', import.meta.url)));
const current = analyzeContracts(structuredClone(fixture.contracts));
const staleInput = structuredClone(fixture.contracts);
staleInput.markets[0].quotes.yes.observedAt = '2026-09-21T11:00:00Z';
const stale = analyzeContracts(staleInput);
if (current.candidates < 1 || stale.candidates !== 0 || !stale.pairs.some(pair => pair.status === 'stale-quotes')) {
  throw new Error('Unexpected synthetic quote-age behavior');
}
console.log(JSON.stringify({source: 'synthetic fixture; no orders or Jev calls', initialCandidates: current.candidates, staleCandidates: stale.candidates, exclusion: 'stale-quotes'}, null, 2));
