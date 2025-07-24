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
    <div className="bg-white p-4">
      <div className="container mx-auto">
        <form
          onSubmit={handleSearch}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-start gap-4"
        >
          <div className="flex flex-col lg:flex-row items-end gap-4 w-full justify-between">
            <div className="flex flex-col w-full lg:w-auto">
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

            <div className="flex flex-col w-full lg:w-auto">
              <DropDownMenu
                label="Rarità"
                name="rarita"
                value={form.rarita}
                options={raritaOptions}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full lg:w-auto">
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Range prezzo
              </label>
              <div className="flex flex-col md:flex-row gap-4">
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

            <div className="flex flex-col w-full lg:w-auto">
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

            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-blue-100 hover:text-black"
              >
                Cerca
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-white hover:text-black"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
