"use client";

import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      src={"/images/placeholder.webp"}
      className="rounded-full"
      alt="Avatar"
      height={30}
      width={30}
    />
  );
};

export default Avatar;
