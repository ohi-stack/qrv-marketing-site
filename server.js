import http from 'http';

const PORT = process.env.PORT || 3000;
const APP_BASE_URL = cleanUrl(process.env.APP_BASE_URL || 'https://qrv.network');
const VERIFY_BASE_URL = cleanUrl(process.env.VERIFY_BASE_URL || 'https://verify.qrv.network');
const REGISTRY_BASE_URL = cleanUrl(process.env.REGISTRY_BASE_URL || 'https://registry.qrv.network');
const ISSUER_BASE_URL = cleanUrl(process.env.ISSUER_BASE_URL || 'https://issuer.qrv.network');
const API_BASE_URL = cleanUrl(process.env.API_BASE_URL || 'https://api.qrv.network');
const DOCS_BASE_URL = cleanUrl(process.env.DOCS_BASE_URL || `${APP_BASE_URL}/docs`);
const DEVELOPERS_BASE_URL = cleanUrl(process.env.DEVELOPERS_BASE_URL || `${APP_BASE_URL}/docs/developers`);
const STATUS_BASE_URL = cleanUrl(process.env.STATUS_BASE_URL || `${APP_BASE_URL}/status`);
const STORE_BASE_URL = cleanUrl(process.env.STORE_BASE_URL || 'https://store.qrv.network');
const VERSION = process.env.APP_VERSION || '1.2.0';
const STARTED_AT = new Date().toISOString();

function cleanUrl(value) {
  return String(value || '').replace(/\/+$/, '');
}

const services = [
  {
    name: 'Root Network Hub',
    host: 'qrv.network',
    url: APP_BASE_URL,
    healthUrl: `${APP_BASE_URL}/health`,
    role: 'Public network hub, documentation gateway, and consolidation layer.',
    status: 'OPERATIONAL',
    note: 'Live root site and documentation routing are active.'
  },
  {
    name: 'Documentation Center',
    host: 'qrv.network/docs',
    url: `${APP_BASE_URL}/docs`,
    healthUrl: `${APP_BASE_URL}/docs`,
    role: 'Protocol, registry, verification, issuer, developer, and API reference pages.',
    status: 'OPERATIONAL',
    note: 'Root-domain documentation is active while docs.qrv.network remains optional.'
  },
  {
    name: 'Registry Authority',
    host: 'registry.qrv.network',
    url: REGISTRY_BASE_URL,
    healthUrl: `${REGISTRY_BASE_URL}/health`,
    role: 'Canonical registry authority for QR-V records, hashes, issuers, and audit logs.',
    status: 'OPERATIONAL',
    note: 'Service status page confirmed live. Persistence hardening remains a production task.'
  },
  {
    name: 'Public Verification Portal',
    host: 'verify.qrv.network',
    url: VERIFY_BASE_URL,
    healthUrl: `${VERIFY_BASE_URL}/healthz`,
    role: 'Public trust surface for QRVID verification result pages.',
    status: 'DEGRADED',
    note: 'Currently observed as 503 Service Unavailable. Redeployment required.'
  },
  {
    name: 'Issuer Portal',
    host: 'issuer.qrv.network',
    url: ISSUER_BASE_URL,
    healthUrl: `${ISSUER_BASE_URL}/health`,
    role: 'Issuer SaaS portal for creating records, issuing certificates, generating QR codes, and managing lifecycle controls.',
    status: 'DEGRADED',
    note: 'Live endpoint observed, but stale placeholder login is still deployed.'
  },
  {
    name: 'API Gateway',
    host: 'api.qrv.network',
    url: API_BASE_URL,
    healthUrl: `${API_BASE_URL}/health`,
    role: 'JSON API gateway for verification, registry creation, revocation, and integrations.',
    status: 'PENDING CHECK',
    note: 'Confirm create, verify, revoke, and record lookup routes before production activation.'
  },
  {
    name: 'Store / Commerce',
    host: 'store.qrv.network',
    url: STORE_BASE_URL,
    healthUrl: STORE_BASE_URL,
    role: 'WordPress / WooCommerce commerce layer for issuer plans, onboarding packages, and implementation services.',
    status: 'PENDING',
    note: 'Commerce layer should not act as registry or verification authority.'
  },
  {
    name: 'Dedicated Status Subdomain',
    host: 'status.qrv.network',
    url: 'https://status.qrv.network',
    healthUrl: 'https://status.qrv.network',
    role: 'Future dedicated monitoring service.',
    status: 'RESERVED',
    note: 'Use qrv.network/status as the public status page until DNS and app deployment are configured.'
  }
];

