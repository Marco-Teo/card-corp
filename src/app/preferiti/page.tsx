"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCarte, setFavorites, toggleFavorite } from "../state/cartaSlice";
import type { RootState, AppDispatch } from "../state/store";
import { addItem } from "../state/cartSlice";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LiaCartPlusSolid } from "react-icons/lia";

export default function Preferiti() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((s: RootState) => s.logIn.userId);
  const token = useSelector((s: RootState) => s.logIn.token);
  const carte = useSelector((s: RootState) => s.carta.carte);
  const favorites = useSelector((s: RootState) => s.carta.favorites);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const bgByRarita: Record<string, string> = {
    COMMON: "bg-gray-700",
    UNCOMMON: "bg-green-700",
    SUPER_RARE: "bg-blue-700",
    SECRET_RARE: "bg-purple-700",
    GOD_RARE: "bg-yellow-300",
    ALTERNATE: "bg-pink-700",
    LEADER: "bg-red-700",
  };

  useEffect(() => {
    if (!userId || !token) return;
    (async () => {
      const resp = await fetch(
        `http://localhost:8080/users/${userId}/favorites`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      dispatch(setCarte(data));
      dispatch(setFavorites(data.map((c: any) => c.id)));
    })().catch(console.error);
  }, [dispatch, userId, token]);

  useEffect(() => {
    if (!toastMsg) return;
    const id = setTimeout(() => setToastMsg(null), 1000);
    return () => clearTimeout(id);
  }, [toastMsg]);

  const handleRemoveFavorite = async (cartaId: number) => {
    if (!userId || !token) return;
    const resp = await fetch(
      `http://localhost:8080/users/${userId}/favorites/${cartaId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (resp.ok) {
      dispatch(toggleFavorite(cartaId));
      dispatch(setCarte(carte.filter((c) => c.id !== cartaId)));
    } else console.error(`Del fav error: ${resp.status}`);
  };

  const handleAddToCart = (c: any) => {
    dispatch(addItem({ ...c, quantita: 1 }));
    setToastMsg("Aggiunto al carrello!");
  };

  return (
    <div className="bg-white py-8 flex flex-col min-h-screen">
      {toastMsg && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
          {toastMsg}
        </div>
      )}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center justify-center gap-2 text-lg font-medium text-black">
          <span>I tuoi preferiti</span>
          <FaHeart className="text-blue-700" />
        </div>
      </div>
      <div className="container mx-auto px-4 flex-1">
        {carte.length === 0 ? (
          <p className="text-center text-gray-500">
            Non hai ancora aggiunto preferiti.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {carte.map((carta: any) => {
              const isFav = favorites.includes(carta.id);
              const bgColor = bgByRarita[carta.rarita] || "bg-gray-500";
              return (
                <div
                  key={carta.id}
                  className={`${bgColor} p-4 rounded-lg shadow-md`}
                >
                  <div className="relative flex justify-center p-4 bg-white rounded-t-lg shadow-sm">
                    <button
                      onClick={() => handleRemoveFavorite(carta.id)}
                      className="absolute top-2 right-2"
                    >
                      {isFav ? (
                        <FaHeart size={24} className="text-blue-700" />
                      ) : (
                        <CiHeart size={24} className="text-blue-700" />
                      )}
                    </button>
                    <img
                      src={
                        carta.urlImmagine || "https://via.placeholder.com/150"
                      }
                      alt={carta.nome}
                      className="h-48 object-contain"
                    />
                  </div>
                  <div className="p-5 bg-white">
                    <h5 className="text-xl font-bold text-black mb-2">
                      {carta.nome}
                    </h5>
                    <p className="text-black mb-1 h-40">{carta.descrizione}</p>
                    <p className="text-black mb-3">
                      Rarità: {carta.rarita.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-b-lg">
                    <p className="text-black">€ {carta.prezzo.toFixed(2)}</p>
                    <button
                      onClick={() => handleAddToCart(carta)}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800"
                    >
                      <LiaCartPlusSolid size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
