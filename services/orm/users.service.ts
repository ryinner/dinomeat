import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.service';

const DEFAULT_SALT = 10;

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