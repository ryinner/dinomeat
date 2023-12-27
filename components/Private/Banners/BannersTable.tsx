import { BannerWithImage } from '@/@types/private';
import AddIcon from '@/components/Icons/AddIcon';
import BannersTr from './BannersTr';

export default function BannersTable ({ banners }: Props) {

  function removeHandler (banner: BannerWithImage) {

  }

  return <table>
    <thead>
      <tr>
        <th>id</th>
        <th>img</th>
        <th>
          <AddIcon />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        {banners.map(b => <BannersTr banner={b} key={b.id} />)}
      </tr>
    </tbody>
  </table>
}

interface Props {
  banners: BannerWithImage[];
}