"use client";

import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import type { CartItem } from "../state/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { removeItem, updateQuantity } from "../state/cartSlice";

export default function CartCard({ carta }: { carta: CartItem }) {
  const dispatch = useDispatch<AppDispatch>();

  const removeCard = () => {
    dispatch(removeItem(carta.id));
  };

  const decrese = () => {
    const nuova = Math.max(1, carta.quantita - 1);
    dispatch(updateQuantity({ id: carta.id, quantita: nuova }));
  };

  const increse = () => {
    dispatch(updateQuantity({ id: carta.id, quantita: carta.quantita + 1 }));
  };

  return (
    <div className="mb-3 flex min-w-0 items-center rounded-lg border border-blue-50 bg-white p-3 shadow-sm sm:p-4">
      <img
        src={carta.urlImmagine}
        alt={carta.nome}
        className="h-24 w-20 shrink-0 rounded object-contain sm:h-32 sm:w-28"
      />

      <div className="ml-3 min-w-0 flex-1 sm:ml-4">
        <h5 className="line-clamp-2 text-base font-bold text-gray-900 sm:text-lg">
          {carta.nome}
        </h5>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-base font-semibold text-gray-900 sm:text-xl">
            €{carta.prezzo.toFixed(2)}
          </span>

          <div className="flex items-center rounded-full bg-blue-600">
            <button
              className="flex h-9 w-9 items-center justify-center text-white"
              onClick={decrese}
              aria-label="Diminuisci quantità"
            >
              <FiMinus />
            </button>
            <span className="min-w-8 text-center text-white">
              {carta.quantita}
            </span>
            <button
              className="flex h-9 w-9 items-center justify-center text-white"
              onClick={increse}
              aria-label="Aumenta quantità"
            >
              <FiPlus />
            </button>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-red-600 hover:bg-red-50 hover:text-red-800"
            onClick={() => removeCard()}
            aria-label="Rimuovi carta"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
