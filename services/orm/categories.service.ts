import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.service';
import { pagination } from './pagination.service';

const LIMIT = 50;

export async function getCategoriesPaginated ({
  page = 1
}: {
  page: number
}) {
  const categories = await prisma.category.findMany({
    skip: (page-1) * LIMIT,
    take: LIMIT,
    orderBy: {
      id: 'desc'
    }
  })
  const count = await prisma.category.count();
  return {
    categories,
    pagination: pagination({
      page,
      limit: LIMIT,
      count
    })
  };
}

export async function getCategories () {
  return prisma.category.findMany();
}


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
