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
): Promise<{ isAvailable: boolean; errors: Record<number, string> }> {
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
  const errorMessage: Record<number, string> = {};
  for (const i of items) {
    const size = sizes.find((s) => s.id === i.id);
    if (!size) {
      isAvailable = false;
      errorMessage[i.id] = `Неизвестная ошибка`;
    }
    if (size && size.amount < i.amount) {
      isAvailable = false;
      errorMessage[
        i.id
      ] = `На складе всего ${size.amount} для продукта ${size.product.name} размер: ${size.size.name}`;
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
  return await prisma.order.create({
    data: {
      ...order,
      ordersProductsSizes: {
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
