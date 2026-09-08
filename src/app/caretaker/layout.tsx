"use client";

import { DashShell } from "@/components/DashShell";

export default function L({ children }: { children: React.ReactNode }) {
  return (
    <DashShell
      brand="Caretaker"
      roles={["caretaker", "security"]}
      items={[
        { href: "/caretaker", label: "Tokens" },
        { href: "/caretaker/applications", label: "Applications" },
        { href: "/caretaker/tickets", label: "Yard tickets" },
        { href: "/caretaker/gate", label: "Gate log" },
      ]}
    >
      {children}
    </DashShell>
  );
}
