import TheAboutUs from '@/components/Index/TheAboutUs';
import TheEmployers from '@/components/Index/TheEmployers';
import TheHero from "@/components/Index/TheHero";
import TheProducts from '@/components/Index/TheProducts';
import { getBannersImages } from '@/services/orm/banners.service';
import HeroImage1 from "../../public/index/hero-background-1.webp";
import HeroImage2 from "../../public/index/hero-background-2.webp";
import HeroImage3 from "../../public/index/hero-background-3.webp";
import HeroImage4 from "../../public/index/hero-background-4.webp";
import HeroImage5 from "../../public/index/hero-background-5.webp";

const imagesDefault = [HeroImage5, HeroImage4, HeroImage1, HeroImage3, HeroImage2];


export default async function Index() {
  const imagesBackend = await getBannersImages();

  const images = imagesBackend.length > 0 ? imagesBackend : imagesDefault.map(i => i.src);

  return <>
    <TheHero images={images} />
    <TheEmployers />
    <TheAboutUs />
    <TheProducts />
  </>;
}
