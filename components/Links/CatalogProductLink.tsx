import { Product } from '@prisma/client';
import Link from "next/link";
import React from 'react';

export default function CatalogProductLink({ product: { slug, name } }: Props) {
  return <Link href={`/catalog/${slug}`}>{name}</Link>;
}

interface Props extends React.LinkHTMLAttributes<HTMLLinkElement> {
  product: Pick<Product, 'name' | 'slug'>
}
