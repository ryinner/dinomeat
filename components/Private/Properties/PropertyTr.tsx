import { PropertyWithValues } from "@/@types/private";
import EditIcon from '@/components/Icons/EditIcon';

export default function PropertyTr({ property }: Props) {
  return <tr>
    <td>{property.id}</td>
    <td>{property.name}</td>
    <td>{property.values.map(v => <span key={v.id}>{v.value}</span>)}</td>
    <td>
      <EditIcon />
    </td>
  </tr>;
}

interface Props {
  property: PropertyWithValues;
}