const docsPages = {
  '/docs': {
    title: 'QR-V™ Documentation',
    eyebrow: 'QR-V™ Docs • qrv.network/docs',
    heading: 'QR-V™ Documentation Center',
    summary: 'Authoritative documentation for the QR-V™ Global Verification Network, QRVP-1 protocol, registry model, issuer workflows, verification process, and developer integration paths.',
    body: [
      ['Overview', 'High-level explanation of QR-V™, the problem with traditional QR codes, system components, and the verification model.', '/docs/overview'],
      ['Protocol', 'QRVP-1 identifier format, resolution process, verification flow, response structure, protocol lifecycle, and future extensions.', '/docs/protocol'],
      ['Verification', 'End-user and system verification behavior, validation methods, status handling, revocation, audit logging, and UI model.', '/docs/verification'],
      ['Registry', 'Authoritative data layer covering registry records, hashes, certificate records, issuer records, and audit logs.', '/docs/registry'],
      ['Issuers', 'Issuer role, onboarding process, issuing records, revocation management, issuer validation, and best practices.', '/docs/issuers'],
      ['Developers', 'Getting started, SDK overview, integration guides, verification integration, webhooks, environment setup, and sandbox.', '/docs/developers'],
      ['API Reference', 'Authentication, create-record, verify-record, revoke-record, query-registry, issuer endpoints, and error codes.', '/docs/api-reference']
    ]
  },
  '/docs/overview': {
    title: 'QR-V™ Overview',
    eyebrow: 'Docs • Overview',
    heading: 'What is QR-V™?',
    summary: 'QR-V™ is registry-based verification infrastructure that transforms QR codes into verifiable references anchored to canonical records.',
    body: [
      ['Problem With QR Codes', 'Standard QR codes usually redirect users to a URL without proving authenticity, issuer identity, or record integrity.', '#'],
      ['Verification Model', 'QR-V™ changes the scan from a simple redirect into a deterministic verification request against a registry-backed record.', '#'],
      ['Core Components', 'Identifier, resolver, API, registry, issuer, verifier, and response layer work together to return trusted verification results.', '#']
    ]
  },
  '/docs/protocol': {
    title: 'QRVP-1 Protocol',
    eyebrow: 'Docs • Protocol',
    heading: 'QRVP-1 Protocol',
    summary: 'QRVP-1 defines how QR-based identifiers resolve into verifiable records through registry-backed verification infrastructure.',
    body: [
      ['Identifier Format', 'Primary format: QRV://registry/type/objectID. Gateway format: https://verify.qrv.network/{qrvid}.', '#'],
      ['Resolution Process', 'The resolver interprets the identifier, selects the relevant verification pathway, and queries the registry/API layer.', '#'],
      ['Verification Flow', 'Scan → identifier resolution → registry lookup → validation → structured verification result.', '#'],
      ['Response Structure', 'Responses should include status, issuer, record type, timestamp, hash reference, and validation result.', '#']
    ]
  },
  '/docs/verification': {
    title: 'QR-V™ Verification',
    eyebrow: 'Docs • Verification',
    heading: 'Verification Process',
    summary: 'QR-V™ verification returns deterministic results based on canonical registry data, not uncontrolled redirects.',
    body: [
      ['VERIFIED', 'The record exists, is active, matches validation requirements, and has not been revoked or expired.', '#'],
      ['REVOKED', 'The issuer or registry has invalidated the record and the public result must show revoked status.', '#'],
      ['EXPIRED', 'The record exists but the validity period has ended.', '#'],
      ['NOT FOUND', 'No canonical registry record exists for the submitted identifier.', '#']
    ]
  },
  '/docs/registry': {
    title: 'QR-V™ Registry',
    eyebrow: 'Docs • Registry',
    heading: 'Registry Architecture',
    summary: 'The registry is the authoritative data layer that stores QR-V records, hashes, issuer data, certificate records, revocation state, and audit logs.',
    body: [
      ['qr_objects', 'Canonical QR-V objects and record identifiers.', '#'],
      ['qr_hash_registry', 'Hash references used for integrity validation.', '#'],
      ['qr_certificates', 'Certificate-specific records and metadata.', '#'],
      ['qr_issuers', 'Authorized issuer profiles, credentials, and status.', '#'],
      ['qr_audit_log', 'Verification events and record lifecycle audit entries.', '#']
    ]
  },
  '/docs/issuers': {
    title: 'QR-V™ Issuers',
    eyebrow: 'Docs • Issuers',
    heading: 'Issuer Operations',
    summary: 'Issuers create, manage, update, and revoke QR-V records through the issuer portal and registry API.',
    body: [
      ['Issuer Role', 'An issuer is an authorized organization or entity that creates registry-backed verification records.', '#'],
      ['Issuing Records', 'Issuer submits record data, system generates QRVID, record is stored, and verification URL is produced.', '#'],
      ['Revocation Management', 'Issuer can invalidate records when credentials, IDs, certificates, products, or documents should no longer verify as active.', '#'],
      ['Best Practices', 'Use stable IDs, clear issuer metadata, legal Gregorian timestamps, optional supplementary OneGodian Time references, and auditable lifecycle logs.', '#']
    ]
  },
  '/docs/developers': {
    title: 'QR-V™ Developers',
    eyebrow: 'Docs • Developers',
    heading: 'Developer Integration',
    summary: 'Developer documentation for integrating QR-V™ verification into applications, portals, scanners, enterprise systems, and issuer workflows.',
    body: [
      ['Getting Started', 'Use the verification endpoint to resolve QRVIDs and return structured results.', '#'],
      ['SDK Overview', 'SDKs should wrap record creation, verification lookup, revocation, error handling, and webhook events.', '#'],
      ['Integration Guides', 'Common integrations include certificate platforms, identity systems, product authentication, WordPress, mobile scanners, and enterprise dashboards.', '#'],
      ['Testing Sandbox', 'Use demo IDs and staging keys before creating production verification records.', '#']
    ]
  },
  '/docs/api-reference': {
    title: 'QR-V™ API Reference',
    eyebrow: 'Docs • API Reference',
    heading: 'API Reference',
    summary: 'Core API contract for creating, verifying, revoking, and querying QR-V registry-backed records.',
    body: [
      ['POST /registry/create', 'Create a registry-backed QR-V record and return a QRVID plus verification URL.', '#'],
      ['GET /verify/:qrvid', 'Resolve and verify a QRVID. Returns VERIFIED, REVOKED, EXPIRED, or NOT_FOUND.', '#'],
      ['POST /revoke', 'Revoke an existing record and record the revocation event in the audit log.', '#'],
      ['GET /record/:qrvid', 'Return canonical registry record metadata where permissions allow.', '#'],
      ['Error Codes', 'Use 200 for verified lookups, 404 for not found, 410 for revoked, 422 for invalid identifiers, and 500 for registry errors.', '#']
    ]
  }
};

