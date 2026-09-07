import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
});
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Gida — Lodge & tenancy OS for Nigeria",
  description:
    "Paid operating system for house, hostel and lodge owners. Verified landlords only. Tenant and caretaker workspaces.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
