# QR-V™ Marketing Site

`ohi-stack/qrv-marketing-site` is the canonical GitHub repository for the public QR-V™ Network website source.

This repository is the destination for the files, components, assets, page definitions, navigation, copy, styles, animations, and media used by the ChatGPT Sites project:

```text
qrv-global-verification
```

## Source-of-truth rule

Public website source belongs here:

```text
ChatGPT Sites: qrv-global-verification
              ↓ export / sync
GitHub: ohi-stack/qrv-marketing-site
```

The production platform may continue to use `ohi-stack/qrv-node` for server-side verification, issuer, registry, and compatibility runtime behavior, but **public site design/source files must be preserved in `qrv-marketing-site` rather than being split across repositories**.

## Canonical public routes

```text
https://qrv.network/
https://qrv.network/protocol
https://qrv.network/how-it-works
https://qrv.network/verify
https://qrv.network/registry
https://qrv.network/use-cases
https://qrv.network/developers
https://qrv.network/docs
https://qrv.network/pricing
https://qrv.network/store
https://qrv.network/status
https://qrv.network/issuer
```

## Repository responsibilities

This repo owns:

- homepage and landing-page source
- header, mega menu, mobile navigation, and footer
- QR-V brand assets and logo variants
- hero animations and visual network representations
- page layouts and public content
- pricing and commercial pages
- public documentation presentation
- SEO metadata, sitemap, robots, and web manifest
- responsive/mobile presentation
- Sites-exported components and assets

This repo does **not** own the canonical PostgreSQL registry or protected API mutations. Those remain behind `api.qrv.network` / `ohi-stack/qrv-api`.

## Sites import area

Files originating from the QR-V ChatGPT Sites project are tracked under:

```text
sites/qrv-global-verification/
```

See `sites/qrv-global-verification/README.md` and `sites/qrv-global-verification/site.manifest.json` for the import contract.

## Local development

```bash
npm install
npm run check
npm run build
npm start
```

Node.js 20+ is required.
