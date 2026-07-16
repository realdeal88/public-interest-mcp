import test from 'node:test';
import assert from 'node:assert/strict';
import { callTool, productUrl } from '../src/index.mjs';
test('product URL stays on the official API origin', () => assert.equal(productUrl('/api/v2/product/1.json').origin, 'https://world.openfoodfacts.org'));
test('barcode validation happens before network access', async () => await assert.rejects(callTool('get_product', { barcode: 'abc' }), /6–24 digits/));
