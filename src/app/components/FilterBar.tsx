"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import DropDownMenu from "./DropDownMenu";

export default function FiltersBar() {
  return (
    <div className="bg-blue-700 p-4">
      <div className="container mx-auto">
        <form className="flex flex-col lg:flex-row items-start lg:items-center justify-start gap-4">
          <div className="flex flex-col lg:flex-row items-end gap-4 w-full justify-between">
            <div className="flex flex-col w-full lg:w-auto">
              <label className="block text-sm/6 font-medium text-white">
                Edizione
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="edizione"
                  name="edizione"
                  type="text"
                  placeholder="edizione"
                  className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
                />
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
                />
              </div>
            </div>

            <div className="flex flex-col w-full lg:w-auto">
              <label className="block text-sm/6 font-medium text-white">
                Nome
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="nome"
                  className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
                />
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
                />
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-auto">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Range prezzo
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 w-full">
                    <span className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                      €
                    </span>
                    <input
                      id="min-price"
                      name="min-price"
                      type="text"
                      placeholder="Min"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>

                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 w-full">
                    <span className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                      €
                    </span>
                    <input
                      id="max-price"
                      name="max-price"
                      type="text"
                      placeholder="Max"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full mt-4 items-start lg:w-auto">
              <DropDownMenu
                label="Ordina per"
                actionName="seleziona un oridnamento"
                options={[
                  { label: "prezzo" },
                  { label: "rarità" },
                  { label: "alfabetico" },
                ]}
              />
            </div>

            <button
              type="button"
              className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-blue-100 w-50"
            >
              Cerca
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
