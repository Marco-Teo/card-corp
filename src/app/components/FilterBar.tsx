"use client";

import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store";
import DropDownMenu from "./DropDownMenu";
import FormImputField from "./FormImputField";
import { setFilters, resetFilters } from "../state/filterSlice";

export default function FiltersBar() {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    nome: "",
    rarita: "",
    min: "",
    max: "",
    ordine: "",
  });

  const DEFAULT_MIN = 0;
  const DEFAULT_MAX = 999999999;

  const RARITA_VALUES = [
    "ALTERNATE",
    "SECRET_RARE",
    "GOD_RARE",
    "SUPER_RARE",
    "LEADER",
    "UNCOMMON",
    "COMMON",
  ];
  const raritaOptions = RARITA_VALUES.map((r) => ({
    value: r,
    label: r.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      nome: form.nome,
      rarita: form.rarita,
      prezzoMin: form.min.trim() === "" ? DEFAULT_MIN : Number(form.min),
      prezzoMax: form.max.trim() === "" ? DEFAULT_MAX : Number(form.max),
      order: form.ordine,
    };

    dispatch(setFilters(payload));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setForm({
      nome: "",
      rarita: "",
      min: "",
      max: "",
      ordine: "",
    });
  };

  return (
    <section className="relative z-10 mx-auto w-full max-w-[960px] px-4 pt-4 sm:px-6">
      <div className="content-panel p-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-4"
        >
          <div className="grid w-full grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr_1fr_auto]">
            <div className="flex min-w-0 flex-col">
              <FormImputField
                label="Nome"
                placeholder="Nome"
                iconName="searchIcon"
                name="nome"
                value={form.nome}
                onChange={
                  handleChange as React.ChangeEventHandler<HTMLInputElement>
                }
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <DropDownMenu
                label="Rarità"
                name="rarita"
                value={form.rarita}
                options={raritaOptions}
                onChange={handleChange}
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <label className="block text-sm font-medium text-blue-700 mb-2"></label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormImputField
                  label="Minimo"
                  placeholder="Min"
                  iconName="euroIcon"
                  name="min"
                  value={form.min}
                  onChange={
                    handleChange as React.ChangeEventHandler<HTMLInputElement>
                  }
                />
                <FormImputField
                  label="Massimo"
                  placeholder="Max"
                  iconName="euroIcon"
                  name="max"
                  value={form.max}
                  onChange={
                    handleChange as React.ChangeEventHandler<HTMLInputElement>
                  }
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-col">
              <DropDownMenu
                label="Ordina per"
                name="ordine"
                value={form.ordine}
                options={[
                  { value: "prezzo", label: "Prezzo" },
                  { value: "alfabetico", label: "Alfabetico" },
                ]}
                onChange={handleChange}
              />
            </div>

            <div className="flex w-full gap-2 md:col-span-2 lg:col-span-1 lg:w-auto">
              <button
                type="submit"
                className="min-h-11 flex-1 rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs ring-1 ring-blue-700 ring-inset hover:bg-blue-800 lg:flex-none"
              >
                Cerca
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="min-h-11 flex-1 rounded-full bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs ring-1 ring-red-700 ring-inset hover:bg-red-800 lg:flex-none"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
