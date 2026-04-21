import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import VisaTips from '../../../components/VisaTips';

const prisma = new PrismaClient();

export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const country = await prisma.country.findUnique({
    where: { slug: params.slug },
    include: {
      costEstimates: true,
      visaRoadmaps: {
        orderBy: { stepNumber: 'asc' }
      }
    }
  });

  if (!country) {
    notFound();
  }

  const financials = country.costEstimates[0];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-[var(--primary-green)] text-white py-24 relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-10 bg-pattern-mesh"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-[var(--accent-yellow)] drop-shadow-md">{country.name}</h1>
          <p className="text-xl max-w-3xl mx-auto text-green-50 leading-relaxed">{country.description}</p>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Visa Roadmap */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b border-gray-100 pb-6 flex items-center">
                <span className="mr-3 text-3xl">✈️</span> Visa Application Roadmap
              </h2>
              
              <div className="space-y-8">
                {country.visaRoadmaps.map((step) => {
                  // Render Heuristic Expert Tip
                  if (step.is_expert_tip) {
                    return <VisaTips key={step.id} title={`Step ${step.stepNumber}: ${step.title}`} description={step.description || undefined} />;
                  }
                  
                  // Render Standard Step
                  return (
                    <div key={step.id} className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-50 text-[var(--primary-green)] rounded-full flex items-center justify-center font-black text-xl mr-5 shadow-sm border border-green-100">
                        {step.stepNumber}
                      </div>
                      <div className="pt-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
                
                {country.visaRoadmaps.length === 0 && (
                  <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500 italic">Roadmap steps are currently being aggregated by the AI engine.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Financials Sticky Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all hover:shadow-2xl">
              <div className="bg-gray-900 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-[var(--accent-yellow)] rounded-full opacity-10 blur-xl"></div>
                <h3 className="text-2xl font-bold text-white mb-1 relative z-10">Financial Summary</h3>
                <p className="text-sm text-gray-400 relative z-10">Estimated Annual Costs</p>
              </div>
              
              <div className="p-8">
                {financials ? (
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Tuition Range</p>
                      <p className="text-2xl font-black text-gray-900">
                        ${financials.tuitionMin?.toLocaleString()} <span className="text-gray-300 font-normal mx-1">-</span> ${financials.tuitionMax?.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6">
                      <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Living Costs</p>
                      <p className="text-2xl font-black text-gray-900">
                        ${financials.livingCost?.toLocaleString()}<span className="text-lg text-gray-400 font-normal">/yr</span>
                      </p>
                    </div>
                    
                    <div className="bg-green-50 border border-green-100 p-5 rounded-2xl mt-8 shadow-inner">
                      <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-1 text-center">Total Estimated First Year</p>
                      <p className="text-xl text-[var(--primary-green)] font-black text-center">
                        ${((financials.tuitionMin || 0) + (financials.livingCost || 0)).toLocaleString()}+
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <span className="text-4xl mb-3 block opacity-50">📊</span>
                    <p className="text-gray-500 italic text-sm">Financial data pending AI ingestion.</p>
                  </div>
                )}
                
                <button className="w-full mt-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl" style={{ backgroundColor: 'var(--primary-green)' }}>
                  Request Exact Quote
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
