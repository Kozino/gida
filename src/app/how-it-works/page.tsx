"use client";

import { PublicNav } from "@/components/Shell";

export default function How() {
  return (
    <div>
      <PublicNav />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl">From visit to signed tenancy</h1>
        <p className="mt-3 text-ink-700">
          Same discipline as a well-run lodge, productised for many owners. Fees are whatever
          that lodge configured — Gida never invents a price.
        </p>
        <ol className="mt-10 space-y-6">
          {[
            ["Owner onboarding", "Create organisation, upload KYC, add payout banks. Listing stays private."],
            ["Platform verification", "Gida staff approve or request more info. Only then can you publish."],
            ["Browse or visit", "Seekers see verified lodges only. Walk-ins meet the caretaker."],
            ["Token", "Caretaker confirms the token fee (your amount) and issues a one-time code."],
            ["Apply & terms", "Applicant creates an account, reads YOUR tenancy terms before paying rent."],
            ["Pay & receipt", "Transfer to the lodge account shown in the portal — not the token account."],
            ["Documents & surety", "NIN optional, school/work, guarantor. Honesty policy you configure."],
            ["Sign", "Agreement filled with room, dates and the rent you published."],
            ["Dual approval", "Caretaker then owner. PDF issued. Occupancy updates."],
            ["Live tenancy", "Renewals, tickets, caution ledger, parent payments."],
          ].map(([t, d], i) => (
            <li key={t} className="card p-5">
              <p className="text-xs font-semibold uppercase text-ink-600">Step {i + 1}</p>
              <h2 className="mt-1 font-semibold">{t}</h2>
              <p className="mt-1 text-sm text-ink-700">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
