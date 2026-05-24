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
    <div className="absolute right-0 z-30 mt-2 w-52 overflow-hidden rounded-lg border border-blue-100 bg-white shadow-lg">
      <Link
        href="/creazioneCarta"
        onClick={handleAddCard}
        className="flex min-h-11 w-full items-center px-3 py-2 text-black hover:bg-blue-50"
      >
        <FiPlusCircle className="mr-2 text-green-600" /> Aggiungi Carta
      </Link>
      <Link
        href="/rimuoviCarta"
        onClick={handleRemoveCard}
        className="flex min-h-11 w-full items-center px-3 py-2 text-black hover:bg-blue-50"
      >
        <FiTrash2 className="mr-2 text-red-600" /> Rimuovi Carta
      </Link>

      <Link
        href="/"
        onClick={() => {
          dispatch(logOut());
          dispatch(toggleMenu());
        }}
        className="flex min-h-11 items-center px-3 py-2 text-black hover:bg-blue-50"
      >
        <FiLogOut className="mr-2 text-blue-600" />
        Log out
      </Link>
    </div>
  );
}
