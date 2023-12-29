import { prisma } from "../lib/prisma.service";
import { pagination } from './pagination.service';

const LIMIT = 50;

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

export async function getOrdersPaginated({
  page = 1
}: {
  page: number
}) {
  const orders = await prisma.order.findMany({
    skip: (page-1) * LIMIT,
    take: LIMIT,
    orderBy: {
      id: 'desc'
    }
  })
  const count = await prisma.order.count();
  return {
    orders,
    pagination: pagination({
      page,
      limit: LIMIT,
      count
    })
  };
}
