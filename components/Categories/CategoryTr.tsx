import { Category } from '@prisma/client';
import EditIcon from '../Icons/EditIcon';

export default function CategoryTr({ category }: Props) {
  return <tr>
    <td>{ category.id }</td>
    <td>{ category.name }</td>
    <td><EditIcon /></td>
  </tr>
}

interface Props {
  category: Category
}