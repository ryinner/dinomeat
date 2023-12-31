"use client";

import AddIcon from '@/components/Icons/AddIcon';
import SaveIcon from '@/components/Icons/SaveIcon';
import { usePropsState } from '@/hooks/StateHooks';
import { frontRequest } from '@/services/api/api.service';
import { Product } from "@prisma/client";
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function ProductsTable({ products: initialProducts }: Props) {
  const [products, setProducts] = usePropsState(initialProducts);
  const [newProductName, setNewProductName] = useState<null|string>(null);

  const addHandler = () => {
    if (newProductName === null) {
      setNewProductName("");
    }
  };

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setNewProductName(e.target.value);
    }
  };

  const saveHandler = (e: FormEvent) => {
    e.preventDefault();
    frontRequest<{product: Product}>('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify({ name: newProductName })
    }, { withMessage: true }).then(res => {
      setProducts([ res.product, ...products ]);
      setNewProductName(null);
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th style={{width: '10%'}}>Id</th>
          <th style={{width: '70%'}}>Наименование</th>
          <th style={{width: '20%'}}>
            {
              newProductName === null ?
              <AddIcon onClick={addHandler} />
              : <form onSubmit={saveHandler}>
                <input onInput={inputHandler} value={newProductName} />
                <SaveIcon onClick={saveHandler} />
              </form>
            }
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td><Link href={`/admin/products/${product.id}`}>{product.id}</Link></td>
            <td colSpan={2}><Link href={`/admin/products/${product.id}`}>{product.name}</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface Props {
  products: Product[];
}
