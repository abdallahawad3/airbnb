"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  const router = useRouter();
  return (
    <Image
      src={"/images/logo.webp"}
      alt="Logo"
      className="hidden md:block cursor-pointer object-contain"
      width={100}
      height={100}
    />
  );
};

export default Logo;
