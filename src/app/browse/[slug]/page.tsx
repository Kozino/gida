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
        <p className="p-12">This organisation is not publicly listed (unverified or private).</p>
      </div>
    );
  }

  const props = store.properties.filter((p) => p.orgId === org.id && p.published);
  const rooms = store.rooms.filter((r) => r.orgId === org.id);

  return (
    <div>
      <PublicNav />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="badge bg-sage-100 text-sage-700">Verified operator</p>
        <h1 className="mt-3 font-display text-4xl">{org.name}</h1>
        <p className="text-ink-700">
          {org.address} · {org.city}, {org.state}
        </p>
        <p className="mt-2 text-sm">
          Official WhatsApp: {org.whatsapp || "Set by owner"} · No agents.
        </p>

        {props.map((p) => (
          <div key={p.id} className="card mt-8 p-6">
            <h2 className="font-display text-2xl">{p.name}</h2>
            <p className="mt-2 text-sm text-ink-700">{p.description}</p>
            <dl className="mt-4 grid gap-3 text-sm md:grid-cols-4">
              <div>
                <dt className="text-ink-600">First occupancy</dt>
                <dd>{formatMoney(p.firstYearRent)}</dd>
              </div>
              <div>
                <dt className="text-ink-600">Renewal</dt>
                <dd>{formatMoney(p.renewalRent)}</dd>
              </div>
              <div>
                <dt className="text-ink-600">Caution</dt>
                <dd>{formatMoney(p.cautionFee)}</dd>
              </div>
              <div>
                <dt className="text-ink-600">Token (not rent)</dt>
                <dd>{formatMoney(p.tokenFee)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-ink-600">{p.rules}</p>
          </div>
        ))}

        <h3 className="mt-10 font-semibold">Rooms</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {rooms.map((r) => (
            <div key={r.id} className="card p-4">
              <p className="font-semibold">
                {r.block} · {r.name}
              </p>
              <p className="text-sm text-ink-600">
                {r.beds} bed(s) · {r.occupiedBeds} occupied
              </p>
              <p className="mt-1 text-sm">{formatMoney(r.rent)}</p>
              <p className="mt-2 text-xs">{r.amenities.join(" · ")}</p>
              <p className={`mt-2 text-xs font-semibold ${r.available ? "text-sage-700" : "text-ink-600"}`}>
                {r.available ? "Available" : "Occupied"}
              </p>
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
