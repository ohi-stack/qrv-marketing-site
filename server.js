import http from 'http';

const PORT = process.env.PORT || 3000;
const APP_BASE_URL = cleanUrl(process.env.APP_BASE_URL || 'https://qrv.network');
const VERIFY_BASE_URL = cleanUrl(process.env.VERIFY_BASE_URL || 'https://verify.qrv.network');
const REGISTRY_BASE_URL = cleanUrl(process.env.REGISTRY_BASE_URL || 'https://registry.qrv.network');
const ISSUER_BASE_URL = cleanUrl(process.env.ISSUER_BASE_URL || 'https://issuer.qrv.network');
const API_BASE_URL = cleanUrl(process.env.API_BASE_URL || 'https://api.qrv.network');
const DOCS_BASE_URL = cleanUrl(process.env.DOCS_BASE_URL || `${APP_BASE_URL}/docs`);
const DEVELOPERS_BASE_URL = cleanUrl(process.env.DEVELOPERS_BASE_URL || `${APP_BASE_URL}/developers`);
const STATUS_BASE_URL = cleanUrl(process.env.STATUS_BASE_URL || `${APP_BASE_URL}/status`);
const STORE_BASE_URL = cleanUrl(process.env.STORE_BASE_URL || 'https://store.qrv.network');
const VERSION = process.env.APP_VERSION || '1.3.0';
const STARTED_AT = new Date().toISOString();

