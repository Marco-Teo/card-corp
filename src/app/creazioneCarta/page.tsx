"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { apiUrl } from "../lib/api";

export default function CreazioneCartaPage() {
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [urlImmagine, setUrlImmagine] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [raritaOptions, setRaritaOptions] = useState<string[]>([]);
  const [rarita, setRarita] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.logIn.token);

  useEffect(() => {
    fetch(apiUrl("/api/carte/rarities"))
      .then((res) => {
        if (!res.ok) throw new Error("Impossibile recuperare le rarità");
        return res.json();
      })
      .then((data: string[]) => {
        setRaritaOptions(data);
        if (data.length > 0) setRarita(data[0]);
      })
      .catch((err) => {
        console.error(err);
        setError("Errore nel caricamento delle rarità");
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        nome,
        descrizione,
        urlImmagine,
        prezzo: parseFloat(prezzo),
        rarita,
      };
      const resp = await fetch(apiUrl("/api/carte"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.message || `Errore ${resp.status}`);
      }

      setNome("");
      setDescrizione("");
      setUrlImmagine("");
      setPrezzo("");
      if (raritaOptions.length > 0) {
        setRarita(raritaOptions[0]);
      }

      setSuccess("Carta aggiunta!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Errore durante il salvataggio");
    }
  };

  return (
    <div className="content-panel p-4 sm:p-6">
      <div className="mx-auto max-w-xl">
        <div className="text-black">
          <h1 className="text-2xl font-bold mb-4">Aggiungi Carta</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Nome</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-2 min-h-11 w-full rounded-full border border-blue-100 px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Descrizione</label>
              <textarea
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
                className="mt-2 min-h-28 w-full rounded-lg border border-blue-100 px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">URL Immagine</label>
              <input
                type="url"
                value={urlImmagine}
                onChange={(e) => setUrlImmagine(e.target.value)}
                className="mt-2 min-h-11 w-full rounded-full border border-blue-100 px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Prezzo</label>
              <input
                type="number"
                step="0.01"
                value={prezzo}
                onChange={(e) => setPrezzo(e.target.value)}
                className="mt-2 min-h-11 w-full rounded-full border border-blue-100 px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Rarità</label>
              <select
                value={rarita}
                onChange={(e) => setRarita(e.target.value)}
                className="mt-2 min-h-11 w-full rounded-full border border-blue-100 px-4 py-2"
                required
              >
                {raritaOptions.map((r) => (
                  <option key={r} value={r}>
                    {r.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <div className="flex flex-col justify-end gap-2 sm:flex-row">
              <button
                type="reset"
                onClick={() => {
                  setNome("");
                  setDescrizione("");
                  setUrlImmagine("");
                  setPrezzo("");
                  if (raritaOptions.length > 0) setRarita(raritaOptions[0]);
                  setError(null);
                  setSuccess(null);
                }}
                className="min-h-11 rounded-full border border-blue-100 px-4 py-2"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="min-h-11 rounded-full bg-blue-700 px-5 py-2 text-white hover:bg-blue-600"
              >
                Aggiungi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
