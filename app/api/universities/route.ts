import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const universities = await prisma.university.findMany({
    include: { country: { include: { costEstimates: true } } }
  });
  return NextResponse.json(universities);
}
