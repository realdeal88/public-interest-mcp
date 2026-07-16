# Public Interest MCP

Three small, no-key [Model Context Protocol](https://modelcontextprotocol.io/) servers that make useful public information available to people and AI agents everywhere.

| Server | Sector | What it does |
| --- | --- | --- |
| [`global-weather-mcp`](packages/global-weather-mcp) | Everyday life, travel, agriculture, logistics | Finds places and returns weather forecasts and air quality via Open-Meteo. |
| [`product-facts-mcp`](packages/product-facts-mcp) | Food, health, retail | Searches products and checks nutrition and allergens via Open Food Facts. |
| [`open-procurement-mcp`](packages/open-procurement-mcp) | Business, journalism, public services | Reads Open Contracting (OCDS) release packages and summarizes awards. |

## Why these three

They meet three tests: their underlying data is public, their reach is international, and an agent can give a useful answer without a paid API key. Together they serve everyday users, travellers, retailers, health-conscious households, suppliers, journalists, NGOs, researchers, developers, and public servants.

## Quick start

Requirements: Node.js 20 or newer. Clone the repository, then add one server to your MCP client. For example, in a client configuration file:

```json
{
  "mcpServers": {
    "civic-data": {
      "command": "node",
      "args": ["/absolute/path/to/public-interest-mcp/packages/civic-data-mcp/src/index.mjs"]
    }
  }
}
```

Each package README documents its tools and examples. Servers communicate over standard input/output; logs are written to standard error.

## Development

```bash
npm test
npm run lint
```

## Status and scope

This is an early, deliberately small implementation. It exposes stable, read-only operations and validates inputs before making remote requests. Source platforms can change or impose rate limits; do not treat outputs as legal, procurement, emergency, or safety advice.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and [SECURITY.md](SECURITY.md). Ideas and bug reports belong in the GitHub issue templates included under `.github/`.

## License

Licensed under the [Apache License 2.0](LICENSE).
