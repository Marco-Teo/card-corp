"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
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
import type { ReactNode } from "react";

interface Props {
  onClose: () => void;
}

interface CapsuleItemProps {
  children: ReactNode;
  icon: ReactNode;
  colorClass: string;
  href?: string;
  onClick: () => void;
}

function CapsuleItem({
  children,
  icon,
  colorClass,
  href,
  onClick,
}: CapsuleItemProps) {
  const className = `group flex min-h-11 w-full items-center gap-3 rounded-full border border-white/80 bg-white px-2 py-1.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300 ${colorClass}`;
  const content = (
    <>
      <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg shadow-inner">
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate text-left">{children}</span>
      <span className="h-6 w-2 shrink-0 rounded-full bg-white/70 shadow-inner" />
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

export default function LogInDropdown({ onClose }: Props) {
  const open = useSelector((state: RootState) => state.menu.open);
  const dispatch = useDispatch<AppDispatch>();

  if (!open) return null;

  const handleClick = () => {
    onClose();
  };

  return (
    <div className="absolute right-0 z-40 mt-3 w-64 rounded-2xl border border-blue-100 bg-white/95 p-3 shadow-xl backdrop-blur">
      <div className="space-y-2">
        <CapsuleItem
          icon={<FiMessageSquare className="text-sky-700" />}
          colorClass="bg-sky-100 hover:bg-sky-200"
          onClick={handleClick}
        >
          Messaggi
        </CapsuleItem>
        <CapsuleItem
          icon={<FiSettings className="text-amber-700" />}
          colorClass="bg-amber-100 hover:bg-amber-200"
          onClick={handleClick}
        >
          Impostazioni
        </CapsuleItem>
        <CapsuleItem
          icon={<FiEdit className="text-emerald-700" />}
          colorClass="bg-emerald-100 hover:bg-emerald-200"
          onClick={handleClick}
        >
          Edit profile
        </CapsuleItem>
        <CapsuleItem
          href="/ordini"
          icon={<FaClipboardList className="text-blue-700" />}
          colorClass="bg-blue-100 hover:bg-blue-200"
          onClick={handleClick}
        >
          Ordini
        </CapsuleItem>
        <CapsuleItem
          href="/preferiti"
          icon={<FiHeart className="text-rose-700" />}
          colorClass="bg-rose-100 hover:bg-rose-200"
          onClick={handleClick}
        >
          Preferiti
        </CapsuleItem>
        <CapsuleItem
          href="/"
          icon={<FiLogOut className="text-red-700" />}
          colorClass="bg-slate-100 hover:bg-red-100"
          onClick={() => {
            dispatch(logOut());
            onClose();
          }}
        >
          Log out
        </CapsuleItem>
      </div>
    </div>
  );
}
