"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  setCarte,
  toggleFavorite,
  setFavorites,
  type Carta as CartaType,
} from "../state/cartaSlice";
import { addItem } from "../state/cartSlice";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LiaCartPlusSolid } from "react-icons/lia";

export default function Preferiti() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((s: RootState) => s.logIn.userId);
  const cartePreferite = useSelector(
    (s: RootState) => s.carta.carte as CartaType[]
  );

  const favorites = useSelector((state: RootState) => state.carta.favorites);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const resp = await fetch(
          `http://localhost:8080/users/${userId}/favorites`
        );
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data: CartaType[] = await resp.json();
        dispatch(setCarte(data));
        dispatch(setFavorites(data.map((c) => c.id)));
      } catch (e) {
        console.error("Errore fetch preferiti:", e);
      }
    })();
  }, [dispatch, userId]);

  const handleRemoveFavorite = async (cartaId: number) => {
    if (!userId) return;
    try {
      const resp = await fetch(
        `http://localhost:8080/users/${userId}/favorites/${cartaId}`,
        { method: "DELETE" }
      );
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      dispatch(toggleFavorite(cartaId));
      dispatch(setCarte(cartePreferite.filter((c) => c.id !== cartaId)));
    } catch (e) {
      console.error("Impossibile rimuovere dai preferiti:", e);
    }
  };

  const handleAddToCart = (c: CartaType) =>
    dispatch(addItem({ ...c, quantita: 1 }));

  const bgByRarita: Record<string, string> = {
    COMMON: "bg-gray-700",
    UNCOMMON: "bg-green-700",
    SUPER_RARE: "bg-blue-700",
    SECRET_RARE: "bg-purple-700",
    GOD_RARE: "bg-yellow-300",
    ALTERNATE: "bg-pink-700",
    LEADER: "bg-red-700",
  };

  return (
    <div className="bg-white py-8 flex flex-col min-h-screen">
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center justify-center gap-2 text-lg font-medium text-black">
          <span>I tuoi preferiti</span>
          <FaHeart className="text-blue-700" />
        </div>
      </div>

      <div className="container mx-auto px-4 flex-1">
        {cartePreferite.length === 0 ? (
          <p className="text-center text-gray-500">
            Non hai ancora aggiunto preferiti.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cartePreferite.map((carta) => {
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
                        <FaHeart
                          size={24}
                          className="text-blue-700 cursor-pointer"
                        />
                      ) : (
                        <CiHeart
                          size={24}
                          className="text-blue-700 cursor-pointer"
                        />
                      )}
                    </button>
                    <img
                      className="h-48 object-contain"
                      src={
                        carta.urlImmagine || "https://via.placeholder.com/150"
                      }
                      alt={carta.nome}
                    />
                  </div>
                  <div className="p-5 bg-white">
                    <h5 className="text-xl font-bold text-black mb-2">
                      {carta.nome}
                    </h5>
                    <p className="text-black mb-1">
                      Descrizione: {carta.descrizione}
                    </p>
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
