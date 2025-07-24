"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

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
    fetch("http://localhost:8080/api/carte/rarities")
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
      const resp = await fetch("http://localhost:8080/api/carte", {
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
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    }
  };

  return (
    <div className="bg-white p-4">
      <div className="container mx-auto">
        <div className="max-w-xl mx-auto p-6 rounded shadow text-black">
          <h1 className="text-2xl font-bold mb-4">Aggiungi Carta</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Nome</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Descrizione</label>
              <textarea
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">URL Immagine</label>
              <input
                type="url"
                value={urlImmagine}
                onChange={(e) => setUrlImmagine(e.target.value)}
                className="w-full border rounded px-2 py-1"
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
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Rarità</label>
              <select
                value={rarita}
                onChange={(e) => setRarita(e.target.value)}
                className="w-full border rounded px-2 py-1"
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

            <div className="flex justify-end gap-2">
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
                className="px-4 py-2 border rounded"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded"
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
