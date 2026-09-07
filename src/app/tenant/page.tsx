"use client";

import { useAuth } from "@/lib/AuthContext";
import { formatMoney } from "@/lib/ids";
import Link from "next/link";

export default function TenantHome() {
  const { store, user } = useAuth();
  const ten = store.tenancies.find((t) => t.tenantUserId === user?.id && t.active);
  const apps = store.applications.filter((a) => a.tenantUserId === user?.id);
  const org = store.orgs.find((o) => o.id === ten?.orgId || o.id === user?.orgId);
  const room = store.rooms.find((r) => r.id === ten?.roomId);

  return (
    <div>
      <h1 className="font-display text-3xl">Hello, {user?.name}</h1>
      {ten ? (
        <div className="card mt-6 p-6">
          <p className="text-sm text-ink-600">{org?.name}</p>
          <p className="font-semibold">
            Room {room?.block} {room?.name}
          </p>
          <p className="mt-2 text-sm">
            Tenancy {ten.startDate} → {ten.endDate}
          </p>
          <p className="text-sm">Rent on file: {formatMoney(ten.rent)}</p>
          <p className="mt-2 text-xs text-ink-600">
            Pay only the account shown under Pay & receipts. Token account is different.
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm">
          No active tenancy.{" "}
          <Link className="underline" href="/browse">
            Browse verified lodges
          </Link>{" "}
          and apply with a token.
        </p>
      )}
      <h2 className="mt-8 font-semibold">Applications</h2>
      <ul className="mt-2 space-y-2 text-sm">
        {apps.map((a) => (
          <li key={a.id} className="card p-3 capitalize">
            {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
