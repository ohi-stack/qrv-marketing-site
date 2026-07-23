import http from 'http';

const PORT = process.env.PORT || 3000;
const APP_BASE_URL = cleanUrl(process.env.APP_BASE_URL || process.env.VITE_APP_BASE_URL || 'https://qrv.network');
const VERIFY_BASE_URL = cleanUrl(process.env.VERIFY_BASE_URL || process.env.QRV_VERIFY_URL || process.env.VITE_QRV_VERIFY_BASE_URL || 'https://verify.qrv.network');
const REGISTRY_BASE_URL = cleanUrl(process.env.REGISTRY_BASE_URL || process.env.QRV_REGISTRY_URL || process.env.VITE_QRV_REGISTRY_BASE_URL || 'https://registry.qrv.network');
const ISSUER_BASE_URL = cleanUrl(process.env.ISSUER_BASE_URL || process.env.QRV_ISSUER_URL || process.env.VITE_QRV_ISSUER_BASE_URL || 'https://issuer.qrv.network');
const API_BASE_URL = cleanUrl(process.env.API_BASE_URL || process.env.QRV_API_URL || process.env.VITE_QRV_API_BASE_URL || 'https://api.qrv.network');
const DOCS_BASE_URL = cleanUrl(process.env.DOCS_BASE_URL || process.env.QRV_DOCS_URL || process.env.VITE_QRV_DOCS_BASE_URL || `${APP_BASE_URL}/docs`);
const DEVELOPERS_BASE_URL = cleanUrl(process.env.DEVELOPERS_BASE_URL || process.env.QRV_DEVELOPERS_URL || process.env.VITE_QRV_DEVELOPERS_BASE_URL || `${APP_BASE_URL}/developers`);
const STATUS_BASE_URL = cleanUrl(process.env.STATUS_BASE_URL || process.env.QRV_STATUS_URL || process.env.VITE_QRV_STATUS_BASE_URL || `${APP_BASE_URL}/status`);
const STORE_BASE_URL = cleanUrl(process.env.STORE_BASE_URL || process.env.QRV_STORE_URL || 'https://store.qrv.network');
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'research@quantumohi.com';
const VERSION = process.env.APP_VERSION || '1.4.0';
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
  ['Protocol', '/protocol'],
  ['Verification', '/verification'],
  ['Registry', '/registry'],
  ['Issuers', '/issuers'],
  ['Use Cases', '/use-cases'],
  ['Pricing', '/pricing'],
  ['Developers', '/developers'],
  ['Docs', '/docs']
];

const utilityNav = [
  ['Verify', VERIFY_BASE_URL],
  ['Issuer Portal', ISSUER_BASE_URL],
  ['API', API_BASE_URL],
  ['Support', '/support'],
  ['Status', `${APP_BASE_URL}/status`]
];

const services = [
  ['Root Network Hub', 'qrv.network', APP_BASE_URL, 'Public network hub, documentation gateway, pricing, support, legal notices, and consolidation layer.', 'OPERATIONAL'],
  ['Documentation Center', 'qrv.network/docs', `${APP_BASE_URL}/docs`, 'Protocol, registry, verification, issuer, developer, and API reference pages.', 'OPERATIONAL'],
  ['Public Verification Portal', 'verify.qrv.network', VERIFY_BASE_URL, 'Public trust surface for QRVID verification result pages.', 'CHECK LIVE'],
  ['Registry Authority', 'registry.qrv.network', REGISTRY_BASE_URL, 'Canonical registry authority for QR-V records, hashes, issuers, and audit logs.', 'CHECK LIVE'],
  ['API Gateway', 'api.qrv.network', API_BASE_URL, 'JSON API gateway for verification, registry creation, revocation, and integrations.', 'CHECK LIVE'],
  ['Issuer Portal', 'issuer.qrv.network', ISSUER_BASE_URL, 'Issuer SaaS portal for creating records and managing certificate lifecycle controls.', 'CHECK LIVE'],
  ['Store / Commerce', 'store.qrv.network', STORE_BASE_URL, 'Commerce layer for issuer plans, services, onboarding packages, and implementation support.', 'PLANNED'],
  ['Dedicated Status Subdomain', 'status.qrv.network', 'https://status.qrv.network', 'Future dedicated monitoring service. Current public status lives at qrv.network/status.', 'RESERVED']
];

