"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  const router = useRouter();
  return (
    <Image
      src="/images/logo.webp"
      alt="Logo"
      width={100}
      height={50}
      className="hidden md:block cursor-pointer w-24 h-auto"
      onClick={() => router.push("/")}
      loading="eager"
    />
  );
};

export default Logo;
