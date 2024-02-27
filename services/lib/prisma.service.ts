import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export { prisma };

export function isPrismaError (error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

export enum PrismaErrorsTypes {
  unknown,
  unique,
  foreignKey
}

export function getPrismaErrorType (error: Prisma.PrismaClientKnownRequestError): PrismaErrorsTypes {
  switch (error.code) {
    case 'P2002':
      return PrismaErrorsTypes.unique;
    case 'P2003':
      return PrismaErrorsTypes.foreignKey;
    default:
      return PrismaErrorsTypes.unknown;
  }
}