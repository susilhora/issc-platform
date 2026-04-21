import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-9xl font-black text-[var(--accent-yellow)] drop-shadow-sm mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Looks like you're exploring off the map.</h2>
      <p className="text-gray-500 mb-8 max-w-md">We couldn't find the page you were looking for. It might have been moved or doesn't exist yet.</p>
      <Link href="/" className="px-8 py-3 bg-[var(--primary-green)] text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
        Return to Homepage
      </Link>
    </div>
  );
}
