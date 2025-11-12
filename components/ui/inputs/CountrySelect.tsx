/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCountries } from "@/hooks/useCountries";
import Image from "next/image";
import type { FC } from "react";

import Select from "react-select";

export type CountrySelectValue = {
  label: string;
  value: string;
  flag: string;
  latlng: number[];
  region: string;
  currency: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="Select a country"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex items-center gap-3">
            <Image
              src={option.flag}
              alt={`Flag of ${option.label}`}
              width={25}
              height={15}
            />

            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
            <span className="text-neutral-500">{option.region}</span>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          option: () => "text-lg",
          input: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
