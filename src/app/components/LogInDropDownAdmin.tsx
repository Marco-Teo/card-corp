"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { FiLogOut, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { logOut } from "../state/logInSlice";
import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  onClose: () => void;
}

interface CapsuleItemProps {
  children: ReactNode;
  icon: ReactNode;
  colorClass: string;
  href: string;
  onClick: () => void;
}

function CapsuleItem({
  children,
  icon,
  colorClass,
  href,
  onClick,
}: CapsuleItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex min-h-11 w-full items-center gap-3 rounded-full border border-white/80 px-2 py-1.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300 ${colorClass}`}
    >
      <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg shadow-inner">
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate text-left">{children}</span>
      <span className="h-6 w-2 shrink-0 rounded-full bg-white/70 shadow-inner" />
    </Link>
  );
}

export default function LogInDropDownAdmin({ onClose }: Props) {
  const open = useSelector((state: RootState) => state.menu.open);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  if (!open) return null;

  const closeMenuAndPropagate = () => {
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
    <div className="absolute right-0 z-40 mt-3 w-64 rounded-2xl border border-blue-100 bg-white/95 p-3 shadow-xl backdrop-blur">
      <div className="space-y-2">
        <CapsuleItem
          href="/creazioneCarta"
          onClick={handleAddCard}
          icon={<FiPlusCircle className="text-emerald-700" />}
          colorClass="bg-emerald-100 hover:bg-emerald-200"
        >
          Aggiungi Carta
        </CapsuleItem>
        <CapsuleItem
          href="/rimuoviCarta"
          onClick={handleRemoveCard}
          icon={<FiTrash2 className="text-red-700" />}
          colorClass="bg-red-100 hover:bg-red-200"
        >
          Rimuovi Carta
        </CapsuleItem>
        <CapsuleItem
          href="/"
          icon={<FiLogOut className="text-slate-700" />}
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