function cleanUrl(value) {
  return String(value || '').replace(/\/+$/, '');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const mainNav = [
  ['QR-V Protocol', '/protocol'],
  ['How It Works', '/how-it-works'],
  ['Registry', '/registry'],
  ['Use Cases', '/use-cases'],
  ['Developers', '/developers'],
  ['About', '/about']
];

const utilityNav = [
  ['Verify', VERIFY_BASE_URL],
  ['Issuer Portal', ISSUER_BASE_URL],
  ['Store', STORE_BASE_URL],
  ['Status', `${APP_BASE_URL}/status`]
];

const services = [
  ['Root Network Hub', 'qrv.network', APP_BASE_URL, 'Public network hub, documentation gateway, and consolidation layer.', 'OPERATIONAL'],
  ['Documentation Center', 'qrv.network/docs', `${APP_BASE_URL}/docs`, 'Protocol, registry, verification, issuer, developer, and API reference pages.', 'OPERATIONAL'],
  ['Registry Authority', 'registry.qrv.network', REGISTRY_BASE_URL, 'Canonical registry authority for QR-V records, hashes, issuers, and audit logs.', 'OPERATIONAL'],
  ['Public Verification Portal', 'verify.qrv.network', VERIFY_BASE_URL, 'Public trust surface for QRVID verification result pages.', 'DEGRADED'],
  ['Issuer Portal', 'issuer.qrv.network', ISSUER_BASE_URL, 'Issuer SaaS portal for creating records and managing certificate lifecycle controls.', 'DEGRADED'],
  ['API Gateway', 'api.qrv.network', API_BASE_URL, 'JSON API gateway for verification, registry creation, revocation, and integrations.', 'PENDING CHECK'],
  ['Store / Commerce', 'store.qrv.network', STORE_BASE_URL, 'WordPress / WooCommerce commerce layer for plans and onboarding services.', 'PENDING'],
  ['Dedicated Status Subdomain', 'status.qrv.network', 'https://status.qrv.network', 'Future dedicated monitoring service. Current public status lives at qrv.network/status.', 'RESERVED']
];

const docsPages = {
  '/docs': ['QR-V™ Documentation Center', 'Authoritative documentation for QR-V™ protocol, registry, issuer, verification, developer, and API references.', [
    ['Overview', 'High-level explanation of QR-V™, the problem with traditional QR codes, and the verification model.', '/docs/overview'],
    ['Protocol', 'QRVP-1 identifier format, resolution process, verification flow, response structure, and lifecycle.', '/docs/protocol'],
    ['Verification', 'Status handling, validation methods, revocation, audit logging, and public verification UI rules.', '/docs/verification'],
    ['Registry', 'Authoritative data layer covering records, hashes, certificates, issuers, and audit logs.', '/docs/registry'],
    ['Issuers', 'Issuer role, onboarding process, issuing records, revocation management, and best practices.', '/docs/issuers'],
    ['Developers', 'SDKs, integration guides, environment setup, webhook events, and testing sandbox.', '/docs/developers'],
    ['API Reference', 'Create, verify, revoke, query, issuer endpoints, authentication, and error codes.', '/docs/api-reference']
  ]],
  '/docs/overview': ['QR-V™ Overview', 'QR-V™ is registry-based verification infrastructure that transforms QR codes into verifiable references.', [
    ['What QR-V Solves', 'Standard QR codes redirect. QR-V identifiers resolve to authoritative registry records.', '#'],
    ['Core Model', 'Identifier → resolver → registry → validation → verification response.', '#'],
    ['Primary Product Path', 'Verified certificates are the first implementation because they prove issuance, QR generation, lookup, and revocation.', '#']
  ]],
  '/docs/protocol': ['QRVP-1 Protocol', 'QRVP-1 defines how QR-based identifiers resolve into verifiable registry-backed records.', [
    ['Identifier Format', 'QRV://registry/type/objectID and https://verify.qrv.network/{qrvid}.', '#'],
    ['Verification Layers', 'Identifier, resolution, verification, registry, and response layers.', '#'],
    ['Security Requirements', 'Hash validation, issuer authorization, revocation checks, and audit trails.', '#']
  ]],
  '/docs/verification': ['Verification Process', 'QR-V™ verification returns deterministic results based on canonical registry data.', [
    ['VERIFIED', 'The record exists, is active, matches validation requirements, and is not revoked or expired.', '#'],
    ['REVOKED', 'The issuer or registry invalidated the record.', '#'],
    ['EXPIRED', 'The record exists but the validity period has ended.', '#'],
    ['NOT_FOUND', 'No canonical registry record exists for the submitted identifier.', '#']
  ]],
  '/docs/registry': ['Registry Architecture', 'The registry is the authoritative data layer for QR-V records, hashes, issuers, certificates, revocations, and audit logs.', [
    ['qr_objects', 'Canonical QR-V objects and identifiers.', '#'],
    ['qr_hash_registry', 'Hash references for integrity validation.', '#'],
    ['qr_certificates', 'Certificate-specific records and metadata.', '#'],
    ['qr_issuers', 'Issuer profiles, authorization, and status.', '#'],
    ['qr_audit_log', 'Lifecycle and verification audit entries.', '#']
  ]],
  '/docs/issuers': ['Issuer Operations', 'Issuers create, manage, update, and revoke QR-V records through the issuer portal and registry API.', [
    ['Issue Record', 'Submit record data, generate QRVID, store record, and return verification URL.', '#'],
    ['Records Manager', 'View issued records, statuses, verification count, and lifecycle actions.', '#'],
    ['Revocation', 'Invalidate records that should no longer verify as active.', '#']
  ]],
  '/docs/developers': ['Developer Integration', 'Developer documentation for integrating QR-V™ verification into apps, portals, scanners, and enterprise systems.', [
    ['Quick Start', 'Call the verification endpoint with a QRVID and handle deterministic status responses.', '#'],
    ['SDKs', 'SDKs should wrap creation, lookup, revocation, errors, and webhook events.', '#'],
    ['Sandbox', 'Use demo identifiers before production issuance.', '#']
  ]],
  '/docs/api-reference': ['API Reference', 'Core API contract for creating, verifying, revoking, and querying QR-V registry-backed records.', [
    ['POST /registry/create', 'Create a registry-backed QR-V record and return a QRVID plus verification URL.', '#'],
    ['GET /verify/:qrvid', 'Resolve and verify a QRVID.', '#'],
    ['POST /revoke', 'Revoke an existing record and write the revocation event.', '#'],
    ['GET /record/:qrvid', 'Return canonical registry metadata where permissions allow.', '#'],
    ['Error Codes', '200 verified, 404 not found, 410 revoked, 422 invalid, 500 registry error.', '#']
  ]]
};

function styles() {
  return `:root{--bg:#050914;--panel:#101936;--line:#2c3f74;--gold:#f2d06b;--cyan:#55c7ff;--text:#edf3ff;--muted:#b7c5e6;--green:#22c55e;--red:#ef4444;--orange:#f59e0b;--blue:#60a5fa}*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:radial-gradient(circle at top,#173c78 0,#081124 48%,#03060e 100%);color:var(--text)}a{color:inherit}.wrap{max-width:1180px;margin:0 auto;padding:28px 20px}.nav{display:flex;justify-content:space-between;align-items:flex-start;gap:18px}.brand{font-weight:950;letter-spacing:.08em}.mainnav,.utilnav{display:flex;flex-wrap:wrap;gap:13px;justify-content:flex-end}.mainnav a,.utilnav a{color:#d9e5ff;text-decoration:none;font-size:14px;font-weight:850}.utilnav{margin-top:10px}.utilnav a{opacity:.86;border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:7px 10px}.hero{padding:76px 0 36px}.eyebrow{color:var(--gold);font-weight:900;text-transform:uppercase;letter-spacing:.16em;font-size:13px}h1{font-size:clamp(42px,7vw,82px);line-height:.98;margin:12px 0;letter-spacing:-.055em}h2{font-size:clamp(28px,4vw,46px);margin:0 0 12px}h3{margin:0 0 8px}p,li{font-size:18px;line-height:1.65;color:var(--muted)}.caps{font-weight:900;color:#fff;letter-spacing:.08em}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.btn{display:inline-block;border-radius:999px;padding:14px 20px;text-decoration:none;font-weight:900;background:var(--gold);color:#081124}.btn.alt{background:transparent;color:#fff;border:1px solid var(--line)}.section{margin:42px 0}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:20px 0}.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.card{background:rgba(16,25,54,.88);border:1px solid var(--line);border-radius:22px;padding:22px}.problem{border-left:4px solid var(--red)}.solution{border-left:4px solid var(--green)}.node{font-family:ui-monospace,Menlo,monospace;color:#dbeafe;word-break:break-word}.flow{font-family:ui-monospace,Menlo,monospace;background:#07112a;border:1px solid var(--line);border-radius:18px;padding:18px;color:#fff}.list{padding-left:20px}.badge{display:inline-block;margin:6px 6px 0 0;padding:7px 11px;border-radius:999px;border:1px solid var(--line);font-weight:900}.badge.operational{color:#d8ffe8;background:rgba(34,197,94,.14);border-color:rgba(34,197,94,.32)}.badge.degraded{color:#ffe7cf;background:rgba(245,158,11,.16);border-color:rgba(245,158,11,.34)}.badge.pending{color:#dbeafe;background:rgba(96,165,250,.12);border-color:rgba(96,165,250,.34)}.badge.reserved{color:#dbeafe;background:rgba(148,163,184,.12);border-color:rgba(148,163,184,.32)}.service-row{display:grid;grid-template-columns:1fr .55fr .45fr;gap:14px;align-items:start;border-top:1px solid rgba(255,255,255,.08);padding:18px 0}.service-row:first-child{border-top:0}.verify{margin-top:30px;background:rgba(16,25,54,.9);border:1px solid var(--line);border-radius:24px;padding:24px}.verify form{display:flex;gap:12px;flex-wrap:wrap}input{flex:1 1 280px;padding:16px;border-radius:14px;border:1px solid #3b4e83;background:#0b1430;color:#fff;font-size:16px}button{border:0;border-radius:999px;padding:15px 20px;background:var(--cyan);font-weight:900;color:#06101d;cursor:pointer}.footer{border-top:1px solid var(--line);margin-top:50px;padding:28px 0;color:#9fb2d8;font-size:14px}.footgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.footgrid a{display:block;color:#c9d7f4;text-decoration:none;margin:7px 0}.small{font-size:14px;color:#9fb2d8}.banner{background:linear-gradient(90deg,rgba(85,199,255,.12),rgba(242,208,107,.12));border:1px solid var(--line);border-radius:24px;padding:24px}.docnav{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0}.docnav a{border:1px solid var(--line);border-radius:999px;padding:9px 12px;text-decoration:none;color:#dbeafe;background:rgba(16,25,54,.65)}@media(max-width:850px){.grid,.grid4,.footgrid,.service-row{grid-template-columns:1fr}.nav{flex-direction:column}.mainnav,.utilnav{justify-content:flex-start}}`;
}

function shell(title, description, body) {
  const mainLinks = mainNav.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
  const utilityLinks = utilityNav.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><style>${styles()}</style></head><body><div class="wrap"><nav class="nav"><div class="brand"><a href="${APP_BASE_URL}" style="text-decoration:none">QR-V™</a></div><div><div class="mainnav">${mainLinks}</div><div class="utilnav">${utilityLinks}</div></div></nav>${body}${footer()}</div></body></html>`;
}

function footer() {
  return `<footer class="footer"><div class="footgrid"><div><h3>QR-V</h3><a href="/protocol">QR-V Protocol</a><a href="/how-it-works">How QR-V Works</a><a href="${REGISTRY_BASE_URL}">Registry Portal</a><a href="${VERIFY_BASE_URL}">Verification Portal</a></div><div><h3>Technology</h3><a href="/docs/protocol">QRVP-1 Protocol</a><a href="/docs/registry">Registry Architecture</a><a href="/docs/verification">Verification Network</a><a href="/docs/api-reference">API Reference</a></div><div><h3>Resources</h3><a href="/developers">Developers</a><a href="${DEVELOPERS_BASE_URL}">Developer Platform</a><a href="${STORE_BASE_URL}">Store</a><a href="/status">Status</a></div><div><h3>Company</h3><a href="/about">About</a><a href="mailto:research@quantumohi.com">Contact</a><a href="/status">System Status</a><a href="/docs/verification">Security Disclosure</a></div></div><p>© 2026 QR-V™ — Global QR Verification Network — All Rights Reserved</p><p>Verification infrastructure and protocol architecture developed by One Gregory Onegodian™. Platform infrastructure provided by QuantumOHI.com.</p><p class="small">QRVP-1 • Registry-Based Verification Infrastructure • Version ${VERSION}</p></footer>`;
}

function cards(items) {
  return items.map(([title, text, href]) => `<div class="card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p>${href && href !== '#' ? `<a class="btn alt" href="${href}">Open</a>` : ''}</div>`).join('');
}

function homeHtml() {
  return shell('QR-V™ Global Verification Network', 'QR-V is registry-based verification infrastructure for certificates, credentials, products, assets, documents, property records, and financial records.', `<main class="hero"><div class="eyebrow">QR-V™ • Global Verification Network • QRVP-1 Protocol</div><h1>Verify Records. Confirm Authenticity. Instantly.</h1><p>QR-V™ transforms QR codes into registry-backed verification references. Each scan resolves to a verification record where authenticity, issuer identity, integrity, and status are confirmed in real time.</p><p class="caps">CERTIFICATES • CREDENTIALS • PRODUCTS • ASSETS • DOCUMENTS • PROPERTY TITLES • FINANCIAL RECORDS</p><div class="actions"><a class="btn" href="${VERIFY_BASE_URL}">Verify Record</a><a class="btn alt" href="${ISSUER_BASE_URL}">Issuer Portal</a><a class="btn alt" href="/docs">Documentation</a><a class="btn alt" href="/status">Network Status</a></div><section class="verify"><h2>Live QRVID Lookup</h2><p>Try a QR-V identifier or scan-ready verification reference.</p><form onsubmit="event.preventDefault();const v=document.getElementById('qrvid').value.trim();if(v) location.href='${VERIFY_BASE_URL}/'+encodeURIComponent(v);"><input id="qrvid" placeholder="QRV-CERT-000001" required><button>Verify QRVID</button></form><p class="small">Demo IDs: QRV-CERT-000001 • QRV-MEMBER-000001 • QRV-PROPERTY-000001</p></section></main><section class="grid section"><div class="card problem"><h2>The Problem</h2><p>Traditional QR codes were built for routing—not verification.</p><ul class="list"><li>No authenticity validation</li><li>No issuer confirmation</li><li>No integrity guarantees</li><li>No revocation awareness</li><li>No trusted record linkage</li></ul></div><div class="card solution"><h2>The QR-V™ Solution</h2><p>QR-V™ introduces registry-based verification.</p><ul class="list"><li>Authenticity validation</li><li>Issuer-aware verification</li><li>Registry-backed records</li><li>Status + revocation control</li><li>Audit-ready traceability</li></ul></div><div class="card"><h2>Why QR-V™ Exists</h2><p>DNS resolves destinations. HTTPS secures transport. QR-V™ verifies records.</p></div></section>`);
}

function pageHtml(page) {
  const pages = {
    '/protocol': ['QR-V™ Protocol', 'QRVP-1 Protocol', 'QRVP-1 defines the QR-V identifier, resolver, registry, verification, and response layers.', [
      ['QRVP-1 Specification', 'Formal identifier resolution and verification protocol.', '/docs/protocol'],
      ['Identifier Format', 'QRV://registry/type/objectID and HTTPS gateway URLs.', '/docs/protocol'],
      ['Security Model', 'Hash validation, signatures, issuer authorization, revocation, and audit logging.', '/docs/verification']
    ]],
    '/how-it-works': ['How QR-V™ Works', 'How It Works', 'QR-V converts a QR scan into a deterministic registry-backed verification result.', [
      ['Generate QR-V Code', 'Issuer creates a QRVID linked to a registry record.', ISSUER_BASE_URL],
      ['Anchor to Registry', 'Canonical record is stored with issuer, hash, timestamp, status, and metadata.', REGISTRY_BASE_URL],
      ['Verification Scan', 'Scanner resolves QRVID and returns VERIFIED, REVOKED, EXPIRED, or NOT_FOUND.', VERIFY_BASE_URL]
    ]],
    '/registry': ['QR-V™ Registry', 'Registry', 'The registry is the canonical authority layer for QR-V records and lifecycle state.', [
      ['Registry Portal', 'System status and registry service endpoint.', REGISTRY_BASE_URL],
      ['Registry Architecture', 'Tables include qr_objects, qr_hash_registry, qr_certificates, qr_issuers, and qr_audit_log.', '/docs/registry'],
      ['Verification Tools', 'Public verification resolves through the verification portal.', VERIFY_BASE_URL]
    ]],
    '/use-cases': ['QR-V™ Use Cases', 'Use Cases', 'QR-V supports high-trust verification workflows across physical and digital records.', [
      ['Certificates & Diplomas', 'Verify training credentials, diplomas, licenses, and completion records.', '#'],
      ['Product Authentication', 'Bind products to registry-backed authenticity records.', '#'],
      ['Documents & Assets', 'Verify documents, property records, financial instruments, and assets.', '#']
    ]],
    '/developers': ['QR-V™ Developers', 'Developers', 'Developer resources for API integrations, SDKs, docs, and QR-V verification clients.', [
      ['Developer Docs', 'Start with the QR-V documentation center.', '/docs/developers'],
      ['API Reference', 'Create, verify, revoke, and query registry-backed records.', '/docs/api-reference'],
      ['Developer Platform', 'Dedicated developer portal target.', DEVELOPERS_BASE_URL]
    ]],
    '/about': ['About QR-V™', 'About QR-V™', 'QR-V™ is a registry-based verification infrastructure that transforms QR codes into verifiable references.', [
      ['Mission', 'Make QR-linked records independently verifiable.', '#'],
      ['Infrastructure Vision', 'A global verification layer for trusted records, credentials, assets, and products.', '#'],
      ['Enterprise Access', 'Partner, pilot, and implementation inquiries.', 'mailto:research@quantumohi.com']
    ]]
  };
  const selected = pages[page] || pages['/about'];
  return shell(selected[0], selected[2], `<main class="hero"><div class="eyebrow">QR-V™ • ${escapeHtml(selected[1])}</div><h1>${escapeHtml(selected[1])}</h1><p>${escapeHtml(selected[2])}</p><div class="actions"><a class="btn" href="/docs">Documentation</a><a class="btn alt" href="${VERIFY_BASE_URL}">Verify</a><a class="btn alt" href="/status">Status</a></div></main><section class="grid section">${cards(selected[3])}</section>`);
}

function docsHtml(path) {
  const selected = docsPages[path] || docsPages['/docs'];
  const nav = Object.keys(docsPages).map((p) => `<a href="${p}">${p === '/docs' ? 'Docs Home' : p.replace('/docs/', '').replace('-', ' ')}</a>`).join('');
  return shell(`${selected[0]} | QR-V™ Docs`, selected[1], `<main class="hero"><div class="eyebrow">QR-V™ Docs</div><h1>${escapeHtml(selected[0])}</h1><p>${escapeHtml(selected[1])}</p><div class="docnav">${nav}</div></main><section class="grid section">${cards(selected[2])}</section><section class="section banner"><h2>Canonical Documentation Path</h2><p><strong>qrv.network/docs</strong> is the primary documentation home for QR-V™. Runtime services remain on dedicated operational subdomains.</p></section>`);
}

function statusClass(status) {
  const value = String(status || '').toLowerCase();
  if (value.includes('operational')) return 'operational';
  if (value.includes('degraded')) return 'degraded';
  if (value.includes('reserved')) return 'reserved';
  return 'pending';
}

function statusHtml() {
  const operational = services.filter((service) => service[4] === 'OPERATIONAL').length;
  const degraded = services.filter((service) => service[4] === 'DEGRADED').length;
  const rows = services.map(([name, host, url, role, status]) => `<div class="service-row"><div><h3>${escapeHtml(name)}</h3><p class="node">${escapeHtml(host)}</p><p>${escapeHtml(role)}</p></div><div><span class="badge ${statusClass(status)}">${escapeHtml(status)}</span></div><div><a class="btn alt" href="${url}">Open</a></div></div>`).join('');
  return shell('QR-V™ Network Status', 'Public QR-V network status for qrv.network and operational service endpoints.', `<main class="hero"><div class="eyebrow">QR-V™ Public Status • qrv.network/status</div><h1>Network Status</h1><p>Public status for the QR-V™ Global Verification Network during production activation. This page replaces status.qrv.network until the dedicated monitoring subdomain is deployed.</p><div class="actions"><a class="btn" href="${REGISTRY_BASE_URL}">Registry Authority</a><a class="btn alt" href="${VERIFY_BASE_URL}">Verify Portal</a><a class="btn alt" href="${ISSUER_BASE_URL}">Issuer Portal</a><a class="btn alt" href="/docs">Docs</a></div></main><section class="grid section"><div class="card"><h3>Overall Stage</h3><p><span class="badge degraded">ACTIVATION STAGE</span></p><p>Core root and registry services are live. Verification and issuer services require deployment correction before production activation is complete.</p></div><div class="card"><h3>Operational Services</h3><p class="price">${operational}/${services.length}</p><p>Services currently marked operational on this public status page.</p></div><div class="card"><h3>Production Blockers</h3><p class="price">${degraded}</p><p>Resolve degraded services before first public certificate activation.</p></div></section><section class="section card"><div class="eyebrow">Service Directory</div><h2>QR-V Network Public Status</h2>${rows}</section><section class="section banner"><h2>Production Activation Path</h2><p>The next production proof remains the end-to-end QR-V certificate lifecycle.</p><p class="flow">issuer.qrv.network → api.qrv.network → registry.qrv.network → verify.qrv.network/{QRVID} → VERIFIED</p></section>`);
}

function sendJson(res, payload) {
  res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(payload));
}

