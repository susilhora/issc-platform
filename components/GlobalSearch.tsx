"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  type: 'university' | 'visa' | 'sop';
  title: string;
  subtitle: string;
  link: string;
}

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced database fetch
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'university': return '🎓';
      case 'visa': return '✈️';
      case 'sop': return '📄';
      default: return '🔍';
    }
  };

  return (
    <div className="relative w-full max-w-sm hidden lg:block" ref={dropdownRef}>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </span>
        <input 
          type="text" 
          className="w-full py-2 pl-10 pr-10 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent transition-all"
          placeholder="Search universities, visas, SOPs..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length >= 2) setIsLoading(true);
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
        {isLoading && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="animate-spin h-4 w-4 text-[var(--primary-green)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden max-h-96 overflow-y-auto">
          <ul>
            {results.map((item) => (
              <li key={item.id} className="border-b border-gray-50 last:border-0">
                <Link 
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start p-3 hover:bg-green-50/50 transition-colors cursor-pointer group"
                >
                  <span className="text-xl mr-3 mt-0.5">{getTypeIcon(item.type)}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-[var(--primary-green)] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg z-50 p-4 text-center">
          <p className="text-sm text-gray-500">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
