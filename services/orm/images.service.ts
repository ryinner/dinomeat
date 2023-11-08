import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

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
  return path.join(getProductsImagesPath(), `${id}`);
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
