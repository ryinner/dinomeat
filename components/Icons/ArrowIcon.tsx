import Image from "next/image";
import ArrowLong from "../../public/icons/arrow-long-right.svg";
import ArrowShort from "../../public/icons/arrow-short-right.svg";

export default function ArrowIcon({ className }: Props) {
  return (
    <>
      <Image
        src={ArrowLong}
        alt=""
        className={`${className} not-mobile`}
      />
      <Image
        src={ArrowShort}
        alt=""
        className={`${className} only-mobile`}
      />
    </>
  );
}

interface Props {
  className?: string;
}