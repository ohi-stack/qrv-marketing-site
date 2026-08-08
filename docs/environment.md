# QRV.network Environment

The `qrv-marketing-site` repository operates the public root node for `qrv.network`.

## Required runtime variables

```env
NODE_ENV=production
PORT=3000
APP_BASE_URL=https://qrv.network
QRV_VERIFY_BASE_URL=https://verify.qrv.network
QRV_ISSUER_BASE_URL=https://issuer.qrv.network
QRV_API_BASE_URL=https://api.qrv.network
QRV_REGISTRY_BASE_URL=https://registry.qrv.network
QRV_DOCS_BASE_URL=https://docs.qrv.network
QRV_DEVELOPERS_BASE_URL=https://developers.qrv.network
QRV_STATUS_BASE_URL=https://qrv.network/status
QRV_DEMO_QRVID=QRV-PROD-CERT-000001
```

## Frontend variables

The React/Vite layer uses `VITE_*` names when browser-side configuration is required.

```env
VITE_APP_BASE_URL=https://qrv.network
VITE_QRV_VERIFY_BASE_URL=https://verify.qrv.network
VITE_QRV_ISSUER_BASE_URL=https://issuer.qrv.network
VITE_QRV_API_BASE_URL=https://api.qrv.network
VITE_QRV_REGISTRY_BASE_URL=https://registry.qrv.network
VITE_QRV_DOCS_BASE_URL=https://docs.qrv.network
VITE_QRV_DEVELOPERS_BASE_URL=https://developers.qrv.network
VITE_QRV_STATUS_BASE_URL=https://qrv.network/status
VITE_QRV_DEMO_QRVID=QRV-PROD-CERT-000001
```

## Security rule

Do not place database credentials, JWT secrets, issuer API keys, signing keys, or admin tokens in this marketing site repository. Those belong only in backend service environments.
