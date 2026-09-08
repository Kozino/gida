"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PublicNav } from "@/components/Shell";
import { useAuth } from "@/lib/AuthContext";
import { formatMoney } from "@/lib/ids";

export default function LodgePage() {
  const { slug } = useParams<{ slug: string }>();
  const { store } = useAuth();
  const org = store.orgs.find((o) => o.slug === slug);

  if (!org || !org.listed || org.verification !== "verified") {
    return (
      <div>
        <PublicNav />
        <p className="p-12">This organisation is not publicly listed.</p>
      </div>
    );
  }

  const props = store.properties.filter((p) => p.orgId === org.id && p.published);
  const rooms = store.rooms.filter((r) => r.orgId === org.id);

  return (
    <div>
      <PublicNav />
      <div className="relative h-72 md:h-96">
        <img src="/images/hero-lodge.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 mx-auto max-w-6xl px-4 text-white">
          <span className="badge bg-amber-400 text-teal-950">Verified operator</span>
          <h1 className="mt-3 font-display text-5xl">{org.name}</h1>
          <p className="mt-2 text-teal-100">
            {org.address} · {org.city}, {org.state} · WhatsApp {org.whatsapp} · No agents
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">
        {props.map((p) => (
          <div key={p.id} className="card mb-6 p-6">
            <h2 className="font-display text-3xl">{p.name}</h2>
            <p className="mt-2 text-teal-800">{p.description}</p>
            <dl className="mt-6 grid gap-4 text-sm md:grid-cols-4">
              {[
                ["First occupancy", p.firstYearRent],
                ["Renewal", p.renewalRent],
                ["Caution", p.cautionFee],
                ["Token (not rent)", p.tokenFee],
              ].map(([l, v]) => (
                <div key={String(l)} className="rounded-xl bg-sand p-3">
                  <dt className="text-xs uppercase tracking-wide text-teal-700">{l as string}</dt>
                  <dd className="mt-1 font-semibold">{formatMoney(v as number | null)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-teal-800/70">{p.rules}</p>
          </div>
        ))}
        <h3 className="mt-8 font-display text-2xl">Rooms</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {rooms.map((r, i) => (
            <div key={r.id} className="card overflow-hidden">
              <img
                src={i % 2 ? "/images/room-ensuite.jpg" : "/images/courtyard.jpg"}
                alt=""
                className="h-36 w-full object-cover"
              />
              <div className="p-4">
                <p className="font-semibold">
                  {r.block} · {r.name}
                </p>
                <p className="text-sm text-teal-800">
                  {r.occupiedBeds}/{r.beds} beds · {formatMoney(r.rent)}
                </p>
                <p className="mt-2 text-xs">{r.amenities.join(" · ")}</p>
                <p className={`mt-2 text-xs font-semibold ${r.available ? "text-teal-700" : "text-amber-700"}`}>
                  {r.available ? "Available" : "Occupied"}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex gap-3">
          <Link className="btn-primary" href={`/apply?org=${org.slug}`}>
            Apply with token
          </Link>
          <Link className="btn-secondary" href="/how-it-works">
            How intake works
          </Link>
        </div>
      </div>
    </div>
  );
}
