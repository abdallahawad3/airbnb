/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, type FC } from "react";
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

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 cursor-pointer hover:scale-105 transition ${
        selected
          ? "border-b-2 border-black text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}
    >
      <IconType size={24} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
