import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.service';

export async function createCategory (
  categoryDto: Prisma.CategoryCreateInput
) {
  return await prisma.category.create({ data: categoryDto });
}

export async function updateCategory (
  id: number,
  categoryDto: Prisma.CategoryUpdateInput
) {
  return await prisma.category.update({
    data: categoryDto,
    where: {
      id
    }
  });
}