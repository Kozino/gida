"use client";

import Link from "next/link";
import { PublicNav } from "@/components/Shell";
import { useAuth } from "@/lib/AuthContext";

export default function Browse() {
  const { store } = useAuth();
  const listed = store.orgs.filter(
    (o) => o.listed && o.verification === "verified" && o.status === "active"
  );

  return (
    <div>
      <PublicNav />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-4xl">Verified lodges only</h1>
        <p className="mt-2 text-ink-700">
          If an operator is not on this list, they have not passed Gida KYC. Do not pay them
          through unofficial agents.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {listed.map((o) => {
            const props = store.properties.filter((p) => p.orgId === o.id && p.published);
            return (
              <Link key={o.id} href={`/browse/${o.slug}`} className="card block p-6 hover:ring-1 hover:ring-ink-900/10">
                <p className="badge bg-sage-100 text-sage-700">Verified · {o.type}</p>
                <h2 className="mt-3 font-display text-2xl">{o.name}</h2>
                <p className="text-sm text-ink-600">
                  {o.city}, {o.state}
                </p>
                <p className="mt-2 text-sm">
                  {props.length} published {props.length === 1 ? "property" : "properties"}
                </p>
                <p className="mt-3 text-xs text-ink-600">
                  Rents are shown only when this owner has published figures.
                </p>
              </Link>
            );
          })}
          {listed.length === 0 && (
            <p className="text-ink-600">No verified listings yet. Owners must complete KYC.</p>
          )}
        </div>
      </div>
    </div>
  );
}
