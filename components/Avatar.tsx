"use client";

import Image from "next/image";

const Avatar = ({ image }: { image?: string | null }) => {
  return (
    <Image
      loading="eager"
      src={image || "/images/placeholder.webp"}
      className="rounded-full"
      alt="Avatar"
      height={30}
      width={30}
    />
  );
};

export default Avatar;
