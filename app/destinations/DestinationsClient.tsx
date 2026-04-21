"use client";

import { useState } from 'react';

type University = {
  id: number;
  name: string;
  city: string | null;
  country: { name: string; costEstimates: { tuitionMin: number | null }[] };
};

export default function DestinationsClient({ universities }: { universities: University[] }) {
  const [query, setQuery] = useState('');

  const filtered = universities.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    (u.city && u.city.toLowerCase().includes(query.toLowerCase())) ||
    u.country.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mt-20 border-t border-gray-100 pt-16">
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 bg-green-100 text-[var(--primary-green)] rounded-full text-xs font-black uppercase tracking-widest mb-4">Deep Data Engine</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Search {universities.length}+ Global Universities</h2>
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
        {filtered.map(u => (
          <div key={u.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-100 transition-all group flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-[var(--primary-green)] transition-colors">{u.name}</h3>
              <p className="text-gray-500 mb-4 text-sm flex items-center">
                <span className="mr-2 opacity-50">📍</span>{u.city ? `${u.city}, ` : ''}{u.country.name}
              </p>
            </div>
            <div className="bg-gray-50 text-gray-700 font-bold px-4 py-3 rounded-xl text-sm flex items-center justify-between border border-gray-100">
              <span className="text-xs uppercase tracking-widest text-gray-400">Avg. Tuition</span>
              <span className="text-[var(--primary-green)]">${u.country.costEstimates[0]?.tuitionMin?.toLocaleString() || 'N/A'}/yr</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center p-16">
            <span className="text-5xl mb-4 block opacity-30">📭</span>
            <p className="text-gray-500 text-lg font-semibold">No universities match "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
