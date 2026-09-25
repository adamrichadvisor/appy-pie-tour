# Connect Gmail to send real emails (≈10 min, free)

This lets the tool send campaign emails **through your own Gmail**, straight from the
page — no backend. You create a Google "OAuth Client ID" once and send me that one value.

---

## Step 1 — Open Google Cloud Console
Go to **https://console.cloud.google.com** and sign in with the Gmail you want to send from
(e.g. `kasibkhan13@gmail.com`). Accept the terms if asked.

## Step 2 — Create a project
Top bar → project dropdown → **New Project** → name it `Vantage` → **Create** → then make
sure it's selected in the top bar.

## Step 3 — Enable the Gmail API
Left menu → **APIs & Services → Library** → search **Gmail API** → click it → **Enable**.

## Step 4 — Set up the consent screen
Left menu → **APIs & Services → OAuth consent screen**:
1. User type: **External** → **Create**
2. App name: `Vantage`, User support email: your email, Developer email: your email → **Save and continue**
3. Scopes: skip (Save and continue)
4. **Test users → Add users** → add every Gmail that will send (e.g. `kasibkhan13@gmail.com`, `adam@appypiellp.com`) → **Save and continue**
5. Back to dashboard

> It stays in "Testing" mode — that's fine. Your added test users can send right away.
> (Sending for the general public later needs Google's app verification.)

## Step 5 — Create the OAuth Client ID
Left menu → **APIs & Services → Credentials** → **Create Credentials → OAuth client ID**:
1. Application type: **Web application**
2. Name: `Vantage Web`
3. **Authorized JavaScript origins → Add URI** → paste **exactly**:
   ```
   https://adamrichadvisor.github.io
   ```
4. **Create**

A box pops up with your **Client ID** — it ends in **`.apps.googleusercontent.com`**.

## Step 6 — Send me the Client ID
**Copy that Client ID and paste it to me in the chat.** (It's safe to share — it's a public
identifier, and only works from your own site's origin.)

I'll put it into the tool and deploy. Then in **Smart Send**:
- Mode → **Send REAL email via Gmail**
- Click **Connect Gmail** → approve (if you see "Google hasn't verified this app", click
  **Advanced → Continue** — that's expected in Testing mode)
- **Start** → real emails go out from your Gmail ✅

---

### Honest notes
- **Open/reply tracking** isn't available for real Gmail sends (only Simulate mode shows those).
- Gmail limits ~500 emails/day (free) / 2,000 (Workspace); sending too fast can pause your account.
- Cold email must follow CAN-SPAM/GDPR — real unsubscribe, your address, and only contact
  people you're allowed to. You're responsible for lawful use.
