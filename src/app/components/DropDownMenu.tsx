"use client";

import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Option {
  value: string;
  label: string;
}

interface DropDownMenuProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (e: { target: { name: string; value: string } }) => void;
}

export default function DropDownMenu({
  label,
  name,
  value,
  options,
  onChange,
}: DropDownMenuProps) {
  const currentLabel =
    options.find((opt) => opt.value === value)?.label || "Seleziona...";

  return (
    <>
      <label className="block text-sm font-medium text-blue-700 mb-2">
        {label}
      </label>
      <Menu as="div" className="relative inline-block text-left w-full">
        <MenuButton className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 hover:bg-blue-100 hover:text-black">
          <span>{currentLabel}</span>
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </MenuButton>

        <MenuItems className="absolute right-0 z-10 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {options.map((opt) => (
              <MenuItem key={opt.value} as={Fragment}>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-700"
                    } block w-full text-left px-4 py-2 text-sm`}
                    onClick={() =>
                      onChange({ target: { name, value: opt.value } })
                    }
                  >
                    {opt.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}
