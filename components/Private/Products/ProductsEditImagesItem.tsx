"use client";

import { ProductEdit, ProductImagesWithImages } from '@/@types/private';
import RemoveIcon from "@/components/Icons/RemoveIcon";
import SaveIcon from "@/components/Icons/SaveIcon";
import UploadIcon from "@/components/Icons/UploadIcon";
import { usePropsState } from "@/hooks/StateHooks";
import { frontRequest } from '@/services/api/api.service';
import Image from "next/image";
import { FormEvent } from "react";
import styles from './ProductsEditImagesItem.module.scss';

export default function ProductsEditImagesItem<T extends ProductImagesWithImages | File>({
  id,
  image,
  onRemove,
  onUpload,
}: Props<T>) {
  const isFile = image instanceof File;

  const [alt, setAlt] = usePropsState(isFile ? "" : image.image.alt);

  const url = isFile ? URL.createObjectURL(image) : process.env.NEXT_PUBLIC_URL + image.image.url;

  function altInputHandler(e: FormEvent<HTMLInputElement>) {
    if (e.target instanceof HTMLInputElement) {
      setAlt(e.target.value);
    }
  }

  function removeHandler() {
    if (isFile) {
      onRemove(image);
    } else {
      frontRequest(`/api/admin/images/${image.image.id}`, {
        method: 'DELETE',
        body: null
      }, { withMessage: true }).then(() => onRemove(image));
    }
  }

  function uploadHandler() {
    if (isFile) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('alt', alt ?? '');
      frontRequest<{product: ProductEdit}>(`/api/admin/products/${id}/images`, {
        method: 'POST',
        body: formData,
      }, { withMessage: true }).then(res => {
        if (onUpload !== undefined) {
          onUpload(res.product.images);
        }
        onRemove(image);
      });
    }
  }

  function updateHandler() {
    if (!isFile) {
      frontRequest(`/api/admin/images/${image.image.id}`, {
        method: 'PUT',
        body: JSON.stringify({ data: { alt } })
      }, {  withMessage: true });
    }
  }

  return (
    <div className={styles['product-edit-images-item']}>
      <Image width={200} height={150} alt="" src={url} />
      <input placeholder='Alt' value={alt ?? ""} onInput={altInputHandler} />
      <form className={styles['product-edit-images-item__controls']}>
        {isFile ? <UploadIcon onClick={uploadHandler} /> : <SaveIcon onClick={updateHandler} />}
        <RemoveIcon onClick={removeHandler} />
      </form>
    </div>
  );
}


interface Props <T extends ProductImagesWithImages | File> {
  id: number;
  image: T;
  onRemove: (image: T) => void;
  onUpload?: (images: ProductImagesWithImages[]) => void;
}