const docsPages = {
  '/docs': ['QR-V™ Documentation Center', 'Authoritative documentation for QR-V™ protocol, registry, issuer, verification, developer, API, legal-safe status language, and integration paths.', [
    ['Overview', 'High-level explanation of QR-V™, the problem with ordinary QR codes, and the verification model.', '/docs/overview'],
    ['Protocol', 'QRVP-1 identifier format, resolution process, verification flow, response structure, and lifecycle.', '/docs/protocol'],
    ['Verification', 'Status handling, validation methods, revocation, audit logging, and public verification UI rules.', '/docs/verification'],
    ['Registry', 'Authoritative data layer covering records, hashes, certificates, issuers, and audit logs.', '/docs/registry'],
    ['Issuers', 'Issuer role, onboarding process, issuing records, revocation management, and best practices.', '/docs/issuers'],
    ['Developers', 'SDKs, integration guides, environment setup, webhook events, and testing sandbox.', '/docs/developers'],
    ['API Reference', 'Create, verify, revoke, query, issuer endpoints, authentication, and error codes.', '/docs/api-reference'],
    ['Consolidation', 'How QRV.network consolidates public content while keeping operational services on controlled subdomains.', '/docs/consolidation']
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
    ['Quick Start', `Call ${API_BASE_URL}/api/v1/verify/{qrvid} or route users to ${VERIFY_BASE_URL}/{qrvid}.`, '#'],
    ['SDKs', 'SDKs should wrap creation, lookup, revocation, errors, and webhook events.', '#'],
    ['Sandbox', 'Use demo identifiers before production issuance.', '#']
  ]],
  '/docs/api-reference': ['API Reference', 'Core API contract for creating, verifying, revoking, and querying QR-V registry-backed records.', [
    ['GET /api/v1/verify/:qrvid', 'Resolve and verify a QRVID through the API gateway.', `${API_BASE_URL}/api/v1/verify/QRV-PROD-CERT-000001`],
    ['GET /verify/:qrvid', 'Resolve QRVID at the registry authority node.', `${REGISTRY_BASE_URL}/verify/QRV-PROD-CERT-000001`],
    ['POST /registry/create', 'Create a registry-backed QR-V record and return a QRVID plus verification URL. Requires issuer authorization.', '#'],
    ['POST /registry/:qrvid/revoke', 'Revoke an existing record and write the revocation event. Requires issuer authorization.', '#'],
    ['Status Contract', 'VERIFIED, REVOKED, EXPIRED, NOT_FOUND, INVALID_FORMAT, UNAVAILABLE.', '#']
  ]],
  '/docs/consolidation': ['QRV.network Consolidation Standard', 'Public content lives on qrv.network paths. Operational services remain on dedicated subdomains.', [
    ['Root Site', 'qrv.network is the public front door for overview, protocol, docs, pricing, support, legal, and status.', '/'],
    ['Verification', 'verify.qrv.network remains canonical for public verification result pages.', VERIFY_BASE_URL],
    ['Registry + API', 'registry.qrv.network and api.qrv.network stay machine-facing infrastructure nodes.', REGISTRY_BASE_URL],
    ['Issuer + Admin', 'issuer and admin surfaces remain separated from the public root because they require authentication, authorization, and audit controls.', ISSUER_BASE_URL]
  ]]
};

