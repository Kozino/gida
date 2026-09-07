"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Guard } from "@/components/Shell";

const items = [
  { href: "/tenant", label: "Home" },
  { href: "/tenant/pay", label: "Pay & receipts" },
  { href: "/tenant/tickets", label: "Repairs" },
  { href: "/tenant/agreement", label: "Agreement" },
];

export default function TLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <Guard roles={["tenant", "sponsor"]}>
      <div className="flex min-h-screen bg-sand">
        <aside className="hidden w-52 border-r bg-white md:block">
          <p className="px-4 py-4 font-semibold">Gida Tenant</p>
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={`mx-2 block rounded-lg px-3 py-2 text-sm ${path === i.href ? "bg-sand font-semibold" : ""}`}
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
        <main className="flex-1 p-6">{children}</main>
      </div>
    </Guard>
  );
}
