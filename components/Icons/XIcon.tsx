import type { FontAwesomeIconPropsCleaned } from '@/@types/fontAwesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icon.module.scss';

export default function XIcon ({ className, ...props}: FontAwesomeIconPropsCleaned) {
  const computedClass = `${styles.icon} ${className}`

  return <FontAwesomeIcon className={computedClass} icon={faX} {...props} />
}
