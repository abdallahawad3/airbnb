"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/redux/store";
import { onOpen } from "@/redux/features/register/registerSlice";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isOpen: openModal } = useAppSelector(
    (state: RootState) => state.register
  );
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb Your Home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-2 md:px-4 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer transition hover:shadow-md"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="absolute rounded-xl  shadow-md w-[20vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem
                onClick={() => {
                  dispatch(onOpen());
                }}
                label="Register"
              />
            </>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserMenu;
