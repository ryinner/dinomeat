import type { Property, Value } from '@prisma/client';

export type PropertyWithValues = Property & { values: Value[] }
