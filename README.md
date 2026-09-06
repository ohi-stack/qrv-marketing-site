# QR-V™ Marketing / Public Content Source

`ohi-stack/qrv-marketing-site` is now a **migration/reference source** for the QR-V™ public visual system, content, SEO assets, and Sites-origin material.

It is **not** the canonical production runtime for `qrv.network`.

## Canonical production ownership

```text
qrv.network       → ohi-stack/qrv-node
api.qrv.network   → ohi-stack/qrv-api
```

The active consolidation work is tracked in:

```text
ohi-stack/qrv-node
PR #18 — Consolidate QR-V Sites visual system and customer frontend into qrv-node
```

The purpose of this repository during migration is to preserve source fidelity while the customer-facing frontend is absorbed into `qrv-node`.

## What remains authoritative here during migration

This repository remains the reference source for material that must be compared against the consolidated platform until parity is proven:

- React/Vite customer-facing frontend source;
- QR-V visual design system;
- homepage composition and public messaging;
- commercialization/content strategy;
- responsive layout behavior;
- SEO files and metadata;
- robots and sitemap source;
- web manifest;
- ChatGPT Sites-origin metadata and provenance;
- frontend source validation scripts.

## What no longer belongs here as production authority

This repository must not define a competing `qrv.network` runtime.

The following production responsibilities belong to `ohi-stack/qrv-node`:

- Express application runtime;
- customer-facing production frontend after consolidation;
- public verification presentation;
- issuer UI/workflows;
- registry/explorer UI;
- sessions and issuer access controls;
- API compatibility proxy;
- QR generation;
- health/readiness/version endpoints;
- legacy-host redirects;
- Hostinger deployment contract;
- live acceptance tests.

The following trusted responsibilities belong exclusively to `ohi-stack/qrv-api`:

- canonical database access;
- registry writes;
- issuance mutations;
- revocation mutations;
- issuer authorization;
- cryptographic signing/validation;
- audit persistence;
- webhook secrets;
- privileged API keys;
- database and signing secrets.

## Runtime guard

This repository must not be deployed as the production `qrv.network` origin.

For source preview:

```bash
npm run dev
```

For validation:

```bash
npm install
npm run check
npm run build
```

If an explicit non-production start wrapper is used:

```bash
QRV_ALLOW_SOURCE_PREVIEW=1 npm start
```

Never set `QRV_ALLOW_SOURCE_PREVIEW=1` on the production QR-V Hostinger application.

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

Historical service hostnames are compatibility aliases only:

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

They must not be used as canonical destinations by new QR codes, environment defaults, sitemaps, or customer-facing links.

## Migration Definition of Done

Do not archive or delete this repository until all of the following are true:

```text
[ ] React/Vite customer frontend is present in qrv-node
[ ] visual parity is approved
[ ] mobile/responsive parity is approved
[ ] customer-facing routes render from qrv-node
[ ] SEO metadata is migrated
[ ] robots/sitemap/manifest behavior is migrated or superseded intentionally
[ ] commercialization and content strategy are preserved in qrv-node
[ ] Sites provenance is preserved
[ ] qrv-node npm run build passes
[ ] qrv-node npm run check passes
[ ] operational verifier/issuer/registry routes remain server-controlled
[ ] issue → QR → VERIFIED → revoke → REVOKED passes
[ ] live acceptance passes after Hostinger deployment
```

Until that gate is satisfied, this repository remains a protected migration source and historical reference.
