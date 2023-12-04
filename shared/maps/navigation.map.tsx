import Book from '../../public/icons/book.svg';
import Cart from '../../public/icons/cart.svg';
import Delivery from '../../public/icons/delivery.svg';
import MapPin from '../../public/icons/map-pin.svg';
import User from '../../public/icons/user.svg';

export const PROFILE_NAME = 'Профиль';

const navigationLinksMap: NavigationMap = [
  {
    label: PROFILE_NAME,
    link_auth: "/auth/sign-in",
    link_profile: "/profile",
    icon: User
  },
  {
    label: "Корзина",
    link: "/cart",
    icon: Cart
  },
  {
    label: "Каталог",
    link: "/catalog",
    icon: Book
  },
  {
    label: "Доставка",
    link: "/delivery",
    icon: Delivery
  },
  {
    label: "Контакты",
    link: "/contacts",
    icon: MapPin
  },
];

export { navigationLinksMap };

type NavigationMap = (ProfileLink | DefaultLink)[];

interface DefaultLink {
  label: string;
  link: string;
  icon: string;
}

interface ProfileLink {
  label: 'Профиль';
  icon: string;
  link_auth: string;
  link_profile: string;
}