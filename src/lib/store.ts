"use client";

import { Store, User } from "./types";
import { nowIso, uid } from "./ids";

const KEY = "gida.store.v1";

function seed(): Store {
  const adminId = "usr_admin";
  const ownerId = "usr_owner";
  const pendingOwnerId = "usr_pending";
  const caretakerId = "usr_care";
  const tenantId = "usr_tenant";
  const orgVerified = "org_demo_verified";
  const orgPending = "org_demo_pending";
  const propId = "prop_demo";

  return {
    sessionUserId: null,
    users: [
      {
        id: adminId,
        email: "admin@gida.ng",
        phone: "08000000001",
        password: "demo",
        name: "Platform Admin",
        role: "platform_admin",
        createdAt: nowIso(),
      },
      {
        id: ownerId,
        email: "owner@gida.ng",
        phone: "08000000002",
        password: "demo",
        name: "Adaeze Okonkwo",
        role: "owner",
        orgId: orgVerified,
        createdAt: nowIso(),
      },
      {
        id: pendingOwnerId,
        email: "pending@gida.ng",
        phone: "08000000003",
        password: "demo",
        name: "Musa Bello",
        role: "owner",
        orgId: orgPending,
        createdAt: nowIso(),
      },
      {
        id: caretakerId,
        email: "caretaker@gida.ng",
        phone: "08000000004",
        password: "demo",
        name: "Henry Caretaker",
        role: "caretaker",
        orgId: orgVerified,
        createdAt: nowIso(),
      },
      {
        id: tenantId,
        email: "tenant@gida.ng",
        phone: "08000000005",
        password: "demo",
        name: "Chidi Student",
        role: "tenant",
        orgId: orgVerified,
        tenantId: "ten_demo",
        createdAt: nowIso(),
      },
    ],
    orgs: [
      {
        id: orgVerified,
        name: "North Gate Residences",
        slug: "north-gate",
        type: "lodge",
        status: "active",
        verification: "verified",
        ownerUserId: ownerId,
        nin: "verified-on-file",
        cac: "RC-on-file",
        bankName: "Set in payout settings",
        bankAccountName: "North Gate Residences",
        bankAccountNumber: "",
        state: "Enugu",
        city: "Nsukka",
        address: "Near campus north gate",
        whatsapp: "08000000004",
        listed: true,
        createdAt: nowIso(),
      },
      {
        id: orgPending,
        name: "Bello Compound",
        slug: "bello-compound",
        type: "compound",
        status: "pending",
        verification: "submitted",
        ownerUserId: pendingOwnerId,
        state: "Kano",
        city: "Kano",
        listed: false,
        createdAt: nowIso(),
      },
    ],
    properties: [
      {
        id: propId,
        orgId: orgVerified,
        name: "North Gate Lodge A",
        slug: "lodge-a",
        description:
          "Purpose-run student lodge. Rent, caution, and token fees are set by the owner in admin — never guessed on the public site.",
        state: "Enugu",
        city: "Nsukka",
        address: "North gate road",
        genderPolicy: "any",
        occupancyType: "whole_room",
        cycle: "yearly",
        tokenFee: null,
        firstYearRent: null,
        renewalRent: null,
        cautionFee: null,
        serviceCharge: null,
        published: true,
        rules:
          "No agents. Applications only with a caretaker token. Honesty policy applies as configured by the owner.",
        createdAt: nowIso(),
      },
    ],
    rooms: [
      {
        id: "rm_1",
        propertyId: propId,
        orgId: orgVerified,
        name: "A1",
        block: "A",
        beds: 1,
        occupiedBeds: 1,
        rent: null,
        amenities: ["Wardrobe", "Ensuite", "Ceiling fan"],
        available: false,
      },
      {
        id: "rm_2",
        propertyId: propId,
        orgId: orgVerified,
        name: "A2",
        block: "A",
        beds: 1,
        occupiedBeds: 0,
        rent: null,
        amenities: ["Wardrobe", "Shared bath"],
        available: true,
      },
      {
        id: "rm_3",
        propertyId: propId,
        orgId: orgVerified,
        name: "B1",
        block: "B",
        beds: 2,
        occupiedBeds: 0,
        rent: null,
        amenities: ["Bedspace", "Shared kitchen"],
        available: true,
      },
    ],
    tokens: [],
    applications: [],
    tenancies: [
      {
        id: "ten_demo",
        orgId: orgVerified,
        propertyId: propId,
        roomId: "rm_1",
        tenantUserId: tenantId,
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
        rent: null,
        cautionHeld: null,
        active: true,
      },
    ],
    payments: [],
    tickets: [],
    audit: [
      {
        id: uid("aud"),
        orgId: orgVerified,
        actorId: adminId,
        action: "org.verified",
        detail: "North Gate Residences verified by platform",
        createdAt: nowIso(),
      },
    ],
  };
}

export function loadStore(): Store {
  if (typeof window === "undefined") return seed();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const s = seed();
      localStorage.setItem(KEY, JSON.stringify(s));
      return s;
    }
    return JSON.parse(raw) as Store;
  } catch {
    return seed();
  }
}

export function saveStore(s: Store) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("gida-store"));
}

export function resetStore() {
  localStorage.removeItem(KEY);
  saveStore(seed());
}

export function currentUser(s: Store): User | null {
  return s.users.find((u) => u.id === s.sessionUserId) ?? null;
}
