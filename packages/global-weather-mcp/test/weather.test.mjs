import test from 'node:test';
import assert from 'node:assert/strict';
import { buildUrl, callTool } from '../src/index.mjs';

test('buildUrl encodes location query', () => assert.equal(buildUrl('https://example.test', { name: 'New York' }).searchParams.get('name'), 'New York'));
test('forecast rejects invalid coordinates before network access', async () => await assert.rejects(callTool('get_forecast', { latitude: 91, longitude: 0 }), /valid coordinates/));
