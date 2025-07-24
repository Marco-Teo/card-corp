"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { toggleMenu } from "../state/menuSlice";
import { FiLogOut, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { logOut } from "../state/logInSlice";
import Link from "next/link";

interface Props {
  onClose: () => void;
}

export default function LogInDropDownAdmin({ onClose }: Props) {
  const open = useSelector((state: RootState) => state.menu.open);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  if (!open) return null;

  const closeMenuAndPropagate = () => {
    dispatch(toggleMenu());
    onClose();
  };

  const handleAddCard = () => {
    closeMenuAndPropagate();
    router.push("/creazioneCarta");
  };

  const handleRemoveCard = () => {
    closeMenuAndPropagate();
    router.push("/rimuoviCarta");
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
      <Link
        href="/creazioneCarta"
        onClick={handleAddCard}
        className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiPlusCircle className="mr-2 text-green-600" /> Aggiungi Carta
      </Link>
      <Link
        href="/rimuoviCarta"
        onClick={handleRemoveCard}
        className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiTrash2 className="mr-2 text-red-600" /> Rimuovi Carta
      </Link>

      <a
        href="/"
        onClick={() => {
          dispatch(logOut());
          dispatch(toggleMenu());
        }}
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiLogOut className="mr-2 text-blue-600" />
        Log out
      </a>
    </div>
  );
}
