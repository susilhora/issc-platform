"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

type University = {
  id: string;
  name: string;
  city: string | null;
  country: { name: string; costEstimates: { tuitionMin: number | null }[] };
};

type Country = {
  id: string;
  name: string;
  slug: string;
  description: string;
  costEstimates: { tuitionMin: number | null }[];
};

export default function DestinationsIndex() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/countries').then(r => r.json()).then(data => setCountries(data));
    fetch('/api/universities').then(r => r.json()).then(data => setUniversities(data));
  }, []);

  const filteredUniversities = universities.filter(u => 
    u.name.toLowerCase().includes(query.toLowerCase()) || 
    (u.city && u.city.toLowerCase().includes(query.toLowerCase())) ||
    u.country.name.toLowerCase().includes(query.toLowerCase())
  );

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
          
          {countries.length === 0 && (
            <div className="col-span-full text-center text-gray-500 italic p-8">Loading dynamic data...</div>
          )}
        </div>

        {/* Physical University Search */}
        <div className="mt-20 border-t border-gray-100 pt-16">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-[var(--primary-green)] rounded-full text-xs font-black uppercase tracking-widest mb-4">Deep Data Engine</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Search {universities.length > 0 ? universities.length : '116'}+ Global Universities</h2>
            <div className="max-w-2xl mx-auto relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-5 text-gray-400 text-xl">🔍</span>
              <input 
                type="text" 
                placeholder="Search by institution name, city, or country..." 
                className="w-full px-6 py-5 pl-14 rounded-2xl border-2 border-gray-200 focus:border-[var(--primary-green)] focus:ring-4 focus:ring-green-50 focus:outline-none transition-all text-lg shadow-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[800px] overflow-y-auto p-4 bg-gray-50/50 rounded-3xl border border-gray-100">
            {filteredUniversities.map(u => (
              <div key={u.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-100 transition-all group flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-[var(--primary-green)] transition-colors">{u.name}</h3>
                  <p className="text-gray-500 mb-4 text-sm flex items-center">
                    <span className="mr-2 opacity-50">📍</span> {u.city ? `${u.city}, ` : ''}{u.country.name}
                  </p>
                </div>
                <div className="bg-gray-50 text-gray-700 font-bold px-4 py-3 rounded-xl text-sm flex items-center justify-between border border-gray-100">
                  <span className="text-xs uppercase tracking-widest text-gray-400">Avg. Tuition</span>
                  <span className="text-[var(--primary-green)]">${u.country.costEstimates[0]?.tuitionMin?.toLocaleString() || 'N/A'}/yr</span>
                </div>
              </div>
            ))}
            {filteredUniversities.length === 0 && universities.length > 0 && (
              <div className="col-span-full text-center p-16">
                <span className="text-5xl mb-4 block opacity-30">📭</span>
                <p className="text-gray-500 text-lg font-semibold">No universities match your search criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters or expanding your search scope.</p>
              </div>
            )}
            {universities.length === 0 && (
              <div className="col-span-full text-center p-16">
                <p className="text-gray-500 italic">Loading universities from database...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
