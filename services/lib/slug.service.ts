import slugify from 'slugify';

export function generateSlug (value: string): string {
  return slugify(value, {
    locale: 'en',
    replacement: '-',
    lower: true,
    strict: true,
    trim: true
  });
}