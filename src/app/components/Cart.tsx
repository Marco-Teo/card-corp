"use client";

import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import type { AppDispatch, RootState } from "../state/store";
import CartCard from "./CartCard";
import { clearCart } from "../state/cartSlice";
import { useEffect, useState } from "react";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const [summ, setSumm] = useState("");

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.prezzo * item.quantita,
      0
    );
    const formatted = total.toLocaleString("it-IT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setSumm(formatted);
  }, [cartItems]);

  const resetCart = () => {
    dispatch(clearCart());
  };

  return (
    <div
      className="
        bg-white p-6 rounded-md shadow-lg
        w-full max-w-md mx-auto
        flex flex-col
        max-h-[80vh]
      "
    >
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 mb-6">
        {cartItems.length == 0 ? (
          <p className="text-center text-gray-500 mt-10">Il carrello è vuoto</p>
        ) : (
          cartItems.map((item) => <CartCard carta={item} key={item.id} />)
        )}
      </div>

      <div className="border-t pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiShoppingCart className="text-blue-700" size={24} />
            <h4 className="font-medium text-black">Totale: € {summ}</h4>
          </div>
          <button
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            onClick={resetCart}
          >
            Rimuovi tutto
          </button>
        </div>
        <div className="flex justify-center">
          <button className="rounded-full bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
