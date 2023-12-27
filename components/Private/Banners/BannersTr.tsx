import { BannerWithImage } from '@/@types/private';

export default function BannersTr ({ banner }: Props) {
  return <tr>
    <td>{banner.id}</td>
    <td></td>
    <td></td>
  </tr>
}

interface Props {
  banner: BannerWithImage;
}