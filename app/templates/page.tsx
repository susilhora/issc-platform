import { PrismaClient } from '@prisma/client';
import Link from "next/link";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">📄</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{template.title}</h2>
                  <span className="inline-block bg-green-100 text-[var(--primary-green)] text-xs px-3 py-1 rounded-full font-bold mt-2 uppercase tracking-wide">
                    {template.category || 'General'}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-grow mb-6 relative overflow-hidden">
                <p className="text-gray-600 italic leading-relaxed">
                  "{template.content.length > 150 ? template.content.substring(0, 150) + '...' : template.content}"
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent"></div>
              </div>
              <button className="w-full text-center py-3 border-2 border-[var(--primary-green)] text-[var(--primary-green)] font-bold rounded-xl hover:bg-[var(--primary-green)] hover:text-white transition-all shadow-sm">
                Read Full Template
              </button>
            </div>
          ))}
          
          {templates.length === 0 && (
            <div className="col-span-2 text-center p-12 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 italic">No templates available. Please upload Word documents via the Admin Portal.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
