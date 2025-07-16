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
      <body>
        <Providers>
          <Header />
          <FilterWrapper />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
