import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders HakBul's Turkish discovery interface", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="tr">/);
  assert.match(html, /HakBul — Resmî kaynağa giden en kısa yol/);
  assert.match(html, /Durumunu kendi cümlenle anlat/);
  assert.match(html, /Kimlik, T\.C\. no veya kişisel belge istemeyiz/);
  assert.match(html, /Başvuru kararı vermez/);
  assert.match(html, /twitter:card/);
});

test("keeps source routing conservative and privacy-first", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(page, /https:\/\/www\.turkiye\.gov\.tr/);
  assert.match(page, /https:\/\/www\.iskur\.gov\.tr/);
  assert.match(page, /https:\/\/www\.kosgeb\.gov\.tr/);
  assert.match(page, /uygunluk kararı değildir/);
  assert.doesNotMatch(page, /T\.C\. kimlik numarası|e-Devlet parolası/);
  assert.match(layout, /openGraph:/);
  assert.match(layout, /twitter:/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
