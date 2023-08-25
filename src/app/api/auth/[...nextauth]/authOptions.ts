import {
  User,
  createUser,
  getUserById,
  isUserAdmin,
  isUserPoster,
} from "@/db/auth";
import { Account, AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";

const schema = z.object({
  NEXTAUTH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

const env = schema.parse(process.env);

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    maxAge: 5 * 24 * 60 * 60, // 5 days
  },
  callbacks: {
    async signIn({ user }) {
      const dbUser = await getUserById(user.id);
      if (!dbUser) {
        const newUser: User = {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
          poster: false,
          admin: false,
        };
        await createUser(newUser);
      }
      return true;
    },
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (account) {
        token.poster = await isUserPoster(account.providerAccountId ?? "0");
        token.admin = await isUserAdmin(account.providerAccountId ?? "0");
        token.id = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.poster = token.poster;
      session.user.admin = token.admin;
      session.user.id = token.id;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: env.NEXTAUTH_SECRET,
};

export default authOptions;
