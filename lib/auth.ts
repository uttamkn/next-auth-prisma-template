import NextAuth, { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(credentials.password as string, salt);

        let user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              hashedPassword: hash,
            },
          });
        } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.hashedPassword as string,
          );
          if (!isMatch) {
            throw new Error("Incorrect password.");
          }
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(authOptions);
