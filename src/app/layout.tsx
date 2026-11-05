import type { Metadata } from "next";
import { profile } from "@/content/resume";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.headline}`,
  description: profile.summary,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
