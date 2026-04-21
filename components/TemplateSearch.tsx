"use client";

import { useState } from 'react';

type Template = {
  id: string;
  title: string;
  content: string;
  category: string | null;
};

export default function TemplateSearch({ templates }: { templates: Template[] }) {
  const [query, setQuery] = useState('');

  const filtered = templates.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) || 
    t.content.toLowerCase().includes(query.toLowerCase()) ||
    (t.category && t.category.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <>
      <div className="max-w-3xl mx-auto mb-16 relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-6 text-gray-400 text-xl">🔍</span>
        <input 
          type="text" 
          placeholder="Search templates (e.g. 'Australia', 'Master', 'Engineering')..." 
          className="w-full px-6 py-5 pl-14 rounded-2xl border-2 border-gray-200 focus:border-[var(--primary-green)] focus:ring-4 focus:ring-green-50 focus:outline-none transition-all text-lg shadow-sm bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-xs font-bold uppercase">{filtered.length} matches</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((template) => (
          <div key={template.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-green-100 transition-all flex flex-col group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform">📄</div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-[var(--primary-green)] transition-colors">{template.title}</h2>
                  <span className="inline-block bg-green-100 text-[var(--primary-green)] text-xs px-3 py-1 rounded-full font-bold mt-2 uppercase tracking-widest">
                    {template.category || 'General'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 flex-grow mb-6 relative overflow-hidden group-hover:bg-green-50/30 transition-colors">
              <p className="text-gray-600 italic leading-relaxed whitespace-pre-wrap text-sm">
                "{template.content.length > 200 ? template.content.substring(0, 200) + '...' : template.content}"
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent group-hover:from-green-50/30"></div>
            </div>
            
            <button className="w-full text-center py-4 border-2 border-[var(--primary-green)] text-[var(--primary-green)] font-bold rounded-xl hover:bg-[var(--primary-green)] hover:text-white transition-all shadow-sm">
              Read Full Template
            </button>
          </div>
        ))}
        
        {filtered.length === 0 && (
          <div className="col-span-2 text-center p-16 bg-white rounded-3xl border border-dashed border-gray-300">
            <span className="text-5xl mb-4 block opacity-30">🗂️</span>
            <p className="text-gray-600 text-xl font-bold mb-2">No templates found for "{query}".</p>
            <p className="text-gray-400">Try adjusting your keywords or use broader terms like "SOP".</p>
          </div>
        )}
      </div>
    </>
  );
}
