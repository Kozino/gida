"use client";

import { useAuth } from "@/lib/AuthContext";
import { PageTitle, SectionCard } from "@/components/DashShell";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  const { org, patch } = useAuth();
  if (!org) return null;
  return (
    <div className="max-w-2xl">
      <PageTitle kicker="Configuration" title="Payouts & policy" subtitle="Honesty / forfeiture text is yours. Gida does not hardcode a percentage." />
      <SectionCard title="Tenancy policy" action={<SettingsIcon className="text-teal-700" size={18} />}>
        <textarea
          className="input min-h-40"
          defaultValue={
            org.notes ||
            "Honesty policy: false information may end tenancy. Forfeiture of caution or a share of rent only where lodge policy and applicable state law allow."
          }
          onBlur={(e) =>
            patch((s) => {
              const o = s.orgs.find((x) => x.id === org?.id);
              if (o) o.notes = e.target.value;
            })
          }
        />
        <p className="mt-4 text-xs text-teal-800/70">
          Connect Paystack/Flutterwave with env keys on Render/Netlify. Virtual NUBANs per tenant are a v2 add-on.
        </p>
      </SectionCard>
    </div>
  );
}
