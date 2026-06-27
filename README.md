# QR-V™ Global Verification Network

Public marketing website and navigation hub for `qrv.network`.

QR-V™ is a registry-backed verification network that transforms ordinary QR codes into verifiable references for records, credentials, products, documents, assets, and financial instruments.

## Production Positioning

**Verify records. Confirm authenticity. Instantly.**

QR-V™ creates a public trust layer for QR-based systems. Instead of sending a scanner to an arbitrary URL, a QR-V™ code resolves to a canonical registry record where authenticity, issuer identity, integrity, status, and revocation state can be checked.

## Upgraded Public Navigation

The public QRV root now supports a cleaner production navigation structure:

### Main Navigation

- QR-V Protocol — `/protocol`
- How It Works — `/how-it-works`
- Registry — `/registry`
- Use Cases — `/use-cases`
- Developers — `/developers`
- About — `/about`

### Utility Navigation

- Verify — `https://verify.qrv.network`
- Issuer Portal — `https://issuer.qrv.network`
- Store — `https://store.qrv.network`
- Status — `/status`

### Footer Structure

The footer uses four columns:

1. QR-V
2. Technology
3. Resources
4. Company

## Primary Audience

- Organizations that issue certificates, credentials, permits, labels, warranties, IDs, or records.
- Developers integrating QR verification into apps and workflows.
- Enterprises that need anti-fraud, anti-counterfeit, document-authentication, and traceability systems.
- Public users who need to confirm whether a scanned QR-linked record is real.

## Core Calls to Action

- **Verify Record:** `https://verify.qrv.network`
- **Issuer Portal:** `https://issuer.qrv.network`
- **Developer Docs:** `https://qrv.network/docs/developers`
- **Status:** `https://qrv.network/status`
- **Store:** `https://store.qrv.network`

## Homepage Content Structure

1. Hero: QR-V™ Global Verification Network / QRVP-1 Protocol.
2. Verification input: enter a QRVID and redirect to `verify.qrv.network/{QRVID}`.
3. Trust strip: Network, Verification, Registry, Issuer Portal, API, and Version status.
4. What QR-V Verifies: certificates, credentials, products, assets, documents, financial records.
5. How It Works: register record, generate QRVID, scan or enter QRVID, resolve registry record, return status.
6. Issuer section: issue records, manage revocations, generate public verification URLs.
7. Developer section: integrate QRVP-1 with APIs, SDKs, and deterministic status responses.
8. Use cases: education, supply chain, government records, finance, memberships, product authentication.
9. Footer: protocol, verification, registry, developers, legal, contact.

## Production Health

Expected health response:

```json
{"status":"ok","service":"qrv-network-root","version":"1.3.0"}
```

## Required Links

- `https://qrv.network`
- `https://verify.qrv.network`
- `https://issuer.qrv.network`
- `https://registry.qrv.network`
- `https://api.qrv.network`
- `https://qrv.network/developers`
- `https://qrv.network/docs`
- `https://qrv.network/status`
- `https://store.qrv.network`

## Production Readiness Checklist

- [x] Root page renders without raw JSON except health endpoints.
- [x] Mobile navigation is readable.
- [x] Verify form redirects to `verify.qrv.network/{QRVID}`.
- [x] Main navigation routes exist.
- [x] Footer uses four operational columns.
- [x] Health endpoint returns valid JSON.
- [x] Check and build scripts exist.
- [ ] Verify portal deployment is corrected.
- [ ] Issuer portal stale placeholder is replaced.
- [ ] First public QRVID certificate lifecycle is verified end-to-end.

## Commands

```bash
npm run check
npm run build
npm start
```
