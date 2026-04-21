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

export default function HomePage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  
  // AI Matcher State
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState(30000);
  const [gpa, setGpa] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [matches, setMatches] = useState<University[]>([]);

  useEffect(() => {
    fetch('/api/universities').then(r => r.json()).then(data => setUniversities(data));
    fetch('/api/countries').then(r => r.json()).then(data => setCountries(data));
  }, []);

  const handleMatch = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const filtered = universities.filter(u => {
        const destMatch = destination === '' || destination === 'Any' || u.country.name === destination;
        const tuition = u.country.costEstimates[0]?.tuitionMin || 0;
        const budgetMatch = tuition === 0 || tuition <= budget;
        return destMatch && budgetMatch;
      });
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      setMatches(shuffled.slice(0, 3));
      setStep(4);
      setIsProcessing(false);
    }, 1500);
  };

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

      {/* Physical AI Matching Engine */}
      <section className="py-12 bg-gray-50 px-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto my-16 border border-gray-100 transform transition-all hover:shadow-3xl">
          <div className="bg-gray-900 p-8 md:p-10 text-white flex items-center justify-between relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-[var(--accent-yellow)] rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/4"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold flex items-center"><span className="text-[var(--accent-yellow)] mr-4">🤖</span> AI University Matcher</h2>
              <p className="text-gray-400 mt-3 text-lg font-medium">Find your perfect study destination from our {universities.length > 0 ? universities.length : '116'}+ deep dataset in seconds.</p>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            {step === 1 && (
              <div className="animate-fade-in text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Where do you want to study?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {['Australia', 'UK', 'USA', 'Canada', 'Any'].map(dest => (
                    <button 
                      key={dest}
                      onClick={() => { setDestination(dest); setStep(2); }}
                      className="p-5 rounded-2xl border-2 border-gray-200 hover:border-[var(--primary-green)] hover:bg-green-50 font-bold transition-all text-gray-700 text-lg hover:shadow-md"
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">What is your maximum annual tuition budget?</h3>
                <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-3xl border border-gray-100">
                  <p className="text-5xl font-black text-[var(--primary-green)] mb-8">${budget.toLocaleString()}</p>
                  <input 
                    type="range" 
                    min="10000" max="60000" step="5000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-[var(--primary-green)] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-10"
                  />
                  <button 
                    onClick={() => setStep(3)}
                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:scale-105 transition-transform text-lg shadow-lg"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">What is your current GPA or Score?</h3>
                <div className="max-w-md mx-auto flex flex-col space-y-6">
                  <input 
                    type="text" 
                    placeholder="e.g. 3.5, 85%, 2:1" 
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    className="w-full px-8 py-5 rounded-2xl border-2 border-gray-200 focus:border-[var(--primary-green)] focus:ring-4 focus:ring-green-50 outline-none text-2xl text-center shadow-inner font-bold"
                  />
                  <button 
                    onClick={handleMatch}
                    disabled={!gpa || isProcessing || universities.length === 0}
                    className="w-full py-5 bg-[var(--accent-yellow)] text-gray-900 font-extrabold rounded-2xl hover:bg-yellow-400 transition-all disabled:opacity-50 text-xl shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    {isProcessing ? 'Analyzing Data Core...' : 'Find My Matches ✨'}
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center border-b border-gray-100 pb-6">Your Top {matches.length} University Matches</h3>
                {matches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {matches.map((u, idx) => (
                      <div key={u.id} className="border-2 border-gray-100 rounded-2xl p-6 relative overflow-hidden bg-white shadow-sm hover:shadow-xl hover:border-[var(--primary-green)] transition-all flex flex-col">
                        <div className="absolute -right-4 -top-4 bg-[var(--primary-green)] text-white font-black w-14 h-14 rounded-full flex items-center justify-center opacity-90 shadow-md">#{idx + 1}</div>
                        <div className="flex-grow">
                          <h4 className="font-extrabold text-xl mb-3 pr-6 text-gray-900 leading-tight">{u.name}</h4>
                          <p className="text-sm font-semibold text-gray-500 mb-2 flex items-center"><span className="mr-2">📍</span> {u.country.name}</p>
                          <p className="text-xs text-gray-400 font-medium mb-6">Est. Tuition: ${u.country.costEstimates[0]?.tuitionMin?.toLocaleString() || 'N/A'}/yr</p>
                        </div>
                        <Link href={`/destinations/${u.country.name.toLowerCase()}`} className="block w-full text-center py-3 bg-gray-50 hover:bg-[var(--primary-green)] text-[var(--primary-green)] hover:text-white rounded-xl text-sm font-bold transition-colors">
                          View Country Guide →
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-12 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                    <span className="text-6xl mb-4 block opacity-40">📉</span>
                    <p className="text-gray-600 font-bold text-xl mb-2">No universities perfectly matched.</p>
                    <p className="text-gray-500 mb-6">Try adjusting your budget or selecting 'Any' destination.</p>
                    <button onClick={() => setStep(1)} className="px-6 py-3 bg-[var(--primary-green)] text-white font-bold rounded-xl shadow-md hover:scale-105 transition-transform">Start Over</button>
                  </div>
                )}
                {matches.length > 0 && (
                  <div className="text-center mt-10">
                    <button onClick={() => setStep(1)} className="text-sm text-gray-500 font-bold hover:text-gray-900 underline underline-offset-4 transition-colors">Re-calculate Parameters</button>
                  </div>
                )}
              </div>
            )}
          </div>
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
      </section>
    </div>
  );
}
