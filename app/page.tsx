import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

// Instantiate PrismaClient
const prisma = new PrismaClient();

export default async function HomePage() {
  // Fetch actual data directly from SQLite
  const countries = await prisma.country.findMany({
    include: { costEstimates: true },
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[var(--primary-green)] text-white py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern-mesh"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Guiding Students to the <br />
            <span className="text-[var(--accent-yellow)] drop-shadow-md">Global Classroom</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Navigate your international education journey with data-driven insights, 
            expert visa roadmaps, and our AI-powered university matching engine.
          </p>
          <Link href="/destinations" className="inline-block px-8 py-4 rounded-full text-lg font-bold bg-[var(--accent-yellow)] text-gray-900 hover:bg-yellow-400 transition-transform hover:-translate-y-1 shadow-xl">
            Find Your Destination
          </Link>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900">Explore Top Destinations</h2>
          <div className="h-1.5 w-24 bg-[var(--accent-yellow)] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {countries.map((country) => {
            const minTuition = country.costEstimates[0]?.tuitionMin;
            
            return (
              <div key={country.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col">
                <div className="h-48 bg-gray-200 relative">
                  {/* Decorative backdrop representing images */}
                  <div className="absolute inset-0 bg-[var(--primary-green)] opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
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
      </section>
    </div>
  );
}
