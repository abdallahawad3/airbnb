import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Providers } from "./Providers";
import RegisterModal from "@/components/models/RegisterModal";
import LoginModal from "@/components/models/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "@/components/models/RentModal";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "An Airbnb clone built with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <Providers>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
