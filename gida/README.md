# Gida — lodge & tenancy OS (Nigeria)

Multi-tenant SaaS for house, hostel and lodge owners. **Owners are not listed until platform KYC is verified.** Tenants and caretakers get their own workspaces.

Visual system is independent of Glorious & Praises (ink + sage + sand, Fraunces display).

## Local / preview (no Supabase required)

Demo data lives in `localStorage`. Passwords for seeded users: `demo`

| Email | Role |
|---|---|
| admin@gida.ng | Platform verification |
| owner@gida.ng | Verified lodge |
| pending@gida.ng | Awaiting KYC |
| caretaker@gida.ng | Caretaker |
| tenant@gida.ng | Tenant |

```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 3000
```

## Deploy

- **Netlify:** Next.js runtime. Set env from `.env.example`.
- **Render:** Web service, same start command `npm run build && npm run start`.
- **Supabase:** run `supabase/schema.sql`. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Until those exist, the app uses the local store.

Do not put lodge rents in source. Owners enter fees. SaaS plan amounts optionally via `NEXT_PUBLIC_PLAN_*`.

## MVP included

Owner onboarding + KYC lock, platform verify/list, properties/rooms without hardcoded naira, caretaker tokens, tenant apply, dual approval, payments notes, caution ledger, tickets, staff roles, audit, public browse of **verified only**.
