import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'index.html',
  'server.js',
  'package.json',
  'vite.config.js',
  'env.example',
  'src/App.jsx',
  'src/main.jsx',
  'src/config.js',
  'src/styles.css',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/site.webmanifest',
  'docs/environment.md',
  'docs/deployment-hostinger.md',
  'docs/pages.md'
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

execFileSync(process.execPath, ['--check', 'server.js'], { stdio: 'inherit' });
execFileSync(process.execPath, ['--check', 'vite.config.js'], { stdio: 'inherit' });
execFileSync(process.execPath, ['--check', 'src/config.js'], { stdio: 'inherit' });

const checks = [
  ['server.js', 'QR-V™'],
  ['server.js', '/health'],
  ['server.js', '/readyz'],
  ['server.js', '/version'],
  ['server.js', '0.0.0.0'],
  ['src/App.jsx', 'Global Verification Network'],
  ['src/App.jsx', 'registry-based verification'],
  ['src/App.jsx', 'Verify Demo Record'],
  ['src/config.js', 'verify.qrv.network'],
  ['src/config.js', 'issuer.qrv.network'],
  ['src/config.js', 'registry.qrv.network'],
  ['public/sitemap.xml', 'https://qrv.network/status']
];

for (const [file, snippet] of checks) {
  const content = readFileSync(file, 'utf8');
  if (!content.includes(snippet)) {
    throw new Error(`${file} is missing required snippet: ${snippet}`);
  }
}

console.log('QR-V marketing site production readiness check passed.');
