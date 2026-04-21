import { PrismaClient } from '@prisma/client';
import AdminUploader from './AdminUploader';

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const [universities, visas, sops] = await Promise.all([
    prisma.university.count(),
    prisma.visaRoadmap.count(),
    prisma.documentTemplate.count()
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">ISSC Admin Portal</h1>
          <p className="text-gray-500">Secure ingestion and data pipeline management dashboard.</p>
        </div>

        {/* Data Status Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Total Universities</p>
              <p className="text-3xl font-bold text-[var(--primary-green)]">{universities}</p>
            </div>
            <div className="text-4xl">🎓</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Visa Roadmap Steps</p>
              <p className="text-3xl font-bold text-[var(--primary-green)]">{visas}</p>
            </div>
            <div className="text-4xl">✈️</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">SOP Templates</p>
              <p className="text-3xl font-bold text-[var(--primary-green)]">{sops}</p>
            </div>
            <div className="text-4xl">📄</div>
          </div>
        </div>

        {/* Drag & Drop Client Component */}
        <AdminUploader />
      </div>
    </div>
  );
}
