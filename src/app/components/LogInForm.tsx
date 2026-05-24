"use client";

import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../state/logInSlice";
import type { AppDispatch } from "../state/store";
import { useRouter } from "next/navigation";
import { apiUrl } from "../lib/api";

interface LogInFormProps {
  onClose: () => void;
}

export default function LogInForm({ onClose }: LogInFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const resp = await fetch(apiUrl("/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier, password }),
      });
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.message || `Errore ${resp.status}`);
      }

      const token = await resp.text();
      localStorage.setItem("authToken", token);

      const profileResp = await fetch(apiUrl("/utente"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!profileResp.ok) {
        throw new Error("Impossibile recuperare il profilo utente");
      }
      const user = await profileResp.json();

      dispatch(
        logIn({
          username: user.userName,
          token,
          role: user.ruolo as "USER" | "ADMIN",
          userId: user.id,
        })
      );

      onClose();
      router.push("/");
    } catch (e: unknown) {
      console.error("Login fallito:", e);
      setError(e instanceof Error ? e.message : "Login fallito, riprova.");
    }
  };

  const goToRegister = () => {
    onClose();
    router.push("/registrazione");
  };

  return (
    <div className="bg-white">
      <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-4 sm:px-6 sm:py-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Card Corp"
            src="/MARCO.svg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nome utente o email
              </label>
              <div className="mt-2">
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block min-h-11 w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-blue-100 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-700 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-700 hover:text-blue-600"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block min-h-11 w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-blue-100 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-700 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex min-h-11 w-full justify-center rounded-full bg-blue-700 px-4 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Sign in
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-center text-sm">{error}</p>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Non sei ancora registrato?{" "}
            <button
              onClick={goToRegister}
              className="font-semibold text-blue-700 hover:text-blue-600"
            >
              Iscriviti
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
