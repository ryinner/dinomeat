import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

function getResourcesPath(): string {
  return path.join(process.cwd(), "resources");
}

function getProductsImagesPath() {
  return path.join(getResourcesPath(), "products");
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
  filepath: string
): Promise<FileInfo> {
  const fileArrayBuffer = await file.arrayBuffer();
  const fullFilePath = path.join(filepath, file.name);

  if (!existsSync(filepath)) {
    await fs.mkdir(filepath, { recursive: true });
  }
  await fs.writeFile(fullFilePath, Buffer.from(fileArrayBuffer));

  return {
    size: file.size,
    filename: file.name,
    filepath: fullFilePath,
  };
}
