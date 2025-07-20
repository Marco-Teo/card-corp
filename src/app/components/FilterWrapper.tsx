"use client";

import { usePathname } from "next/navigation";
import FilterBar from "./FilterBar";

export default function FilterWrapper() {
  const pathname = usePathname();
  if (
    pathname === "/registrazione" ||
    pathname.startsWith("/registrazione/") ||
    pathname === "/creazioneCarta " ||
    pathname.startsWith("/creazioneCarta/") ||
    pathname === "/rimuoviCarta" ||
    pathname.startsWith("/rimuoviCarta/")
  ) {
    return null;
  }
  return <FilterBar />;
}
