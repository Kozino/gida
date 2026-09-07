"use client";

import Link from "next/link";
import { PublicNav } from "@/components/Shell";

const plans = [
  {
    name: "Starter",
    who: "1–8 rooms, single house",
    env: "NEXT_PUBLIC_PLAN_STARTER",
    points: ["Owner + 1 caretaker", "Token intake", "Receipts & e-sign", "Not listed until verified"],
  },
  {
    name: "Lodge",
    who: "9–40 rooms",
    env: "NEXT_PUBLIC_PLAN_LODGE",
    points: ["Staff roles", "Bedspaces", "Caution ledger", "Public mini-site"],
    featured: true,
  },
  {
    name: "Estate",
    who: "Multi-block / several lodges",
    env: "NEXT_PUBLIC_PLAN_ESTATE",
    points: ["Accountant export", "Utility splits", "Audit log", "Priority onboarding"],
  },
];

function priceFor(key: string) {
  if (typeof process === "undefined") return null;
  const v = process.env[key];
  return v && v.trim() ? v : null;
}

export default function Pricing() {
  return (
    <div>
      <PublicNav />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="font-display text-4xl text-ink-950">Paid software. No free listings.</h1>
        <p className="mt-3 max-w-2xl text-ink-700">
          Amounts are configured per deployment (or quoted). We do not hardcode Naira figures in
          the product. Onboarding and KYC are required before any lodge is public.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((p) => {
            const amount = priceFor(p.env);
            return (
              <div
                key={p.name}
                className={`card p-6 ${p.featured ? "ring-2 ring-sage-600" : ""}`}
              >
                <p className="text-sm font-semibold text-sage-700">{p.name}</p>
                <p className="mt-2 font-display text-3xl text-ink-950">
                  {amount ?? "Talk to sales"}
                </p>
                <p className="mt-1 text-sm text-ink-600">{p.who}</p>
                <ul className="mt-6 space-y-2 text-sm text-ink-700">
                  {p.points.map((x) => (
                    <li key={x}>· {x}</li>
                  ))}
                </ul>
                <Link href="/register" className="btn-primary mt-8 w-full">
                  Start owner onboarding
                </Link>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-ink-600">
          Add-ons billed separately: WhatsApp API, SMS, payment processor fees, concierge photo
          onboarding, custom domain. Optional collection share only on Estate contracts.
        </p>
      </div>
    </div>
  );
}
