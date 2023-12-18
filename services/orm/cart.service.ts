import { prisma } from "../lib/prisma.service";

export async function getProducts(productsSizes: number[]) {
  return await prisma.productSize.findMany({
    include: {
      size: true,
      product: {
        include: {
          images: {
            take: 1
          },
        },
      },
    },
    where: {
      id: {
        in: productsSizes
      }
    }
  });
}
