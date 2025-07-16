"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      userName,
      email,
      indirizzo,
      password,
    };

    if (password !== confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }

    try {
      const resp = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.message || `Errore ${resp.status}`);
      }
      router.push("/");
    } catch (e: any) {
      console.error("Registrazione fallita:", e);
      setError(e.message || "Qualcosa è andato storto");
    }
  };

  return (
    <div className="bg-white p-4">
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-12 p-6 bg-white rounded-md shadow"
        >
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  User Name
                </label>
                <input
                  id="userName"
                  name="UserName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-blue-700 text-white p-1 placeholder:text-white"
                  placeholder="GokuFan"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-md bg-blue-700 text-white p-1 placeholder:text-white"
                placeholder="Password"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full rounded-md bg-blue-700 text-white p-1 placeholder:text-white"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  First name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-blue-700 text-white p-1 placeholder:text-white"
                  placeholder="Mario "
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Last name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-blue-700 text-white p-1 placeholder:text-white"
                  placeholder="Rossi"
                />
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-blue-700 text-white p-1 placeholder:text-white"
                  placeholder="mario.rossi@qualcosa.com"
                />
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Indirizzo
                </label>
                <input
                  id="indirizzo"
                  name="indirizzo"
                  type="text"
                  autoComplete="email"
                  required
                  value={indirizzo}
                  onChange={(e) => setIndirizzo(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-blue-700 text-white p-1 placeholder:text-white"
                  placeholder="Via Vattelapesca n° 5"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="mt-6 flex justify-end gap-x-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
