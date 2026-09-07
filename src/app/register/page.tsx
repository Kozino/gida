"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PublicNav } from "@/components/Shell";
import { useAuth } from "@/lib/AuthContext";
import { Organization } from "@/lib/types";

export default function Register() {
  const { registerOwner, registerTenant } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"owner" | "tenant">("owner");
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    orgName: "",
    type: "lodge" as Organization["type"],
    state: "",
    city: "",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const error =
      mode === "owner"
        ? registerOwner(form)
        : registerTenant({
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
          });
    if (error) {
      setErr(error);
      return;
    }
    router.push(mode === "owner" ? "/owner/onboarding" : "/tenant");
  }

  return (
    <div>
      <PublicNav />
      <div className="mx-auto max-w-lg px-4 py-16">
        <h1 className="font-display text-3xl">Create an account</h1>
        <div className="mt-4 flex gap-2">
          <button
            className={mode === "owner" ? "btn-primary" : "btn-secondary"}
            onClick={() => setMode("owner")}
          >
            I own / manage property
          </button>
          <button
            className={mode === "tenant" ? "btn-primary" : "btn-secondary"}
            onClick={() => setMode("tenant")}
          >
            I am a tenant
          </button>
        </div>
        <form onSubmit={onSubmit} className="card mt-6 space-y-3 p-6">
          <input className="input" placeholder="Full name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
          <input className="input" placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
          <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => set("password", e.target.value)} required />
          {mode === "owner" && (
            <>
              <input className="input" placeholder="Organisation / lodge name" value={form.orgName} onChange={(e) => set("orgName", e.target.value)} required />
              <select className="input" value={form.type} onChange={(e) => set("type", e.target.value as Organization["type"])}>
                <option value="lodge">Student lodge</option>
                <option value="hostel">Hostel</option>
                <option value="house">House</option>
                <option value="compound">Compound</option>
                <option value="estate">Estate</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input className="input" placeholder="State" value={form.state} onChange={(e) => set("state", e.target.value)} required />
                <input className="input" placeholder="City" value={form.city} onChange={(e) => set("city", e.target.value)} required />
              </div>
              <p className="text-xs text-ink-600">
                You will submit KYC next. You cannot appear in Browse until Gida verifies you.
              </p>
            </>
          )}
          {err && <p className="text-sm text-red-700">{err}</p>}
          <button className="btn-accent w-full" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
