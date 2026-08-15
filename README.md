# QR-V™ Marketing Site — Source Module Only

The canonical `qrv.network` production deployment is:

```text
ohi-stack/qrv-node
```

This repository remains a content/design source for marketing pages, navigation, conversion copy, pricing language, and commercial UX. It is **not** an approved production origin for `qrv.network`.

## Why this is enforced

Running both `qrv-node` and `qrv-marketing-site` as independent root-domain applications can cause different devices or network paths to receive different homepage builds. That is an invalid QR-V production state.

The canonical topology is:

```text
qrv.network       → ohi-stack/qrv-node
api.qrv.network   → ohi-stack/qrv-api
```

There must be only one application origin answering for `qrv.network`.

## Runtime guard

`npm start` now refuses to launch this repository as a normal production runtime.

For local or temporary legacy preview only:

```bash
QRV_ALLOW_LEGACY_MARKETING_RUNTIME=true npm start
```

Do not set that override on the canonical `qrv.network` production deployment.

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

## Deployment rule

If Hostinger or any other platform still maps this repository to `qrv.network`, remove that mapping and deploy `ohi-stack/qrv-node/main` instead.

After changing the root-domain application mapping, purge CDN/application cache and run the live acceptance gate from `qrv-node`:

```bash
npm run acceptance:live
```

The acceptance gate now probes both desktop and iPhone Safari user agents and fails if either receives a stale QR-V homepage.
