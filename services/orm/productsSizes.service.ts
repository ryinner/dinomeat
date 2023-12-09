import { prisma } from '../lib/prisma.service';

export function remove (id: number) {
  return prisma.productSize.delete({
    where: {
      id
    }
  });
}