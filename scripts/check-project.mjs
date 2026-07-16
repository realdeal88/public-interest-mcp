import { existsSync, readdirSync, readFileSync } from 'node:fs';

const packages = readdirSync('packages', { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
const expected = ['global-weather-mcp', 'open-procurement-mcp', 'product-facts-mcp'];
if (packages.join(',') !== expected.join(',')) throw new Error(`Expected ${expected.join(', ')}; found ${packages.join(', ')}.`);
for (const name of packages) {
  for (const file of ['README.md', 'LICENSE', 'package.json', 'src/index.mjs']) {
    const path = `packages/${name}/${file}`;
    if (!existsSync(path)) throw new Error(`Missing ${path}`);
  }
  const pkg = JSON.parse(readFileSync(`packages/${name}/package.json`, 'utf8'));
  if (pkg.license !== 'Apache-2.0' || !pkg.repository?.url) throw new Error(`Package metadata incomplete for ${name}.`);
}
console.log(`Validated ${packages.length} publishable server packages.`);
