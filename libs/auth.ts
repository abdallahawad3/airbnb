/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prismadb";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Optional: Validate credentials with Zod
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma as any),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ──────── Credentials Provider ────────
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Filter only email & password
          const { email, password } = credentials ?? {};
          if (!email || !password) return null;

          // Validate only the fields we care about
          const parsed = loginSchema.parse({ email, password });

          const user = await prisma.user.findUnique({
            where: { email: parsed.email }, // يجب التأكد أن email موجود
            select: {
              id: true,
              email: true,
              name: true,
              image: true,
              hashedPassword: true,
            },
          });

          if (!user?.hashedPassword) return null;

          const valid = await bcrypt.compare(
            parsed.password,
            user.hashedPassword
          );
          if (!valid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name ?? null,
            image: user.image ?? null,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),

    // ──────── OAuth Providers ────────
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // 🧩 هذا هو الجزء الأهم: ربط الحسابات إذا كان المستخدم موجودًا بالفعل
    async signIn({ user, account }) {
      if (!user?.email || !account) return false;
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        // تحقق مما إذا كان الـ provider مربوط بالفعل
        const linkedAccount = await prisma.account.findFirst({
          where: {
            userId: existingUser.id,
            provider: account.provider,
          },
        });

        // لو مش مربوط، نربطه الآن
        if (!linkedAccount) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state:
                typeof account.session_state === "string"
                  ? account.session_state
                  : account.session_state
                  ? String(account.session_state)
                  : null,
            },
          });
        }

        // ✅ نربط المستخدم الحالي الموجود بالـ provider الجديد
        user.id = existingUser.id;
      }

      return true; // السماح بتسجيل الدخول
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
