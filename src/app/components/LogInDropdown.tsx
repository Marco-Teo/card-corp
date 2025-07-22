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
        href="/ordini"
        onClick={handleClick}
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FaClipboardList className="mr-2 text-blue-600" /> Ordini
      </a>

      <a
        href="/preferiti"
        onClick={handleClick}
        className="flex items-center px-3 py-2 hover:bg-gray-100 text-black"
      >
        <FiHeart className="mr-2 text-blue-600" /> Preferiti
      </a>

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