function styles() {
  return `:root{--bg:#050914;--panel:#101936;--line:#2c3f74;--gold:#f2d06b;--cyan:#55c7ff;--text:#edf3ff;--muted:#b7c5e6;--green:#22c55e;--red:#ef4444;--orange:#f59e0b;--blue:#60a5fa}*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:radial-gradient(circle at top,#173c78 0,#081124 48%,#03060e 100%);color:var(--text)}a{color:inherit}.wrap{max-width:1180px;margin:0 auto;padding:28px 20px}.nav{display:flex;justify-content:space-between;align-items:flex-start;gap:18px}.brand{font-weight:950;letter-spacing:.08em}.mainnav,.utilnav{display:flex;flex-wrap:wrap;gap:13px;justify-content:flex-end}.mainnav a,.utilnav a{color:#d9e5ff;text-decoration:none;font-size:14px;font-weight:850}.utilnav{margin-top:10px}.utilnav a{opacity:.86;border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:7px 10px}.hero{padding:76px 0 36px}.eyebrow{color:var(--gold);font-weight:900;text-transform:uppercase;letter-spacing:.16em;font-size:13px}h1{font-size:clamp(42px,7vw,82px);line-height:.98;margin:12px 0;letter-spacing:-.055em}h2{font-size:clamp(28px,4vw,46px);margin:0 0 12px}h3{margin:0 0 8px}p,li{font-size:18px;line-height:1.65;color:var(--muted)}.caps{font-weight:900;color:#fff;letter-spacing:.08em}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.btn{display:inline-block;border-radius:999px;padding:14px 20px;text-decoration:none;font-weight:900;background:var(--gold);color:#081124}.btn.alt{background:transparent;color:#fff;border:1px solid var(--line)}.section{margin:42px 0}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:20px 0}.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.card{background:rgba(16,25,54,.88);border:1px solid var(--line);border-radius:22px;padding:22px}.problem{border-left:4px solid var(--red)}.solution{border-left:4px solid var(--green)}.node{font-family:ui-monospace,Menlo,monospace;color:#dbeafe;word-break:break-word}.flow{font-family:ui-monospace,Menlo,monospace;background:#07112a;border:1px solid var(--line);border-radius:18px;padding:18px;color:#fff}.list{padding-left:20px}.badge{display:inline-block;margin:6px 6px 0 0;padding:7px 11px;border-radius:999px;border:1px solid var(--line);font-weight:900}.badge.operational{color:#d8ffe8;background:rgba(34,197,94,.14);border-color:rgba(34,197,94,.32)}.badge.degraded{color:#ffe7cf;background:rgba(245,158,11,.16);border-color:rgba(245,158,11,.34)}.badge.pending{color:#dbeafe;background:rgba(96,165,250,.12);border-color:rgba(96,165,250,.34)}.badge.reserved{color:#dbeafe;background:rgba(148,163,184,.12);border-color:rgba(148,163,184,.32)}.service-row{display:grid;grid-template-columns:1fr .55fr .45fr;gap:14px;align-items:start;border-top:1px solid rgba(255,255,255,.08);padding:18px 0}.service-row:first-child{border-top:0}.verify{margin-top:30px;background:rgba(16,25,54,.9);border:1px solid var(--line);border-radius:24px;padding:24px}.verify form{display:flex;gap:12px;flex-wrap:wrap}input{flex:1 1 280px;padding:16px;border-radius:14px;border:1px solid #3b4e83;background:#0b1430;color:#fff;font-size:16px}button{border:0;border-radius:999px;padding:15px 20px;background:var(--cyan);font-weight:900;color:#06101d;cursor:pointer}.footer{border-top:1px solid var(--line);margin-top:50px;padding:28px 0;color:#9fb2d8;font-size:14px}.footgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.footgrid a{display:block;color:#c9d7f4;text-decoration:none;margin:7px 0}.small{font-size:14px;color:#9fb2d8}.banner{background:linear-gradient(90deg,rgba(85,199,255,.12),rgba(242,208,107,.12));border:1px solid var(--line);border-radius:24px;padding:24px}.docnav{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0}.docnav a{border:1px solid var(--line);border-radius:999px;padding:9px 12px;text-decoration:none;color:#dbeafe;background:rgba(16,25,54,.65)}.price{font-size:36px;color:#fff;font-weight:950}.fineprint{font-size:14px;color:#9fb2d8}@media(max-width:850px){.grid,.grid4,.footgrid,.service-row{grid-template-columns:1fr}.nav{flex-direction:column}.mainnav,.utilnav{justify-content:flex-start}}`;
}

