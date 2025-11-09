import type { User } from "@/app/generated/prisma/client";

export type safeUser = Omit<
  User | "createdAt" | "updatedAt" | "emailVerified",
  "hashedPassword"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
