"use client";

import { Store, User } from "./types";
import { nowIso, uid } from "./ids";

const KEY = "gida.store.v2";

function seed(): Store {
  const adminId = "usr_admin";
  const ownerId = "usr_owner";
  const pendingOwnerId = "usr_pending";
  const caretakerId = "usr_care";
  const tenantId = "usr_tenant";
  const tenant2 = "usr_tenant2";
  const orgVerified = "org_demo_verified";
  const orgPending = "org_demo_pending";
  const propId = "prop_demo";
  const propB = "prop_demo_b";

  return {
    sessionUserId: null,
    users: [
      {
        id: adminId,
        email: "admin@gida.ng",
        phone: "08000000001",
        password: "demo",
        name: "Amaka Ibe",
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
        name: "Henry Nwosu",
        role: "caretaker",
        orgId: orgVerified,
        createdAt: nowIso(),
      },
      {
        id: tenantId,
        email: "tenant@gida.ng",
        phone: "08000000005",
        password: "demo",
        name: "Chidi Okeke",
        role: "tenant",
        orgId: orgVerified,
        tenantId: "ten_demo",
        createdAt: nowIso(),
      },
      {
        id: tenant2,
        email: "ifeoma@gida.ng",
        phone: "08000000006",
        password: "demo",
        name: "Ifeoma Eze",
        role: "tenant",
        orgId: orgVerified,
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
        bankName: "GTBank",
        bankAccountName: "North Gate Residences",
        bankAccountNumber: "0123456789",
        state: "Enugu",
        city: "Nsukka",
        address: "North Gate Road, campus side",
        whatsapp: "08000000004",
        listed: true,
        notes:
          "Honesty policy: incomplete or false information may end tenancy. Forfeiture only where lodge policy and state law allow. No agents.",
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
        nin: "submitted",
        cac: "",
        bankName: "UBA",
        bankAccountName: "Musa Bello",
        bankAccountNumber: "2233445566",
        state: "Kano",
        city: "Kano",
        address: "Ungogo road",
        listed: false,
        createdAt: nowIso(),
      },
    ],
    properties: [
      {
        id: propId,
        orgId: orgVerified,
        name: "Cedar House",
        slug: "cedar",
        description:
          "Quiet academic lodge. Ensuite rooms, borehole, generator, 24/7 gate. Fees are published by the owner in admin.",
        state: "Enugu",
        city: "Nsukka",
        address: "North Gate Road",
        genderPolicy: "any",
        occupancyType: "whole_room",
        cycle: "yearly",
        tokenFee: null,
        firstYearRent: null,
        renewalRent: null,
        cautionFee: null,
        serviceCharge: null,
        published: true,
        rules: "No agents. Token from Henry only. Quiet hours 10pm.",
        createdAt: nowIso(),
      },
      {
        id: propB,
        orgId: orgVerified,
        name: "Palm Court",
        slug: "palm",
        description: "Shared kitchen block, bedspaces, closer to the taxi park.",
        state: "Enugu",
        city: "Nsukka",
        address: "Amukwa lane",
        genderPolicy: "female",
        occupancyType: "bedspace",
        cycle: "session",
        tokenFee: null,
        firstYearRent: null,
        renewalRent: null,
        cautionFee: null,
        serviceCharge: null,
        published: true,
        rules: "Female block. Visitors sign at the gate.",
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
        amenities: ["Ensuite", "Wardrobe", "Fan"],
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
        amenities: ["Ensuite", "Balcony"],
        available: true,
      },
      {
        id: "rm_3",
        propertyId: propId,
        orgId: orgVerified,
        name: "B1",
        block: "B",
        beds: 1,
        occupiedBeds: 0,
        rent: null,
        amenities: ["Shared bath"],
        available: true,
      },
      {
        id: "rm_4",
        propertyId: propB,
        orgId: orgVerified,
        name: "P1",
        block: "Palm",
        beds: 4,
        occupiedBeds: 1,
        rent: null,
        amenities: ["Bedspace", "Shared kitchen"],
        available: true,
      },
    ],
    tokens: [
      {
        id: "tok_open",
        orgId: orgVerified,
        propertyId: propId,
        code: "NG7K2M",
        feePaid: true,
        issuedBy: caretakerId,
        createdAt: nowIso(),
        expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
      },
    ],
    applications: [
      {
        id: "app_1",
        orgId: orgVerified,
        propertyId: propId,
        roomId: "rm_2",
        tenantUserId: tenant2,
        tokenId: "tok_open",
        status: "caretaker_review",
        applicantName: "Ifeoma Eze",
        phone: "08000000006",
        schoolOrWork: "UNN · Medicine",
        suretyName: "Mrs Eze",
        suretyPhone: "08011112222",
        createdAt: nowIso(),
      },
    ],
    tenancies: [
      {
        id: "ten_demo",
        orgId: orgVerified,
        propertyId: propId,
        roomId: "rm_1",
        tenantUserId: tenantId,
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date(Date.now() + 280 * 86400000).toISOString().slice(0, 10),
        rent: null,
        cautionHeld: null,
        active: true,
      },
    ],
    payments: [
      {
        id: "pay_1",
        orgId: orgVerified,
        tenantUserId: tenantId,
        type: "rent",
        amount: null,
        method: "transfer",
        receiptNote: "GTB alert — session rent",
        status: "confirmed",
        createdAt: nowIso(),
      },
      {
        id: "pay_2",
        orgId: orgVerified,
        tenantUserId: tenant2,
        type: "token",
        amount: null,
        method: "transfer",
        receiptNote: "Token to Henry",
        status: "pending",
        createdAt: nowIso(),
      },
    ],
    tickets: [
      {
        id: "tix_1",
        orgId: orgVerified,
        propertyId: propId,
        tenantUserId: tenantId,
        title: "Ensuite tap dripping",
        category: "plumbing",
        status: "in_progress",
        createdAt: nowIso(),
      },
      {
        id: "tix_2",
        orgId: orgVerified,
        propertyId: propId,
        title: "Borehole pressure low",
        category: "water",
        status: "open",
        createdAt: nowIso(),
      },
    ],
    audit: [
      {
        id: uid("aud"),
        orgId: orgVerified,
        actorId: adminId,
        action: "org.verified",
        detail: "North Gate Residences verified",
        createdAt: nowIso(),
      },
      {
        id: uid("aud"),
        orgId: orgVerified,
        actorId: caretakerId,
        action: "token.issued",
        detail: "NG7K2M",
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
