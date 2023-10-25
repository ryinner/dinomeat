import { prisma } from '@/services/lib/prisma.service';
import { checkPassword, userFindOne } from '@/services/orm/users.service';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import VkProvider from 'next-auth/providers/vk';

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
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
          return user;
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
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt'
  }
}