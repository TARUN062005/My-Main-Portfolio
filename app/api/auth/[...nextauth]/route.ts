import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { handlers } from "@/lib/auth-utils";

export const { GET, POST } = handlers;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Replace this with your own logic to validate the credentials
        if (credentials.username === "admin" && credentials.password === "password") {
          return { id: 1, name: "Admin" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});