"use client";

import { PublicNav } from "@/components/Shell";

export default function Trust() {
  return (
    <div>
      <PublicNav />
      <article className="mx-auto max-w-3xl px-4 py-16 text-ink-800">
        <h1 className="font-display text-4xl text-ink-950">Trust, KYC and NDPR</h1>
        <p className="mt-4">
          Gida is software. We are not a landlord and we do not hold rent unless you connect a
          payments provider. Funds move to accounts the verified owner names.
        </p>
        <h2 className="mt-8 font-semibold text-ink-950">Before a lodge is listed</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>Owner identity (NIN) and optional CAC for companies</li>
          <li>Payout account name matching the organisation</li>
          <li>State, city, and at least one property with unpublished rooms</li>
          <li>Staff approval in the platform console</li>
        </ul>
        <h2 className="mt-8 font-semibold text-ink-950">Anti-scam</h2>
        <p className="mt-2 text-sm">
          Official contacts live on the lodge page. Token codes come from the caretaker on the
          roster. Applications are processed only in this portal. Unverified orgs cannot appear
          in Browse.
        </p>
        <h2 className="mt-8 font-semibold text-ink-950">Data</h2>
        <p className="mt-2 text-sm">
          Tenant files are for tenancy administration. Export and deletion follow NDPR when
          Supabase production is connected. Do not share applicant data across lodges unless they
          opt into the future arrears network.
        </p>
      </article>
    </div>
  );
}
