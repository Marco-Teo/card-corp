"use client";

import { useState } from "react";
import { FiShoppingCart, FiSearch, FiUser } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { toggleMenu } from "../state/menuSlice";
import LogInDropdown from "./LogInDropdown";
import LogInForm from "./LogInForm";
import Cart from "./Cart";
import Link from "next/link";
import LogInDropDownAdmin from "./LogInDropDownAdmin";

export default function Header() {
  const { isLoggedIn } = useSelector((state: RootState) => state.logIn);
  const dispatch = useDispatch<AppDispatch>();

  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const role = useSelector((s: RootState) => s.logIn.role);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      dispatch(toggleMenu());
    } else {
      setShowLogin(true);
    }
  };
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto flex items-center px-6 py-3">
        <Link href="/">
          <img src="/MARCO1.svg" alt="logo" className="w-20 h-20" />
        </Link>

        <div className="flex-grow mx-12 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="cerca"
            className="w-full bg-blue-700 border border-blue-700 text-center text-white py-2 pl-12 pr-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

        <div className="flex items-center space-x-8 ml-12 flex-shrink-0">
          <button
            onClick={() => setShowCart(true)}
            className="text-blue-700 hover:text-blue-800"
            aria-label="Apri carrello"
          >
            <FiShoppingCart size={24} />
          </button>
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="bg-blue-700 p-2 rounded-full text-white hover:bg-blue-600"
              aria-label="Apri menu utente"
            >
              <FiUser size={20} />
            </button>
            {role === "ADMIN" ? (
              <LogInDropDownAdmin onClose={() => dispatch(toggleMenu())} />
            ) : (
              <LogInDropdown onClose={() => dispatch(toggleMenu())} />
            )}

            {showLogin && (
              <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setShowLogin(false)}
              >
                <div
                  className="bg-white p-6 rounded-md shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LogInForm onClose={() => setShowLogin(false)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCart && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowCart(false)}
        >
          <div
            className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg no-scrollbar overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Cart />
          </div>
        </div>
      )}
    </header>
  );
}
