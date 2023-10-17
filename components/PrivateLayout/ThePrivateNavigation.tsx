import Link from 'next/link';
import styles from './ThePrivateNavigation.module.scss';

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
    <nav className={styles.nav}>
      <ul className={styles['nav-list']}>
        {routes.map(route => <li key={route.label}><Link className={styles['nav-item']} href={DEFAULT_PREFIX  + route.link}>{route.label}</Link></li>)}
      </ul>
    </nav>
  );
}
