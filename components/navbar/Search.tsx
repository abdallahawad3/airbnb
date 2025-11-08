"use client";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="border border-gray-200 w-full md:w-auto rounded-full shadow-sm hover:shadow-md transition-colors cursor-pointer py-2">
      <div className="flex items-center justify-between">
        <div
          className="
          text-sm
          font-semibold
          px-6
          "
        >
          Hello World
        </div>
        <div
          className="
        hidden
        sm:block
        text-sm
        font-semibold
        px-6
        border-x
        border-gray-200
        flex-1
        text-center
        "
        >
          Any Week
        </div>
        <div
          className="
      text-sm
      pl-6
      pr-2
      text-gray-600
      flex
      flex-row
      items-center
      gap-3
      "
        >
          <div className="hidden sm:block">Add Guest</div>
          <div className="p-2 bg-rose-500 text-white rounded-full">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
