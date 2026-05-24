"use client";

import { usePathname } from "next/navigation";
import FilterBar from "./FilterBar";

export default function FilterWrapper() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <FilterBar />;
}
