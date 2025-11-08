"use client";
import type { FC, MouseEvent } from "react";
import type { IconType } from "react-icons";

interface IProps {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const MyButton: FC<IProps> = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  outline,
  small,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
        ${
          outline
            ? "bg-white border-black text-black"
            : "bg-rose-500 border-rose-500 text-white"
        }
        ${
          small
            ? "py-1 text-sm font-light border"
            : "py-3 text-semibold font-semibold border-2"
        }
        `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default MyButton;
