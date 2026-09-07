"use client";

import { useAuth } from "@/lib/AuthContext";

export default function Agreement() {
  const { store, user } = useAuth();
  const ten = store.tenancies.find((t) => t.tenantUserId === user?.id);
  const org = store.orgs.find((o) => o.id === ten?.orgId);
  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl">Agreement</h1>
      {ten ? (
        <article className="card mt-6 whitespace-pre-wrap p-6 text-sm leading-relaxed">
          {`TENANCY SUMMARY
Lodge: ${org?.name}
Tenant: ${user?.name}
Period: ${ten.startDate} to ${ten.endDate}

${org?.notes || "Full PDF agreement is issued after owner approval. Policy text is configured by the lodge — Gida does not set forfeiture percentages."}

This is an on-screen copy for the MVP. Production will generate a PDF via the owner’s template.`}
        </article>
      ) : (
        <p className="mt-4 text-sm">No tenancy yet.</p>
      )}
    </div>
  );
}
