"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PublicNav } from "@/components/Shell";
import { homeFor, useAuth } from "@/lib/AuthContext";
import { resetStore } from "@/lib/store";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const error = login(email, password);
    if (error) {
      setErr(error);
      return;
    }
    const role = JSON.parse(localStorage.getItem("gida.store.v1") || "{}");
    const u = role.users?.find((x: { id: string }) => x.id === role.sessionUserId);
    router.push(homeFor(u?.role));
  }

  return (
    <div>
      <PublicNav />
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-3xl">Sign in</h1>
        <p className="mt-2 text-sm text-ink-600">
          Demo passwords are <code>demo</code>. Reset local data if you get stuck.
        </p>
        <form onSubmit={onSubmit} className="card mt-6 space-y-4 p-6">
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
          {err && <p className="text-sm text-red-700">{err}</p>}
          <button className="btn-primary w-full" type="submit">
            Continue
          </button>
        </form>
        <div className="mt-6 space-y-1 text-sm text-ink-700">
          <p>admin@gida.ng — platform</p>
          <p>owner@gida.ng — verified lodge</p>
          <p>pending@gida.ng — awaiting KYC</p>
          <p>caretaker@gida.ng · tenant@gida.ng</p>
        </div>
        <div className="mt-4 flex gap-3 text-sm">
          <Link className="text-sage-700" href="/register">
            Create owner account
          </Link>
          <button
            className="text-ink-600 underline"
            onClick={() => {
              resetStore();
              location.reload();
            }}
          >
            Reset demo data
          </button>
        </div>
      </div>
    </div>
  );
}
