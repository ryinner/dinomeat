import type { FontAwesomeIconPropsCleaned } from '@/@types/fontAwesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icon.module.scss';

export default function RemoveIcon ({ className, ...props}: FontAwesomeIconPropsCleaned) {
  const computedClass = `${styles.icon} ${className}`

  return <FontAwesomeIcon className={computedClass} icon={faTrashCan} {...props} />
}