function shell(title, description, body) {
  const mainLinks = mainNav.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
  const utilityLinks = utilityNav.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><style>${styles()}</style></head><body><div class="wrap"><nav class="nav"><div class="brand"><a href="${APP_BASE_URL}" style="text-decoration:none">QR-V™</a></div><div><div class="mainnav">${mainLinks}</div><div class="utilnav">${utilityLinks}</div></div></nav>${body}${footer()}</div></body></html>`;
}

function footer() {
  return `<footer class="footer"><div class="footgrid"><div><h3>QR-V</h3><a href="/protocol">QR-V Protocol</a><a href="/verification">Verification</a><a href="${REGISTRY_BASE_URL}">Registry Portal</a><a href="${VERIFY_BASE_URL}">Verification Portal</a></div><div><h3>Technology</h3><a href="/docs/protocol">QRVP-1 Protocol</a><a href="/docs/registry">Registry Architecture</a><a href="/docs/verification">Verification Network</a><a href="/docs/api-reference">API Reference</a></div><div><h3>Resources</h3><a href="/developers">Developers</a><a href="/pricing">Pricing</a><a href="/support">Support</a><a href="/status">Status</a></div><div><h3>Company</h3><a href="/about">About</a><a href="/legal">Legal Notices</a><a href="mailto:${SUPPORT_EMAIL}">Contact</a><a href="/docs/consolidation">Consolidation Standard</a></div></div><p>© 2026 QR-V™ — Global QR Verification Network — All Rights Reserved</p><p>Verification infrastructure and protocol architecture developed by One Gregory Onegodian™. Platform infrastructure provided by QuantumOHI.com.</p><p class="small">QRVP-1 • Registry-Based Verification Infrastructure • Version ${VERSION}</p></footer>`;
}

function cards(items) {
  return items.map(([title, text, href]) => `<div class="card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p>${href && href !== '#' ? `<a class="btn alt" href="${href}">Open</a>` : ''}</div>`).join('');
}

function homeHtml() {
  return shell('QR-V™ Global Verification Network', 'QR-V is registry-based verification infrastructure for certificates, credentials, products, assets, documents, property records, and financial records.', `<main class="hero"><div class="eyebrow">QR-V™ • Global Verification Network • QRVP-1 Protocol</div><h1>Verify Records. Confirm Authenticity. Instantly.</h1><p>QR-V™ transforms QR codes into registry-backed verification references. Each scan resolves to a verification record where authenticity, issuer identity, integrity, and status can be checked.</p><p class="caps">CERTIFICATES • CREDENTIALS • PRODUCTS • ASSETS • DOCUMENTS • PROPERTY TITLES • FINANCIAL RECORDS</p><div class="actions"><a class="btn" href="${VERIFY_BASE_URL}">Verify Record</a><a class="btn alt" href="${ISSUER_BASE_URL}">Issuer Portal</a><a class="btn alt" href="/docs">Documentation</a><a class="btn alt" href="/pricing">Pricing</a><a class="btn alt" href="/status">Network Status</a></div><section class="verify"><h2>Live QRVID Lookup</h2><p>Try a QR-V identifier or scan-ready verification reference.</p><form onsubmit="event.preventDefault();const v=document.getElementById('qrvid').value.trim();if(v) location.href='${VERIFY_BASE_URL}/'+encodeURIComponent(v);"><input id="qrvid" placeholder="QRV-PROD-CERT-000001" required><button>Verify QRVID</button></form><p class="small">Recommended demo: QRV-PROD-CERT-000001. Use issuer and registry tools to create additional production records.</p></section></main><section class="grid section"><div class="card problem"><h2>The Problem</h2><p>Traditional QR codes were built for routing, not verification.</p><ul class="list"><li>No authenticity validation</li><li>No issuer confirmation</li><li>No integrity guarantees</li><li>No revocation awareness</li><li>No trusted record linkage</li></ul></div><div class="card solution"><h2>The QR-V™ Solution</h2><p>QR-V™ introduces registry-based verification.</p><ul class="list"><li>Authenticity validation</li><li>Issuer-aware verification</li><li>Registry-backed records</li><li>Status and revocation control</li><li>Audit-ready traceability</li></ul></div><div class="card"><h2>Why QR-V™ Exists</h2><p>DNS resolves destinations. HTTPS secures transport. QR-V™ verifies records.</p></div></section>`);
}

