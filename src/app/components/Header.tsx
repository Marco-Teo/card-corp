"use client";

import { FiShoppingCart, FiSearch } from "react-icons/fi";
import LogInDropdown from "./LogInDropdown";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto flex items-center px-6 py-3">
        <img src="/MARCO1.svg" alt="logo" className="w-20 h-20" />

        <div className="flex-grow mx-12 relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="cerca"
            className="w-full bg-blue-600 border border-blue-600 text-center text-white placeholder-white py-2 pl-12 pr-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-8 ml-12 flex-shrink-0">
          <Link href="/cart">
            <FiShoppingCart
              className="text-blue-600 hover:text-blue-800"
              size={24}
            />
          </Link>
          <LogInDropdown />
        </div>
      </div>
    </header>
  );
}
