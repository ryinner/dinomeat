"use client";

import { ProductImagesWithImages } from "@/@types/private";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./ProductsEditImages.module.scss";
import ProductsEditImagesItem from './ProductsEditImagesItem';

export default function ProductsEditImages({
  id,
  images: initialImages,
}: Props) {
  const [images, setImages] = useState(initialImages);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const validFiles: File[] = [];
        if (file.type.includes("image") && uploadedFiles.find((uf) => uf.name === file.name) === undefined) {
          validFiles.push(file);
        }
        setUploadedFiles((uploadedFiles) => [...uploadedFiles, ...validFiles]);
      });
    },
    [uploadedFiles]
  );

  function removeFileHandler (file: File) {
    setUploadedFiles((uploadedFiles) => uploadedFiles.filter((uf) => uf.name !== file.name));
  }

  function removeImagesHandler (image: ProductImagesWithImages) {
    setImages((images) => images.filter((i) => i.image.id !== image.image.id));
  }

  function uploadFileHandler (images: ProductImagesWithImages[]) {
    setImages(images);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <form
          className={`${styles["product-file-uploader"]} ${
            isDragActive && styles["product-file-uploader--drag-active"]
          }`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p>Перенесите или кликнете для загрузки файлов</p>
        </form>
      </div>
      <div className={styles["product-file-uploaded-images"]}>
        <ul className={styles["product-file-uploaded-images__list"]}>
          {images.map((i) => (
            <li 
              className={styles["product-file-uploaded-images__item"]}
              key={i.image.id}
            >
              <ProductsEditImagesItem id={id} image={i} onRemove={removeImagesHandler} />
            </li>
          ))}
          {uploadedFiles.map((f) => (
            <li
              className={styles["product-file-uploaded-images__item"]}
              key={f.name}
            >
              <ProductsEditImagesItem id={id} image={f} onRemove={removeFileHandler} onUpload={uploadFileHandler} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface Props {
  id: number;
  images: ProductImagesWithImages[];
}
