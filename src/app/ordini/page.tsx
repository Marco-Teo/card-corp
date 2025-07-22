"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

interface Ordine {
  id: number;
  dataOrdine: string;
  indirizzo: string;
  carteOrdinate: any[];
}

export default function OrdiniPage() {
  const [ordini, setOrdini] = useState<Ordine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    console.log("🔑 token dal storage:", token);
    if (!token) {
      setError("Non sei autenticato");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const prof = await fetch("http://localhost:8080/utente", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!prof.ok) throw new Error("Impossibile recuperare profilo");
        const user = await prof.json();
        console.log("👤 utente:", user);

        const resp = await fetch(
          `http://localhost:8080/ordini/user/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data: Ordine[] = await resp.json();
        setOrdini(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return <div className="p-8 text-center text-red-600">Errore: {error}</div>;
  if (ordini.length === 0)
    return <div className="p-8 text-center">Nessun ordine trovato.</div>;

  return (
    <main className="container lg:mx-auto lg:py-8 container mx-auto px-4 py-4 sm:grid-cols-2 md:grid-cols-3">
      <h1 className="mb-6 text-2xl font-bold text-black ">I tuoi ordini</h1>
      <ul className="space-y-4">
        {ordini.map((o) => (
          <li key={o.id} className="border rounded-lg p-4">
            <p className="font-semibold text-blue-700">Ordine #{o.id}</p>
            <p className="text-sm text-gray-600">
              {new Date(o.dataOrdine).toLocaleDateString()}
            </p>
            <p className="mt-1 text-gray-700">{o.indirizzo}</p>
            <p className="mt-2 text-sm text-gray-800">
              Articoli: {o.carteOrdinate.length}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
