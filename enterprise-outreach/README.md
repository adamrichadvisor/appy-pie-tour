# Enterprise Outreach Kit: Appy Pie · Flozic · Pixazo

Seven enterprise campaigns, each with Apollo targeting filters, a 4-step email sequence,
LinkedIn messages and a matching proposal template. Everything is sent from the 9
`appypie.es` inboxes so the main `appypie.com` domain's reputation stays protected.

## The 7 campaigns

| # | Campaign | Lead brand | Buyer | Entry offer | Files |
|---|---|---|---|---|---|
| 1 | AI Agents & Workflow Automation | **Flozic** + Appy Pie dev | COO, CIO, VP Ops, Head of Support | 6-week fixed-price pilot | [campaign](campaigns/01-ai-agents-automation.md) · [proposal](proposals/01-ai-agents-automation.md) |
| 2 | AI-Accelerated Legacy Modernization | Appy Pie dev | CIO, CTO, VP Engineering | Free 2-week assessment | [campaign](campaigns/02-legacy-modernization.md) · [proposal](proposals/02-legacy-modernization.md) |
| 3 | Enterprise Data & Knowledge AI (RAG) | Appy Pie dev + Flozic | CDO, Head of Data/KM, CIO | 4-week pilot | [campaign](campaigns/03-data-knowledge-ai.md) · [proposal](proposals/03-data-knowledge-ai.md) |
| 4 | AI Governance, Security & Compliance | Appy Pie services | CISO, CRO, DPO, Compliance | 3-week risk assessment | [campaign](campaigns/04-ai-governance-security.md) · [proposal](proposals/04-ai-governance-security.md) |
| 5 | Industry Solutions (Healthcare · Logistics · Retail) | Appy Pie apps + Flozic + **Pixazo** | CIO, VP Ops, Head of E-commerce | 8-week launch | [campaign](campaigns/05-industry-solutions.md) · [proposal](proposals/05-industry-solutions.md) |
| 6 | Managed Services & App Support | Appy Pie services | CIO, IT Director | Free app health check | [campaign](campaigns/06-managed-services.md) · [proposal](proposals/06-managed-services.md) |
| 7 | Platform, White-Label & AI Creative API | Appy Pie platform + **Pixazo API** + Flozic | Agency founders, CMO, VP Product | Partner kit / API trial | [campaign](campaigns/07-platform-whitelabel-api.md) · [proposal](proposals/07-platform-whitelabel-api.md) |

## Sender plan (9 appypie.es inboxes)

Replace `S01`–`S09` with your real addresses and sender names.

| Inbox | Campaign | Regions |
|---|---|---|
| S01 | 1 · AI Agents & Automation | US, Canada |
| S02 | 1 · AI Agents & Automation | UK, EU, Middle East, Australia |
| S03 | 2 · Legacy Modernization | US, Canada |
| S04 | 2 · Legacy Modernization | UK, EU, Middle East, Singapore |
| S05 | 3 · Data & Knowledge AI | US, UK, EU |
| S06 | 4 · AI Governance | EU, UK first (EU AI Act), then US and Middle East |
| S07 | 5 · Industry: Healthcare, Logistics, Retail | US, UK, Middle East, Spain/LATAM (Spanish copy) |
| S08 | 6 · Managed Services | US, UK, Australia |
| S09 | 7 · Platform / White-label / Pixazo API | Global agencies, SaaS, e-commerce |

**Why one campaign per inbox:** reply handling stays clean, each sender becomes a
recognisable specialist, and a deliverability problem in one campaign doesn't affect the others.

### Sending limits

| Period | Per inbox / day | All 9 inboxes / day | New contacts / day (4-step sequence) |
|---|---|---|---|
| Weeks 1–2 (warm-up) | 10 → 20 | 90 → 180 | ~5 per inbox |
| Weeks 3–4 | 30 | 270 | ~10 per inbox |
| Week 5+ | 40 (max 50) | 360 | ~11 per inbox · ~2,000 new contacts / month |

## Step-by-step setup

### 1. Domain and inbox health (before any sending)
- [ ] SPF, DKIM and DMARC (`p=none` to start) configured on `appypie.es`
- [ ] Custom tracking domain (e.g. `track.appypie.es`) if Apollo open/click tracking is used
- [ ] Each inbox has a real name, profile photo and signature
- [ ] Warm-up enabled for 14+ days (Apollo, Instantly, or a warm-up tool)
- [ ] A landing page or redirect at `appypie.es` pointing to appypie.com so the domain looks legitimate
- [ ] Physical company address and unsubscribe line in every email

### 2. Build lists in Apollo
1. Open each `campaigns/0X-*.md` file and copy the **Apollo search filters** into Apollo People Search.
2. Filter **Email status = Verified** and exclude existing customers and competitors.
3. Save as a list named `C1 – AI Agents`, `C2 – Modernization`, and so on.
4. Start with 400–600 contacts per campaign. Add more only after reply rates are proven.

### 3. Load the sequences in Apollo
1. Connect all 9 `appypie.es` inboxes in Apollo → Settings → Mailboxes.
2. Create one sequence per campaign: 4 automatic email steps (Day 1, 3, 7, 14) plus 2 manual LinkedIn tasks.
3. Paste the copy from the campaign file, map the merge tags to Apollo variables, and assign the inbox(es) from the sender plan.
4. Settings: send on recipient's business days, 8am–5pm in the recipient's time zone, stop on reply, and mark as finished if the recipient opts out.

### 4. Daily routine (15–30 minutes per inbox)
- Reply to every positive or neutral response within 2 business hours
- Send the matching proposal (from `proposals/`) within 48 hours of a discovery call
- Complete the LinkedIn tasks for that day
- Log outcomes in Apollo (Interested / Meeting booked / Not now / Unsubscribe)

## Targets & KPIs

| Metric | Healthy | Action if below |
|---|---|---|
| Bounce rate | < 2% | Re-verify the list; pause the inbox if > 5% |
| Open rate | > 45% | Change subject lines; check spam placement |
| Reply rate | > 3% | Tighten targeting; personalise the first line |
| Positive replies | > 1% | Revisit the offer and pain point |
| Meetings / month (all campaigns) | 25–50 | |
| Proposals / month | 10–20 | |

## 90-day rollout

| Weeks | Focus |
|---|---|
| 1–2 | Domain setup, warm-up, build 7 Apollo lists, finalise proposals with real case studies and pricing |
| 3–4 | Launch campaigns 1, 2 and 7 (fastest to convert). Review daily |
| 5–6 | Launch campaigns 3, 5 and 6. Swap out underperforming subject lines |
| 7–8 | Launch campaign 4. Double the volume of the top 2 campaigns |
| 9–12 | Scale winners, pause losers, turn first pilots into case studies and add them to emails |

## Compliance checklist

- **US (CAN-SPAM):** truthful subject lines, physical address, working opt-out honoured within 10 days.
- **UK/EU (GDPR, PECR):** B2B contacts only, relevant to their role (legitimate interest), clear opt-out,
  honour erasure requests. Keep a legitimate-interest assessment on file.
- **Canada (CASL):** stricter consent rules. Target only contacts whose business email is published and relevant, or skip Canada for cold email.
- Keep a global suppression list and never re-add unsubscribed contacts.

## Before you send: fill these in

- [ ] Real sender names and addresses for S01–S09
- [ ] Company registered address for the footer
- [ ] 2–3 case studies with numbers (one per campaign is ideal)
- [ ] Certifications / partner badges you actually hold
- [ ] Your rate card, so the *suggested* prices in proposals can be finalised
- [ ] Booking link (Calendly / Apollo meetings) for the call-to-action
