# QR-V™ Marketing / Public Content Source

`ohi-stack/qrv-marketing-site` is the canonical design, content, SEO, and Sites-sync source for the public QR-V™ experience.

It is **not** a separate production runtime in QR-V Production Architecture v1.0.

## Canonical runtime ownership

```text
qrv.network       → ohi-stack/qrv-node
api.qrv.network   → ohi-stack/qrv-api
```

The production system uses exactly two runtime boundaries:

1. `qrv.network` — all human-facing routes, verification UX, issuer workspace, registry/explorer UI, docs, developers, pricing, status, store, and authenticated platform sessions.
2. `api.qrv.network` — all privileged API operations, PostgreSQL persistence, verification logic, lifecycle mutation, issuer authorization, audit logging, rate limiting, cryptographic operations, and server-side secrets.

This repository supplies public-site assets and content to the platform node. It must not define a competing public deployment.

## Runtime guard

`npm start` is intentionally blocked by default so this repository cannot accidentally become a second `qrv.network` production origin.

For source preview use:

```bash
npm run dev
```

For an explicit non-production preview through the start wrapper:

```bash
QRV_ALLOW_SOURCE_PREVIEW=1 npm start
```

Do not set `QRV_ALLOW_SOURCE_PREVIEW=1` on the production `qrv.network` Hostinger application.

## Canonical public routes

```text
https://qrv.network/
https://qrv.network/protocol
https://qrv.network/how-it-works
https://qrv.network/verify
https://qrv.network/verify/{QRVID}
https://qrv.network/registry
https://qrv.network/explorer
https://qrv.network/issuer
https://qrv.network/docs
https://qrv.network/developers
https://qrv.network/api-reference
https://qrv.network/use-cases
https://qrv.network/pricing
https://qrv.network/status
https://qrv.network/security
https://qrv.network/store
https://qrv.network/about
```

Canonical machine API:

```text
https://api.qrv.network/api/v1
```

New QR-V codes must encode:

```text
https://qrv.network/verify/{QRVID}
```

## Legacy hostname policy

The historical service hostnames are compatibility aliases only:

```text
verify.qrv.network      → qrv.network/verify
issuer.qrv.network      → qrv.network/issuer
registry.qrv.network    → qrv.network/registry
explorer.qrv.network    → qrv.network/explorer
docs.qrv.network        → qrv.network/docs
developers.qrv.network  → qrv.network/developers
status.qrv.network      → qrv.network/status
store.qrv.network       → qrv.network/store
```

They should not be referenced as canonical destinations by new content, QR codes, environment defaults, sitemaps, or customer-facing links.

## Repository responsibilities

This repo owns source material for:

- homepage and public landing pages;
- header, mega menu, mobile navigation, and footer;
- QR-V brand assets and logo variants;
- page layouts and public content;
- pricing and commercial copy;
- public documentation presentation;
- SEO metadata, sitemap, robots, and web manifest;
- responsive/mobile presentation;
- ChatGPT Sites-exported components and assets.

It does **not** own:

- production database credentials;
- registry writes;
- issuer authorization;
- revocation mutations;
- signing private keys;
- unrestricted QR-V API keys;
- webhook secrets;
- payment-provider secrets.

Those belong behind `api.qrv.network` / `ohi-stack/qrv-api`.

## Sites import area

Files originating from the QR-V ChatGPT Sites project are tracked under:

```text
sites/qrv-global-verification/
```

See `sites/qrv-global-verification/README.md` and `sites/qrv-global-verification/site.manifest.json` for the import contract.

## Local source validation

```bash
npm install
npm run check
npm run build
```

Node.js 20+ is required.

Do not deploy this repository to `qrv.network` unless the production ownership decision is intentionally changed and `qrv-infra` is updated first.