function pageHtml(page) {
  const pages = {
    '/protocol': ['QR-V™ Protocol', 'QRVP-1 Protocol', 'QRVP-1 defines the QR-V identifier, resolver, registry, verification, and response layers.', [
      ['QRVP-1 Specification', 'Formal identifier resolution and verification protocol.', '/docs/protocol'],
      ['Identifier Format', 'QRV://registry/type/objectID and HTTPS gateway URLs.', '/docs/protocol'],
      ['Security Model', 'Hash validation, signatures, issuer authorization, revocation, and audit logging.', '/docs/verification']
    ]],
    '/verification': ['QR-V™ Verification', 'Verification', 'Public QR-V verification turns a QRVID into a registry-backed authenticity result.', [
      ['Verify a Record', 'Open the public verification portal and enter a QRVID.', VERIFY_BASE_URL],
      ['Verification States', 'VERIFIED, REVOKED, EXPIRED, NOT_FOUND, INVALID_FORMAT, and UNAVAILABLE.', '/docs/verification'],
      ['Canonical URL Pattern', 'Every public result should resolve through verify.qrv.network/{QRVID}.', VERIFY_BASE_URL]
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
    '/issuers': ['QR-V™ Issuers', 'Issuers', 'Issuer tools create verifiable records, manage QRVIDs, and revoke records when needed.', [
      ['Open Issuer Portal', 'Create registry-backed records through issuer.qrv.network.', ISSUER_BASE_URL],
      ['Issuer Operations', 'Review issuing, lifecycle, revocation, and best-practice documentation.', '/docs/issuers'],
      ['Pricing', 'Review starter, growth, implementation, and enterprise packages.', '/pricing']
    ]],
    '/use-cases': ['QR-V™ Use Cases', 'Use Cases', 'QR-V supports high-trust verification workflows across physical and digital records.', [
      ['Certificates & Diplomas', 'Verify training credentials, diplomas, licenses, and completion records.', '#'],
      ['Product Authentication', 'Bind products to registry-backed authenticity records.', '#'],
      ['Documents & Assets', 'Verify documents, property records, financial instruments, and assets.', '#'],
      ['Campaign Verification', 'Verify official campaigns, business cards, public support pages, and product labels.', '#'],
      ['Membership IDs', 'Connect membership cards and IDs to status-aware verification records.', '#'],
      ['Developer Integrations', 'Embed QR-V verification into apps, dashboards, and external workflows.', '/developers']
    ]],
    '/developers': ['QR-V™ Developers', 'Developers', 'Developer resources for API integrations, SDKs, docs, and QR-V verification clients.', [
      ['Developer Docs', 'Start with the QR-V documentation center.', '/docs/developers'],
      ['API Reference', 'Create, verify, revoke, and query registry-backed records.', '/docs/api-reference'],
      ['API Gateway', 'Use api.qrv.network for JSON-only integrations.', API_BASE_URL]
    ]],
    '/pricing': ['QR-V™ Pricing', 'Pricing', 'Commercial packages for verification records, issuer onboarding, implementation support, and enterprise integrations.', [
      ['Starter Issuer', '$199/month target package for one issuer dashboard, public verify pages, and limited active records.', STORE_BASE_URL],
      ['Growth Issuer', '$499/month target package for revocation controls, analytics, API access, and higher active record volume.', STORE_BASE_URL],
      ['Implementation Setup', 'One-time setup for QRVID structure, branded verification pages, initial records, and onboarding support.', `mailto:${SUPPORT_EMAIL}`],
      ['Enterprise', 'Custom implementation for high-volume, white-label, regulated, or multi-issuer workflows.', `mailto:${SUPPORT_EMAIL}`]
    ]],
    '/support': ['QR-V™ Support', 'Support', 'Support for verification questions, issuer onboarding, integration requests, record corrections, and implementation planning.', [
      ['Verification Help', 'Need help with a QRVID result, missing record, revoked record, or expired record.', `mailto:${SUPPORT_EMAIL}`],
      ['Issuer Onboarding', 'Request issuer setup, pricing, demo records, or production activation support.', `mailto:${SUPPORT_EMAIL}`],
      ['Developer Support', 'Ask about API integrations, SDK plans, and implementation design.', '/developers'],
      ['Network Status', 'Check current service readiness and activation notes.', '/status']
    ]],
    '/legal': ['QR-V™ Legal Notices', 'Legal Notices', 'QR-V provides verification infrastructure and record-status information. It does not independently create legal rights, certify governmental authority, or guarantee financial value.', [
      ['Verification Scope', 'QR-V verifies whether a record exists, who issued it, what status is returned, and what metadata is connected to the record.', '#'],
      ['No Legal Opinion', 'QR-V verification is not legal advice, title insurance, a court filing, tax advice, investment advice, or a governmental certification.', '#'],
      ['Issuer Responsibility', 'Issuers remain responsible for the truth, authorization, accuracy, and lawful use of submitted records.', '#'],
      ['Report an Issue', 'Contact support for record disputes, incorrect metadata, or suspected misuse.', `mailto:${SUPPORT_EMAIL}`]
    ]],
    '/about': ['About QR-V™', 'About QR-V™', 'QR-V™ is registry-based verification infrastructure that transforms QR codes into verifiable references.', [
      ['Mission', 'Make QR-linked records independently verifiable.', '#'],
      ['Infrastructure Vision', 'A verification layer for trusted records, credentials, assets, products, and campaigns.', '#'],
      ['Enterprise Access', 'Partner, pilot, and implementation inquiries.', `mailto:${SUPPORT_EMAIL}`]
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
  if (value.includes('degraded') || value.includes('check')) return 'degraded';
  if (value.includes('reserved')) return 'reserved';
  return 'pending';
}

function statusHtml() {
  const operational = services.filter((service) => service[4] === 'OPERATIONAL').length;
  const check = services.filter((service) => service[4] === 'CHECK LIVE').length;
  const rows = services.map(([name, host, url, role, status]) => `<div class="service-row"><div><h3>${escapeHtml(name)}</h3><p class="node">${escapeHtml(host)}</p><p>${escapeHtml(role)}</p></div><div><span class="badge ${statusClass(status)}">${escapeHtml(status)}</span></div><div><a class="btn alt" href="${url}">Open</a></div></div>`).join('');
  return shell('QR-V™ Network Status', 'Public QR-V network status for qrv.network and operational service endpoints.', `<main class="hero"><div class="eyebrow">QR-V™ Public Status • qrv.network/status</div><h1>Network Status</h1><p>Public status for the QR-V™ Global Verification Network during production activation. This page is the root status surface while a dedicated monitoring app is prepared.</p><div class="actions"><a class="btn" href="${REGISTRY_BASE_URL}">Registry Authority</a><a class="btn alt" href="${VERIFY_BASE_URL}">Verify Portal</a><a class="btn alt" href="${ISSUER_BASE_URL}">Issuer Portal</a><a class="btn alt" href="/docs">Docs</a></div></main><section class="grid section"><div class="card"><h3>Overall Stage</h3><p><span class="badge degraded">PRODUCTION ACTIVATION</span></p><p>The root hub is upgraded. Dedicated service nodes should be smoke-tested before the first public certificate campaign.</p></div><div class="card"><h3>Root Operational Surfaces</h3><p class="price">${operational}/${services.length}</p><p>Services marked operational on this public status page.</p></div><div class="card"><h3>Live Checks Required</h3><p class="price">${check}</p><p>Dedicated operational services requiring endpoint validation.</p></div></section><section class="section card"><div class="eyebrow">Service Directory</div><h2>QR-V Network Public Status</h2>${rows}</section><section class="section banner"><h2>Production Activation Path</h2><p>The next production proof remains the end-to-end QR-V certificate lifecycle.</p><p class="flow">issuer.qrv.network → api.qrv.network → registry.qrv.network → verify.qrv.network/{QRVID} → VERIFIED</p></section>`);
}

function sendJson(res, payload, statusCode = 200) {
  res.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
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
      store: STORE_BASE_URL,
      support: `${APP_BASE_URL}/support`,
      legal: `${APP_BASE_URL}/legal`,
      pricing: `${APP_BASE_URL}/pricing`
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
  if (['/protocol', '/verification', '/how-it-works', '/registry', '/issuers', '/use-cases', '/developers', '/pricing', '/support', '/legal', '/about'].includes(path)) return res.end(pageHtml(path));
  return res.end(homeHtml());
});

server.listen(PORT, '0.0.0.0', () => console.log(`QR-V root running on ${PORT}`));
