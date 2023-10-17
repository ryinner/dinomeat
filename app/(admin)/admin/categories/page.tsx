import CategoryTr from '@/components/Categories/CategoryTr';
import { getData } from '@/services/api/api.service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Категории',
  description: 'Страница редактирования категорий'
}

export default async function TheCategoriesListView () {
  const { categories } = await getData(process.env.NEXT_PUBLIC_APP_PATH + '/api/categories', {
    next: {
      revalidate: 60
    }
  });

  return <>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Наименование</th>
        </tr>
      </thead>
      <tbody>
        <CategoryTr />
      </tbody>
    </table>
  </>
}