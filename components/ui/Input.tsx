import type { FC } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import type z from "zod";
import { REGISTER_SCHEMA } from "@/validation/index";
import { BiDollar } from "react-icons/bi";
interface IProps {
  label?: string;
  type: string;
  placeholder?: string;
  field: UseFormRegisterReturn;
  name: keyof z.infer<typeof REGISTER_SCHEMA>;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
  isPrice?: boolean;
}
const Input: FC<IProps> = ({
  type,
  placeholder,
  field,
  error,
  disabled,
  isPrice,
  required,
  label,
}) => {
  return (
    <div className="w-full relative">
      {isPrice && (
        <BiDollar
          size={24}
          className="absolute text-neutral-700 top-5 left-2"
        />
      )}

      <input
        className={`peer w-full p-4 pt-6 outline-none focus:outline-none ring-1  rounded-md focus:ring-2 focus:ring-black ${
          error?.message ? "ring-red-500" : "ring-neutral-300"
        }`}
        required={required}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        {...field}
      />

      <label
        className={`
        absolute
        text-md
        duration-150
        transform
        -translate-y-3
        top-5
        z-10
        origin-left
        ${isPrice ? "" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        `}
      >
        {label}
      </label>
      {error && (
        <p className="text-red-500 font-semibold text-sm">{error.message}</p>
      )}
    </div>
  );
};

export default Input;
