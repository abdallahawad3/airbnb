import type { User, Listing } from "@/app/generated/prisma/client";

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
