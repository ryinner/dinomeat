import styles from './ThePrivateHeader.module.scss';
import ThePrivateNavigation from './ThePrivateNavigation';

export default function ThePrivateHeader() {
  return <header className={styles.header}>
    <ThePrivateNavigation />
  </header>;
}
