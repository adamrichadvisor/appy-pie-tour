# Vantage — Product Requirements Document

**AI-Powered Lead Generation & Cold Email Outreach Platform**
Version 1.0 · Product Presentation & PRD · Inspired by Apollo.io and Clay

> Companion to the interactive presentation in [`index.html`](./index.html). Open that file in a browser for the visual product tour, UI mockups, workflow and architecture diagrams, and analytics dashboards. This document is the written specification.

---

## 1. Summary

| | |
|---|---|
| **Product** | Vantage — an AI-native platform to find B2B leads, verify emails, generate personalized outreach, send at scale, and report on results. |
| **Problem** | Outbound teams stitch together a data vendor, a verifier, an AI writer, a sending tool, and a spreadsheet. The result is slow, error-prone, and risky for deliverability and compliance. |
| **Solution** | One automated workflow — discover → verify → export → generate → configure → connect → send → measure — with compliance and deliverability enforced by the platform, not left to the user. |
| **Primary users** | Founders, SDR/BDR reps, RevOps, growth marketers, and outbound agencies. |
| **Design language** | Premium, minimal, enterprise SaaS. Dark & light modes, responsive, glassmorphism accents, modern cards/tables, interactive charts. |
| **Non-goals (v1)** | Inbound marketing automation, full CRM replacement, transactional email, SMS/LinkedIn channels. |

---

## 2. Personas

| Persona | Goal | Key screens |
|---|---|---|
| **SDR / Rep** | Book meetings — find leads, send, and reply fast. | Lead Finder, Campaign Builder, Campaign Monitor |
| **RevOps** | Clean data, deliverability, and reporting hygiene. | Email Verification, Connected Mailboxes, Analytics |
| **Founder / Agency** | Run many campaigns across clients at low overhead. | Dashboard, Reports, Settings |

---

## 3. End-to-end workflow

```
User Login → Lead Search → AI Company Research → Lead Collection → Email Verification
→ Verified Leads → Export CSV/Excel → Generate AI Templates → Choose Subject
→ Connect Gmail/Business Email → Campaign Setup → Smart Email Sending
→ Delivery Tracking → Analytics Dashboard → Download Reports
```

Each stage hands clean, structured data to the next. Nothing advances until it is ready: leads are not emailed until verified, emails are not sent until the mailbox is warmed, and bounces stop the queue automatically.

### Step 1 — AI Lead Finder
Search prospects across 13 filters: **Full Name, Email, Phone, LinkedIn URL, Company Name, Job Title, Industry, Company Size, Technologies Used, Revenue, Employee Count, Country, City, State.**
AI discovery enriches each result with: company information, capabilities/services, decision-makers, public contact details, LinkedIn profiles, company website, and social profiles.

### Step 2 — Email Verification
For every collected lead: verify the address, remove invalids, detect catch-all domains, detect disposable emails, identify role-based emails, check SMTP validity, and validate MX records. Results resolve to three states: **Verified · Risky · Invalid.** Unlimited verification on business plans.

### Step 3 — Export Leads
Download verified leads as **CSV** or **Excel (XLSX)** with fields: Name, Company, Position, Email, Phone, LinkedIn, Website, Country, Industry, Verification Status, Company Size, Revenue, Notes.

### Step 4 — AI Outreach Template Generator
Generate personalized templates based on: Industry, Company Category, Job Role, Target Audience, Country, Business Type, Services, Pain Points.
Styles: **Cold Outreach · Sales Pitch · Follow-up · Demo Request · Partnership · Recruitment · Event Invitation · Product Launch · Reminder.**
Each template includes subject-line suggestions, email body, call-to-action, and signature. Users can edit and save.

### Step 5 — Campaign Setup
Choose a saved, AI-generated, or custom template. Set subject line, sender name, and reply-to email. Preview the exact rendered email before sending.

### Step 6 — Email Account Integration
Connect **Gmail, Google Workspace, Microsoft Outlook, Microsoft 365, SMTP, IMAP.** Multiple sending accounts supported. Display connected accounts, daily sending limit, health score, and authentication status. Support **SPF, DKIM, DMARC.**

### Step 7 — Smart Email Sending
Send only to verified leads. Automatic sending queue with randomized **30–90 second** (configurable) delays, daily sending limits, domain warm-up, bounce detection, retry logic, stop-on-bounce, duplicate prevention, and campaign pause/resume. Live campaign progress is displayed.

### Step 8 — Reports & Analytics
Downloadable **CSV/Excel** reports: Total Leads Found, Verified Emails, Invalid Emails, Emails Sent, Delivered, Opened, Clicked, Replied, Bounced, Failed, Campaign Status, Export Date.
Dashboard charts: Daily Sending, Open Rate, Reply Rate, Bounce Rate, Verification Success, Country Distribution, Industry Distribution.

---

## 4. Dashboard

A clean command center surfacing: Total Leads, Verified Leads, Active Campaigns, Connected Mailboxes, Emails Sent Today, Replies, Bounce Rate, Open Rate, Credits Used, and Recent Campaigns.

---

## 5. AI features

AI Lead Discovery · AI Company Research · AI Email Verification · AI Personalization · AI Subject Line Generator · AI Email Writer · AI Follow-up Generator · AI Lead Scoring · AI Duplicate Detection · AI Smart Filtering.

---

## 6. Functional requirements

