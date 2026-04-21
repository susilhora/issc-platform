import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q');

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    // Execute all queries concurrently for performance
    const [universities, visaRoadmaps, documentTemplates] = await Promise.all([
      prisma.university.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { city: { contains: q } }
          ]
        },
        take: 5
      }),
      prisma.visaRoadmap.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { description: { contains: q } }
          ]
        },
        take: 5
      }),
      prisma.documentTemplate.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { category: { contains: q } }
          ]
        },
        take: 5
      })
    ]);

    // Unify and format results, tagging by 'type'
    const results = [
      ...universities.map(u => ({
        id: `uni-${u.id}`,
        type: 'university',
        title: u.name,
        subtitle: u.city || 'Location unavailable',
        link: `/universities/${u.id}`
      })),
      ...visaRoadmaps.map(v => ({
        id: `visa-${v.id}`,
        type: 'visa',
        title: v.title,
        subtitle: `Step ${v.stepNumber} - ${v.description?.substring(0, 40)}...`,
        link: `/roadmaps/${v.id}`
      })),
      ...documentTemplates.map(d => ({
        id: `sop-${d.id}`,
        type: 'sop',
        title: d.title,
        subtitle: d.category || 'Document',
        link: `/templates/${d.id}`
      }))
    ];

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 });
  }
}
