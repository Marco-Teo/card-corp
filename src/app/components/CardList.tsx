"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carta, setCarte, toggleFavorite } from "../state/cartaSlice";
import type { RootState, AppDispatch } from "../state/store";
import { LiaCartPlusSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { addItem } from "../state/cartSlice";
import LoadingSpinner from "./LoadingSpinner";

export default function CardList() {
  const dispatch = useDispatch<AppDispatch>();
  const carte = useSelector((state: RootState) => state.carta.carte);
  const favorites = useSelector((state: RootState) => state.carta.favorites);
  const filters = useSelector((state: RootState) => state.filters);
  const userId = useSelector((state: RootState) => state.logIn.userId);

  const bgByRarita: Record<string, string> = {
    COMMON: "bg-gray-700",
    UNCOMMON: "bg-green-700",
    SUPER_RARE: "bg-orange-200",
    SECRET_RARE: "bg-purple-700",
    GOD_RARE: "bg-yellow-300",
    ALTERNATE: "bg-black",
    LEADER: "bg-red-700",
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarte = async () => {
      setLoading(true);

      const hasFilters =
        filters.nome !== "" ||
        filters.rarita !== "" ||
        filters.order !== "" ||
        filters.prezzoMin !== 0 ||
        filters.prezzoMax !== 999999999;

      let resp;
      if (hasFilters) {
        const payload = {
          nome: filters.nome,
          rarita: filters.rarita,
          min: filters.prezzoMin,
          max: filters.prezzoMax,
          ordine: filters.order,
        };
        resp = await fetch("http://localhost:8080/api/carte/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        resp = await fetch("http://localhost:8080/api/carte");
      }

      if (!resp.ok) {
        console.error(`Fetch error: HTTP ${resp.status}`);
        setLoading(false);
        return;
      }

      const data = (await resp.json()) as Carta[];
      dispatch(setCarte(data));
      setLoading(false);
    };

    fetchCarte();
  }, [dispatch, filters]);

  const handleAddFavorite = async (cartaId: number) => {
    if (!userId) {
      console.error("Devi essere loggato per aggiungere ai preferiti");
      return;
    }

    try {
      const resp = await fetch(
        `http://localhost:8080/users/${userId}/favorites/${cartaId}`,
        { method: "POST" }
      );
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      dispatch(toggleFavorite(cartaId));
    } catch (e) {
      console.error("Impossibile aggiungere ai preferiti:", e);
    }
  };

  const handleAddToCart = (c: Carta) =>
    dispatch(addItem({ ...c, quantita: 1 }));

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {carte.map((c) => {
        const isFav = favorites.includes(c.id);
        const bgColor = bgByRarita[c.rarita] || "bg-blue-700";

        return (
          <div key={c.id} className={`${bgColor} p-4 rounded-lg shadow-md`}>
            <div className="relative flex justify-center p-4 bg-white rounded-t-lg shadow-sm">
              <button
                onClick={() => handleAddFavorite(c.id)}
                className="absolute top-2 right-2"
              >
                {isFav ? (
                  <FaHeart size={24} className="text-blue-700" />
                ) : (
                  <CiHeart size={24} className="text-blue-700" />
                )}
              </button>
              <img
                src={c.urlImmagine || "https://via.placeholder.com/150"}
                alt={c.nome}
                className="h-48 object-contain"
              />
            </div>

            <div className="p-5 bg-white">
              <h5 className="mb-2 text-xl font-bold text-black">{c.nome}</h5>
              <p className="mb-1 text-black">{c.descrizione}</p>
              <p className="mb-3 text-black">
                Rarità: {c.rarita.replace(/_/g, " ")}
              </p>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-b-lg">
              <p className="text-black">€ {c.prezzo.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(c)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white text-xl hover:bg-blue-800"
              >
                <LiaCartPlusSolid size={20} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
