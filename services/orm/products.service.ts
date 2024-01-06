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
  productDto: Omit<Prisma.ProductUpdateArgs, 'where'>
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
  const count = await prisma.product.count();
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
      images: {
        include: {
          image: true
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

  const properties = await prisma.property.findMany({
    include: {
      products: {
        include: {
          value: true
        },
        where: {
          productId: id
        }
      },
      values: true
    }
  });

  const sizes = await prisma.size.findMany({
    include: {
      products: {
        where: {
          productId: id
        }
      }
    }
  });

  return { ...product, properties, sizes };
}

export function search ({ query }: { query?: string }) {
  return prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
          }
        },
        {
          article: {
            contains: query
          }
        }
      ],
      published: true
    },
    take: 10
  });
}

export function relateSize (id: number, sizeId: number) {
  return prisma.productSize.create({
    data: {
      sizeId,
      productId: id
    }
  });
}

export async function getAllProducts () {
  return await prisma.product.findMany({
    where: {
      published: true,
      slug: {
        not: null
      }
    }
  });
}