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
    <div className="flex items-center bg-white p-4 rounded-lg shadow mb-4">
      <img
        src={carta.urlImmagine}
        alt={carta.nome}
        className="w-30 h-32 object-contain rounded"
      />

      <div className="ml-4 flex-1">
        <h5 className="text-lg font-bold text-gray-900">{carta.nome}</h5>

        <div className="mt-2 flex items-center space-x-4">
          <span className="text-xl font-semibold text-gray-900">
            €{carta.prezzo.toFixed(2)}
          </span>

          <div className="flex items-center bg-blue-600 rounded-full">
            <button className="px-3 py-1 text-white" onClick={decrese}>
              <FiMinus />
            </button>
            <span className="px-4 py-1 text-white">{carta.quantita}</span>
            <button className="px-3 py-1 text-white" onClick={increse}>
              <FiPlus />
            </button>
          </div>

          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => removeCard()}
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
