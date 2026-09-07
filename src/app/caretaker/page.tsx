"use client";

import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";

export default function Tokens() {
  const { store, org, user, patch } = useAuth();
  const tokens = store.tokens.filter((t) => t.orgId === org?.id);
  const prop = store.properties.find((p) => p.orgId === org?.id);

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
      <h1 className="font-display text-3xl">Visit tokens</h1>
      <p className="mt-2 text-sm text-ink-700">
        Confirm the token fee (amount set by owner) off-platform, then issue a code. Never share
        the rent account here.
      </p>
      <button className="btn-primary mt-4" onClick={issue} disabled={org.verification !== "verified"}>
        Issue token
      </button>
      {org.verification !== "verified" && (
        <p className="mt-2 text-sm text-amber-800">Lodge not verified — tokens disabled.</p>
      )}
      <ul className="mt-6 space-y-2">
        {tokens.map((t) => (
          <li key={t.id} className="card p-4 font-mono text-lg">
            {t.code}{" "}
            <span className="font-sans text-sm text-ink-600">{t.usedBy ? "used" : "open"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
