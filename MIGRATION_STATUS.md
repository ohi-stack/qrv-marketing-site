# QR-V™ Marketing → qrv-node Migration Status

**Status date:** September 6, 2026

`qrv-marketing-site` remains the canonical source for QR-V public design, customer-facing content, SEO assets, and ChatGPT Sites provenance while its production-facing frontend is being consolidated into `ohi-stack/qrv-node`.

## Current convergence state

A dedicated `qrv-node` convergence branch now contains the imported customer-facing frontend and Sites visual system:

```text
Repository: ohi-stack/qrv-node
Branch: feat/sites-frontend-convergence
PR: #17 — Bring Sites visual system and customer frontend into qrv-node
```

Imported production-source areas include:

```text
src/web/App.jsx
src/web/main.jsx
src/web/config.js
src/web/styles.css
src/web/index.html
vite.config.js
scripts/check-web.mjs
docs/SITES_FRONTEND_CONVERGENCE.md
```

The imported frontend uses the canonical production topology:

```text
qrv.network                  public platform / UI
api.qrv.network/api/v1       trusted API / data authority
```

New public links must use root-platform routes such as `/verify`, `/issuer`, `/registry`, `/docs`, `/developers`, `/pricing`, and `/status`. New QR-V codes must resolve to `https://qrv.network/verify/{QRVID}`.

## Important production rule

Do not retire, archive, or delete this repository yet.

The migration is not complete until all unique marketing assets have been classified, preserved, and validated in `qrv-node`, including:

- visual frontend and responsive behavior;
- SEO assets (`robots.txt`, sitemap, manifest);
- commercialization/content strategy documents;
- Sites provenance and manifests;
- source verification tooling;
- customer-facing page content.

## Runtime activation gate

The React/Vite frontend is intentionally being imported before replacing the existing Express production presentation layer. `qrv-node` remains responsible for sessions, issuer workflows, verification fail-closed behavior, API communication, health/readiness, legacy redirects, and security controls.

Before production activation:

```text
[ ] qrv-node frontend build passes
[ ] existing qrv-node server validation passes
[ ] dynamic verification routes remain server-controlled
[ ] issuer/authenticated routes remain server-controlled
[ ] /healthz /readyz /version remain server-controlled
[ ] SEO/public assets are consolidated
[ ] visual parity is reviewed
[ ] live acceptance passes
[ ] Hostinger build/deploy is validated
```

Only after this gate should `qrv-marketing-site` move from migration source to archive/source-history status.
