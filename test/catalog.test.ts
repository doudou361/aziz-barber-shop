import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_SERVICES, PRICING_CATEGORIES, formatPrice, formatSelectionPrice } from '../src/data/site.ts';

test('every service is included in one pricing and booking category', () => {
  const categories = new Set(PRICING_CATEGORIES.map((category) => category.id));
  assert.equal(categories.size, PRICING_CATEGORIES.length);
  assert.equal(new Set(ALL_SERVICES.map((service) => service.id)).size, ALL_SERVICES.length);
  for (const service of ALL_SERVICES) assert.ok(categories.has(service.category), service.id);
  for (const category of PRICING_CATEGORIES) assert.ok(ALL_SERVICES.some((service) => service.category === category.id), category.id);
});

test('Traçage has a pending price in the menu and mixed booking totals', () => {
  const trace = ALL_SERVICES.find((service) => service.id === 'tracage');
  const haircut = ALL_SERVICES.find((service) => service.id === 'coupe-adulte');
  assert.ok(trace && haircut);
  assert.equal(trace.category, 'tracage');
  assert.equal(trace.priceDa, null);
  assert.equal(formatPrice(trace.priceDa, 'fr'), 'À confirmer');
  assert.equal(formatSelectionPrice([trace], 'fr'), 'À confirmer');
  assert.equal(formatSelectionPrice([haircut, trace], 'fr'), '1 000 DA + À confirmer');
});
