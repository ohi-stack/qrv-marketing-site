import { execFileSync } from 'node:child_process';

execFileSync(process.execPath, ['scripts/check.mjs'], { stdio: 'inherit' });
console.log('QR-V marketing site build passed. No static bundle is required for the Node server deployment.');
