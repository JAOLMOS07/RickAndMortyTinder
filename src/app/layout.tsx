import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/menu/menu";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rick and Morty Tinder",
  description: "Swipe your favorite characters from Rick and Morty!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased   `}
      >
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <NavBar />

          {/* Contenido principal */}
          <main className="flex-1 text-slate-900 px-4 sm:px-8 pt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
