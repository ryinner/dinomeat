import slugify from 'slugify';

export function generateSlug (value: string): string {
  return slugify(value, {
    locale: 'ru',
    replacement: '-',
    lower: true,
    strict: true,
    trim: true
  });
}