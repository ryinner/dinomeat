import { prisma } from '@/services/lib/prisma.service';
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import VkProvider from 'next-auth/providers/vk';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    VkProvider({
      clientId: process.env.VK_ID!,
      clientSecret: process.env.VK_SECRET!
    })
  ]
});
