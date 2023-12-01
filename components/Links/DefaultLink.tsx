import Link from 'next/link';
import styles from './DefaultLink.module.scss';

export default function DefaultLink ({ children, className, ...props }: Parameters<typeof Link>[0]) {
  const classNameComputed = `${styles.link} ${className}`

  return <Link className={classNameComputed} {...props}>
    {children}
  </Link>
}
