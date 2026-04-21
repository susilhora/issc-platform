import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as xlsx from 'xlsx';
import * as mammoth from 'mammoth';

const prisma = new PrismaClient();

// Heuristic Engine Logic
function isSOPDocument(text: string) {
  if (!text) return false;
  return text.toLowerCase().includes('statement of purpose');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = file.name.toLowerCase();

    let updatedCount = 0;
    let message = "";

    if (fileName.endsWith('.xlsx')) {
      // 1. Tabular Data Engine
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet) as any[];

      for (const row of data) {
        if (row.Name && row.Country) {
          const country = await prisma.country.findFirst({
            where: { name: { equals: row.Country } }
          });

          if (country) {
            await prisma.university.create({
              data: {
                name: row.Name,
                city: row.City || null,
                countryId: country.id
              }
            });
            updatedCount++;

            if (row.TuitionMin) {
              await prisma.costEstimate.create({
                data: {
                  tuitionMin: parseFloat(row.TuitionMin),
                  countryId: country.id
                }
              });
              updatedCount++;
            }
          }
        }
      }
      message = "Excel tabular data parsed and ingested successfully.";

    } else if (fileName.endsWith('.docx')) {
      // 2. Word Buffer Engine
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value;

      if (isSOPDocument(text)) {
        await prisma.documentTemplate.create({
          data: {
            title: file.name.replace('.docx', ''),
            content: text,
            category: 'Statement of Purpose'
          }
        });
        updatedCount++;
        message = "SOP Word document parsed, matched heuristics, and routed to templates.";
      } else {
        message = "Document processed but did not match SOP heuristics.";
      }
    } else {
      return NextResponse.json({ error: "Unsupported file type. Use .xlsx or .docx" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message, updatedCount });

  } catch (error) {
    console.error("Ingestion Error:", error);
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
  }
}
