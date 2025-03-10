import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handlers = NextAuth(authOptions);

export { handlers };