"use client";

import { DashShell } from "@/components/DashShell";
import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  DoorOpen,
  Users,
  ClipboardList,
  UserRound,
  Wallet,
  Wrench,
  Settings,
} from "lucide-react";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashShell
      brand="Owner"
      roles={["owner", "manager", "accountant"]}
      items={[
        { href: "/owner", label: "Overview", icon: LayoutDashboard },
        { href: "/owner/onboarding", label: "KYC & listing", icon: ShieldCheck },
        { href: "/owner/properties", label: "Properties & fees", icon: Building2 },
        { href: "/owner/rooms", label: "Rooms", icon: DoorOpen },
        { href: "/owner/staff", label: "Staff", icon: Users },
        { href: "/owner/applications", label: "Applications", icon: ClipboardList },
        { href: "/owner/tenants", label: "Tenants & caution", icon: UserRound },
        { href: "/owner/payments", label: "Payments", icon: Wallet },
        { href: "/owner/tickets", label: "Maintenance", icon: Wrench },
        { href: "/owner/settings", label: "Payouts & policy", icon: Settings },
      ]}
    >
      {children}
    </DashShell>
  );
}
