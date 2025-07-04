"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCarte, toggleFavorite } from "../state/cartaSlice";
import type { RootState, AppDispatch } from "../state/store";
import { LiaCartPlusSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

export default function Carta() {
  const dispatch = useDispatch<AppDispatch>();
  const carte = useSelector((state: RootState) => state.carta.carte);
  const favorites = useSelector((state: RootState) => state.carta.favorites);

  useEffect(() => {
    const fetchCarte = async () => {
      const response = await fetch("http://localhost:8080/api/carte");
      const data = await response.json();
      dispatch(setCarte(data));
    };
    fetchCarte();
  }, [dispatch]);

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
      {carte.map((carta) => {
        const isFav = favorites.includes(carta.id);
        return (
          <div key={carta.id} className="bg-[#2d2d2d] p-4 rounded-lg shadow-md">
            <div className="relative flex justify-center p-4 bg-[#282828] rounded-lg shadow-sm">
              <button
                onClick={() => handleToggleFavorite(carta.id)}
                className="absolute top-2 right-2"
              >
                {isFav ? (
                  <FaHeart size={24} className="text-blue-700 cursor-pointer" />
                ) : (
                  <CiHeart size={24} className="text-blue-700 cursor-pointer" />
                )}
              </button>
              <img
                className="h-48 object-contain"
                src={carta.urlImmagine || "https://via.placeholder.com/150"}
                alt={carta.nome}
              />
            </div>

            <div className="p-5 bg-[#2d2d2d]">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                {carta.nome}
              </h5>
              <p className="mb-1 text-white">
                Descrizione: {carta.descrizione}
              </p>
              <p className="mb-3 text-white">Rarità: {carta.rarita}</p>
            </div>

            <div className="flex justify-between items-center p-3 bg-[#2d2d2d] rounded-b-lg">
              <p className="text-white">Prezzo: € {carta.prezzo}</p>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white text-xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer">
                <LiaCartPlusSolid size={20} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