function styles() {
  return `:root{--bg:#050914;--panel:#101936;--line:#2c3f74;--gold:#f2d06b;--cyan:#55c7ff;--text:#edf3ff;--muted:#b7c5e6;--green:#22c55e;--red:#ef4444;--orange:#f59e0b;--blue:#60a5fa}*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:radial-gradient(circle at top,#173c78 0,#081124 48%,#03060e 100%);color:var(--text)}a{color:inherit}.wrap{max-width:1180px;margin:0 auto;padding:28px 20px}.nav{display:flex;justify-content:space-between;align-items:center;gap:18px}.brand{font-weight:900;letter-spacing:.08em}.nav a{color:#d9e5ff;text-decoration:none;margin-left:18px;font-size:14px}.hero{padding:76px 0 36px}.eyebrow{color:var(--gold);font-weight:900;text-transform:uppercase;letter-spacing:.16em;font-size:13px}h1{font-size:clamp(42px,7vw,82px);line-height:.98;margin:12px 0;letter-spacing:-.055em}h2{font-size:clamp(28px,4vw,46px);margin:0 0 12px}h3{margin:0 0 8px}p,li{font-size:18px;line-height:1.65;color:var(--muted)}.caps{font-weight:900;color:#fff;letter-spacing:.08em}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.btn{display:inline-block;border-radius:999px;padding:14px 20px;text-decoration:none;font-weight:900;background:var(--gold);color:#081124}.btn.alt{background:transparent;color:#fff;border:1px solid var(--line)}.section{margin:42px 0}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:20px 0}.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.card{background:rgba(16,25,54,.88);border:1px solid var(--line);border-radius:22px;padding:22px}.problem{border-left:4px solid var(--red)}.solution{border-left:4px solid var(--green)}.node{font-family:ui-monospace,Menlo,monospace;color:#dbeafe;word-break:break-word}.flow{font-family:ui-monospace,Menlo,monospace;background:#07112a;border:1px solid var(--line);border-radius:18px;padding:18px;color:#fff}.list{padding-left:20px}.status span,.badge{display:inline-block;margin:6px 6px 0 0;padding:7px 11px;border-radius:999px;border:1px solid var(--line);font-weight:900}.badge.operational{color:#d8ffe8;background:rgba(34,197,94,.14);border-color:rgba(34,197,94,.32)}.badge.degraded{color:#ffe7cf;background:rgba(245,158,11,.16);border-color:rgba(245,158,11,.34)}.badge.pending{color:#dbeafe;background:rgba(96,165,250,.12);border-color:rgba(96,165,250,.34)}.badge.reserved{color:#dbeafe;background:rgba(148,163,184,.12);border-color:rgba(148,163,184,.32)}.service-row{display:grid;grid-template-columns:1.1fr .7fr .7fr;gap:14px;align-items:start;border-top:1px solid rgba(255,255,255,.08);padding:18px 0}.service-row:first-child{border-top:0}.verify{margin-top:30px;background:rgba(16,25,54,.9);border:1px solid var(--line);border-radius:24px;padding:24px}.verify form{display:flex;gap:12px;flex-wrap:wrap}input{flex:1 1 280px;padding:16px;border-radius:14px;border:1px solid #3b4e83;background:#0b1430;color:#fff;font-size:16px}button{border:0;border-radius:999px;padding:15px 20px;background:var(--cyan);font-weight:900;color:#06101d;cursor:pointer}.footer{border-top:1px solid var(--line);margin-top:50px;padding:28px 0;color:#9fb2d8;font-size:14px}.footgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.footgrid a{display:block;color:#c9d7f4;text-decoration:none;margin:7px 0}.small{font-size:14px;color:#9fb2d8}.banner{background:linear-gradient(90deg,rgba(85,199,255,.12),rgba(242,208,107,.12));border:1px solid var(--line);border-radius:24px;padding:24px}.price{font-size:34px;color:#fff;font-weight:900}.ok{color:var(--green);font-weight:900}.docnav{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0}.docnav a{border:1px solid var(--line);border-radius:999px;padding:9px 12px;text-decoration:none;color:#dbeafe;background:rgba(16,25,54,.65)}@media(max-width:850px){.grid,.grid4,.footgrid,.service-row{grid-template-columns:1fr}.nav{align-items:flex-start;flex-direction:column}.nav a{margin:0 12px 0 0}}`;
}

