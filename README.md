# QR-V™ Global Verification Network

Public marketing website for `qrv.network`.

QR-V™ is a registry-backed verification network that transforms ordinary QR codes into verifiable references for records, credentials, products, documents, assets, and financial instruments.

## Production Positioning

**Verify records. Confirm authenticity. Instantly.**

QR-V™ creates a public trust layer for QR-based systems. Instead of sending a scanner to an arbitrary URL, a QR-V™ code resolves to a canonical registry record where authenticity, issuer identity, integrity, status, and revocation state can be checked.

## Primary Audience

- Organizations that issue certificates, credentials, permits, labels, warranties, IDs, or records.
- Developers integrating QR verification into apps and workflows.
- Enterprises that need anti-fraud, anti-counterfeit, document-authentication, and traceability systems.
- Public users who need to confirm whether a scanned QR-linked record is real.

## Core Calls to Action

- **Verify Record:** `https://verify.qrv.network`
- **Issuer Portal:** `https://issuer.qrv.network`
- **Developer Docs:** `https://developers.qrv.network`
- **Status:** `https://status.qrv.network`

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
{"status":"ok","service":"qrv-network-root","version":"1.0.0"}
```

## Required Links

- `https://qrv.network`
- `https://verify.qrv.network`
- `https://issuer.qrv.network`
- `https://registry.qrv.network`
- `https://api.qrv.network`
- `https://developers.qrv.network`
- `https://docs.qrv.network`
- `https://status.qrv.network`

## Production Readiness Checklist

- [ ] Root page renders without raw JSON except health endpoints.
- [ ] Mobile navigation is readable.
- [ ] Verify form redirects to `verify.qrv.network/{QRVID}`.
- [ ] Pricing, use case, issuer, and developer CTAs exist.
- [ ] Footer links point to live QR-V network domains.
- [ ] Health endpoint returns valid JSON.
- [ ] No test language appears on the public homepage.

## Commands

```bash
npm run check
npm run build
npm start
```
