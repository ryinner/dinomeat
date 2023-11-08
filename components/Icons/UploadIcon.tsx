import type { FontAwesomeIconPropsCleaned } from '@/@types/fontAwesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icon.module.scss';

export default function UploadIcon ({ className, ...props}: FontAwesomeIconPropsCleaned) {
  const computedClass = `${styles.icon} ${className}`

  return <FontAwesomeIcon className={computedClass} icon={faUpload} {...props} />
}
