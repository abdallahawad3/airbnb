import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Modal from "@/components/models/Modal";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Providers } from "./Providers";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "An Airbnb clone built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <Providers>
          {/* <Modal actionLabel="Submit" isOpen title="Login" /> */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
