import { prisma } from '../lib/prisma.service';

export async function signUpUser ({ email, phone, password }: { email: string; phone?: string, password?: string}) {
  return await prisma.user.create({
    data: {
      email, phone
    }
  })
}

export async function getUserById (id: number) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id
    }
  });
}
