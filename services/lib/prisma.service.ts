import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export { prisma };

export function isPrismaError (error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

export enum PrismaErrorsTypes {
  unknown,
  unique
}

export function getPrismaErrorType (error: Prisma.PrismaClientKnownRequestError): PrismaErrorsTypes {
  if (error.code === 'P2002') {
    return PrismaErrorsTypes.unique;
  }
  return PrismaErrorsTypes.unknown;
}