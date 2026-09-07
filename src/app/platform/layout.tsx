"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Guard } from "@/components/Shell";
import { Building2 } from "lucide-react";

const items = [
  { href: "/platform", label: "Verification queue" },
  { href: "/platform/orgs", label: "All organisations" },
  { href: "/platform/audit", label: "Audit" },
];

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <Guard roles={["platform_admin"]}>
      <div className="flex min-h-screen bg-sand">
        <aside className="hidden w-56 border-r border-ink-900/10 bg-white md:block">
          <Link href="/" className="flex items-center gap-2 px-4 py-4 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink-950 text-white">
              <Building2 size={16} />
            </span>
            Gida Ops
          </Link>
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={`mx-2 block rounded-lg px-3 py-2 text-sm ${path === i.href ? "bg-sand font-semibold" : "text-ink-700"}`}
            >
              {i.label}
            </Link>
          ))}
          <button
            className="mx-4 mt-8 text-sm underline"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Sign out
          </button>
        </aside>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </Guard>
  );
}
