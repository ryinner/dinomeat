import { Product } from '@prisma/client';
import Link from "next/link";
import React from 'react';

export default function CatalogProductLink({ product: { slug, name }, children, ...props }: Props) {
  return <Link href={`/catalog/${slug}`}><span {...props}>{ children ?? name}</span></Link>;
}

interface Props extends React.LinkHTMLAttributes<HTMLLinkElement> {
  product: Pick<Product, 'name' | 'slug'>
  children?: React.ReactNode;
}
