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

export default function LogInDropdown() {
  const open = useSelector((state: RootState) => state.menu.open);
  const dispatch = useDispatch();

  if (!open) return null;

  return (
    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
      <a
        href="#"
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiMessageSquare className="mr-2 text-blue-600" /> messaggi
      </a>
      <a
        href="#"
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiSettings className="mr-2 text-blue-600" /> impostazioni
      </a>
      <a
        href="#"
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiEdit className="mr-2 text-blue-600" /> edit profile
      </a>
      <a
        href="#"
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiInfo className="mr-2 text-blue-600" /> informazioni
      </a>
      <a
        href="#"
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiHeart className="mr-2 text-blue-600" /> preferiti
      </a>
      <a
        href="#"
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiBox className="mr-2 text-blue-600" /> Collezione
      </a>
      <a
        href="#"
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
        onClick={() => {
          dispatch(logOut());
          dispatch(toggleMenu());
        }}
      >
        <FiLogOut className="mr-2 text-blue-600" />
        log out
      </a>
    </div>
  );
}
