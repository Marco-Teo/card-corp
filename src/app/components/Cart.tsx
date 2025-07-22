"use client";

import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import type { AppDispatch, RootState } from "../state/store";
import CartCard from "./CartCard";
import { clearCart } from "../state/cartSlice";
import { useEffect, useState } from "react";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const token = useSelector((state: RootState) => state.logIn.token);
  const dispatch = useDispatch<AppDispatch>();

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantita, 0);

  const [summ, setSumm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.prezzo * item.quantita,
      0
    );
    setSumm(
      total.toLocaleString("it-IT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }, [cartItems]);

  const handleCheckout = async () => {
    if (!token) {
      setError("Devi aver fatto la log in per completare l'ordine.");
      return;
    }
    if (cartItems.length === 0) {
      setError("Il carrello è vuoto.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const profResp = await fetch("http://localhost:8080/utente", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!profResp.ok) throw new Error("Impossibile recuperare profilo");
      const user = await profResp.json();
      const userId: number = user.id;
      const indirizzo: string = user.indirizzo;

      const oggi = new Date().toISOString().split("T")[0];
      const payload = {
        dataOrdine: oggi,
        indirizzo,
        userId,
        carte: cartItems.map((item) => ({
          cartaId: item.id,
          quantita: item.quantita,
        })),
      };

      const ordineResp = await fetch("http://localhost:8080/ordini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!ordineResp.ok) {
        const err = await ordineResp.json().catch(() => null);
        throw new Error(err?.message || `Errore ${ordineResp.status}`);
      }

      dispatch(clearCart());
      alert("Ordine effettuato con successo!");
    } catch (e: any) {
      console.error("Checkout fallito:", e);
      setError(e.message || "Errore durante il checkout");
    } finally {
      setLoading(false);
    }
  };

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
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Il carrello è vuoto</p>
        ) : (
          cartItems.map((item) => <CartCard carta={item} key={item.id} />)
        )}
      </div>

      {error && (
        <p className="text-red-600 text-center text-sm mb-2">{error}</p>
      )}

      <div className="border-t pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <FiShoppingCart className="text-blue-700" size={24} />
              {itemCount > 0 && (
                <span
                  className="
                    absolute -top-2 -right-2
                    bg-red-600 text-white
                    w-5 h-5 text-xs
                    flex items-center justify-center
                    rounded-full
                  "
                >
                  {itemCount}
                </span>
              )}
            </div>
            <h4 className="font-medium text-black">Totale: € {summ}</h4>
          </div>
          <button
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            onClick={resetCart}
            disabled={loading}
          >
            Rimuovi tutto
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleCheckout}
            disabled={loading || cartItems.length === 0}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold text-white ${
              loading || cartItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-600"
            }`}
          >
            {loading ? "Sto elaborando..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
