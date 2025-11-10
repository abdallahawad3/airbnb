"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  const router = useRouter();
  return (
    <Image
      loading="eager"
      src={"/images/logo.jpg"}
      alt="Logo"
      className="hidden md:block cursor-pointer aspect-5/2"
      width={100}
      height={50}
      onClick={() => router.push("/")}
      objectFit="contain"
    />
  );
};

export default Logo;
