'use client'

import { BannerWithImage } from '@/@types/private';
import AddIcon from '@/components/Icons/AddIcon';
import SaveIcon from '@/components/Icons/SaveIcon';
import { usePropsState } from '@/hooks/StateHooks';
import { frontRequest } from '@/services/api/api.service';
import { FormEvent, useRef, useState } from 'react';
import BannersTr from './BannersTr';

export default function BannersTable ({ banners: initialBanners }: Props) {
  const [banners, setBanners] = usePropsState(initialBanners);
  const [isAdding, setIsAdding] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  function removeHandler (banner: BannerWithImage) {

  }

  function addHandler () {
    setIsAdding(true);
  }

  function submitHandler (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      frontRequest<{banner: BannerWithImage}>('/api/admin/banners', {
        method: 'POST',
        body: formData
      }, { withMessage: true }).then(res => {
        setBanners([
          res.banner,
          ...banners
        ]);
        setIsAdding(false);
      });
    }
  }

  return <table>
    <thead>
      <tr>
        <th>id</th>
        <th>img</th>
        <th>
          {
            isAdding ? (<form ref={form} onSubmit={submitHandler} encType='multipart/form-data'>
              <input type='file' name='image' placeholder='Загрузите файл' />
              <SaveIcon onClick={submitHandler} />
            </form>) :
            <AddIcon onClick={addHandler} />
          }
        </th>
      </tr>
    </thead>
    <tbody>
      {banners.map(b => <BannersTr banner={b} key={b.id} />)}
    </tbody>
  </table>
}

interface Props {
  banners: BannerWithImage[];
}