"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";

import { toggleMenu } from "../state/menuSlice";
import { logOut } from "../state/logInSlice";
import {
  FiMessageSquare,
  FiSettings,
  FiEdit,
  FiInfo,
  FiHeart,
  FiBox,
  FiLogOut,
} from "react-icons/fi";
import Link from "next/link";

export default function LogInDropdown() {
  const open = useSelector((state: RootState) => state.menu.open);
  const dispatch = useDispatch<AppDispatch>();

  if (!open) return null;

  const handleClick = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
      <a
        href="#"
        onClick={handleClick}
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiMessageSquare className="mr-2 text-blue-600" /> Messaggi
      </a>
      <a
        href="#"
        onClick={handleClick}
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiSettings className="mr-2 text-blue-600" /> Impostazioni
      </a>
      <a
        href="#"
        onClick={handleClick}
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiEdit className="mr-2 text-blue-600" /> Edit profile
      </a>
      <a
        href="#"
        onClick={handleClick}
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiInfo className="mr-2 text-blue-600" /> Informazioni
      </a>

      <Link
        href="/preferiti"
        prefetch={false}
        onClick={handleClick}
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiHeart className="mr-2 text-blue-600" /> Preferiti
      </Link>

      <Link
        href="/collezione"
        onClick={handleClick}
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiBox className="mr-2 text-blue-600" /> Collezione
      </Link>

      <a
        href="#"
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
