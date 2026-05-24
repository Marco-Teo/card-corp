"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { toggleMenu } from "../state/menuSlice";
import { logOut } from "../state/logInSlice";
import {
  FiMessageSquare,
  FiSettings,
  FiEdit,
  FiHeart,
  FiLogOut,
} from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa";
import Link from "next/link";

interface Props {
  onClose: () => void;
}

export default function LogInDropdown({ onClose }: Props) {
  const open = useSelector((state: RootState) => state.menu.open);
  const dispatch = useDispatch<AppDispatch>();

  if (!open) return null;

  const handleClick = () => {
    dispatch(toggleMenu());
    onClose();
  };

  return (
    <div className="absolute right-0 z-30 mt-2 w-48 overflow-hidden rounded-lg border border-blue-100 bg-white shadow-lg">
      <a
        href="#"
        onClick={handleClick}
        className="flex min-h-11 items-center px-3 py-2 text-black hover:bg-blue-50"
      >
        <FiMessageSquare className="mr-2 text-blue-600" /> Messaggi
      </a>
      <a
        href="#"
        onClick={handleClick}
        className="flex min-h-11 items-center px-3 py-2 text-black hover:bg-blue-50"
      >
        <FiSettings className="mr-2 text-blue-600" /> Impostazioni
      </a>
      <a
        href="#"
        onClick={handleClick}
        className="flex min-h-11 items-center px-3 py-2 text-black hover:bg-blue-50"
      >
        <FiEdit className="mr-2 text-blue-600" /> Edit profile
      </a>
      <a
        href="/ordini"
        onClick={handleClick}
        className="flex min-h-11 items-center px-3 py-2 text-black hover:bg-blue-50"
      >
        <FaClipboardList className="mr-2 text-blue-600" /> Ordini
      </a>

      <a
        href="/preferiti"
        onClick={handleClick}
        className="flex min-h-11 items-center px-3 py-2 text-black hover:bg-blue-50"
      >
        <FiHeart className="mr-2 text-blue-600" /> Preferiti
      </a>

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
