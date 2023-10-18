import CircleIcon from './CircleIcon';

export default function PublishedIcon ({ published, className, ...props }: Props) {
  return !published && <CircleIcon title='Не опубликована' {...props} />
}

type Props = Parameters<typeof CircleIcon>[0] & { published: boolean };
