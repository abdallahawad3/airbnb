/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, type FC } from "react";
import type { IconType } from "react-icons";
import qs from "query-string";
interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({
  label,
  icon: IconType,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  if (!mounted) {
    return null;
  }
  const isSelected = selected; // or compute from params

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-2 cursor-pointer hover:scale-105 transition ${
        isSelected
          ? "border-b-2 border-black text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}
    >
      <IconType size={14} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