| ID | Requirement | Acceptance |
|---|---|---|
| FR-1 | Search prospects across 13 filters with AI enrichment. | Query returns paginated matches; each lead has company, contacts, socials. |
| FR-2 | Verify emails via MX, SMTP, catch-all, disposable, role-based. | Each address resolves to Verified/Risky/Invalid; invalids excluded from sends. |
| FR-3 | Export leads to CSV and XLSX with the full field set. | File downloads with 13 columns incl. verification status. |
| FR-4 | Generate AI templates in 9 styles with subject/body/CTA/signature. | Output editable and savable; regenerate on demand. |
| FR-5 | Build a campaign — template, subject, sender, reply-to, preview. | Preview renders the exact email before send. |
| FR-6 | Connect multiple mailboxes via OAuth or SMTP/IMAP. | Shows limit, health score, SPF/DKIM/DMARC status. |
| FR-7 | Send only to verified leads with paced, capped delivery. | 30–90s randomized delay; daily cap; warm-up; bounce stop; pause/resume. |
| FR-8 | Report on the funnel and export analytics. | Dashboards for send/open/reply/bounce + geo/industry; CSV/Excel export. |
| FR-9 | Enforce compliance on every send. | Unsubscribe link, footer, suppression list, consent tracking present. |

---

## 7. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Search < 1.5s p95; verification 10k per batch. |
| Scale | Millions of leads per workspace; horizontally scaled workers. |
| Reliability | 99.9% API uptime; at-least-once send with idempotency keys. |
| Security | OAuth 2.0, encryption at rest & in transit, RBAC, audit log. |
| Privacy | Data deletion & export on request (GDPR). |
| Accessibility | WCAG-aware contrast, keyboard focus states, reduced-motion support. |

---

## 8. UI screens

1. Login · 2. Dashboard · 3. Lead Finder · 4. Lead Details · 5. Email Verification · 6. Export Leads · 7. AI Template Generator · 8. Campaign Builder · 9. Email Preview · 10. Connected Mailboxes · 11. Campaign Monitor · 12. Analytics Dashboard · 13. Reports · 14. Settings · 15. User Profile.

Design style: premium SaaS UI, dark & light mode, responsive, enterprise dashboard, glassmorphism accents, modern cards and tables, interactive charts, clean typography, smooth user flows, minimal professional aesthetic. All 15 are shown as mockups in `index.html`.

---

## 9. Technical architecture

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React / Next.js 14 | SSR/ISR, design system, dark & light. |
| Backend | Node.js / NestJS | REST API, OpenAPI, RBAC. |
| Database | PostgreSQL | Relational core, `jsonb` enrichment. |
| Queue | Redis / BullMQ | Send, verify, enrich, schedule jobs. |
| Workers | Background workers | Paced sending, batch verification, AI research. |
| Email | Gmail · Microsoft Graph · SMTP/IMAP | Provider adapters, warm-up ramps. |
| AI | LLM service (Claude) | Discovery, writing, scoring. |
| Auth | OAuth 2.0 · JWT | Google & Microsoft sign-in. |
| Integration | REST API · Webhooks | CRM sync (HubSpot/Salesforce), event push. |

**Request lifecycle (a send):** Campaign start → scheduler enqueues verified-only contacts → send worker claims a job → checks daily cap & mailbox health → waits a randomized 30–90s → sends via provider → records event → webhook fires → analytics rollup updates. Bounces flip the contact to suppressed and halt further sends to that address.

### Core data model
`workspaces · users · leads · verifications · templates · campaigns · mailboxes · send_events`
Foreign keys scope everything to a workspace. `leads.verify_status` gates campaign membership; `send_events` is an immutable event log (sent, delivered, opened, clicked, replied, bounced, failed, unsubscribed) that powers both analytics rollups and the suppression list.

### Example API surface (`/v1`)
```
POST /v1/leads/search           GET  /v1/leads/:id
POST /v1/verify/batch           POST /v1/exports
POST /v1/templates/generate     POST /v1/campaigns
PUT  /v1/campaigns/:id/state     POST /v1/mailboxes/connect
GET  /v1/reports/:campaignId    POST /v1/webhooks
```

---

## 10. Responsible sending & compliance

Compliance and deliverability are enforced by the product:

- **One-click unsubscribe** and a physical-address footer on every email; opt-outs write to the suppression list instantly and irreversibly.
- **Suppression & consent** — global suppression lists, bounce-triggered stops, and consent tracking prevent contacting anyone who shouldn't be contacted.
- **Configurable sending rates** — per-mailbox daily caps, randomized 30–90s delays, and domain warm-up ramps keep volume within provider limits.
- **Authentication** — SPF, DKIM, DMARC status surfaced per mailbox.
- **Regulatory alignment** — designed to support **CAN-SPAM, GDPR, CASL** and similar laws for legitimate, consent-based business outreach.

> Vantage is a concept product design. Operators remain responsible for lawful, consent-based outreach under applicable regulations.

---

## 11. Success metrics

| Metric | Target |
|---|---|
| Activation | First verified export within 24h of signup. |
| Data quality | ≥ 97% verification accuracy; < 2% bounce. |
| Engagement | Median reply rate ≥ 5% across campaigns. |
| Retention | ≥ 40% of teams run a campaign weekly. |
| Deliverability | ≥ 95% inbox placement on warmed domains. |

---

## 12. Implementation roadmap

| Phase | Window | Scope |
|---|---|---|
| **1 · Foundation** | Weeks 1–6 | Auth, workspaces, RBAC; Lead Finder + search; verification engine; CSV/XLSX export; core dashboard. |
| **2 · Outreach** | Weeks 7–12 | AI template generator; campaign builder + preview; mailbox OAuth/SMTP; smart sending engine; warm-up & bounce handling. |
| **3 · Intelligence** | Weeks 13–18 | Lead scoring; duplicate detection; follow-up sequences; analytics + reports; webhooks & public API. |
| **4 · Scale** | Weeks 19–24 | CRM sync; team collaboration; A/B testing; deliverability insights; enterprise SSO & audit. |
