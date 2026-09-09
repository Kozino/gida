"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PublicNav } from "@/components/Shell";
import { useAuth } from "@/lib/AuthContext";
import { nowIso, uid } from "@/lib/ids";
import { Suspense } from "react";

function ApplyInner() {
  const q = useSearchParams();
  const router = useRouter();
  const { store, user, patch } = useAuth();
  const orgSlug = q.get("org") || "";
  const org = store.orgs.find((o) => o.slug === orgSlug && o.listed && o.verification === "verified");
  const rooms = store.rooms.filter((r) => r.orgId === org?.id && r.available);
  const [code, setCode] = useState("");
  const [roomId, setRoomId] = useState(rooms[0]?.id || "");
  const [school, setSchool] = useState("");
  const [suretyName, setSuretyName] = useState("");
  const [suretyPhone, setSuretyPhone] = useState("");
  const [accept, setAccept] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const token = useMemo(
    () => store.tokens.find((t) => t.code.toUpperCase() === code.trim().toUpperCase() && t.orgId === org?.id),
    [store.tokens, code, org?.id]
  );

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "tenant") {
      setMsg("Sign in with a tenant account to apply.");
      return;
    }
    if (!org) {
      setMsg("Lodge is not listed.");
      return;
    }
    if (!token || token.usedBy) {
      setMsg("Invalid or already used token. Collect a fresh code from the caretaker on this lodge.");
      return;
    }
    if (!accept) {
      setMsg("Read and accept this lodge’s terms first.");
      return;
    }
    patch((s) => {
      const t = s.tokens.find((x) => x.id === token.id);
      if (t) t.usedBy = user.id;
      s.applications.push({
        id: uid("app"),
        orgId: org.id,
        propertyId: s.properties.find((p) => p.orgId === org.id)?.id || "",
        roomId,
        tenantUserId: user.id,
        tokenId: token.id,
        status: "signed",
        applicantName: user.name,
        phone: user.phone,
        schoolOrWork: school,
        suretyName,
        suretyPhone,
        createdAt: nowIso(),
      });
      s.audit.push({
        id: uid("aud"),
        orgId: org.id,
        actorId: user.id,
        action: "application.submitted",
        detail: "Awaiting caretaker then owner approval",
        createdAt: nowIso(),
      });
    });
    setMsg("Application submitted. Track it in your tenant dashboard.");
    setTimeout(() => router.push("/tenant"), 800);
  }

  return (
    <div>
      <PublicNav />
      <div className="mx-auto max-w-lg px-4 py-12">
        <h1 className="font-display text-3xl">Apply with caretaker token</h1>
        {!org && (
          <p className="mt-4 text-sm text-ink-700">
            Pick a verified lodge from Browse first. Tokens are lodge-specific.
          </p>
        )}
        {org && (
          <form onSubmit={submit} className="card mt-6 space-y-3 p-6">
            <p className="text-sm font-semibold">{org.name}</p>
            <input
              className="input"
              placeholder="Token code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <select className="input" value={roomId} onChange={(e) => setRoomId(e.target.value)}>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.block} {r.name}
                </option>
              ))}
            </select>
            <input className="input" placeholder="School or workplace" value={school} onChange={(e) => setSchool(e.target.value)} />
            <input className="input" placeholder="Surety full name" value={suretyName} onChange={(e) => setSuretyName(e.target.value)} />
            <input className="input" placeholder="Surety phone" value={suretyPhone} onChange={(e) => setSuretyPhone(e.target.value)} />
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
              I have read this lodge’s tenancy terms. I understand rent is paid only to the
              account in the tenant portal after this step, and false information may end the
              tenancy under the owner’s honesty policy.
            </label>
            {msg && <p className="text-sm text-ink-800">{msg}</p>}
            <button className="btn-primary w-full">Submit application</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense>
      <ApplyInner />
    </Suspense>
  );
}
