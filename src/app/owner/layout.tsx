"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Guard } from "@/components/Shell";
import { Building2 } from "lucide-react";

const items = [
  { href: "/owner", label: "Overview" },
  { href: "/owner/onboarding", label: "KYC & listing" },
  { href: "/owner/properties", label: "Properties & fees" },
  { href: "/owner/rooms", label: "Rooms" },
  { href: "/owner/staff", label: "Staff" },
  { href: "/owner/applications", label: "Applications" },
  { href: "/owner/tenants", label: "Tenants & caution" },
  { href: "/owner/payments", label: "Payments" },
  { href: "/owner/tickets", label: "Maintenance" },
  { href: "/owner/settings", label: "Payouts & policy" },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { user, org, logout } = useAuth();
  const router = useRouter();
  return (
    <Guard roles={["owner", "manager", "accountant"]}>
      <div className="flex min-h-screen bg-sand">
        <aside className="hidden w-60 border-r border-ink-900/10 bg-white md:block">
          <Link href="/" className="flex items-center gap-2 px-4 py-4 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink-950 text-white">
              <Building2 size={16} />
            </span>
            Gida Owner
          </Link>
          <nav className="space-y-0.5 px-2">
            {items.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  path === i.href ? "bg-sand font-semibold" : "text-ink-700"
                }`}
              >
                {i.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 text-xs text-ink-600">
            <p className="font-semibold text-ink-900">{user?.name}</p>
            <p>{org?.name}</p>
            <p className="capitalize">{org?.verification}</p>
            <button
              className="mt-2 underline"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Sign out
            </button>
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
      </div>
    </Guard>
  );
}