function healthPayload() {
  return {
    status: 'ok',
    service: 'qrv-network-root',
    version: VERSION,
    startedAt: STARTED_AT,
    network: 'QR-V Global Verification Network',
    protocol: 'QRVP-1',
    domain: 'qrv.network',
    navigation: mainNav.map(([label, href]) => ({ label, href })),
    utilityNavigation: utilityNav.map(([label, href]) => ({ label, href })),
    endpoints: {
      verify: VERIFY_BASE_URL,
      issuer: ISSUER_BASE_URL,
      registry: REGISTRY_BASE_URL,
      api: API_BASE_URL,
      docs: DOCS_BASE_URL,
      developers: DEVELOPERS_BASE_URL,
      status: STATUS_BASE_URL,
      store: STORE_BASE_URL
    }
  };
}

const server = http.createServer((req, res) => {
  const path = new URL(req.url || '/', APP_BASE_URL).pathname.replace(/\/$/, '') || '/';
  if (path === '/health' || path === '/healthz' || path === '/health.json') return sendJson(res, healthPayload());
  if (path === '/ready' || path === '/readyz' || path === '/ready.json') return sendJson(res, { ready: true, service: 'qrv-network-root', version: VERSION, statusPage: `${APP_BASE_URL}/status` });
  if (path === '/version') return sendJson(res, { service: 'qrv-network-root', version: VERSION, appBaseUrl: APP_BASE_URL, protocol: 'QRVP-1', statusPage: `${APP_BASE_URL}/status` });
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  if (path === '/status') return res.end(statusHtml());
  if (path === '/docs' || path.startsWith('/docs/')) return res.end(docsHtml(path));
  if (['/protocol', '/how-it-works', '/registry', '/use-cases', '/developers', '/about'].includes(path)) return res.end(pageHtml(path));
  return res.end(homeHtml());
});

server.listen(PORT, '0.0.0.0', () => console.log(`QR-V root running on ${PORT}`));
