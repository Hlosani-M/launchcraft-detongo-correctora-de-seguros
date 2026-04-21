import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export default function RootNotFound() {
  return (
    <html lang="pt" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-hero-gradient text-brand-ivory">
        <main className="mx-auto flex min-h-[80vh] w-full max-w-3xl flex-col items-start justify-center px-6 py-24 sm:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-azure">
            404
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Página não encontrada · Page not found
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-brand-ivory/75">
            A página que procura não existe ou foi movida. The page you are
            looking for does not exist or has been moved.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/pt"
              className="inline-flex items-center gap-2 rounded-full bg-brand-azure px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-azure-bright"
            >
              Voltar ao início
            </Link>
            <Link
              href="/en"
              className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/25 px-6 py-3 text-sm font-semibold text-brand-ivory transition-colors hover:bg-brand-ivory/10"
            >
              Go to homepage
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
