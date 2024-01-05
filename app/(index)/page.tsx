import TheAboutUs from '@/components/Index/TheAboutUs';
import TheEmployers from '@/components/Index/TheEmployers';
import TheHero from "@/components/Index/TheHero";
import TheProducts from '@/components/Index/TheProducts';
import { getBannersImages } from '@/services/orm/banners.service';
import { employersForIndex } from '@/services/orm/employers.service';
import Employer1 from "../../public/index/employer-1.webp";
import Employer2 from "../../public/index/employer-2.webp";
import Employer3 from "../../public/index/employer-3.webp";
import HeroImage1 from "../../public/index/hero-background-1.webp";
import HeroImage2 from "../../public/index/hero-background-2.webp";
import HeroImage3 from "../../public/index/hero-background-3.webp";
import HeroImage4 from "../../public/index/hero-background-4.webp";
import HeroImage5 from "../../public/index/hero-background-5.webp";

const imagesDefault = [HeroImage5, HeroImage4, HeroImage1, HeroImage3, HeroImage2];
const employersDefault = [
  {
    id: 1,
    image: Employer1.src,
    name: "Иван",
    post: "Менеджер",
  },
  {
    id: 2,
    image: Employer2.src,
    name: "Алексей",
    post: "Генеральный директор",
  },
  {
    id: 3,
    image: Employer3.src,
    name: "Виктория",
    post: "Менеджер",
  },
];

export default async function Index() {
  const imagesBackend = await getBannersImages();
  const employersBackend = await employersForIndex();

  const images = imagesBackend.length > 0 ? imagesBackend : imagesDefault.map(i => i.src);

  const employers = employersBackend.length > 0 ? employersBackend : employersDefault;

  return <>
    <TheHero images={images} />
    <TheEmployers employers={employers} />
    <TheAboutUs />
    <TheProducts />
  </>;
}
