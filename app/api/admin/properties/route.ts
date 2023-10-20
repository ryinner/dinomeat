import {
  createProperty,
  getPropertiesPaginated,
} from "@/services/orm/properties.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const propertiesPaginated = await getPropertiesPaginated({
    page: Number(searchParams.get("page") ?? 1),
  });

  return NextResponse.json({ code: 200, ...propertiesPaginated });
}

export async function POST(req: NextRequest) {
  const propertyDto = (await req.json()) as InputsPost;
  let propertyCreateDto: Parameters<typeof createProperty>[0] = {
    name: propertyDto.name,
  };
  if (Array.isArray(propertyDto.values)) {
    propertyCreateDto = {
      ...propertyCreateDto,
      values: {
        createMany: {
          data: propertyDto.values
        },
      },
    };
  }
  const property = await createProperty(propertyCreateDto);

  return NextResponse.json({ code: 200, property })
}

interface InputsPost {
  name: string;
  values?: { value: string }[];
}
