# QRV.network Hostinger Deployment

## Deployment target

- Domain: `qrv.network`
- Repository: `ohi-stack/qrv-marketing-site`
- Branch: `main`
- Runtime: Node.js 20+
- Entry file: `server.js`
- Start command: `npm start`
- Port: `process.env.PORT`
- Bind address: `0.0.0.0`

## Build sequence

```bash
npm install
npm run validate:prod
npm start
```

## Required checks

After deployment, verify:

```text
https://qrv.network/
https://qrv.network/health
https://qrv.network/healthz
https://qrv.network/readyz
https://qrv.network/version
https://qrv.network/status
https://qrv.network/network
https://qrv.network/pricing
```

## Consolidation model

The root node should consolidate public navigation and hand off to authority services:

```text
qrv.network/verify      -> verify.qrv.network
qrv.network/issuer      -> issuer.qrv.network
qrv.network/docs        -> docs.qrv.network or root docs section
qrv.network/developers  -> developers.qrv.network or developer section
qrv.network/status      -> root status page until dedicated status node is needed
qrv.network/network     -> service directory and domain map
```

## Production rule

The marketing node must not become the registry authority. It can explain, route, and onboard. Verification, registry mutations, issuer authentication, revocation, and audit logs remain backend service responsibilities.
