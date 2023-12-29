export default function OrderPage ({
  params: { id }
}: Params) {
  return <>
    {id}
  </>;
}

interface Params {
  params: {
    id: string;
  }
}
