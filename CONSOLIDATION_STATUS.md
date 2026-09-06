# qrv-marketing-site Consolidation Status

**Status:** ACTIVE CONSOLIDATION SOURCE  
**Canonical production destination:** `ohi-stack/qrv-node`  
**Public runtime:** `https://qrv.network`  
**Trusted backend:** `https://api.qrv.network`  
**Formal migration PR:** `ohi-stack/qrv-node#16`

This repository remains preserved as the source of the QR-V public visual system, React/Vite frontend, SEO assets, commercialization/content strategy, and ChatGPT Sites provenance while those assets are formally audited and migrated into `qrv-node`.

## Rules

- Do not deploy this repository as the final canonical `qrv.network` application after consolidation is accepted.
- Do not delete or rewrite source/provenance material before equivalence is verified in `qrv-node`.
- Do not copy this repository's `server.js`, `package.json`, or environment contract over the production `qrv-node` runtime.
- Production verification, issuer workflows, CI, acceptance, security, and route authority remain with `qrv-node`.
- `qrv-marketing-site` may be archived/read-only only after the retirement gate in `qrv-node/docs/MARKETING_SITE_CONSOLIDATION_AUDIT_2026-09-06.md` passes.

## Migration state

Completed or in progress in `qrv-node` PR #16:

- commercialization baseline preserved;
- content strategy preserved and reconciled;
- ChatGPT Sites provenance preserved;
- file-by-file consolidation audit established;
- canonical `robots.txt`, sitemap, and web manifest added;
- consolidation validation gate added to production checks.

Remaining:

- customer-facing content and visual convergence;
- runtime serving/validation of public SEO assets;
- documentation/environment reconciliation;
- final equivalence audit and retirement decision.
