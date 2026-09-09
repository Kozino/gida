"use client";

import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { PageTitle, Pill, EmptyState, SectionCard, statusTone } from "@/components/DashShell";
import { ClipboardCheck } from "lucide-react";

export default function CareApps() {
  const { store, org, user, patch } = useAuth();
  const apps = store.applications.filter((a) => a.orgId === org?.id);

  return (
    <div>
      <PageTitle kicker="Review" title="Caretaker review" subtitle="Confirm signed applications on the ground before the owner approves." />
      {apps.length === 0 ? (
        <EmptyState icon={ClipboardCheck} title="No applications yet" />
      ) : (
        <div className="space-y-3">
          {apps.map((a) => (
            <SectionCard key={a.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-teal-950">{a.applicantName}</p>
                  <Pill tone={statusTone(a.status)}>{a.status.replace(/_/g, " ")}</Pill>
                </div>
                <button
                  className="btn-secondary"
                  disabled={a.status !== "signed"}
                  onClick={() =>
                    patch((s) => {
                      const x = s.applications.find((y) => y.id === a.id);
                      if (x && x.status === "signed") x.status = "caretaker_review";
                      s.audit.push({
                        id: uid("aud"),
                        orgId: org?.id,
                        actorId: user!.id,
                        action: "application.caretaker_ok",
                        detail: a.id,
                        createdAt: nowIso(),
                      });
                    })
                  }
                >
                  Mark reviewed for owner
                </button>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
