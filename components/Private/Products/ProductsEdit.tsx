import { ProductEdit } from '@/@types/private';
import { usePropsState } from '@/hooks/StateHooks';

export function ProductsEdit ({ product: initialProduct }: Props) {
  const { seo: initialSeo, images: initialImages, ...productData } = initialProduct;

  const [product, setProduct] = usePropsState(productData);
  const [images, setImages] = usePropsState(initialImages);
  const [seo, setSeo] = usePropsState(initialSeo);

  return <></>;
}

interface Props {
  product: ProductEdit;
}