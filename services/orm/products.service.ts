import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.service";
import { pagination } from './pagination.service';

const LIMIT = 50;

export async function createProduct(
  productDto: Prisma.ProductCreateInput,
) {
  const product = await prisma.product.create({
    data: { ...productDto },
  });

  return product;
}

export async function updateProduct(
  id: number,
  productDto: Prisma.ProductUpdateArgs
) {
  const product = await prisma.product.update({
    ...productDto,
    where: {
      id,
    },
  });
  return product;
}

export async function getProductsPaginated({
  page = 1
}: {
  page: number
}) {
  const products = await prisma.product.findMany({
    skip: (page-1) * LIMIT,
    take: LIMIT,
    orderBy: {
      id: 'desc'
    }
  })
  const count = await prisma.category.count();
  return {
    products,
    pagination: pagination({
      page,
      limit: LIMIT,
      count
    })
  };
}

export async function getProductForEdit({ id }: {id: number}) {
  const product = await prisma.product.findFirst({
    include: {
      images: true,
      properties: {
        include: {
          property: true,
          value: true
        }
      },
      seo: {
        include: {
          seo: true
        }
      }
    },
    where: {
      id
    }
  });
  return { ...product };
}
