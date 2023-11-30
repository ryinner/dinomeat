import { ReadonlyURLSearchParams } from 'next/navigation';

const PARAM_NAME = 'param_';
const SEPARATOR = '|';

export function getParamName (id: number) {
  return `${PARAM_NAME}${id}`;
}

export function getParam (id: number, searchParams: ReadonlyURLSearchParams) {
  const values = searchParams.get(getParamName(id))?.split(SEPARATOR).map(v => Number(v));

  return values;
}

export function joinValues (valuesIds: number[]) {
  return valuesIds.join(SEPARATOR);
}