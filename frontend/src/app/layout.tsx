import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import WalletBar from "@/components/wallet-bar";

export const metadata: Metadata = {
  title: "Irys Tipping dApp",
  description: "Ephemeral-to-Permanent tipping on Irys testnet",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="border-b">
          <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <div className="font-semibold">Irys Tipping</div>
            <div className="flex gap-4 text-sm">
              <Link href="/">Home</Link>
              <Link href="/upload">Upload</Link>
              <Link href="/feed">Feed</Link>
            </div>
            <WalletBar />
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
