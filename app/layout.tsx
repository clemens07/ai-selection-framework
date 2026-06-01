import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "LLM System Selection MVP",
  description: "Requirements-based recommendation prototype for LLM system selection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto min-h-screen max-w-7xl px-6 py-8 lg:px-8">
          <header className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/70 px-6 py-5 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <Link className="text-2xl font-semibold tracking-tight text-ink" href="/">
                LLM System Selection MVP
              </Link>
              <p className="mt-1 text-sm text-slate-600">
                Requirements-based recommendation support for model, architecture, and hosting choices.
              </p>
            </div>
            <nav className="flex gap-3 text-sm font-medium text-slate-700">
              <Link className="rounded-full bg-mist px-4 py-2 hover:bg-slate-200" href="/">
                Home
              </Link>
              <Link className="rounded-full bg-mist px-4 py-2 hover:bg-slate-200" href="/questionnaire">
                Questionnaire
              </Link>
              <Link className="rounded-full bg-mist px-4 py-2 hover:bg-slate-200" href="/history">
                History
              </Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
