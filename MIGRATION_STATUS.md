# QR-V™ Marketing → qrv-node Migration Status

**Status date:** September 6, 2026  
**State:** FRONTEND/RUNTIME MIGRATION COMPLETE; SOURCE REFERENCE RETAINED

`qrv-marketing-site` is no longer the production frontend target for QR-V. The customer-facing React/Vite frontend and QR-V Sites visual system have been consolidated into `ohi-stack/qrv-node`, and the compiled frontend is now activated by the canonical platform runtime.

## Canonical production state

```text
Repository: ohi-stack/qrv-node
Branch: main
Public origin: https://qrv.network
Trusted API: https://api.qrv.network/api/v1
Activation commit: ed8831a4a45c061a69400fe5aad75557b9cb9e4b
```

The runtime model is now:

```text
qrv.network
  React/Vite customer frontend
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
[x] customer frontend runtime activation
[x] production CI passed for activation change
[x] production readiness passed for activation change
[x] verification routes remain backend/API authoritative
[x] issuer routes remain server controlled
[x] /healthz /readyz /version remain operational controls
[x] legacy-host compatibility behavior preserved
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

## Remaining retirement gate

The code/runtime migration is complete. Final archival/read-only status should wait until the following evidence is recorded:

```text
[ ] final visual/mobile parity review
[ ] SEO metadata parity confirmed
[ ] robots/sitemap/manifest parity confirmed
[ ] commercialization/content strategy preserved
[ ] Sites provenance preserved
[ ] Hostinger qrv.network deployment mapped to qrv-node/main
[ ] live issue → QR → VERIFIED → revoke → REVOKED acceptance passes
```

Until that final operational gate passes, retain this repository as a source/history reference rather than deleting it.