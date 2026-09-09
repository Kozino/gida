"use client";

import { useAuth } from "@/lib/AuthContext";
import { PageTitle, EmptyState, SectionCard } from "@/components/DashShell";
import { FileText } from "lucide-react";

export default function Agreement() {
  const { store, user } = useAuth();
  const ten = store.tenancies.find((t) => t.tenantUserId === user?.id);
  const org = store.orgs.find((o) => o.id === ten?.orgId);
  return (
    <div className="max-w-2xl">
      <PageTitle kicker="Documents" title="Agreement" />
      {ten ? (
        <SectionCard title="Tenancy summary" action={<FileText className="text-teal-700" size={18} />}>
          <article className="whitespace-pre-wrap text-sm leading-relaxed text-teal-900">
            {`Lodge: ${org?.name}
Tenant: ${user?.name}
Period: ${ten.startDate} to ${ten.endDate}

${org?.notes || "Full PDF agreement is issued after owner approval. Policy text is configured by the lodge — Gida does not set forfeiture percentages."}

This is an on-screen copy for the MVP. Production will generate a PDF via the owner's template.`}
          </article>
        </SectionCard>
      ) : (
        <EmptyState icon={FileText} title="No tenancy yet" description="Your agreement will appear here once a tenancy is active." />
      )}
    </div>
  );
}
