import type { FontAwesomeIconPropsCleaned } from '@/@types/fontAwesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditIcon (props: FontAwesomeIconPropsCleaned) {
  return <FontAwesomeIcon icon={faEdit} {...props} />
}
