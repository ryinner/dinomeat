'use client'

import Image from 'next/image';
import Burger from '../../public/icons/burger.svg';
import styles from './TheBurgerMenu.module.scss';

export default function TheBurgerMenu () {
  return <div>
    <Image src={Burger} height={22} alt='Открыть навигацию' className={styles['burger-menu-icon']} />
  </div>
}