import { Prisma } from "@prisma/client";
import { addMargin } from "../lib/price.service";
import { prisma } from "../lib/prisma.service";
import { pagination } from './pagination.service';

const LIMIT = 50;

function workWithMargin(price?: number, withMargin: boolean = false) {
  if (typeof price !== "number") {
    return 0;
  }
  return withMargin ? addMargin(price) : price;
}

export async function createProduct(
  productDto: Prisma.ProductCreateInput,
  { withMargin = false }: ProductCreateUpdateSettings
) {
  const { price: priceBuffer } = productDto;
  const price = workWithMargin(priceBuffer, withMargin);

  const product = await prisma.product.create({
    data: { ...productDto, price },
  });

  return product;
}

export async function updateProduct(
  id: number,
  productDto: Prisma.ProductUpdateInput & { price?: number },
  { withMargin = false }: ProductCreateUpdateSettings = {}
) {
  const mutableProductDto = { ...productDto };
  const { price: priceBuffer } = mutableProductDto;
  if (priceBuffer) {
    mutableProductDto.price = workWithMargin(priceBuffer, withMargin);
  }

  const product = await prisma.product.update({
    data: mutableProductDto,
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
      seo: true
    },
    where: {
      id
    }
  });
  return { ...product };
}

interface ProductCreateUpdateSettings {
  withMargin?: boolean;
}