import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.service';
import { pagination } from './pagination.service';

const LIMIT = 50;

export async function getEmployersPaginated ({
  page = 1
}: {
  page: number
}) {
  const employers = await prisma.employer.findMany({
    include: {
      image: true
    },
    skip: (page - 1) * LIMIT,
    take: LIMIT,
    orderBy: {
      id: 'desc'
    }
  });
  const count = await prisma.employer.count();

  return {
    employers,
    pagination: pagination({
      page,
      limit: LIMIT,
      count
    })
  };
}

export async function createEmployer (
  employerDto: Prisma.EmployerCreateArgs
) {
  return await prisma.employer.create(employerDto);
}

export async function getLastEmployerPosition (): Promise<number> {
  const lastPosition = await prisma.employer.findFirst({
    orderBy: {
      position: 'desc'
    }
  });

  return (lastPosition?.position ?? 0) + 1;
}

export async function removeEmployer (id: number) {
  await prisma.employer.delete({
    where: {
      id
    }
  });
}

export async function updateEmployer (updateDto: Prisma.EmployerUpdateArgs) {
  return prisma.employer.update(updateDto);
}

export async function findEmployer (findDto: Prisma.EmployerFindFirstArgs) {
  return prisma.employer.findFirstOrThrow(findDto);
}