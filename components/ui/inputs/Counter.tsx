"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}
const Counter = ({ title, subtitle, value, onChange }: CounterProps) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          disabled={value <= 1}
          onClick={onReduce}
          className={` flex items-center justify-center cursor-pointer w-10 h-10 rounded-full border border-neutral-400 text-neutral-600 hover:opacity-80 transition ${
            value <= 1
              ? "opacity-40 cursor-not-allowed pointer-events-none"
              : ""
          }`}
        >
          <AiOutlineMinus />
        </button>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <button
          onClick={onAdd}
          className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full border border-neutral-400 text-neutral-600 hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};
export default Counter;