function shell(title, description, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><style>${styles()}</style></head><body><div class="wrap"><nav class="nav"><div class="brand"><a href="${APP_BASE_URL}" style="text-decoration:none">QR-V™</a></div><div><a href="${APP_BASE_URL}/about">About</a><a href="${APP_BASE_URL}/docs">Docs</a><a href="${VERIFY_BASE_URL}">Verify</a><a href="${ISSUER_BASE_URL}">Issuer Portal</a><a href="${APP_BASE_URL}/status">Status</a></div></nav>${body}${footer()}</div></body></html>`;
}

function footer() {
  return `<footer class="footer"><div class="footgrid"><div><h3>QR-V</h3><a href="${APP_BASE_URL}/about">About QR-V™</a><a href="${APP_BASE_URL}/docs/protocol">QRVP-1 Protocol</a><a href="${VERIFY_BASE_URL}">Verify a Record</a><a href="${REGISTRY_BASE_URL}">Registry Portal</a></div><div><h3>Technology</h3><a href="${APP_BASE_URL}/docs/registry">Registry Architecture</a><a href="${APP_BASE_URL}/docs/api-reference">Verification API</a><a href="${APP_BASE_URL}/docs/verification">Verification Model</a><a href="${APP_BASE_URL}/docs">Documentation</a></div><div><h3>Resources</h3><a href="${APP_BASE_URL}/docs/developers">Developers</a><a href="${ISSUER_BASE_URL}">Issuer Portal</a><a href="${APP_BASE_URL}/status">Status</a><a href="mailto:research@quantumohi.com">Contact</a></div><div><h3>Company</h3><a href="${APP_BASE_URL}/about">About</a><a href="mailto:research@quantumohi.com">Enterprise Access</a><a href="${APP_BASE_URL}/docs">Legal / Compliance</a><a href="${APP_BASE_URL}/docs/verification">Security Disclosure</a></div></div><p>© 2026 QR-V™ — Global QR Verification Network — All Rights Reserved</p><p>Verification infrastructure and protocol architecture developed by One Gregory Onegodian™. Platform infrastructure provided by QuantumOHI.com.</p><p class="small">QRVP-1 • Registry-Based Verification Infrastructure • Version ${VERSION}</p></footer>`;
}

function homeHtml() {
  return shell('QR-V™ Global Verification Network', 'QR-V is registry-based verification infrastructure for certificates, credentials, products, assets, documents, property records, and financial records.', `<main class="hero"><div class="eyebrow">QR-V™ • Global Verification Network • QRVP-1 Protocol</div><h1>Verify Records. Confirm Authenticity. Instantly.</h1><p>QR-V™ transforms QR codes into registry-backed verification references. Each scan resolves to a verification record where authenticity, issuer identity, integrity, and status are confirmed in real time.</p><p class="caps">CERTIFICATES • CREDENTIALS • PRODUCTS • ASSETS • DOCUMENTS • PROPERTY TITLES • FINANCIAL RECORDS</p><div class="actions"><a class="btn" href="${VERIFY_BASE_URL}">Verify Record</a><a class="btn alt" href="${ISSUER_BASE_URL}">Issuer Portal</a><a class="btn alt" href="${APP_BASE_URL}/docs">Documentation</a><a class="btn alt" href="${APP_BASE_URL}/status">Network Status</a></div><section class="verify"><h2>Live QRVID Lookup</h2><p>Try a QR-V identifier or scan-ready verification reference.</p><form onsubmit="event.preventDefault();const v=document.getElementById('qrvid').value.trim();if(v) location.href='${VERIFY_BASE_URL}/'+encodeURIComponent(v);"><input id="qrvid" placeholder="QRV-CERT-000001" required><button>Verify QRVID</button></form><p class="small">Demo IDs: QRV-CERT-000001 • QRV-MEMBER-000001 • QRV-PROPERTY-000001</p></section></main><section class="grid section"><div class="card problem"><h2>The Problem</h2><p>Traditional QR codes were built for routing—not verification.</p><ul class="list"><li>No authenticity validation</li><li>No issuer confirmation</li><li>No integrity guarantees</li><li>No revocation awareness</li><li>No trusted record linkage</li></ul></div><div class="card solution"><h2>The QR-V™ Solution</h2><p>QR-V™ introduces registry-based verification.</p><ul class="list"><li>Authenticity validation</li><li>Issuer-aware verification</li><li>Registry-backed records</li><li>Status + revocation control</li><li>Audit-ready traceability</li></ul></div><div class="card"><h2>Why QR-V™ Exists</h2><p>DNS resolves destinations. HTTPS secures transport. QR-V™ verifies records.</p></div></section><section class="section banner"><h2>How QR-V™ Works</h2><div class="grid4"><div class="card"><h3>1. Issue</h3><p>Issuer creates record</p></div><div class="card"><h3>2. Bind</h3><p>QR-V identifier linked</p></div><div class="card"><h3>3. Resolve</h3><p>Scan routes to network</p></div><div class="card"><h3>4. Verify</h3><p>Status result returned</p></div></div><p class="flow">Scan → Resolver → Registry Lookup → Validation → VERIFIED / REVOKED / EXPIRED / NOT FOUND</p></section><section class="section card"><h2>Production Documentation Now Lives at qrv.network/docs</h2><p>The canonical documentation path is now inside the root domain. Use the docs center for protocol, registry, verification, issuer, developer, and API reference material.</p><div class="actions"><a class="btn" href="${APP_BASE_URL}/docs">Open Docs</a><a class="btn alt" href="${APP_BASE_URL}/docs/api-reference">API Reference</a><a class="btn alt" href="${APP_BASE_URL}/docs/developers">Developer Guide</a></div></section>`);
}

function aboutHtml() {
  return shell('About QR-V™ | Global QR Verification Network', 'QR-V™ is a registry-based verification infrastructure that transforms QR codes into verifiable references through the QRVP-1 protocol.', `<main class="hero"><div class="eyebrow">About QR-V™ • Global Verification Network</div><h1>A Verification Layer for QR-Based Systems</h1><p>QR-V™ is a registry-based verification infrastructure that transforms QR codes into verifiable references.</p><p>Each QR-V identifier resolves to a canonical registry record, enabling independent validation of authenticity, issuer identity, record integrity, and current status.</p><div class="actions"><a class="btn" href="${VERIFY_BASE_URL}">Verify a Record</a><a class="btn alt" href="${APP_BASE_URL}/docs">Developer Docs</a><a class="btn alt" href="mailto:research@quantumohi.com">Enterprise Access</a></div></main><section class="section banner"><h2>Verification Flow</h2><p class="flow">QR Scan → Identifier Resolution → Registry Lookup → Validation → Result</p><p>Verification results are derived from authoritative registry records, not from user-controlled endpoints.</p></section><section class="grid section"><div class="card"><h3>Identifier</h3><p>QR-V reference embedded in the QR code.</p></div><div class="card"><h3>Resolver</h3><p>Routes the verification request.</p></div><div class="card"><h3>API</h3><p>Processes verification logic.</p></div><div class="card"><h3>Registry</h3><p>Stores canonical records.</p></div><div class="card"><h3>Result</h3><p>Verification response.</p></div><div class="card"><h3>Audit</h3><p>Traceability for events and lifecycle actions.</p></div></section>`);
}

function docsHtml(page) {
  const doc = docsPages[page] || docsPages['/docs'];
  const nav = Object.keys(docsPages).map((p) => `<a href="${p}">${p === '/docs' ? 'Docs Home' : p.replace('/docs/', '').replace('-', ' ')}</a>`).join('');
  const cards = doc.body.map(([title, text, href]) => `<div class="card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p>${href && href !== '#' ? `<a class="btn alt" href="${href}">Open</a>` : ''}</div>`).join('');
  return shell(`${doc.title} | QR-V™ Docs`, doc.summary, `<main class="hero"><div class="eyebrow">${escapeHtml(doc.eyebrow)}</div><h1>${escapeHtml(doc.heading)}</h1><p>${escapeHtml(doc.summary)}</p><div class="docnav">${nav}</div></main><section class="grid section">${cards}</section><section class="section banner"><h2>Canonical Documentation Path</h2><p><strong>qrv.network/docs</strong> is now the primary documentation home for QR-V™. Runtime services remain on dedicated operational subdomains: verify, registry, issuer, api, and status.</p></section>`);
}

