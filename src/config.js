const trim = (value) => String(value || '').replace(/\/+$/, '');

export const QRV_CONFIG = {
  appBaseUrl: trim(import.meta.env.VITE_APP_BASE_URL || 'https://qrv.network'),
  verifyBaseUrl: trim(import.meta.env.VITE_QRV_VERIFY_BASE_URL || 'https://verify.qrv.network'),
  issuerBaseUrl: trim(import.meta.env.VITE_QRV_ISSUER_BASE_URL || 'https://issuer.qrv.network'),
  apiBaseUrl: trim(import.meta.env.VITE_QRV_API_BASE_URL || 'https://api.qrv.network'),
  registryBaseUrl: trim(import.meta.env.VITE_QRV_REGISTRY_BASE_URL || 'https://registry.qrv.network'),
  docsBaseUrl: trim(import.meta.env.VITE_QRV_DOCS_BASE_URL || 'https://docs.qrv.network'),
  developersBaseUrl: trim(import.meta.env.VITE_QRV_DEVELOPERS_BASE_URL || 'https://developers.qrv.network'),
  statusBaseUrl: trim(import.meta.env.VITE_QRV_STATUS_BASE_URL || 'https://status.qrv.network'),
  demoQrvid: import.meta.env.VITE_QRV_DEMO_QRVID || 'QRV-PROD-CERT-000001'
};

export const verifyUrl = (qrvid = QRV_CONFIG.demoQrvid) => `${QRV_CONFIG.verifyBaseUrl}/${encodeURIComponent(qrvid)}`;
