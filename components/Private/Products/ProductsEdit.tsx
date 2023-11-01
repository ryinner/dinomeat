import { ProductEdit } from '@/@types/private';
import { usePropsState } from '@/hooks/StateHooks';
import styles from './ProductsEdit.module.scss';

export function ProductsEdit ({ product: initialProduct }: Props) {
  const { seo: initialSeo, images: initialImages, ...productData } = initialProduct;

  const [product, setProduct] = usePropsState(productData);
  const [images, setImages] = usePropsState(initialImages);
  const [seo, setSeo] = usePropsState(initialSeo);

  return <div className={styles.product}>
    <div className={styles.product__main}>

    </div>
    <div className={styles.product__additional}>

    </div>
  </div>;
}

interface Props {
  product: ProductEdit;
}