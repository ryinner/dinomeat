import { BannerWithImage } from '@/@types/private';
import RemoveIcon from '@/components/Icons/RemoveIcon';
import { frontRequest } from '@/services/api/api.service';
import { getUrl } from '@/services/lib/image.service';
import Image from 'next/image';

export default function BannersTr ({ banner, onRemove }: Props) {
  function removeHandler () {
    frontRequest(`/api/admin/banners/${banner.id}`, {
      method: 'DELETE'
    }, { withMessage: true }).then(res => {
      onRemove(banner);
    });
  }

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
    <td>
      <RemoveIcon onClick={removeHandler} />
    </td>
  </tr>
}

interface Props {
  banner: BannerWithImage;
  onRemove: (banner: BannerWithImage) => void;
}