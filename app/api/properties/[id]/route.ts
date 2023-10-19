import { updateProperty } from '@/services/orm/properties.service';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest, { params }: { params: Params }) {
  const data = await req.json() as InputsPut;

  const property = await updateProperty(Number(params.id), data);

  return NextResponse.json({ status: 200, message: 'Обновлено', property });
}

interface Params {
  id: number | string;
}

interface InputsPut {
  id: number;
  name?: string;
}