import { Prisma } from '@prisma/client';
import { getUrl } from '../lib/image.service';
import { prisma } from '../lib/prisma.service';
import { deleteImage } from './images.service';
import { pagination } from './pagination.service';

const LIMIT = 50;

export async function getBannersPaginated ({
  page = 1
}: {
  page: number
}) {
  const banners = await prisma.banner.findMany({
    include: {
      image: true
    },
    skip: (page-1) * LIMIT,
    take: LIMIT,
    orderBy: {
      id: 'desc'
    }
  });
  const count = await prisma.banner.count();

  return {
    banners,
    pagination: pagination({
      page,
      limit: LIMIT,
      count
    })
  };
}

export async function getLastBanner () {
  return await prisma.banner.findFirst({
    orderBy: {
      id: 'desc'
    },
  });
}

export async function createBanner (
  bannerDto: Prisma.BannerCreateArgs
) {
  return await prisma.banner.create(bannerDto);
}

export async function deleteBanner (id: number) {
  const banner = await prisma.banner.findFirstOrThrow({
    where: {
      id
    }
  });

  await deleteImage(banner.imageId);
  await prisma.banner.delete({
    where: {
      id
    }
  });
}

export async function getBannersImages () {
  const banners = await prisma.banner.findMany({
    include: {
      image: true
    }
  });

  return banners.map(b => getUrl(b.image.url));
}