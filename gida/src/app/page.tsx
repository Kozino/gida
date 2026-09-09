"use client";

import Link from "next/link";
import { PublicNav } from "@/components/Shell";
import {
  ShieldCheck,
  Building2,
  Wallet,
  BadgeCheck,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  { n: "01", t: "Browse or visit", d: "See verified lodges online or walk the yard with the caretaker on the roster." },
  { n: "02", t: "Pay the token fee", d: "The amount is set by that lodge — never by Gida. Pay only the named caretaker." },
  { n: "03", t: "Get your code", d: "Caretaker confirms payment and issues a one-time token for Apply." },
  { n: "04", t: "Read the terms", d: "Create an account and read this lodge’s tenancy terms before you send rent." },
  { n: "05", t: "Pay rent & upload", d: "Transfer to the lodge account in your portal (not the token account) and upload the alert." },
  { n: "06", t: "Surety & documents", d: "Guarantor, school or work, optional NIN. Honesty policy is the owner’s." },
  { n: "07", t: "Sign", d: "Agreement fills with your room, dates and the rent the owner published." },
  { n: "08", t: "Dual approval", d: "Caretaker reviews, owner signs off, PDF issued. Occupancy updates live." },
  { n: "09", t: "Renew from your phone", d: "Returning tenants skip the gate queue. History, receipts, reminders." },
];

const faqs = [
  {
    q: "Do I need a token to apply?",
    a: "Yes. Visit or browse a verified lodge, pay that lodge’s token fee to the rostered caretaker, then enter the code. Tokens are lodge-specific and one-time.",
  },
  {
    q: "Why don’t I see rent amounts here?",
    a: "Gida never hardcodes prices. Each verified owner publishes first occupancy, renewal, caution and token in their admin. If a card says “Not published”, the owner has not released figures yet.",
  },
  {
    q: "Can an unverified landlord appear in Browse?",
    a: "No. Organisations stay hidden until Gida ops confirm KYC. That is the product, not a setting.",
  },
  {
    q: "I’m already a resident.",
    a: "Use Tenant sign-in. You’ll see tenancy dates, payment history, repairs and renewal. Parents can be invited as sponsors to pay only.",
  },
  {
    q: "What if someone lies on the form?",
    a: "The lodge’s honesty policy applies. Gida does not set a forfeiture percentage — owners configure policy within applicable state law.",
  },
  {
    q: "Is this free for landlords?",
    a: "No. Gida is paid software. See Pricing. Listings are not a free classifieds board.",
  },
];

