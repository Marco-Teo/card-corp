"use client";

import { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { apiUrl } from "../lib/api";

interface Carta {
  id: number;
  nome: string;
  descrizione: string;
  urlImmagine: string;
  prezzo: number;
  rarita: string;
}

export default function RimuoviCartaPage() {
  const [idInput, setIdInput] = useState<string>("");
  const [carta, setCarta] = useState<Carta | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"search" | "confirm" | "done">("search");
  const [success, setSuccess] = useState<string | null>(null);
  const token = useSelector((s: RootState) => s.logIn.token);

  const loadCarta = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setCarta(null);
    if (!token) {
      setError("Devi essere autenticato per cercare una carta.");
      return;
    }
    if (!/^\d+$/.test(idInput.trim())) {
      setError("Inserisci un ID numerico valido.");
      return;
    }
    try {
      const res = await fetch(apiUrl(`/api/carte/${idInput}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 404) {
        setError(`Carta con ID ${idInput} non trovata.`);
        return;
      }
      if (!res.ok) throw new Error(`Errore ${res.status}`);
      const data: Carta = await res.json();
      setCarta(data);
      setStep("confirm");
    } catch (err: unknown) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Errore durante il caricamento."
      );
    }
  };

  const deleteCarta = async () => {
    if (!token) {
      setError("Devi essere autenticato per eliminare una carta.");
      return;
    }
    if (!carta) return;
    setError(null);
    try {
      const res = await fetch(apiUrl(`/api/carte/${carta.id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Errore ${res.status}`);
      setSuccess(`Carta "${carta.nome}" eliminata con successo.`);
      setCarta(null);
      setIdInput("");
      setStep("done");
    } catch (err: unknown) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Errore durante l'eliminazione."
      );
    }
  };

  const resetAll = () => {
    setError(null);
    setSuccess(null);
    setCarta(null);
    setIdInput("");
    setStep("search");
  };

  return (
    <div className="content-panel p-4 sm:p-6">
      <div className="mx-auto flex max-w-lg items-center justify-center">
        <div className="w-full text-black">
          <h1 className="text-2xl font-bold mb-4">Rimuovi Carta</h1>

          {step === "search" && (
            <form onSubmit={loadCarta} className="space-y-4">
              <div>
                <label className="block font-medium">
                  ID della carta da caricare
                </label>
                <input
                  type="text"
                  value={idInput}
                  onChange={(e) => setIdInput(e.target.value)}
                  className="mt-2 min-h-11 w-full rounded-full border border-blue-100 px-4 py-2"
                  placeholder="Es. 123"
                  required
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                className="min-h-11 rounded-full bg-blue-700 px-5 py-2 text-white hover:bg-blue-600"
              >
                Carica Carta
              </button>
            </form>
          )}

          {step === "confirm" && carta && (
            <div className="space-y-4">
              <div className="rounded-lg border border-blue-100 p-4">
                <p>
                  <strong>ID:</strong> {carta.id}
                </p>
                <p>
                  <strong>Nome:</strong> {carta.nome}
                </p>
                <p>
                  <strong>Descrizione:</strong> {carta.descrizione}
                </p>
                <p>
                  <strong>Prezzo:</strong> €{carta.prezzo.toFixed(2)}
                </p>
                <p>
                  <strong>Rarità:</strong> {carta.rarita.replace(/_/g, " ")}
                </p>
                {carta.urlImmagine && (
                  <img
                    src={carta.urlImmagine}
                    alt={carta.nome}
                    className="mt-3 max-h-48 w-full rounded-lg border object-contain"
                  />
                )}
              </div>
              <p className="font-medium">
                Sei sicuro di voler eliminare questa carta?
              </p>
              {error && <p className="text-red-600">{error}</p>}
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={deleteCarta}
                  className="min-h-11 rounded-full bg-red-600 px-5 py-2 text-white hover:bg-red-500"
                >
                  Sì, elimina
                </button>
                <button
                  onClick={resetAll}
                  className="min-h-11 rounded-full border border-blue-100 px-4 py-2"
                >
                  Annulla
                </button>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="space-y-4">
              {success && <p className="text-green-600">{success}</p>}
              <button
                onClick={resetAll}
                className="min-h-11 rounded-full bg-blue-700 px-5 py-2 text-white hover:bg-blue-600"
              >
                Elimina un’altra carta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
