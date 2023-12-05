import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function generateSizes() {
  if ((await prisma.size.findMany()).length === 0) {
    await prisma.size.createMany({
      data: [
        {
          id: 1,
          name: "Без размерный",
        },
        {
          id: 2,
          name: "35",
        },
        {
          id: 3,
          name: "36",
        },
        {
          id: 4,
          name: "37",
        },
        {
          id: 5,
          name: "38",
        },
        {
          id: 6,
          name: "39",
        },
        {
          id: 7,
          name: "40",
        },
        {
          id: 8,
          name: "41",
        },
        {
          id: 9,
          name: "42",
        },
        {
          id: 10,
          name: "43",
        },
        {
          id: 10,
          name: "44",
        },
        {
          id: 11,
          name: "45",
        },
        {
          id: 12,
          name: "46",
        },
        {
          id: 13,
          name: "47",
        },
        {
          id: 14,
          name: "48",
        },
        {
          id: 15,
          name: "49",
        },
        {
          id: 16,
          name: "50",
        },
        {
          id: 17,
          name: "51",
        },
      ],
    });
  }
}

async function main() {
  await generateSizes();
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
