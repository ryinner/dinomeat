import type { FontAwesomeIconPropsCleaned } from '@/@types/fontAwesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icon.module.scss';

export default function EditIcon ({ className, ...props}: FontAwesomeIconPropsCleaned) {
  const computedClass = `${styles.icon} ${className}`

  return <FontAwesomeIcon className={computedClass} icon={faEdit} {...props} />
}
