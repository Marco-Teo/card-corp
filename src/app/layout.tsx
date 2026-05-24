import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import FilterWrapper from "./components/FilterWrapper";
import Footer from "./components/Footer";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "CardCorp",
  description: "Il tuo store di card",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen">
        <Providers>
          <div className="site-shell">
            <div className="dragon-backdrop" aria-hidden="true" />
            <Header />
            <div className="relative z-10 flex-1">
              <FilterWrapper />
              <main className="mx-auto w-full max-w-[960px] px-4 py-4 sm:px-6 lg:py-8">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
