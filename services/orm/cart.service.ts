import { CartItem } from "@/components/TheProviders/TheCartContext";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.service";

export async function getProducts(productsSizes: number[]) {
  return await prisma.productSize.findMany({
    include: {
      size: true,
      product: {
        include: {
          images: {
            include: {
              image: true,
            },
            take: 1,
          },
        },
      },
    },
    where: {
      id: {
        in: productsSizes,
      },
    },
  });
}

export async function checkIsAvailableForOrder(
  items: CartItem[]
): Promise<{ isAvailable: boolean; errors: string[] }> {
  const productSizes = items.map((i) => i.id);
  const sizes = await prisma.productSize.findMany({
    include: {
      product: true,
      size: true,
    },
    where: {
      id: {
        in: productSizes,
      },
    },
  });

  let isAvailable: boolean = true;
  const errorMessage: string[] = [];
  for (const i of items) {
    const size = sizes.find((s) => s.id === i.id);
    if (!size) {
      isAvailable = false;
      errorMessage.push('Неизвестная ошибка');
      continue;
    }
    if (size.amount < i.amount) {
      isAvailable = false;
      errorMessage.push(`На складе всего ${size.amount} для продукта ${size.product.name} размер: ${size.size.name}`);
    }
  }

  return {
    isAvailable,
    errors: errorMessage,
  };
}

export async function createOrder({
  cart,
  order,
}: {
  cart: CartItem[];
  order: Prisma.OrderCreateInput;
}) {
  const productSizes = cart.map((i) => i.id);

  const sizes = await prisma.productSize.findMany({
    include: {
      product: true,
      size: true,
    },
    where: {
      id: {
        in: productSizes,
      },
    },
  });

  for (const { id, amount } of sizes) {
    await prisma.productSize.update({
      data: {
        amount: amount - (cart.find(i => i.id === id)?.amount ?? 0)
      },
      where: {
        id
      }
    });
  }

  return await prisma.order.create({
    data: {
      ...order,
      productsSizes: {
        createMany: {
          data: cart.map((c) => ({
            productSizeId: c.id,
            amount: c.amount,
          })),
        },
      },
    },
  });
}
