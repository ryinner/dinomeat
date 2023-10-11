import Image from 'next/image';
import React from 'react';

export default function HamburgerMenuIcon (Props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt' | 'fill'>) {
  return <Image fill={true} src={'Вставьте картинку'} alt='burger menu' {...Props} />
}