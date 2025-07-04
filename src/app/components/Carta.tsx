"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCarte } from "../state/cartaSlice";
import type { RootState } from "../state/store";
import { LiaCartPlusSolid } from "react-icons/lia";
import Link from "next/link";

export default function Carta() {
  const dispatch = useDispatch();
  const carte = useSelector((state: RootState) => state.carta.carte);

  useEffect(() => {
    const fetchCarte = async () => {
      const response = await fetch("http://localhost:8080/api/carte");
      const data = await response.json();
      console.log("Fetched carte:", data);
      dispatch(setCarte(data));
    };

    fetchCarte();
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
      {carte.map((carta) => (
        <div key={carta.id} className=" bg-[#2d2d2d]  p-4 rounded-lg shadow-md">
          <div className="max-w-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <div className="flex justify-center p-4 bg-[#282828]">
                <img
                  className="h-48 object-contain"
                  src={carta.urlImmagine || "https://via.placeholder.com/150"}
                  alt={carta.nome}
                />
              </div>
            </a>
            <div className="p-5 bg-[#2d2d2d]">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {carta.nome}
              </h5>
              <p className="mb-1 font-normal text-white ">
                Descrizione: {carta.descrizione}
              </p>

              <p className="mb-3 font-normal text-white">
                Rarità: {carta.rarita}
              </p>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#2d2d2d] rounded-b-lg">
              <p className="mb-1 font-normal text-white ">
                Prezzo: € {carta.prezzo}
              </p>
              <button className="w-15 h-15 flex items-center justify-center rounded-full bg-blue-700 text-white text-xl leading-none hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer">
                <LiaCartPlusSolid className="text-white" size={24} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
