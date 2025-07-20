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
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          <FilterWrapper />
          <main className="flex-grow bg-white">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
