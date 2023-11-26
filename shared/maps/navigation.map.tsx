import Book from '../../public/icons/book.svg';
import Cart from '../../public/icons/cart.svg';
import Delivery from '../../public/icons/delivery.svg';
import MapPin from '../../public/icons/map-pin.svg';
import User from '../../public/icons/user.svg';

const navigationLinksMap = [
  {
    label: "Профиль",
    link: "/profile",
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
