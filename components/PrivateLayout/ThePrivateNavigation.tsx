import Link from 'next/link';

const DEFAULT_PREFIX = '/admin';

const routes = [
  {
    label: 'Пользователи',
    link: ''
  },
  {
    label: 'Категории',
    link: '/categories',
  },
  {
    label: 'Параметры',
    link: '/properties'
  },
  {
    label: 'Продукты',
    link: '/products'
  }
];

export default function ThePrivateNavigation() {
  return (
    <nav>
      <ul>
        {routes.map(route => <li key={route.label}><Link href={DEFAULT_PREFIX  + route.link}>{route.label}</Link></li>)}
      </ul>
    </nav>
  );
}
