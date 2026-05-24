"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Carta,
  setCarte,
  setFavorites,
  toggleFavorite,
} from "../state/cartaSlice";
import type { RootState, AppDispatch } from "../state/store";
import { addItem } from "../state/cartSlice";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LiaCartPlusSolid } from "react-icons/lia";
import { apiUrl } from "../lib/api";

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
        apiUrl(`/users/${userId}/favorites`),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = (await resp.json()) as Carta[];
      dispatch(setCarte(data));
      dispatch(setFavorites(data.map((c) => c.id)));
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
      apiUrl(`/users/${userId}/favorites/${cartaId}`),
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

  const handleAddToCart = (c: Carta) => {
    dispatch(addItem({ ...c, quantita: 1 }));
    setToastMsg("Aggiunto al carrello!");
  };

  const gridClassName =
    carte.length === 1
      ? "grid grid-cols-1 justify-items-center gap-4"
      : carte.length === 2
      ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
      : "card-grid";

  const cardClassName =
    carte.length === 1
      ? "w-full max-w-sm"
      : carte.length === 2
      ? "w-full"
      : "";

  return (
    <div className="content-panel flex min-h-[50vh] flex-col p-4 sm:p-5">
      {toastMsg && (
        <div className="fixed bottom-4 left-4 right-4 z-50 rounded-lg bg-green-600 px-4 py-3 text-center text-white shadow-lg sm:left-auto sm:right-4">
          {toastMsg}
        </div>
      )}
      <div className="mb-5">
        <div className="flex items-center justify-center gap-2 text-lg font-semibold text-black">
          <span>I tuoi preferiti</span>
          <FaHeart className="text-blue-700" />
        </div>
      </div>
      <div className="flex-1">
        {carte.length === 0 ? (
          <p className="text-center text-gray-500">
            Non hai ancora aggiunto preferiti.
          </p>
        ) : (
          <div className={gridClassName}>
            {carte.map((carta) => {
              const isFav = favorites.includes(carta.id);
              const bgColor = bgByRarita[carta.rarita] || "bg-gray-500";
              return (
                <article
                  key={carta.id}
                  className={`${cardClassName} ${bgColor} overflow-hidden rounded-lg p-2 shadow-md`}
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center rounded-t-md bg-white p-3 shadow-sm">
                    <button
                      onClick={() => handleRemoveFavorite(carta.id)}
                      className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm"
                      aria-label="Rimuovi dai preferiti"
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
                      className="h-full max-h-52 w-full object-contain"
                    />
                  </div>
                  <div className="min-h-48 bg-white p-4">
                    <h5 className="mb-2 line-clamp-2 text-lg font-bold text-black">
                      {carta.nome}
                    </h5>
                    <p className="mb-3 line-clamp-4 text-sm leading-6 text-gray-700">
                      {carta.descrizione}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      Rarità: {carta.rarita.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between rounded-b-md bg-white p-4 pt-0">
                    <p className="font-semibold text-black">
                      € {carta.prezzo.toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleAddToCart(carta)}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800"
                      aria-label="Aggiungi al carrello"
                    >
                      <LiaCartPlusSolid size={20} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
