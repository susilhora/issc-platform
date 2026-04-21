import './globals.css';
import Link from 'next/link';
import GlobalSearch from '../components/GlobalSearch';

export const metadata = {
  title: 'ISSC AI Consultancy Platform',
  description: 'Guiding Students to the Global Classroom',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Sticky Navigation */}
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold" style={{ color: 'var(--primary-green)' }}>
              ISSC <span style={{ color: 'var(--accent-yellow)' }}>AI</span>
            </Link>
            <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
              <Link href="/destinations" className="hover:text-[var(--primary-green)] transition">Destinations</Link>
              <Link href="/scholarships" className="hover:text-[var(--primary-green)] transition">Scholarships</Link>
              <Link href="/roadmaps" className="hover:text-[var(--primary-green)] transition">Visa Roadmaps</Link>
              <Link href="/templates" className="hover:text-[var(--primary-green)] transition">SOP Templates</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <GlobalSearch />
              <button className="px-5 py-2 rounded-full font-semibold text-white transition-transform hover:scale-105 shadow-md whitespace-nowrap" style={{ backgroundColor: 'var(--primary-green)' }}>
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Ethical 4-Funnel Footer */}
        <footer className="bg-gray-900 text-white mt-20">
          <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-[var(--accent-yellow)]">Apply Now</h3>
              <p className="text-sm text-gray-400">Start your university application process with AI-guided assistance to top global institutions.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-[var(--accent-yellow)]">Promote Your University</h3>
              <p className="text-sm text-gray-400">Partner with us to feature your institution directly to top-tier, verified students.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-[var(--accent-yellow)]">Help a Student</h3>
              <p className="text-sm text-gray-400">Join our mentorship network or contribute to the community scholarship fund.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-[var(--accent-yellow)]">Community Q&A</h3>
              <p className="text-sm text-gray-400">Ask questions and get verified answers from industry experts and successful alumni.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 text-center py-6 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ISSC Education. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
