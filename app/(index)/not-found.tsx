import styles from './not-found.module.scss';

export default function NotFound () {
  return <>
    <h1 className={styles['not-found']}>По данному адресу ничего не найдено</h1>
  </>
}