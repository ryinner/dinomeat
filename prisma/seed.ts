import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function sizes() {
  if ((await prisma.size.findMany()).length === 0) {
    await prisma.size.createMany({
      data: [
        {
          name: "Безразмерный",
        },
        {
          name: "35",
        },
        {
          name: "36",
        },
        {
          name: "37",
        },
        {
          name: "38",
        },
        {
          name: "39",
        },
        {
          name: "40",
        },
        {
          name: "41",
        },
        {
          name: "42",
        },
        {
          name: "43",
        },
        {
          name: "44",
        },
        {
          name: "45",
        },
        {
          name: "46",
        },
        {
          name: "47",
        },
        {
          name: "48",
        },
        {
          name: "49",
        },
        {
          name: "50",
        },
        {
          name: "51",
        },
        {
          name: "52",
        },
      ],
    });
  }
}

async function properties() {
  if ((await prisma.property.findMany()).length === 0) {
    await prisma.property.createMany({
      data: [
        {
          name: "Бренд",
          isFilter: true,
        },
        {
          name: "Цвет",
          isFilter: true,
        },
        {
          name: "Страна производства"
        }
      ],
    });
    await prisma.value.createMany({
      data: [
        {
          value: "Adidas",
          propertyId: 1,
        },
        {
          value: "Nike",
          propertyId: 1,
        },
        {
          value: "Черный",
          propertyId: 2,
        },
        {
          value: "Белый",
          propertyId: 2,
        },
        {
          value: "Голубой",
          propertyId: 2,
        },
        {
          value: 'Вьетнам',
          propertyId: 3
        },
        {
          value: 'Индонезия',
          propertyId: 3
        },
        {
          value: 'Индия',
          propertyId: 3
        },
        {
          value: 'Китай',
          propertyId: 3
        }
      ],
    });
  }
}

async function categories () {
  if ((await prisma.category.findMany()).length === 0) {
    await prisma.category.createMany({
      data: [
        {
          name: 'Толстовки'
        },
        {
          name: 'Обувь'
        },
        {
          name: 'Штаны'
        }
      ]
    })
  }
}

async function main() {
  await sizes();
  await properties();
  await categories();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
