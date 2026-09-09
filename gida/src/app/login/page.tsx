"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PublicNav } from "@/components/Shell";
import { homeFor, useAuth } from "@/lib/AuthContext";
import { resetStore } from "@/lib/store";

const demos = [
  ["admin@gida.ng", "Platform — verify landlords"],
  ["owner@gida.ng", "Verified lodge owner"],
  ["pending@gida.ng", "Awaiting KYC"],
  ["caretaker@gida.ng", "Issue tokens"],
  ["tenant@gida.ng", "Resident dashboard"],
];

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("tenant@gida.ng");
  const [password, setPassword] = useState("demo");
  const [err, setErr] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const error = login(email, password);
    if (error) {
      setErr(error);
      return;
    }
    const role = JSON.parse(localStorage.getItem("gida.store.v2") || "{}");
    const u = role.users?.find((x: { id: string }) => x.id === role.sessionUserId);
    router.push(homeFor(u?.role));
  }

  return (
    <div className="min-h-screen bg-teal-950">
      <div className="bg-sand">
        <PublicNav />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div className="text-teal-50">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Workspace</p>
          <h1 className="mt-3 font-display text-5xl">Sign in to Gida</h1>
          <p className="mt-4 text-teal-100/80">
            Tenants, caretakers, owners and platform ops each land in their own dashboard. Demo
            password is <strong>demo</strong>.
          </p>
          <div className="mt-8 space-y-2">
            {demos.map(([em, lab]) => (
              <button
                key={em}
                onClick={() => setEmail(em)}
                className="flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-left text-sm hover:bg-white/10"
              >
                <span className="font-mono text-amber-200">{em}</span>
                <span className="text-teal-200">{lab}</span>
              </button>
            ))}
          </div>
        </div>
        <form onSubmit={onSubmit} className="card space-y-4 p-8">
          <div>
            <label className="label">Email</label>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {err && <p className="text-sm text-rose-700">{err}</p>}
          <button className="btn-primary w-full" type="submit">
            Continue
          </button>
          <div className="flex justify-between text-sm">
            <Link href="/register" className="text-teal-800">
              Create account
            </Link>
            <button
              type="button"
              className="text-teal-700 underline"
              onClick={() => {
                resetStore();
                location.reload();
              }}
            >
              Reset demo data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
