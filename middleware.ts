import NextAuth from "next-auth";
import authConfig from "./app/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ["/home"],
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
