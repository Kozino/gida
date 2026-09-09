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
    <div className="min-h-screen">
      <PublicNav />
      <div className="bg-teal-950 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Rooms</p>
          <h1 className="mt-2 font-display text-5xl">Verified lodges only</h1>
          <p className="mt-3 max-w-xl text-teal-100/80">
            If an operator is not here, they have not passed Gida KYC. Do not pay unofficial agents.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {listed.map((o, i) => {
            const props = store.properties.filter((p) => p.orgId === o.id && p.published);
            const rooms = store.rooms.filter((r) => r.orgId === o.id);
            const img = i % 2 === 0 ? "/images/hero-lodge.jpg" : "/images/courtyard.jpg";
            return (
              <Link key={o.id} href={`/browse/${o.slug}`} className="card overflow-hidden">
                <img src={img} alt="" className="h-56 w-full object-cover" />
                <div className="p-6">
                  <span className="badge bg-teal-100 text-teal-900">Verified · {o.type}</span>
                  <h2 className="mt-3 font-display text-3xl">{o.name}</h2>
                  <p className="text-sm text-teal-800">
                    {o.city}, {o.state} · {props.length} properties · {rooms.length} rooms
                  </p>
                  <p className="mt-3 text-sm text-teal-800/80">
                    Fees display only after the owner publishes them.
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
