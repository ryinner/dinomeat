import localFont from 'next/font/local';

const MuseoSansCyrl = localFont({
  src: [
    {
      path: './museoSansCyrl/MuseoSansCyrl300.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: './museoSansCyrl/MuseoSansCyrl300Italic.ttf',
      weight: '300',
      style: 'italic'
    },
    {
      path: './museoSansCyrl/MuseoSansCyrl700.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: './museoSansCyrl/MuseoSansCyrl700Italic.ttf',
      weight: '700',
      style: 'italic'
    }
  ]
});

export { MuseoSansCyrl };
