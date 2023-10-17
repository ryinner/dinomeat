import { Category } from '@prisma/client';

export default function CategoryTr({ category }: Props) {
  return <tr>
    <td>{ category.id }</td>
    <td>{ category.name }</td>
  </tr>
}

interface Props {
  category: Category
}