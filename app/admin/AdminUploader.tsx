"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const router = useRouter();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/ingest', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: `${data.message} (${data.updatedCount} records updated)` });
        setFile(null);
        // Refresh the page to trigger Server Component to fetch new counts
        router.refresh();
      } else {
        setStatus({ type: 'error', message: data.error || 'Upload failed' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An unexpected error occurred during ingestion.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Deep Clone Data Ingestion</h2>
      
      <div 
        className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:bg-green-50/50 hover:border-[var(--primary-green)] transition-all cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileUpload')?.click()}
      >
        <input 
          id="fileUpload" 
          type="file" 
          className="hidden" 
          accept=".xlsx,.docx"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
        />
        
        <div className="text-5xl mb-4">📥</div>
        {file ? (
          <p className="text-lg font-semibold text-[var(--primary-green)]">{file.name}</p>
        ) : (
          <div>
            <p className="text-lg font-semibold text-gray-700">Drag & Drop your file here</p>
            <p className="text-sm text-gray-500 mt-2">Supports .xlsx (Tabular Data) and .docx (SOP Documents)</p>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between min-h-[50px]">
        <div className="flex-1 mr-4">
          {status && (
            <div className={`p-4 rounded-xl text-sm font-semibold animate-fade-in ${status.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
              {status.message}
            </div>
          )}
        </div>
        
        <button 
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`px-8 py-3 rounded-full font-bold text-white transition-all shadow-lg ${
            !file || isUploading 
              ? 'bg-gray-300 cursor-not-allowed opacity-70' 
              : 'bg-[var(--primary-green)] hover:scale-105 hover:bg-green-800'
          }`}
        >
          {isUploading ? 'Ingesting Pipeline...' : 'Upload Data'}
        </button>
      </div>
    </div>
  );
}
