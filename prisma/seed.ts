import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clothesSizes = [

];

const shoesSizes = [

];

const noSizeSizes = [
  {
    name: 'no size',
    typeId: 3
  }
]

async function main() {
  if ((await prisma.sizeType.findMany()).length === 0) {
    await prisma.sizeType.createMany({
      data: [
        {
          id: 1,
          name: 'Одежда'
        },
        {
          id: 2,
          name: 'Обувь'
        },
        {
          id: 3,
          name: 'Безразмерные'
        }
      ]
    });

    await prisma.size.createMany({
      data: [
        ...noSizeSizes
      ]
    });
  }
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
