"use client";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const Container = ({ children }: Props) => {
  return (
    <div className="max-w-[2520px] mx-auto px-4 sm:px-2 md:px-10 lg:px-20">
      {children}
    </div>
  );
};

export default Container;
