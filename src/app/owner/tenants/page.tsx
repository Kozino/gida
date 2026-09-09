"use client";

import { useAuth } from "@/lib/AuthContext";
import { formatMoney } from "@/lib/ids";
import { PageTitle, EmptyState } from "@/components/DashShell";
import { UserRound } from "lucide-react";

export default function TenantsPage() {
  const { store, org } = useAuth();
  const tens = store.tenancies.filter((t) => t.orgId === org?.id);

  return (
    <div>
      <PageTitle kicker="Occupancy" title="Tenants & caution ledger" subtitle={`${tens.length} active tenancies`} />
      {tens.length === 0 ? (
        <EmptyState icon={UserRound} title="No tenants yet" description="Approved applications will create tenancies here automatically." />
      ) : (
        <div className="card overflow-x-auto">
          <table className="table-clean">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Room</th>
                <th>Ends</th>
                <th>Rent</th>
                <th>Caution held</th>
              </tr>
            </thead>
            <tbody>
              {tens.map((t) => {
                const u = store.users.find((x) => x.id === t.tenantUserId);
                const r = store.rooms.find((x) => x.id === t.roomId);
                return (
                  <tr key={t.id}>
                    <td className="font-medium">{u?.name}</td>
                    <td>
                      {r?.block} {r?.name}
                    </td>
                    <td>{t.endDate}</td>
                    <td>{formatMoney(t.rent)}</td>
                    <td>{formatMoney(t.cautionHeld)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
