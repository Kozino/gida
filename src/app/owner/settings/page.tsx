"use client";

import { useAuth } from "@/lib/AuthContext";

export default function Settings() {
  const { org, patch } = useAuth();
  if (!org) return null;
  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl">Payouts & policy</h1>
      <p className="mt-2 text-sm text-ink-700">
        Honesty / forfeiture text is yours. Gida does not hardcode a percentage.
      </p>
      <textarea
        className="input mt-6 min-h-40"
        defaultValue={org.notes || "Honesty policy: false information may end tenancy. Forfeiture of caution or a share of rent only where lodge policy and applicable state law allow."}
        onBlur={(e) =>
          patch((s) => {
            const o = s.orgs.find((x) => x.id === org?.id);
            if (o) o.notes = e.target.value;
          })
        }
      />
      <p className="mt-4 text-xs text-ink-600">
        Connect Paystack/Flutterwave with env keys on Render/Netlify. Virtual NUBANs per tenant
        are a v2 add-on.
      </p>
    </div>
  );
}
