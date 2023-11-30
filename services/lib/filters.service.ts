import { ReadonlyURLSearchParams } from 'next/navigation';

const PARAM_NAME = 'param_';
const SEPARATOR = '|';

export function getParamName (id: number) {
  return `${PARAM_NAME}${id}`;
}

export function getParamId (name: string) {
  return Number(name.replace(PARAM_NAME, ''));
}

export function getParam (id: number, searchParams: ReadonlyURLSearchParams) {
  const values = searchParams.get(getParamName(id))?.split(SEPARATOR).map(v => Number(v));

  return values;
}

export function joinValues (valuesIds: number[]) {
  return valuesIds.join(SEPARATOR);
}

export function slitValues (values: string) {
  return values.split(SEPARATOR).map(v => Number(v));
}

export function buildFiltersMap (searchParams: Record<string, string>) {
  const map: { id: number; valuesIds: number[] }[] = [];

  Object.keys(searchParams).forEach(n => {
    if (n.includes(PARAM_NAME)) {
      map.push({
        id: getParamId(n),
        valuesIds: slitValues(searchParams[n])
      });
    }
  });

  return map;
}