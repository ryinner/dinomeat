"use client";

import { ProductImagesWithImages } from "@/@types/private";
import { useDropzone } from "react-dropzone";
import { useImmer } from "use-immer";

export default function ProductsEditImages({
  id,
  images: initialImages,
}: Props) {
  const [images, updateImages] = useImmer(initialImages);


  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  return (
    <div>
      <div>
        <form {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Перенесите или кликнете для загрузки файлов</p>
        </form>
      </div>
      <div>
        <ul>
          {acceptedFiles.map((file) => <li key={file.name}>{file.name}</li>)}
        </ul>
      </div>
    </div>
  );
}

interface Props {
  id: number;
  images: ProductImagesWithImages[];
}
