import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const countries = await prisma.country.findMany({
    include: { costEstimates: true }
  });
  return NextResponse.json(countries);
}
