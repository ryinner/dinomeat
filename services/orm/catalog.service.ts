import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.service";
import { pagination } from "./pagination.service";

const LIMIT = 1;

export async function catalog({
  page = 1,
  price,
  categoryId,
  // params,
}: {
  page?: number;
  categoryId?: number;
  price?: {
    min?: number;
    max?: number;
  };
  // params?: {
  //   id: number;
  //   valueIds: number[];
  // }[];
}) {
  const filters: { where: Prisma.ProductWhereInput } = { where: { AND: [{ published: true }] } };

  if (price || categoryId) {
    if (price) {
      const { min, max } = price;
      let priceFilter: { lt?: number; gt?: number } = {};
      if (min && min > 0) {
        priceFilter.lt = min;
      }
      if (max && max > 0) {
        priceFilter.gt = max;
      }
      if (Array.isArray(filters.where.AND)) {
        filters.where.AND.push({ price: priceFilter });
      }
    }
    if (categoryId) {
      if (Array.isArray(filters.where.AND)) {
        filters.where.AND.push({ categoryId: categoryId });
      }
    }
    // if (params) {
    //   params.forEach((param) => {
    //     let paramsOrArray: {
    //       properties: { some: { valueId: number; paramId: number } };
    //     }[] = [];
    //     param.value_ids.forEach((valueId) => {
    //       paramsOrArray.push({
    //         properties: {
    //           some: {
    //             valueId,
    //             paramId: param.id,
    //           },
    //         },
    //       });
    //     });
    //     if (filters.where && Array.isArray(filters.where.AND)) {
    //       filters.where.AND.push({
    //         OR: paramsOrArray,
    //       });
    //     }
    //   });
    // }
  }

  const products = await prisma.product.findMany({
    include: {
      images: {
        include: {
          image: true,
        },
      },
    },
    skip: (page - 1) * LIMIT,
    take: LIMIT,
    ...filters,
  });

  const count = await prisma.product.count({
    ...filters,
  });

  return {
    products,
    pagination: pagination({
      page,
      limit: LIMIT,
      count,
    }),
  };
}

export async function filters () {
  const properties = await prisma.property.findMany({
    include: {
      values: true
    },
    where: {
      isFilter: true,
    },
    orderBy: {
      id: 'asc'
    },
  });

  return { properties };
}
