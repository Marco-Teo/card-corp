"use client";

import { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

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
      const res = await fetch(`http://localhost:8080/api/carte/${idInput}`, {
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
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Errore durante il caricamento.");
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
      const res = await fetch(`http://localhost:8080/api/carte/${carta.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Errore ${res.status}`);
      setSuccess(`Carta "${carta.nome}" eliminata con successo.`);
      setCarta(null);
      setIdInput("");
      setStep("done");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Errore durante l'eliminazione.");
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
    <div className="lex flex-col h-full bg-white p-4 ">
      <div className="container mx-auto flex-grow flex items-center justify-center">
        <div className="bg-white p-6 max-w-lg w-full rounded shadow text-black">
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
                  className="w-full border rounded px-2 py-1"
                  placeholder="Es. 123"
                  required
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Carica Carta
              </button>
            </form>
          )}

          {step === "confirm" && carta && (
            <div className="space-y-4">
              <div className="border rounded p-4">
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
                    className="mt-2 max-h-40 object-contain border"
                  />
                )}
              </div>
              <p className="font-medium">
                Sei sicuro di voler eliminare questa carta?
              </p>
              {error && <p className="text-red-600">{error}</p>}
              <div className="flex gap-2">
                <button
                  onClick={deleteCarta}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Sì, elimina
                </button>
                <button onClick={resetAll} className="px-4 py-2 border rounded">
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
                className="px-4 py-2 bg-indigo-600 text-white rounded"
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
