"use client";

import { DashShell } from "@/components/DashShell";
import { ShieldCheck, Building2, ScrollText } from "lucide-react";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashShell
      brand="Ops"
      roles={["platform_admin"]}
      items={[
        { href: "/platform", label: "Verification queue", icon: ShieldCheck },
        { href: "/platform/orgs", label: "All organisations", icon: Building2 },
        { href: "/platform/audit", label: "Audit", icon: ScrollText },
      ]}
    >
      {children}
    </DashShell>
  );
}
