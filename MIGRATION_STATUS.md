# QR-V™ Marketing → qrv-node Migration Status

**Status date:** September 17, 2026  
**State:** FRONTEND/RUNTIME CONVERGENCE MERGED; SOURCE REFERENCE RETAINED

`qrv-marketing-site` is not the production runtime for QR-V. The customer-facing React/Vite Sites frontend is consolidated into `ohi-stack/qrv-node`, and the canonical Express runtime now serves the compiled frontend while retaining protected operational routes.

## Canonical production state

```text
Repository: ohi-stack/qrv-node
Branch: main
Public origin: https://qrv.network
Trusted API: https://api.qrv.network/api/v1
Runtime convergence merge: eaac061efd4c03d8d90714409414832682e3fec0
```

The runtime model is:

```text
qrv.network
  compiled React/Vite Sites frontend
  + Express production/server boundary
        │
        ▼
api.qrv.network/api/v1
  verification / registry / mutation authority
```

## Completed migration areas

```text
[x] React/Vite customer frontend present in qrv-node
[x] QR-V Sites visual system present in qrv-node
[x] canonical qrv.network route configuration
[x] Vite production build contract
[x] compiled frontend served by qrv-node
[x] SPA fallback for ordinary public routes
[x] /verify/* excluded from SPA fallback
[x] /issuer/* excluded from SPA fallback
[x] /registry/* excluded from SPA fallback
[x] /api/* excluded from SPA fallback
[x] /healthz /readyz /version remain operational controls
[x] direct QRVID compatibility redirects preserved
[x] legacy-host redirects execute before SPA/static handling
[x] production CI passed on the exact merge candidate
[x] production readiness passed on the exact merge candidate
```

## Source repository role

`qrv-marketing-site` remains protected as the historical/reference source for:

- original Sites/React customer frontend;
- design-system source;
- commercialization/content strategy;
- SEO source assets;
- robots/sitemap/manifest source;
- responsive-layout reference;
- Sites manifests and provenance;
- source-validation tooling.

It must not be deployed as a competing `qrv.network` runtime.

## Remaining retirement / live-production gate

The code/runtime migration is complete. Final archival/read-only status should wait until the following evidence is recorded:

```text
[ ] Hostinger qrv.network deployment is mapped to qrv-node/main at or after eaac061
[ ] live homepage serves the compiled Sites frontend
[ ] live /healthz /readyz /version behavior passes
[ ] QRV-PROD-CERT-000001 verifies through api.qrv.network
[ ] issuer login → issue → QR → VERIFIED → revoke → REVOKED passes live
[ ] final visual/mobile parity review
[ ] SEO metadata parity confirmed
[ ] robots/sitemap/manifest parity confirmed
[ ] commercialization/content strategy preserved
[ ] Sites provenance preserved
```

Until that operational gate passes, retain this repository as a source/history reference rather than deleting it.