export default function Home() {
  return (
    <div className="bg-sand text-teal-950">
      <div className="bg-teal-950 px-4 py-2 text-center text-xs font-medium text-amber-200">
        Intake for verified lodges is open · Owners must pass KYC before they are listed
      </div>
      <PublicNav />

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="badge bg-teal-100 text-teal-900">Comfortable living. A place to thrive.</p>
            <h1 className="mt-5 font-display text-[2.6rem] leading-[1.1] text-teal-950 md:text-6xl">
              Premium lodges, one honest path from visit to signed tenancy.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-teal-900/80">
              Gida is the operating system behind verified houses, hostels and student lodges in
              Nigeria. Published fees belong to the owner. Caretaker-led intake. Tenants and staff
              each get a real dashboard — not a WhatsApp group.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" href="/browse">
                Browse rooms <ArrowRight size={16} />
              </Link>
              <Link className="btn-accent" href="/apply">
                Apply with token
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 text-sm">
              {[
                ["Verified", "owners only"],
                ["24/7", "gate workflow"],
                ["100%", "online apply"],
              ].map(([a, b]) => (
                <div key={a} className="rounded-2xl bg-white/70 p-3 ring-1 ring-teal-900/10">
                  <p className="font-display text-2xl text-teal-900">{a}</p>
                  <p className="text-teal-800/70">{b}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/hero-lodge.jpg"
              alt="Lodge exterior"
              className="h-[420px] w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-teal-900/10 md:h-[520px]"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Safe & secure</p>
              <p className="mt-1 text-sm text-teal-900">
                Token-gated intake · transparent pricing · renew online with receipts and history
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-teal-900/10 bg-white py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-4 text-sm font-medium text-teal-800">
          {["No agents / third parties", "Official WhatsApp only", "KYC before listing", "NDPR-aware files"].map(
            (t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-600" /> {t}
              </span>
            )
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">About Gida</p>
        <h2 className="mt-2 max-w-3xl font-display text-4xl">
          Student lodges and compounds built for calm, secure living — software that matches how
          the yard actually runs.
        </h2>
        <p className="mt-4 max-w-2xl text-teal-900/80">
          Browse rooms, collect a caretaker token, apply from your phone. You read the tenancy
          terms before you pay, upload your receipt, then sign. Caretaker and landlord approve.
          No agents, no surprise tiers.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Safe & secure", d: "Verified operators, rostered caretakers, gate log." },
            { icon: Wallet, t: "Transparent pricing", d: "First year & renewal published by the owner — or not shown." },
            { icon: BadgeCheck, t: "Simple steps", d: "Token, apply, sign, review. Always know what’s next." },
            { icon: Phone, t: "Renew online", d: "Receipts, reminders, history. Parents can pay as sponsors." },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <x.icon className="text-amber-600" size={22} />
              <h3 className="mt-3 font-semibold">{x.t}</h3>
              <p className="mt-2 text-sm text-teal-800/80">{x.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          <strong>Honesty policy.</strong> False, misleading or incomplete information may end the
          application or tenancy. Where lodge policy and applicable law provide for it, a share of
          rent or caution may be forfeited — the percentage is the owner’s, not Gida’s.
        </div>
      </section>

      <section className="bg-teal-950 py-20 text-teal-50">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Choose your path</p>
          <h2 className="mt-2 font-display text-4xl">Not sure where to start?</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                href: "/browse",
                t: "I want to see rooms first",
                d: "Photos, availability and published fees on verified lodges. No login.",
                c: "Browse rooms",
              },
              {
                href: "/apply",
                t: "I have a token, ready to apply",
                d: "Enter the caretaker code, create an account, submit from your phone.",
                c: "Start application",
              },
              {
                href: "/login",
                t: "I already have an account",
                d: "Sign in with email. Renewals, rent and repairs live in your dashboard.",
                c: "Tenant / staff login",
              },
            ].map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <h3 className="font-display text-2xl">{p.t}</h3>
                <p className="mt-3 text-sm text-teal-100/80">{p.d}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
                  {p.c} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-teal-200/80">
            No agents / third parties. Communicate only with lodge management using official
            contacts on this site. Applications are processed only through the portal.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Our lodges</p>
        <h2 className="mt-2 font-display text-4xl">Verified operators. One standard of care.</h2>
        <p className="mt-3 max-w-2xl text-teal-800/80">
          Demo listing: North Gate Residences (Nsukka). More appear only after KYC. Rents show
          when the owner publishes them.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              img: "/images/hero-lodge.jpg",
              name: "Cedar House",
              tag: "Quiet. Secure. Academic.",
              slug: "north-gate",
            },
            {
              img: "/images/courtyard.jpg",
              name: "Palm Court",
              tag: "Comfort. Community. Care.",
              slug: "north-gate",
            },
          ].map((l) => (
            <article key={l.name} className="card overflow-hidden">
              <img src={l.img} alt={l.name} className="h-64 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                  North Gate Residences
                </p>
                <h3 className="mt-1 font-display text-3xl">{l.name}</h3>
                <p className="mt-1 text-teal-800/80">{l.tag}</p>
                <p className="mt-3 text-sm text-teal-800">
                  First occupancy & renewal — published by owner in admin
                </p>
                <div className="mt-5 flex gap-3">
                  <Link className="btn-primary" href={`/browse/${l.slug}`}>
                    Explore lodge
                  </Link>
                  <Link className="btn-secondary" href="/browse">
                    View rooms
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Simple process</p>
          <h2 className="mt-2 font-display text-4xl">From visit to review, how intake works</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-teal-900/10 p-5">
                <p className="font-display text-2xl text-amber-600">{s.n}</p>
                <h3 className="mt-2 font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm text-teal-800/80">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Gallery</p>
        <h2 className="mt-2 font-display text-4xl">See where you’ll live</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["/images/hero-lodge.jpg", "Front elevation"],
            ["/images/courtyard.jpg", "Courtyard & water"],
            ["/images/room-ensuite.jpg", "Furnished ensuite"],
            ["/images/gate-security.jpg", "Gate & security"],
          ].map(([src, cap]) => (
            <figure key={cap} className="overflow-hidden rounded-2xl">
              <img src={src} alt={cap} className="h-44 w-full object-cover md:h-56" />
              <figcaption className="bg-teal-950 px-3 py-2 text-xs text-teal-100">{cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-teal-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Reviews</p>
          <h2 className="mt-2 font-display text-4xl">Trusted on campus</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "I browsed rooms on my phone, applied with the token, and tracked approval without chasing anyone at the gate.",
              "Renewing online saved me during exams. The dashboard shows when tenancy ends and every receipt.",
              "Clear process. I knew first-year vs renewal before I applied — the owner published it, Gida didn’t invent it.",
            ].map((q) => (
              <blockquote key={q} className="rounded-3xl bg-white/10 p-6 text-sm leading-relaxed">
                <p className="text-amber-300">★★★★★</p>
                <p className="mt-3 text-teal-50">“{q}”</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Location</p>
            <h2 className="mt-2 font-display text-4xl">Minutes from campus</h2>
            <ul className="mt-6 space-y-3 text-teal-900/85">
              {["Close to lecture halls", "Safe student neighbourhood", "Shared taxi stops", "24/7 lodge security"].map(
                (x) => (
                  <li key={x} className="flex gap-2">
                    <MapPin size={16} className="mt-1 text-amber-600" /> {x}
                  </li>
                )
              )}
            </ul>
            <p className="mt-6 text-sm">
              <Building2 className="mr-2 inline" size={16} />
              North Gate Residences · Nsukka, Enugu. Visit in person — contact the caretaker for a
              walkthrough before you apply.
            </p>
          </div>
          <img src="/images/gate-security.jpg" alt="Gate" className="h-80 w-full rounded-3xl object-cover" />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-4xl">Questions</h2>
          <div className="mt-8 divide-y divide-teal-900/10">
            {faqs.map((f) => (
              <details key={f.q} className="py-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm text-teal-800/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-500 py-16 text-teal-950">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="font-display text-4xl">Your room is waiting</h2>
          <p className="mx-auto mt-3 max-w-xl">
            Browse today, collect your token from the caretaker, finish the application in minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link className="btn-primary" href="/browse">
              Browse rooms
            </Link>
            <Link className="rounded-full bg-teal-950 px-5 py-2.5 text-sm font-semibold text-white" href="/apply">
              Enter token
            </Link>
            <Link className="btn-secondary" href="/register">
              Onboard as owner
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-teal-950 px-4 py-12 text-sm text-teal-200">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6">
          <div>
            <p className="font-display text-2xl text-white">Gida</p>
            <p className="mt-2 max-w-sm">
              Paid lodge & tenancy OS for Nigeria. Not a landlord. Not a free listing site.
            </p>
          </div>
          <div className="flex gap-8">
            <Link href="/how-it-works">How it works</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/trust">Trust</Link>
            <Link href="/login">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