function statusClass(status) {
  const value = String(status || '').toLowerCase();
  if (value.includes('operational')) return 'operational';
  if (value.includes('degraded')) return 'degraded';
  if (value.includes('reserved')) return 'reserved';
  return 'pending';
}

function statusHtml() {
  const operational = services.filter((service) => service.status === 'OPERATIONAL').length;
  const degraded = services.filter((service) => service.status === 'DEGRADED').length;
  const rows = services.map((service) => `<div class="service-row"><div><h3>${escapeHtml(service.name)}</h3><p class="node">${escapeHtml(service.host)}</p><p>${escapeHtml(service.role)}</p></div><div><span class="badge ${statusClass(service.status)}">${escapeHtml(service.status)}</span><p class="small">${escapeHtml(service.note)}</p></div><div><a class="btn alt" href="${service.url}">Open</a><a class="btn alt" href="${service.healthUrl}">Check</a></div></div>`).join('');
  return shell('QR-V™ Network Status', 'Public QR-V network status for qrv.network and operational service endpoints.', `<main class="hero"><div class="eyebrow">QR-V™ Public Status • qrv.network/status</div><h1>Network Status</h1><p>Public status for the QR-V™ Global Verification Network during production activation. This page replaces status.qrv.network until the dedicated monitoring subdomain is deployed.</p><div class="actions"><a class="btn" href="${REGISTRY_BASE_URL}">Registry Authority</a><a class="btn alt" href="${VERIFY_BASE_URL}">Verify Portal</a><a class="btn alt" href="${ISSUER_BASE_URL}">Issuer Portal</a><a class="btn alt" href="${APP_BASE_URL}/docs">Docs</a></div></main><section class="grid section"><div class="card"><h3>Overall Stage</h3><p class="badge degraded">ACTIVATION STAGE</p><p>Core root and registry services are live. Verification and issuer services require deployment correction before production activation is complete.</p></div><div class="card"><h3>Operational Services</h3><p class="price">${operational}/${services.length}</p><p>Services currently marked operational on this public status page.</p></div><div class="card"><h3>Production Blockers</h3><p class="price">${degraded}</p><p>Resolve degraded services before first public certificate activation.</p></div></section><section class="section card"><div class="eyebrow">Service Directory</div><h2>QR-V Network Public Status</h2>${rows}</section><section class="section banner"><h2>Production Activation Path</h2><p>The next production proof remains the end-to-end QR-V certificate lifecycle.</p><p class="flow">issuer.qrv.network → api.qrv.network → registry.qrv.network → verify.qrv.network/{QRVID} → VERIFIED</p><ul class="list"><li>Fix verify.qrv.network 503.</li><li>Redeploy issuer.qrv.network from the latest issuer-qrv source.</li><li>Confirm api.qrv.network create and verification routes.</li><li>Issue one certificate and confirm public VERIFIED result.</li></ul></section>`);
}

