import Link from "next/link";

export default function ScholarshipsHub() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 bg-gray-50">
      <div className="text-7xl mb-6 animate-pulse">🎓</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Global Scholarships Hub</h1>
      <p className="text-gray-500 mb-8 max-w-lg text-lg">We are currently aggregating thousands of active scholarships across our network. This tool is launching very soon!</p>
      <div className="inline-block border-2 border-[var(--accent-yellow)] bg-yellow-50 text-yellow-800 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm mb-8">
        Under Construction
      </div>
      <Link href="/destinations" className="px-8 py-3 bg-[var(--primary-green)] text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
        Explore Destinations Instead
      </Link>
    </div>
  );
}
