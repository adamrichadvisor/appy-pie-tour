# Vantage

AI-powered B2B **lead generation & cold email outreach** — a concept product with a
**working, self-contained tool** you can actually use.

| File | What it is |
|---|---|
| [`app.html`](./app.html) | **The working tool.** A self-contained single-page app implementing the full 8-step workflow. Runs entirely in your browser. |
| [`index.html`](./index.html) | Premium product presentation (marketing site + visual PRD). |
| [`PRD.md`](./PRD.md) | The written Product Requirements Document. |

## Using the tool

1. **Open `app.html`** in a browser — double-click the file, or host the folder on GitHub Pages and visit `…/vantage/app.html`.
2. **Add your Claude API key** in **Settings** (get one at [console.anthropic.com](https://console.anthropic.com)). It's stored only in your browser's `localStorage` and sent directly to Anthropic — nothing goes to any third-party server.
3. Work the sidebar top to bottom: **Lead Finder → Verification → Export → AI Templates → Campaigns → Mailboxes → Smart Send → Reports.**

### What genuinely works (no backend)
- **AI Template Generator** — real personalized subject/body/CTA/signature via the Claude API (your key).
- **Email Verification** — live **MX-record** lookups (DNS-over-HTTPS) plus syntax, disposable-domain, role-based, and free-mail detection → Verified / Risky / Invalid.
- **Lead management** — add manually, import CSV, generate clearly-labelled synthetic sample leads, filter/search.
- **CSV / Excel export** with the full field set.
- **Campaign builder** with live merge-field preview.
- **Smart sending engine** — verified-only queue, randomized 30–90s intervals, daily caps, duplicate & suppression checks, bounce-triggered stops, pause/resume, live progress. Runs in **Simulate** mode (produces delivery events for analytics) or **Export .eml** mode (writes personalized, ready-to-send emails).
- **Reports** — funnel, daily-sending chart, geo/industry distribution; export to CSV.
- **Compliance** — every email appends your physical-address + opt-out footer; bounced/opted-out addresses are suppressed.

### What needs external infrastructure (not included)
- **Real lead *discovery*** from a licensed B2B contact database (Apollo/ZoomInfo-style) — bring your own data via CSV, or wire an API you have access to.
- **Live email *sending*** through connected Gmail/Outlook via OAuth, and full **SMTP mailbox / catch-all** verification — both require a server. The tool models these and, for sending, produces ready-to-send `.eml` files as the client-side path.

> **Privacy:** all data (leads, templates, campaigns, settings, your API key) lives only in your browser. Use **Settings → Export all** to back it up. Nothing is uploaded anywhere except your own AI calls to Anthropic and MX lookups to Google's public DNS resolver.

> **Responsible use:** send only consent-based, compliant outreach under applicable law (CAN-SPAM, GDPR, CASL). This is a concept tool; you are responsible for how you use it.
