import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Employee Education Platform",
  description: "In-house learning management system for employee development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
