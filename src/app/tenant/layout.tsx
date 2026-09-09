"use client";

import { DashShell } from "@/components/DashShell";
import { Home, Wallet, Wrench, FileText } from "lucide-react";

export default function TLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashShell
      brand="Tenant"
      roles={["tenant", "sponsor"]}
      items={[
        { href: "/tenant", label: "Home", icon: Home },
        { href: "/tenant/pay", label: "Pay & receipts", icon: Wallet },
        { href: "/tenant/tickets", label: "Repairs", icon: Wrench },
        { href: "/tenant/agreement", label: "Agreement", icon: FileText },
      ]}
    >
      {children}
    </DashShell>
  );
}
