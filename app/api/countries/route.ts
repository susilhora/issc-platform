import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      include: { costEstimates: true }
    });
    return NextResponse.json(countries);
  } catch (error) {
    console.error('[API /countries] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch countries', detail: String(error) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
