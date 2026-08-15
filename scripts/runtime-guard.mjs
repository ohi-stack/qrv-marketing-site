const allowLegacyRuntime = process.env.QRV_ALLOW_LEGACY_MARKETING_RUNTIME === 'true';

if (!allowLegacyRuntime) {
  console.error('[QR-V] qrv-marketing-site is source-only and must not serve the production root domain.');
  console.error('[QR-V] Deploy ohi-stack/qrv-node to https://qrv.network instead.');
  console.error('[QR-V] For local/temporary legacy preview only, set QRV_ALLOW_LEGACY_MARKETING_RUNTIME=true.');
  process.exit(78);
}

console.warn('[QR-V] LEGACY MARKETING RUNTIME ENABLED. This mode is not approved for qrv.network production.');
await import('../server.js');
