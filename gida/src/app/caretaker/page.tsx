"use client";

import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { PageTitle, Pill, EmptyState, SectionCard, statusTone } from "@/components/DashShell";
import { KeyRound, Sparkles } from "lucide-react";

export default function Tokens() {
  const { store, org, user, patch } = useAuth();
  const tokens = store.tokens.filter((t) => t.orgId === org?.id);
  const prop = store.properties.find((p) => p.orgId === org?.id);
  const apps = store.applications.filter((a) => a.orgId === org?.id && a.status !== "active" && a.status !== "rejected");

  if (!org) return <EmptyState icon={KeyRound} title="No organisation on this staff account" />;

  function issue() {
    if (!org) return;
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    patch((s) => {
      s.tokens.push({
        id: uid("tok"),
        orgId: org.id,
        propertyId: prop?.id || "",
        code,
        feePaid: true,
        issuedBy: user!.id,
        createdAt: nowIso(),
        expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
      });
    });
  }

  return (
    <div>
      <PageTitle
        kicker="Yard"
        title="Visit tokens"
        subtitle={
          <>
            Confirm the lodge&apos;s token fee off-platform, then issue a code. Demo open code:{" "}
            <span className="font-mono font-semibold text-teal-950">NG7K2M</span>
          </>
        }
        action={
          <button className="btn-accent" onClick={issue} disabled={org.verification !== "verified"}>
            <KeyRound size={15} /> Issue token
          </button>
        }
      />
      {org.verification !== "verified" && (
        <p className="mb-6 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">Lodge not verified — tokens disabled.</p>
      )}
      {tokens.length === 0 ? (
        <EmptyState icon={KeyRound} title="No tokens issued yet" description="Issue a visit token to let a prospective tenant view the lodge and apply." />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {tokens.map((t) => (
            <div key={t.id} className="card-hover card p-6">
              <p className="font-mono text-3xl tracking-widest text-teal-950">{t.code}</p>
              <div className="mt-3">
                <Pill tone={t.usedBy ? "slate" : "emerald"}>{t.usedBy ? "Used" : "Open"}</Pill>
              </div>
              <p className="mt-3 text-xs text-teal-800/70">Fee marked paid · expires in 7 days</p>
            </div>
          ))}
        </div>
      )}

      <SectionCard title="Waiting on you" subtitle="Applications needing caretaker review" className="mt-10" padded={apps.length === 0}>
        {apps.length === 0 ? (
          <EmptyState icon={Sparkles} title="Nothing pending" description="New applications will show up here for review." />
        ) : (
          <div className="divide-y divide-teal-900/5">
            {apps.map((a) => (
              <div key={a.id} className="list-row">
                <p className="text-sm font-medium text-teal-950">{a.applicantName}</p>
                <Pill tone={statusTone(a.status)}>{a.status.replace(/_/g, " ")}</Pill>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
