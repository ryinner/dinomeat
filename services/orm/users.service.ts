import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.service';
import { pagination } from './pagination.service';

const DEFAULT_SALT = 10;
const LIMIT = 50;


export async function signUp (userDto: Prisma.UserCreateInput) {
  const mutableUserDto = {...userDto};
  if (typeof mutableUserDto.password === 'string') {
    mutableUserDto.password = await bcrypt.hash(mutableUserDto.password, DEFAULT_SALT);
  }
  const user = await prisma.user.create({
    data: mutableUserDto
  });
  const userWithoutPassword = { ...user };
  userWithoutPassword.password = null;
  return userWithoutPassword;
}

export async function userFindOne (userDto: Prisma.UserFindFirstArgs) {
  return await prisma.user.findFirst(userDto);
}

export async function checkPassword (userPassword: string, dbPassword: string): Promise<boolean> {
  return await bcrypt.compare(userPassword, dbPassword);
}

export async function getUsersPaginated ({
  page = 1
}: {
  page: number
}) {
  const users = await prisma.user.findMany({
    skip: (page-1) * LIMIT,
    take: LIMIT,
    orderBy: {
      id: 'desc'
    }
  })
  const count = await prisma.user.count();
  return {
    users,
    pagination: pagination({
      page,
      limit: LIMIT,
      count
    })
  };
}

export async function updateUser (id: string, userDto: Prisma.UserUpdateInput) {
  return await prisma.user.update({
    data: userDto,
    where: {
      id
    }
  });
}

export async function userIsAdmin(userDto: Prisma.UserFindFirstArgs): Promise<boolean> {
  return ((await userFindOne(userDto))?.isAdmin || process.env.NODE_ENV === 'development') ?? false;
}