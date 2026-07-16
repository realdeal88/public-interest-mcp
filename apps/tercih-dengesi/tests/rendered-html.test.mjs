import assert from "node:assert/strict"; import test from "node:test";
test("risk bands are deterministic", () => { const band = (rank, last) => rank / last <= .78 ? "safe" : rank / last <= 1.08 ? "balanced" : "risk"; assert.equal(band(30000, 51000), "safe"); assert.equal(band(30000, 32000), "balanced"); assert.equal(band(30000, 18500), "risk"); });
