import { prisma } from '@/services/lib/prisma.service';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from 'next-auth';
import VkProvider from 'next-auth/providers/vk';

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    VkProvider({
      clientId: process.env.NEXT_PUBLIC_VK_ID,
      clientSecret: process.env.VK_SECRET
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
    }
  }
}