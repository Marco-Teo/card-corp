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
import { apiUrl } from "../lib/api";

export default function CardList() {
  const dispatch = useDispatch<AppDispatch>();
  const carte = useSelector((s: RootState) => s.carta.carte);
  const favorites = useSelector((s: RootState) => s.carta.favorites);
  const filters = useSelector((s: RootState) => s.filters);
  const userId = useSelector((s: RootState) => s.logIn.userId);
  const token = useSelector((s: RootState) => s.logIn.token);

  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const bgByRarita: Record<string, string> = {
    COMMON: "bg-gray-700",
    UNCOMMON: "bg-green-700",
    SUPER_RARE: "bg-orange-200",
    SECRET_RARE: "bg-purple-700",
    GOD_RARE: "bg-yellow-300",
    ALTERNATE: "bg-black",
    LEADER: "bg-red-700",
  };

  useEffect(() => {
    const fetchCarte = async () => {
      setLoading(true);
      setError(null);
      const hasFilters =
        filters.nome !== "" ||
        filters.rarita !== "" ||
        filters.order !== "" ||
        filters.prezzoMin !== 0 ||
        filters.prezzoMax !== 999999999;

      const url = hasFilters
        ? apiUrl("/api/carte/search")
        : apiUrl("/api/carte");
      const opts = hasFilters
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nome: filters.nome,
              rarita: filters.rarita,
              min: filters.prezzoMin,
              max: filters.prezzoMax,
              ordine: filters.order,
            }),
          }
        : undefined;

      try {
        const resp = await fetch(url, opts);
        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`);
        }
        const data = (await resp.json()) as Carta[];
        dispatch(setCarte(data));
      } catch (e: unknown) {
        console.error("Fetch carte fallito:", e);
        setError(
          e instanceof Error
            ? `Impossibile caricare le carte: ${e.message}`
            : "Impossibile caricare le carte."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCarte();
  }, [dispatch, filters]);

  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(null), 1000);
    return () => clearTimeout(t);
  }, [toastMsg]);

  const handleAddFavorite = async (cartaId: number) => {
    if (!userId || !token) {
      alert("Devi essere loggato per aggiungere ai preferiti");
      return;
    }
    try {
      const resp = await fetch(
        apiUrl(`/users/${userId}/favorites/${cartaId}`),
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      dispatch(toggleFavorite(cartaId));
    } catch (e) {
      console.error("Impossibile aggiungere ai preferiti:", e);
      alert("Errore durante l’aggiunta ai preferiti");
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-center text-sm font-medium text-red-700">
        {error}
      </div>
    );
  }

  if (carte.length === 0) {
    return (
      <div className="rounded-lg border border-blue-100 bg-white p-6 text-center text-gray-600">
        Nessuna carta trovata.
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {toastMsg && (
        <div className="fixed bottom-4 left-4 right-4 z-50 rounded-lg bg-green-600 px-4 py-3 text-center text-white shadow-lg sm:left-auto sm:right-4">
          {toastMsg}
        </div>
      )}
      {carte.map((c) => {
        const isFav = favorites.includes(c.id);
        const bgColor = bgByRarita[c.rarita] || "bg-blue-700";
        return (
          <article
            key={c.id}
            className={`${cardClassName} ${bgColor} overflow-hidden rounded-lg p-2 shadow-md`}
          >
            <div className="relative flex aspect-[4/3] items-center justify-center rounded-t-md bg-white p-3 shadow-sm">
              <button
                onClick={() => handleAddFavorite(c.id)}
                className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm"
                aria-label="Aggiungi ai preferiti"
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
                className="h-full max-h-52 w-full object-contain"
              />
            </div>
            <div className="min-h-48 bg-white p-4">
              <h5 className="mb-2 line-clamp-2 text-lg font-bold text-black">
                {c.nome}
              </h5>
              <p className="mb-3 line-clamp-4 text-sm leading-6 text-gray-700">
                {c.descrizione}
              </p>
              <p className="text-sm font-medium text-gray-900">
                Rarità: {c.rarita.replace(/_/g, " ")}
              </p>
            </div>
            <div className="flex items-center justify-between rounded-b-md bg-white p-4 pt-0">
              <p className="font-semibold text-black">€ {c.prezzo.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(c)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-xl text-white hover:bg-blue-800"
                aria-label="Aggiungi al carrello"
              >
                <LiaCartPlusSolid size={20} />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
