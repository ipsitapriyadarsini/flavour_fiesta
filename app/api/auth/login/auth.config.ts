// /** @type {import('next').NextConfig} */
import { Adapter } from 'next-auth/adapters';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/database';
import type { NextAuthConfig } from 'next-auth';
import dbConnect from '@/database/db';
import User from '@/database/model/user.model';
import Role from '@/database/model/role.model';

const authUrls = ['/login', 'signup', '/admin/login', '/admin/signup'];

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  adapter: <Adapter>MongoDBAdapter(clientPromise),
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        const { pathname } = nextUrl;
        console.log({ pathname });
        if (authUrls.includes(pathname))
          return Response.redirect(new URL('/', nextUrl));

        return true;
        // Response.redirect(new URL(nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      await dbConnect();

      if (user) {
        const userData = await User.findById(user.id);
        if (userData.roles.length === 0) {
          const userRole = await Role.findOne({ name: 'user' });
          userData.roles.push(userRole);
          await userData.save();
        }
        token.user = { ...user, roles: userData.roles };
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  providers: [],
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;

export default authConfig;
