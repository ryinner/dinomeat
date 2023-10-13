import { prisma } from '@/services/lib/prisma.service';
import Image from 'next/image';

export async function TheTest () {
  const image = await prisma.image.findFirst();

  return <form name='test' method='POST' action='/api/products/1/images' encType="multipart/form-data">
    <input type='file' name='image' required />
    <button type='submit'>Save</button>
    <Image width={500} height={500} src={process.env.NEXT_PUBLIC_APP_PATH! + image?.url ?? ''} alt='123'/>
  </form>
}
