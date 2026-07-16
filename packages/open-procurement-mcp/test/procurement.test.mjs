import test from 'node:test';
import assert from 'node:assert/strict';
import { summarize, validatePublicUrl } from '../src/index.mjs';

test('refuses local and insecure release URLs', () => { assert.throws(() => validatePublicUrl('http://example.com/x.json'), /public HTTPS/); assert.throws(() => validatePublicUrl('https://localhost/x.json'), /public HTTPS/); });
test('summary groups awards by currency', () => assert.deepEqual(summarize({ releases: [{ ocid: 'ocds-x', buyer: { name: 'City' }, awards: [{ value: { amount: 15, currency: 'EUR' } }, { value: { amount: 10, currency: 'EUR' } }] }] }).awarded_value_by_currency, { EUR: 25 }));
