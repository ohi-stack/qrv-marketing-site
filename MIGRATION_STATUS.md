# QR-V™ Marketing → qrv-node Migration Status

**Status date:** September 17, 2026  
**State:** FRONTEND/RUNTIME CONVERGENCE COMPLETE; SOURCE REFERENCE RETAINED

`qrv-marketing-site` is not the production runtime and is no longer an active development lane for QR-V. The customer-facing React/Vite Sites frontend is consolidated into `ohi-stack/qrv-node`.

Canonical production/runtime state:

```text
Repository: ohi-stack/qrv-node
Production branch: main
Public origin: https://qrv.network
Trusted API: https://api.qrv.network/api/v1
Runtime convergence: eaac061efd4c03d8d90714409414832682e3fec0
Multi-builder baseline: 4e9dd06e7c164b61ec586c54f2c3578192ef5bb3
```

## Active frontend development path

Future ChatGPT Sites/customer-interface work belongs in:

```text
ohi-stack/qrv-node
branch: work/chatgpt-sites
```

Google AI Studio work belongs in:

```text
ohi-stack/qrv-node
branch: work/google-ai-studio
```

Cross-builder integration belongs in:

```text
ohi-stack/qrv-node
branch: integration/multi-builder
```

`main` remains production-only.

## Source repository role

This repository is retained only as historical/reference source for:

- original Sites/React customer frontend;
- prior design-system source;
- commercialization/content strategy;
- SEO source assets;
- robots/sitemap/manifest source;
- responsive-layout reference;
- Sites manifests and provenance;
- source-validation history.

Do not connect this repository to `qrv.network` as a competing deployment.

## Migration completion

```text
[x] frontend source consolidated into qrv-node
[x] Sites visual system consolidated into qrv-node
[x] compiled frontend served by qrv-node
[x] protected Express route boundary preserved
[x] production CI/readiness validated
[x] ChatGPT Sites development branch created
[x] Google AI Studio development branch created
[x] integration branch created
[x] all three lanes synchronized to the same baseline
```

## Remaining archival gate

```text
[ ] live Hostinger deployment points to qrv-node/main
[ ] live homepage/frontend verified
[ ] live verification lifecycle accepted
[ ] final visual/mobile parity review
[ ] SEO metadata parity confirmed
[ ] robots/sitemap/manifest parity confirmed
[ ] Sites provenance preserved
```

Until those operational checks are recorded, retain this repository as read-only source/history reference.
