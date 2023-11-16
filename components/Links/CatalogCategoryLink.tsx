import { Category } from "@prisma/client";
import Link from "next/link";

export default function CatalogCategoryLink({ category: { id, name } }: Props) {
  return <Link href={`/catalog?category_id=${id}`}>{name}</Link>;
}

interface Props {
  category: Pick<Category, 'id' | 'name'>;
}
