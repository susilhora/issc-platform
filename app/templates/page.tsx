import { PrismaClient } from '@prisma/client';
import Link from "next/link";
import TemplateSearch from '../../components/TemplateSearch';

const prisma = new PrismaClient();

export default async function TemplatesHub() {
  const templates = await prisma.documentTemplate.findMany();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">SOP Document Library</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our curated collection of successful Statement of Purpose structures and application essays.</p>
          <div className="h-1.5 w-24 bg-[var(--accent-yellow)] mx-auto mt-6 rounded-full"></div>
        </div>

        <TemplateSearch templates={templates} />
      </div>
    </div>
  );
}
