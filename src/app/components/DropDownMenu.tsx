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
      <label className="mb-2 block text-sm font-medium text-blue-700">
        {label}
      </label>
      <Menu as="div" className="relative inline-block w-full text-left">
        <MenuButton className="inline-flex min-h-11 w-full items-center justify-between gap-x-1.5 rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-blue-700 hover:bg-blue-800">
          <span className="truncate">{currentLabel}</span>
          <ChevronDownIcon className="h-5 w-5 shrink-0 text-blue-100" />
        </MenuButton>

        <MenuItems className="absolute right-0 z-30 mt-1 w-full origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {options.map((opt) => (
              <MenuItem key={opt.value} as={Fragment}>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-700"
                    } block w-full px-4 py-2 text-left text-sm`}
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
