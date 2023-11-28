import { Category } from "@prisma/client";
import Link from "next/link";

export default function CatalogCategoryLink({ category: { id, name }, ...props }: Props) {
  return <Link href={`/catalog?category_id=${id}`}><span {...props}>{name}</span></Link>;
}

interface Props extends React.LinkHTMLAttributes<HTMLElement> {
  category: Pick<Category, 'id' | 'name'>;
}
