"use client";

import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { PageTitle, Pill, EmptyState, SectionCard, statusTone } from "@/components/DashShell";
import { ClipboardList, Check, X } from "lucide-react";

export default function AppsPage() {
  const { store, org, user, patch } = useAuth();
  const apps = [...store.applications.filter((a) => a.orgId === org?.id)].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  if (!org) return null;

  function decide(id: string, ok: boolean) {
    if (!org) return;
    patch((s) => {
      const a = s.applications.find((x) => x.id === id);
      if (!a) return;
      a.status = ok ? "approved" : "rejected";
      if (ok && a.roomId) {
        const room = s.rooms.find((r) => r.id === a.roomId);
        s.tenancies.push({
          id: uid("ten"),
          orgId: org.id,
          propertyId: a.propertyId,
          roomId: a.roomId,
          tenantUserId: a.tenantUserId,
          startDate: new Date().toISOString().slice(0, 10),
          endDate: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
          rent: room?.rent ?? null,
          cautionHeld: null,
          active: true,
        });
        if (room) {
          room.occupiedBeds += 1;
          if (room.occupiedBeds >= room.beds) room.available = false;
        }
        const tu = s.users.find((u) => u.id === a.tenantUserId);
        if (tu) {
          tu.orgId = org.id;
          tu.role = "tenant";
        }
      }
      s.audit.push({
        id: uid("aud"),
        orgId: org.id,
        actorId: user!.id,
        action: ok ? "application.approved" : "application.rejected",
        detail: id,
        createdAt: nowIso(),
      });
    });
  }

  return (
    <div>
      <PageTitle kicker="Pipeline" title="Applications" subtitle={`${apps.length} total applications`} />
      {apps.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No applications yet" description="Applications submitted by prospective tenants will appear here." />
      ) : (
        <div className="space-y-3">
          {apps.map((a) => (
            <SectionCard key={a.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-teal-950">{a.applicantName}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Pill tone={statusTone(a.status)}>{a.status.replace(/_/g, " ")}</Pill>
                    <span className="text-xs text-teal-800/70">surety {a.suretyName || "—"}</span>
                  </div>
                </div>
                {a.status !== "approved" && a.status !== "rejected" && (
                  <div className="flex gap-2">
                    <button className="btn-accent" onClick={() => decide(a.id, true)}>
                      <Check size={15} /> Approve
                    </button>
                    <button className="btn-secondary" onClick={() => decide(a.id, false)}>
                      <X size={15} /> Reject
                    </button>
                  </div>
                )}
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
