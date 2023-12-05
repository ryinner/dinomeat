import { prisma } from '@/services/lib/prisma.service';
import { checkPassword, userFindOne } from '@/services/orm/users.service';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, User } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';
import VkProvider from 'next-auth/providers/vk';

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    VkProvider({
      clientId: process.env.NEXT_PUBLIC_VK_ID,
      clientSecret: process.env.VK_SECRET
    }),
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'пароль', type: 'password', required: true }
      },
      async authorize(credentials, req) {
        if (credentials === undefined) {
          return null;
        }
        const { email, password } = credentials;
        const user = await userFindOne({ where: { email } });

        if (!user || user.password === null) {
          return null;
        }

        if (await checkPassword(password, user.password)) {
          user.password = null;
          return user as User;
        }

        return null;
      },
    })
  ],
  callbacks: {
    // Занимаюсь мутацией т.к. вк возвращает ломающие штуки
    async signIn ({ user, account, profile, email, credentials }) {
      if (account !== null) {
        if (user && typeof account.email === 'string') {
          user.email = account.email;
          delete account.email;
        }
        if (account.user_id !== undefined && account.user_id !== null) {
          delete account.user_id;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.phone = token.phone;
      }
      return session;
    },
    async redirect ({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  session: {
    strategy: 'jwt'
  }
}