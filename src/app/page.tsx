"use client";

import Link from "next/link";
import { PublicNav } from "@/components/Shell";
import { ShieldCheck, Building2, Users, Wallet, BadgeCheck, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <PublicNav />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="badge bg-sage-100 text-sage-700">Paid software · Nigeria</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink-950 md:text-5xl">
            Run lodges, hostels and compounds without the WhatsApp chaos.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-700">
            Gida is a multi-tenant operating system for owners. You onboard, complete KYC, and
            only go live after platform verification. Tenants apply with caretaker tokens, pay
            into accounts you configure, and manage tenancy from their own dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-primary" href="/register">
              Onboard as owner
            </Link>
            <Link className="btn-secondary" href="/browse">
              Browse verified listings
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-600">
            Unverified owners are never listed. No public rent until you publish it.
          </p>
        </div>
        <div className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">
            Intake you control
          </p>
          <ol className="mt-4 space-y-3 text-sm">
            {[
              "Owner registers organisation and submits KYC",
              "Gida reviews NIN / CAC / payout account",
              "Only then: public mini-site + rooms",
              "Caretaker issues visit tokens",
              "Applicant reads your terms, pays your accounts, signs",
              "You and caretaker approve. PDF tenancy issued",
            ].map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink-950 text-xs text-white">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-ink-900/10 bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              t: "Verified owners only",
              d: "Listings stay dark until KYC is approved. Cuts fake landlords and agent scams.",
            },
            {
              icon: Users,
              t: "Roles that match the yard",
              d: "Owner, manager, caretaker, accountant, security, tenant, and paying sponsor/parent.",
            },
            {
              icon: Wallet,
              t: "Your figures, your banks",
              d: "Token, rent, caution and service charge are never hardcoded. You set them per lodge.",
            },
            {
              icon: Building2,
              t: "Rooms and bedspaces",
              d: "Whole rooms or shared beds, gender policies, blocks, session or monthly cycles.",
            },
            {
              icon: BadgeCheck,
              t: "Surety & honesty policy",
              d: "Guarantor details, e-sign, configurable forfeiture — aligned to how Nigerian lodges actually work.",
            },
            {
              icon: MessageCircle,
              t: "Caretaker OS",
              d: "Tokens, gate notes, NEPA/water tickets, inspections, WhatsApp-style broadcasts.",
            },
          ].map((f) => (
            <div key={f.t} className="card p-6">
              <f.icon className="text-sage-600" size={22} />
              <h3 className="mt-3 font-semibold text-ink-950">{f.t}</h3>
              <p className="mt-2 text-sm text-ink-700">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl text-ink-950">Built for how money moves here</h2>
        <p className="mt-3 max-w-2xl text-ink-700">
          Bank transfer with receipt upload, Paystack, Flutterwave, Moniepoint and OPay when you
          connect them. Separate accounts for token vs rent. Caution fee ledger. Parent/sponsor
          can pay without living in the room.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn-primary" href="/pricing">
            See plans
          </Link>
          <Link className="btn-secondary" href="/how-it-works">
            Full workflow
          </Link>
        </div>
      </section>

      <footer className="border-t border-ink-900/10 bg-ink-950 px-4 py-10 text-sm text-white/70">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4">
          <p>© {new Date().getFullYear()} Gida. Not a landlord. Software for verified operators.</p>
          <div className="flex gap-4">
            <Link href="/trust">NDPR & trust</Link>
            <Link href="/login">Staff login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
