import { prisma } from "../lib/prisma.service";

export async function getForPaymentLink(id: number) {
  return await prisma.order.findFirstOrThrow({
    include: {
      productsSizes: true
    },
    where: {
      id
    }
  });
}
