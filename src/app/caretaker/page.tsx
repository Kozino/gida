"use client";

import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { PageTitle, Pill } from "@/components/DashShell";

export default function Tokens() {
  const { store, org, user, patch } = useAuth();
  const tokens = store.tokens.filter((t) => t.orgId === org?.id);
  const prop = store.properties.find((p) => p.orgId === org?.id);
  const apps = store.applications.filter((a) => a.orgId === org?.id);

  if (!org) return <p>No organisation on this staff account.</p>;

  function issue() {
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
        action={
          <button className="btn-accent" onClick={issue} disabled={org.verification !== "verified"}>
            Issue token
          </button>
        }
      />
      <p className="mb-6 max-w-2xl text-sm text-teal-800">
        Confirm the lodge’s token fee off-platform, then issue a code. Demo open code:{" "}
        <span className="font-mono font-bold">NG7K2M</span>
      </p>
      {org.verification !== "verified" && (
        <p className="mb-4 rounded-xl bg-amber-50 p-3 text-sm">Lodge not verified — tokens disabled.</p>
      )}
      <div className="grid gap-4 md:grid-cols-3">
        {tokens.map((t) => (
          <div key={t.id} className="card p-6">
            <p className="font-mono text-3xl tracking-widest text-teal-950">{t.code}</p>
            <div className="mt-3">
              <Pill tone={t.usedBy ? "slate" : "teal"}>{t.usedBy ? "Used" : "Open"}</Pill>
            </div>
            <p className="mt-3 text-xs text-teal-800/70">Fee marked paid · expires in 7 days</p>
          </div>
        ))}
      </div>
      <h2 className="mt-10 font-semibold">Waiting on you</h2>
      <ul className="mt-3 space-y-2">
        {apps.map((a) => (
          <li key={a.id} className="card flex justify-between p-4 text-sm">
            {a.applicantName}
            <Pill tone="amber">{a.status.replace("_", " ")}</Pill>
          </li>
        ))}
      </ul>
    </div>
  );
}
