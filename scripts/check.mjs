import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = ['server.js', 'package.json'];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

execFileSync(process.execPath, ['--check', 'server.js'], { stdio: 'inherit' });

const server = readFileSync('server.js', 'utf8');
const requiredSnippets = [
  'QR-V™',
  '/health.json',
  '/ready.json',
  '/version',
  '/docs',
  '/status',
  'verify.qrv.network',
  'issuer.qrv.network',
  'registry.qrv.network'
];

for (const snippet of requiredSnippets) {
  if (!server.includes(snippet)) {
    throw new Error(`server.js is missing required snippet: ${snippet}`);
  }
}

console.log('QR-V marketing site check passed.');
