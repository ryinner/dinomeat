import { FormEvent } from "react";

export function updateObjectField <T extends object, K extends keyof T>(
  e: FormEvent<HTMLInputElement>,
  o: T,
  onUpdate: (property: K, value: T[K]) => void
): void {
  const { target } = e;
  if (target instanceof HTMLInputElement) {
    const attrName = target.getAttribute("name");
    const attrType = target.getAttribute("type") ?? 'text';
    if (attrName !== null && attrName in o) {
      onUpdate(<K> attrName, <T[K]> typeCastByType(target.value, attrType));
    }
  }
}

export function typeCastByType <T> (value: T, type: 'number' | 'text' | string): number | T {
  if (type === 'number') {
    return Number(value);
  } else {
    return value;
  }
}
