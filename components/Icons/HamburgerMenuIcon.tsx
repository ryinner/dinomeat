import type { FontAwesomeIconPropsCleaned } from '@/@types/fontAwesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HamburgerMenuIcon (props: FontAwesomeIconPropsCleaned) {
  return   <FontAwesomeIcon icon={faBars} {...props} />;
}