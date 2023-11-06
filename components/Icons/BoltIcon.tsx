import type { FontAwesomeIconPropsCleaned } from '@/@types/fontAwesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icon.module.scss';

export default function BoltIcon ({ className, ...props}: FontAwesomeIconPropsCleaned) {
  const computedClass = `${styles.icon} ${className ?? ''}`

  return <FontAwesomeIcon className={computedClass} icon={faBolt} {...props} />
}
