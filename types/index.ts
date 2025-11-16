import type { User, Listing, Reservation } from "@/app/generated/prisma/client";

export type safeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "hashedPassword"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
export type safeListing = Omit<Listing, "createdAt" | "updatedAt"> & {
  createdAt: string;
};

export type safeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
};
