import { BannerWithImage } from '@/@types/private';
import { getUrl } from '@/services/lib/image.service';
import Image from 'next/image';

export default function BannersTr ({ banner }: Props) {
  return <tr>
    <td>{banner.id}</td>
    <td>
      <Image
        src={getUrl(banner.image.url)}
        alt=''
        width={150}
        height={50}
      />
    </td>
    <td></td>
  </tr>
}

interface Props {
  banner: BannerWithImage;
}