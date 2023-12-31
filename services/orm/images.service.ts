import { Prisma } from '@prisma/client';
import { existsSync, unlinkSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { prisma } from '../lib/prisma.service';

function getResourcesPath(): string {
  return path.join(process.cwd(), "resources");
}

function getImagesPath (): string {
  return path.join(getResourcesPath(), "images");
}

function getProductsImagesPath() {
  return path.join(getImagesPath(), "products");
}

export function getProductImagesPath(id: number | string): string {
  return path.join(getProductsImagesPath(), String(id));
}

export function getBannersImagesPath (id: number): string {
  return path.join(getImagesPath(), 'banners', String(id));
}

export function getEmployersImagesPath (name: string): string {
  return path.join(getImagesPath(), 'employers', name);
}

interface FileInfo {
  size: number;
  filename: string;
  filepath: string;
}

export async function writeFile(
  file: File,
  filepath: string,
  filename?: string
): Promise<FileInfo> {
  const fileArrayBuffer = await file.arrayBuffer();
  const fullFilePath = path.join(filepath, filename ?? file.name);

  if (!existsSync(filepath)) {
    await fs.mkdir(filepath, { recursive: true });
  }
  await fs.writeFile(fullFilePath, Buffer.from(fileArrayBuffer));

  return {
    size: file.size,
    filename: file.name,
    filepath: fullFilePath.replace(process.cwd(), ''),
  };
}

export async function replaceFile (file: File, filepath: string) {
  const fileArrayBuffer = await file.arrayBuffer();
  const fullFilePath = path.join(process.cwd(), filepath);

  if (existsSync(fullFilePath)) {
    unlinkSync(fullFilePath);
  }

  await fs.writeFile(fullFilePath, Buffer.from(fileArrayBuffer));
}

export async function removeFile(filepath: string): Promise<void> {
  if (existsSync(filepath)) {
    await fs.rm(filepath);
  }
}

export async function updateImage (id: number, imageDto: Omit<Prisma.ImageUpdateArgs, 'where'>) {
  return await prisma.image.update({
    ...imageDto,
    where: {
      id
    }
  });
}

export async function deleteImage (id: number) {
  const image = await prisma.image.delete({
    where: {
      id
    },
    select: {
      url: true
    }
  });
  removeFile(image.url);
}