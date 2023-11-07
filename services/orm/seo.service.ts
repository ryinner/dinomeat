import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.service";

export async function updateSeo(id: number, seoDto: Prisma.SeoUpdateInput) {
  return await prisma.seo.update({
    data: seoDto,
    where: {
      id,
    },
  });
}
