"use client";

import { useAuth } from "@/lib/AuthContext";
import { formatMoney } from "@/lib/ids";

export default function TenantsPage() {
  const { store, org } = useAuth();
  const tens = store.tenancies.filter((t) => t.orgId === org?.id);
  return (
    <div>
      <h1 className="font-display text-3xl">Tenants & caution ledger</h1>
      <div className="mt-6 overflow-x-auto card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-ink-600">
              <th className="p-3">Tenant</th>
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
                <tr key={t.id} className="border-b border-ink-900/5">
                  <td className="p-3">{u?.name}</td>
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
    </div>
  );
}
