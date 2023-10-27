"use client";

import { Product } from "@prisma/client";
import Link from 'next/link';
import { useState } from "react";

export default function ProductsTable({ products: initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts);

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Наименование</th>
          <th>Публикация</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td><Link href={`/admin/products/${product.id}`}>{product.id}</Link></td>
            <td><Link href={`/admin/products/${product.id}`}>{product.name}</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface Props {
  products: Product[];
}
