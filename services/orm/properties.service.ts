import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.service';
import { pagination } from './pagination.service';

const LIMIT = 50;

export async function createProperty (
  propertyDto: Prisma.PropertyCreateInput
) {
  return await prisma.property.create({ data: propertyDto, include: { values: true } });
}

export async function updateProperty (
  id: number,
  propertyDto: Prisma.PropertyCreateInput
) {
  return await prisma.property.update({ data: propertyDto, where: { id } });
}

export async function getPropertiesPaginated ({
  page = 1
}: {
  page: number
}) {
  const properties = await prisma.property.findMany({
    skip: (page-1) * LIMIT,
    take: LIMIT,
    orderBy: {
      id: 'desc'
    },
    include: {
      values: true
    }
  })
  const count = await prisma.property.count();
  return {
    properties,
    pagination: pagination({
      page,
      limit: LIMIT,
      count
    })
  };
}
