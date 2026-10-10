# QR-V™ ChatGPT Sites content source — Unified Trust Framework

**Source date:** 2026-10-10  
**Role:** Approved content input and design provenance; **not a deployed functionality claim**.  
**Canonical runtime:** `ohi-stack/qrv-node` → `qrv.network`  
**Trusted API authority:** `ohi-stack/qrv-api` → `api.qrv.network`

## Public positioning

**QR-V™ Global Verification Network**  
**Make records verifiable.**  
QR-V is registry-backed verification infrastructure for certificates, credentials, memberships, documents, products and assets. A QR code identifies a record; verification resolves an authorized issuer-backed record and checks its current integrity and lifecycle status.

Primary actions: **Verify a Record** (`/verify`), **Become an Issuer** (`/issuer`), **Read the Protocol** (`/protocol`).  
Holder workflow: **QR-V Wallet** (`/wallet`) receives, stores, organizes and re-verifies references; it is not a second registry and possession does not establish ownership.

## The four mandatory trust pillars

1. **Unified cryptographic security** — canonical serialization, SHA-256 hashing, issuer authorization, Ed25519 digital signatures, `kid`-bound signing-key lifecycle, auditability. Signing is a production gate until live proven.
2. **Selective privacy** — public, restricted, private and policy-authorized selective field disclosure; least-privilege API reads; no personal or protected metadata in QR payloads.
3. **Open standards** — QRVP-1 (protocol) and QVS-1.0 (verification standard), publicly documented schema and status semantics, OpenAPI 3.1, versioning and independent conformance.
4. **Seamless integration** — existing LMS, CRM, ERP, HRIS, WordPress/WooCommerce, Google Workspace, enterprise systems and software agents through REST, SDKs, webhooks, CSV/Sheets import, OAuth/OIDC adapters and scoped access.

## Canonical source reconciliation

- Sites manifest: `sites/qrv-global-verification/site.manifest.json`
- Historical Sites/marketing public source: `src/App.jsx`, `src/styles.css` and associated public assets in **this** repository.
- Live public frontend source: `ohi-stack/qrv-node/src/web`, particularly `components/TrustArchitecture.jsx`.
- **Only one production public application:** `qrv.network`. Do not deploy this source repository separately.
- Design cues preserved: QR-V official logo; light responsive header where used; dark navy network grid; cyan Verify action; green status/issuer accents; readable mobile layout.

The Sites-specific folder currently contains a manifest and README rather than a complete exported pages/components/assets tree. Do not represent this record as a complete Sites export. Import additional verified, original assets only when their files and provenance are available.

## Source-to-runtime responsibility

```text
ChatGPT Sites / marketing source (reference)
                 ↓ reviewed import
qrv-node React/Vite + Express runtime → qrv.network
                 ↓ authenticated / public API
qrv-api → api.qrv.network → canonical PostgreSQL
```

The public UI must not contain production registry credentials, signing private keys, server-to-server API keys or secret OAuth tokens.

## Production-safe status language

- **Specified:** protocol, standard, roadmap requirement.
- **Implemented:** code exists in repository or branch.
- **Tested:** repeatable local/CI evidence exists.
- **Deployed:** hosting serves the relevant revision.
- **Production-verified:** live API/registry lifecycle and release gates have passed.

Never use `PUBLIC LAUNCH`, `SHA-256 active`, `Ed25519 enabled`, `TLS 1.3 enforced` or `VERIFIED` as evidence-independent marketing assertions. Always distinguish a decorative QR pattern, demo fixture, and a real scannable QR.

## Acceptance boundary

The release is not complete until authentic PostgreSQL issuance → live QR → current VERIFIED → same-record revocation → REVOKED → persisted audits, negative-state safety, CI, security review, Hostinger routing, and explicit release approval are evidenced.
