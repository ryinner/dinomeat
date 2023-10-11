import { Prisma } from "@prisma/client";
import { addMargin } from "../lib/price.service";
import { prisma } from "../lib/prisma.service";

interface ProductCreateUpdateSettings {
  withMargin?: boolean;
}

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
  { withMargin = false }: ProductCreateUpdateSettings
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
