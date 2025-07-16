"use client";
import DropDownMenu from "./DropDownMenu";
import FormImputField from "./FormImputField";

export default function FiltersBar() {
  return (
    <div className="bg-white p-4">
      <div className="container mx-auto">
        <form className="flex flex-col lg:flex-row items-start lg:items-center justify-start gap-4">
          <div className="flex flex-col lg:flex-row items-end gap-4 w-full justify-between">
            <div className="flex flex-col w-full lg:w-auto">
              <FormImputField
                label="Nome"
                placeholder="Nome"
                iconName="searchIcon"
              />
            </div>

            <div className="flex flex-col w-full lg:w-auto">
              <FormImputField
                label="Edizione"
                placeholder="Edizione"
                iconName="searchIcon"
              />
            </div>
            <div className="flex flex-col w-full lg:w-auto">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Range prezzo
                </label>
                <div className="flex flex-col md:flex-row gap-4">
                  <FormImputField
                    label="Minimo"
                    placeholder="Min"
                    iconName="euroIcon"
                  />
                  <FormImputField
                    label="Massimo"
                    placeholder="Max"
                    iconName="euroIcon"
                  />
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
              className="rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-blue-100 w-50 hover:text-black mx-auto lg:mx-0 "
            >
              Cerca
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
