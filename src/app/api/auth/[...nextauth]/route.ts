/* a component which handles the OAuth flow using next-auth */
import authOptions from "./authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
