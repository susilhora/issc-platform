import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const universities = await prisma.university.findMany({
      include: { country: { include: { costEstimates: true } } }
    });
    return NextResponse.json(universities);
  } catch (error) {
    console.error('[API /universities] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch universities', detail: String(error) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
