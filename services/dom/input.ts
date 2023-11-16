import { ChangeEvent } from "react";

export function updateObjectField <T extends object, K extends keyof T>(
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  o: T,
  onUpdate: (property: K, value: T[K]) => void
): void {
  const { target } = e;
  const attrName = target.getAttribute("name");
  const attrType = target.getAttribute("type") ?? 'text';
  if (attrName !== null) {
    onUpdate(<K> attrName, <T[K]> typeCastByType(target.value, attrType));
  }
}

export function typeCastByType <T> (value: T, type: 'number' | 'text' | string): number | T {
  if (type === 'number') {
    return Number(value);
  } else {
    return value;
  }
}
