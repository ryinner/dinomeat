import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.service";

export async function update(
  id: number,
  updateDto: Omit<Prisma.ProductSizeUpdateArgs, "where">
) {
  return await prisma.productSize.update({
    ...updateDto,
    where: {
      id,
    },
  });
}

export async function remove(id: number) {
  return await prisma.productSize.delete({
    where: {
      id,
    },
  });
}
