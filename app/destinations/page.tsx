import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import UniversitySearch from '../../components/UniversitySearch';

const prisma = new PrismaClient();

export default async function DestinationsIndex() {
  const countries = await prisma.country.findMany({
    include: { costEstimates: true },
  });

  const universities = await prisma.university.findMany({
    include: { country: { include: { costEstimates: true } } }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Explore Global Destinations</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover world-class education opportunities. Choose your destination to explore tuition costs, visa requirements, and expert counselor insights.</p>
          <div className="h-1.5 w-24 bg-[var(--accent-yellow)] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {countries.map((country) => {
            const minTuition = country.costEstimates[0]?.tuitionMin;
            
            return (
              <div key={country.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col">
                <div className="h-48 bg-gray-200 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[var(--primary-green)] opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <span className="text-6xl relative z-10 opacity-80 group-hover:scale-125 transition-transform duration-500">🌍</span>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{country.name}</h3>
                  <p className="text-sm text-gray-600 mb-6 flex-grow">{country.description}</p>
                  
                  {minTuition ? (
                    <div className="flex items-center justify-center text-sm font-bold text-[var(--primary-green)] mb-6 bg-green-50/80 p-4 rounded-xl">
                      <span className="mr-2 text-xl">💰</span> 
                      Est. Tuition: ${minTuition.toLocaleString()}/yr
                    </div>
                  ) : (
                    <div className="mb-6 text-sm text-gray-400 italic p-4 text-center">Tuition data pending</div>
                  )}

                  <Link href={`/destinations/${country.slug}`} className="block w-full text-center py-3 border-2 border-[var(--primary-green)] text-[var(--primary-green)] font-bold rounded-xl hover:bg-[var(--primary-green)] hover:text-white transition-all shadow-sm hover:shadow-md">
                    View Guide
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <UniversitySearch universities={universities} />
      </div>
    </div>
  );
}
