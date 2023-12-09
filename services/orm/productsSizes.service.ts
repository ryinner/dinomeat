import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.service';

export async function update (id: number, updateDto: Omit<Prisma.ProductSizeUpdateArgs, 'where'>) {
  return await prisma.productSize.update({
    ...updateDto,
    where: {
      id
    }
  })
}

export function remove (id: number) {
  return prisma.productSize.delete({
    where: {
      id
    }
  });
}