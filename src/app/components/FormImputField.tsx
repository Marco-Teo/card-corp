import {
  MagnifyingGlassIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent } from "react";

interface FormImputFieldProps {
  label: string;
  placeholder: string;
  iconName: "searchIcon" | "euroIcon";
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const iconMap = {
  searchIcon: MagnifyingGlassIcon,
  euroIcon: CurrencyEuroIcon,
};

export default function FormImputField({
  label,
  placeholder,
  iconName,
  value,
  name,
  onChange,
}: FormImputFieldProps) {
  const IconComponent = iconMap[iconName];
  return (
    <div className="flex flex-col ">
      <label className="block text-sm/6 font-medium text-blue-700">
        {label}
      </label>
      <div className="relative mt-2 grid grid-cols-1">
        <input
          id={label.toLowerCase()}
          name={name}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="col-start-1 row-start-1 block w-full rounded-md bg-blue-700 py-1.5 pr-3 pl-10 text-base text-white outline-1 -outline-offset-1 outline-white placeholder:text-white focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
        />
        <IconComponent
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 
                     h-5 w-5 text-white sm:h-4 sm:w-4"
        />
      </div>
    </div>
  );
}
