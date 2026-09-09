"use client";

import { DashShell } from "@/components/DashShell";
import { KeyRound, ClipboardList, Wrench, ScrollText } from "lucide-react";

export default function L({ children }: { children: React.ReactNode }) {
  return (
    <DashShell
      brand="Caretaker"
      roles={["caretaker", "security"]}
      items={[
        { href: "/caretaker", label: "Tokens", icon: KeyRound },
        { href: "/caretaker/applications", label: "Applications", icon: ClipboardList },
        { href: "/caretaker/tickets", label: "Yard tickets", icon: Wrench },
        { href: "/caretaker/gate", label: "Gate log", icon: ScrollText },
      ]}
    >
      {children}
    </DashShell>
  );
}
