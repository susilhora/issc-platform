"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-7xl mb-6">⚙️</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
      <p className="text-gray-500 mb-8 max-w-md">Our AI system encountered an unexpected error. Don't worry, our engineers have been notified.</p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[var(--primary-green)] text-white font-bold rounded-full hover:scale-105 transition-transform shadow-md"
        >
          Try Again
        </button>
        <Link href="/" className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-full hover:bg-gray-300 transition-colors shadow-sm">
          Return Home
        </Link>
      </div>
    </div>
  );
}
