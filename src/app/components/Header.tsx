"use client";

import { useState } from "react";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
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
    <>
      <header className="relative z-20 w-full border-b border-blue-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap sm:px-6">
          <Link href="/" className="flex shrink-0 items-center">
            <img
              src="/MARCO1.svg"
              alt="CardCorp"
              className="h-14 w-14 sm:h-16 sm:w-16"
            />
          </Link>

          <div className="relative order-3 w-full sm:order-2 sm:flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
            <input
              type="text"
              placeholder="cerca"
              className="h-11 w-full rounded-full border border-blue-700 bg-blue-700 py-2 pl-12 pr-4 text-center text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div className="order-2 ml-auto flex shrink-0 items-center gap-3 sm:order-3 sm:ml-0 sm:gap-5">
            <button
              onClick={() => setShowCart(true)}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 text-blue-700 transition hover:bg-blue-50 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              aria-label="Apri carrello"
            >
              <FiShoppingCart
                size={24}
                className="transition group-hover:-translate-y-0.5"
              />
            </button>
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-700 shadow-sm transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                aria-label="Apri menu utente"
              >
                <span className="relative h-7 w-4 -rotate-[28deg] overflow-hidden rounded-full border border-slate-900 bg-white shadow-[0_4px_10px_rgba(15,23,42,0.16)] transition group-hover:-translate-y-0.5">
                  <span className="absolute inset-x-0 top-0 h-2.5 rounded-t-full bg-slate-100" />
                  <span className="absolute inset-x-[2px] top-2.5 h-px bg-slate-900/60" />
                  <span className="absolute inset-x-0 bottom-0 h-3.5 rounded-b-full bg-blue-600" />
                  <span className="absolute left-1/2 top-3 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white ring-1 ring-slate-900/40" />
                </span>
              </button>
              {role === "ADMIN" ? (
                <LogInDropDownAdmin onClose={() => dispatch(toggleMenu())} />
              ) : (
                <LogInDropdown onClose={() => dispatch(toggleMenu())} />
              )}
            </div>
          </div>
        </div>
      </header>

      {showLogin && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-20"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="max-h-[calc(100vh-10rem)] w-full max-w-md overflow-y-auto rounded-lg bg-white p-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <LogInForm onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      {showCart && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowCart(false)}
        >
          <div
            className="no-scrollbar max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-3 shadow-lg sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <Cart />
          </div>
        </div>
      )}
    </>
  );
}
