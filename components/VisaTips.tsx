export default function VisaTips({ title, description }: { title: string; description?: string }) {
  return (
    <div className="bg-yellow-50 border-l-4 border-[var(--accent-yellow)] p-5 rounded-r-xl my-4 flex items-start shadow-sm hover:shadow-md transition-shadow">
      <div className="text-2xl mr-4 mt-0.5">💡</div>
      <div>
        <h4 className="font-bold text-gray-900 mb-1 flex items-center">
          {title} 
          <span className="text-[10px] uppercase tracking-wider text-[var(--primary-green)] ml-3 font-black bg-green-100 px-2 py-0.5 rounded-full">
            Counselor Note
          </span>
        </h4>
        {description && <p className="text-sm text-gray-700 leading-relaxed mt-1">{description}</p>}
      </div>
    </div>
  );
}
