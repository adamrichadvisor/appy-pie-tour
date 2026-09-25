# Daily Lead Run (Apollo, read-only)

The procedure every daily run follows. Goal: **~108 new, need-verified enterprise
contacts per day** across the 7 campaigns, ready for the 9 `appypie.es` inboxes and
timed to each company's local morning.

## Hard rules

1. **Apollo is read-only.** Allowed: `apollo_search_organizations`, `apollo_search_people`,
   `apollo_get_job_postings`, `apollo_enrich_organization`, `apollo_enrich_person`,
   `apollo_bulk_enrich_people`. **Never** create or update contacts, lists or sequences,
   because Apollo is running other campaigns.
2. **No verified need → no lead.** Every company needs a need score ≥ 2 with a source link.
3. **Verified emails only.** Skip guessed, unavailable or catch-all emails.
4. **No duplicates.** Check every earlier file in `leads/` and `leads/suppression.csv`
   (existing clients, competitors, unsubscribes, bounces). Never contact the same company
   twice in 90 days from any campaign.
5. **Nothing is sent** until the user approves the day's file (until they say otherwise).

## Daily quota

| Campaign | Inbox(es) | New contacts / day | Max per company |
|---|---|---|---|
| C1 AI Agents & Automation | S01 (Americas), S02 (rest of world) | 24 | 2 |
| C2 Legacy Modernization | S03 (Americas), S04 (rest of world) | 24 | 2 |
| C3 Data & Knowledge AI | S05 | 12 | 2 |
| C4 AI Governance | S06 | 12 | 2 |
| C5 Industry Solutions | S07 | 12 | 2 |
| C6 Managed Services | S08 | 12 | 2 |
| C7 Partner / White-label / Pixazo API | S09 | 12 | 2 |

Targeting (titles, sizes, industries, regions, keywords) for each campaign is in
`campaigns/0X-*.md` → "Apollo search filters".

## Steps

1. **Find companies.** Run `apollo_search_organizations` with the campaign filters. Rotate
   regions and industries daily so the same segment isn't used up.
2. **Check need** for each candidate company (job postings via `apollo_get_job_postings`,
   technologies and headcount growth from Apollo, plus a public web check for news or app store
   ratings). Score it:
   - **3 = direct:** job post or announcement in the last 90 days that matches the service
     (e.g. "RPA developer", "COBOL", "AI governance", "migration", "mobile app rebuild")
   - **2 = strong indirect:** matching legacy tech stack, app rating < 3.5 or no update in
     12+ months, headcount growth > 15%, recent funding or expansion
   - **1 = fits the profile only:** **reject**
3. **Find people.** Use `apollo_search_people` at qualifying companies with the campaign's titles,
   then enrich to get verified emails. Pick 1–2 people per company (decision-maker + influencer).
4. **Write the first line.** One sentence built from the need signal, e.g. *"Saw {{company}} is
   hiring three RPA developers for its Manila service centre..."*. Factual and verifiable, no flattery.
5. **Assign the inbox and send window** from the tables below.
6. **Save** `leads/YYYY-MM-DD.csv` and `leads/YYYY-MM-DD-report.md`, commit and push to the
   working branch, then post a short summary to the user.

## Time zone send windows (recipient local 9–11am, Mon–Thu)

| Region | Send window (UTC) | Notes |
|---|---|---|
| Australia / New Zealand / Singapore | 23:00–01:00 (day before, UTC) | |
| UAE / Qatar / Gulf | 05:00–07:00 | Mon–Fri working week |
| Saudi Arabia | 06:00–08:00 | **Sun–Thu** working week |
| UK / Ireland / Portugal | 08:00–10:00 | |
| Central Europe | 07:00–09:00 | |
| US East / Canada East | 13:00–15:00 | |
| US Central | 14:00–16:00 | |
| US West / Canada West | 16:00–18:00 | |

Use the company HQ, or the contact's own location if Apollo has it. Shift by one hour during
daylight-saving changes.

## Output CSV columns

`date, campaign, inbox, company, domain, country, city, timezone, send_window_utc,
employees, industry, need_score, need_signal, need_source_url, contact_name, title,
email, email_status, linkedin_url, first_line, proposal_file, status`

`status` starts as `pending_approval`. After approval it becomes `approved` → `sent` →
`replied_positive` / `replied_negative` / `bounced` / `unsubscribed`.

## Daily report (leads/YYYY-MM-DD-report.md)

- Contacts per campaign vs quota, and why any campaign fell short
- Companies rejected for weak need, with counts by reason
- Top 5 highest-need accounts of the day (score 3) with their signals
- Apollo credits used
- Proposals to prepare: any positive replies logged, and which proposal file to use
