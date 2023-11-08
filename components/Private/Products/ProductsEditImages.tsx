"use client";

import { ProductImagesWithImages } from "@/@types/private";
import RemoveIcon from '@/components/Icons/RemoveIcon';
import UploadIcon from '@/components/Icons/UploadIcon';
import { request } from '@/services/api/api.service';
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useImmer } from "use-immer";
import styles from "./ProductsEditImages.module.scss";

export default function ProductsEditImages({
  id,
  images: initialImages,
}: Props) {
  const [images, updateImages] = useImmer(initialImages);
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

  function uploadFileHandler (file: File) {
    request(``);
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
          {uploadedFiles.map((file) => (
            <li
              className={styles["product-file-uploaded-images__item"]}
              key={file.name}
            >
              {file.name} <form><input name='alt' defaultValue={file.name} /><UploadIcon onClick={() => uploadFileHandler(file)} /> <RemoveIcon onClick={() => removeFileHandler(file)} /></form>
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
