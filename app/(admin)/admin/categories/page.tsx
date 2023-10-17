import CategoryTr from '@/components/Categories/CategoryTr';
import { getData } from '@/services/api/api.service';
import { Category } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Категории',
  description: 'Страница редактирования категорий'
}

export default async function TheCategoriesListView () {
  const { categories } = await getData(process.env.NEXT_PUBLIC_APP_PATH + '/api/categories', {
    cache: 'no-cache'
  }) as CategoriesList;

  return <>
    <table>
      <thead>
        <tr>
          <th style={{width: '5%'}}>id</th>
          <th style={{width: '85%'}}>Наименование</th>
          <th style={{width: '10%'}} />
        </tr>
      </thead>
      <tbody>
        { categories.map(category => <CategoryTr key={category.id} category={category} />) }
      </tbody>
    </table>
  </>
}

interface CategoriesList {
  categories: Category[]
}