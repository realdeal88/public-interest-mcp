const API = 'https://api.open-meteo.com/v1/forecast';
const GEO = 'https://geocoding-api.open-meteo.com/v1/search';
const AIR = 'https://air-quality-api.open-meteo.com/v1/air-quality';

const tools = [
  { name: 'find_location', description: 'Find global places and their coordinates.', inputSchema: { type: 'object', properties: { query: { type: 'string', minLength: 2 }, count: { type: 'integer', minimum: 1, maximum: 10 } }, required: ['query'] } },
  { name: 'get_forecast', description: 'Get current weather and a daily forecast for coordinates.', inputSchema: { type: 'object', properties: { latitude: { type: 'number', minimum: -90, maximum: 90 }, longitude: { type: 'number', minimum: -180, maximum: 180 }, days: { type: 'integer', minimum: 1, maximum: 16 } }, required: ['latitude', 'longitude'] } },
  { name: 'get_air_quality', description: 'Get current air-quality readings for coordinates.', inputSchema: { type: 'object', properties: { latitude: { type: 'number', minimum: -90, maximum: 90 }, longitude: { type: 'number', minimum: -180, maximum: 180 } }, required: ['latitude', 'longitude'] } }
];

export function buildUrl(base, params) { const url = new URL(base); for (const [key, value] of Object.entries(params)) url.searchParams.set(key, String(value)); return url; }
async function getJson(url, fetcher = fetch) { const response = await fetcher(url, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(15_000) }); if (!response.ok) throw new Error(`Upstream request failed (${response.status}).`); return response.json(); }
function coord(args) { if (!Number.isFinite(args.latitude) || args.latitude < -90 || args.latitude > 90 || !Number.isFinite(args.longitude) || args.longitude < -180 || args.longitude > 180) throw new Error('latitude and longitude must be valid coordinates.'); }

export async function callTool(name, args = {}, fetcher = fetch) {
  if (name === 'find_location') { if (typeof args.query !== 'string' || args.query.trim().length < 2) throw new Error('query must contain at least two characters.'); return getJson(buildUrl(GEO, { name: args.query.trim(), count: Math.min(Math.max(args.count || 5, 1), 10), language: 'en', format: 'json' }), fetcher); }
  coord(args);
  if (name === 'get_forecast') return getJson(buildUrl(API, { latitude: args.latitude, longitude: args.longitude, current: 'temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m', daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max', timezone: 'auto', forecast_days: Math.min(Math.max(args.days || 7, 1), 16) }), fetcher);
  if (name === 'get_air_quality') return getJson(buildUrl(AIR, { latitude: args.latitude, longitude: args.longitude, current: 'european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone' }), fetcher);
  throw new Error(`Unknown tool: ${name}`);
}

export function createServer(write = (line) => process.stdout.write(`${line}\n`)) { return async (message) => { const reply = (result) => message.id === undefined ? undefined : write(JSON.stringify({ jsonrpc: '2.0', id: message.id, result })); try { if (message.method === 'initialize') return reply({ protocolVersion: '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'global-weather-mcp', version: '0.1.0' } }); if (message.method === 'tools/list') return reply({ tools }); if (message.method === 'tools/call') { const data = await callTool(message.params?.name, message.params?.arguments); return reply({ content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }); } if (message.id !== undefined) write(JSON.stringify({ jsonrpc: '2.0', id: message.id, error: { code: -32601, message: 'Method not found' } })); } catch (error) { if (message.id !== undefined) write(JSON.stringify({ jsonrpc: '2.0', id: message.id, error: { code: -32000, message: error.message } })); } }; }
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) { const handle = createServer(); let buffer = ''; process.stdin.setEncoding('utf8').on('data', async (chunk) => { buffer += chunk; const lines = buffer.split('\n'); buffer = lines.pop(); for (const line of lines) if (line.trim()) { try { await handle(JSON.parse(line)); } catch { process.stderr.write('Invalid JSON-RPC message.\n'); } } }); }
