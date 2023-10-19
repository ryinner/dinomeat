import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.service';

export async function updateValue (
  id: number,
  valueDto: Prisma.ValueUpdateInput
) {
  return await prisma.value.update({
    data: valueDto,
    where: { id }
  })
}

export async function deleteValue (
  id: number,
) {
  return await prisma.value.delete({
    where: { id }
  });
}