function sendJson(res, payload) {
  res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(payload));
}

function escapeHtml(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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
    docs: DOCS_BASE_URL,
    statusPage: `${APP_BASE_URL}/status`,
    endpoints: {
      verify: VERIFY_BASE_URL,
      issuer: ISSUER_BASE_URL,
      registry: REGISTRY_BASE_URL,
      api: API_BASE_URL,
      docs: DOCS_BASE_URL,
      developers: DEVELOPERS_BASE_URL,
      status: `${APP_BASE_URL}/status`,
      dedicatedStatusReserved: 'https://status.qrv.network',
      store: STORE_BASE_URL
    },
    services
  };
}

const server = http.createServer((req, res) => {
  const path = new URL(req.url || '/', APP_BASE_URL).pathname.replace(/\/$/, '') || '/';
  if (path === '/health' || path === '/healthz' || path === '/health.json') {
    sendJson(res, healthPayload());
    return;
  }
  if (path === '/ready' || path === '/readyz' || path === '/ready.json') {
    sendJson(res, { ready: true, service: 'qrv-network-root', version: VERSION, statusPage: `${APP_BASE_URL}/status`, requiredNext: 'Fix verify.qrv.network and activate first VERIFIED certificate flow.' });
    return;
  }
  if (path === '/version') {
    sendJson(res, { service: 'qrv-network-root', version: VERSION, appBaseUrl: APP_BASE_URL, protocol: 'QRVP-1', docs: DOCS_BASE_URL, statusPage: `${APP_BASE_URL}/status` });
    return;
  }
  if (path === '/about') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(aboutHtml());
    return;
  }
  if (path === '/status') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(statusHtml());
    return;
  }
  if (path === '/docs' || path.startsWith('/docs/')) {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(docsHtml(path));
    return;
  }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(homeHtml());
});

server.listen(PORT, '0.0.0.0', () => console.log(`QR-V root running on ${PORT}`));
