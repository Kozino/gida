"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Store, User, Organization, Role } from "./types";
import { currentUser, loadStore, saveStore } from "./store";
import { nowIso, slugify, uid } from "./ids";

type AuthCtx = {
  store: Store;
  user: User | null;
  org: Organization | null;
  refresh: () => void;
  login: (email: string, password: string) => string | null;
  logout: () => void;
  registerOwner: (p: {
    name: string;
    email: string;
    phone: string;
    password: string;
    orgName: string;
    type: Organization["type"];
    state: string;
    city: string;
  }) => string | null;
  registerTenant: (p: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => string | null;
  patch: (fn: (s: Store) => void) => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store>(() =>
    typeof window === "undefined"
      ? {
          users: [],
          orgs: [],
          properties: [],
          rooms: [],
          tokens: [],
          applications: [],
          tenancies: [],
          payments: [],
          tickets: [],
          audit: [],
          sessionUserId: null,
        }
      : loadStore()
  );

  const refresh = () => setStore(loadStore());

  useEffect(() => {
    setStore(loadStore());
    const on = () => setStore(loadStore());
    window.addEventListener("gida-store", on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener("gida-store", on);
      window.removeEventListener("storage", on);
    };
  }, []);

  const user = currentUser(store);
  const org = user?.orgId
    ? store.orgs.find((o) => o.id === user.orgId) ?? null
    : null;

  const patch = (fn: (s: Store) => void) => {
    const next = structuredClone(loadStore());
    fn(next);
    saveStore(next);
    setStore(next);
  };

  const value = useMemo<AuthCtx>(
    () => ({
      store,
      user,
      org,
      refresh,
      login: (email, password) => {
        const s = loadStore();
        const found = s.users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!found) return "Invalid email or password";
        s.sessionUserId = found.id;
        saveStore(s);
        setStore(s);
        return null;
      },
      logout: () => {
        const s = loadStore();
        s.sessionUserId = null;
        saveStore(s);
        setStore(s);
      },
      registerOwner: (p) => {
        const s = loadStore();
        if (s.users.some((u) => u.email.toLowerCase() === p.email.toLowerCase()))
          return "Email already registered";
        const userId = uid("usr");
        const orgId = uid("org");
        s.users.push({
          id: userId,
          email: p.email,
          phone: p.phone,
          password: p.password,
          name: p.name,
          role: "owner" as Role,
          orgId,
          createdAt: nowIso(),
        });
        s.orgs.push({
          id: orgId,
          name: p.orgName,
          slug: slugify(p.orgName) || orgId,
          type: p.type,
          status: "pending",
          verification: "draft",
          ownerUserId: userId,
          state: p.state,
          city: p.city,
          listed: false,
          createdAt: nowIso(),
        });
        s.audit.push({
          id: uid("aud"),
          orgId,
          actorId: userId,
          action: "org.created",
          detail: "Owner registered; listing locked until verification",
          createdAt: nowIso(),
        });
        s.sessionUserId = userId;
        saveStore(s);
        setStore(s);
        return null;
      },
      registerTenant: (p) => {
        const s = loadStore();
        if (s.users.some((u) => u.email.toLowerCase() === p.email.toLowerCase()))
          return "Email already registered";
        const userId = uid("usr");
        s.users.push({
          id: userId,
          email: p.email,
          phone: p.phone,
          password: p.password,
          name: p.name,
          role: "tenant",
          createdAt: nowIso(),
        });
        s.sessionUserId = userId;
        saveStore(s);
        setStore(s);
        return null;
      },
      patch,
    }),
    [store, user, org]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth");
  return v;
}

export function homeFor(role?: Role) {
  switch (role) {
    case "platform_admin":
      return "/platform";
    case "owner":
    case "manager":
    case "accountant":
      return "/owner";
    case "caretaker":
    case "security":
      return "/caretaker";
    case "tenant":
    case "sponsor":
      return "/tenant";
    default:
      return "/login";
  }
}
