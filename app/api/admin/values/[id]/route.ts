import { deleteValue, updateValue } from '@/services/orm/values.service';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT (req: NextRequest, { params }: { params: Params }) {
  const data = await req.json() as InputPut;

  const value = await updateValue(Number(params.id), data);

  return NextResponse.json({ code: 200, value });
}

export async function DELETE (req: NextRequest, { params }: { params: Params }) {
  await deleteValue(Number(params.id));

  return NextResponse.json({ code: 200 });
}

interface InputPut {
  value: string;
}

interface Params {
  id: string;
}
