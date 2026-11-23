/*
 * SearchBar.jsx — Search input with Medicines / Equipment toggle
 * Visually toggles between searching medicines and equipment.
 * Currently mock — will connect to backend search API later.
 */
import { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('medicines'); // 'medicines' | 'equipment'

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Connect to search API / navigate to results page
    console.log(`Searching ${mode} for: ${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full" role="search" aria-label="Search products">
      <div className="flex items-center bg-[var(--color-gray-50)] rounded-xl border border-[var(--color-gray-200)] focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary-100)] transition-all duration-200">
        {/* Mode toggle tabs */}
        <div className="flex-shrink-0 flex border-r border-[var(--color-gray-200)]">
          <button
            type="button"
            onClick={() => setMode('medicines')}
            className={`px-3 py-2.5 text-xs font-semibold transition-colors duration-200 rounded-l-xl ${
              mode === 'medicines'
                ? 'bg-[var(--color-primary)] text-white'
                : 'text-[var(--color-gray-500)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-50)]'
            }`}
            aria-pressed={mode === 'medicines'}
          >
            Medicines
          </button>
          <button
            type="button"
            onClick={() => setMode('equipment')}
            className={`px-3 py-2.5 text-xs font-semibold transition-colors duration-200 ${
              mode === 'equipment'
                ? 'bg-[var(--color-primary)] text-white'
                : 'text-[var(--color-gray-500)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-50)]'
            }`}
            aria-pressed={mode === 'equipment'}
          >
            Equipment
          </button>
        </div>

        {/* Search input */}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === 'medicines' ? 'Search medicines, brands...' : 'Search equipment, devices...'}
          className="flex-1 px-4 py-2.5 bg-transparent text-sm text-[var(--color-gray-800)] placeholder:text-[var(--color-gray-400)] focus:outline-none min-w-0"
          aria-label={`Search ${mode}`}
        />

        {/* Search button */}
        <button
          type="submit"
          className="flex-shrink-0 p-2.5 text-[var(--color-gray-400)] hover:text-[var(--color-primary)] transition-colors duration-200"
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
