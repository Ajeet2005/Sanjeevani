/*
 * JournalNavbar.jsx — Dedicated minimal header for Sanjeevani Health Journal (/blog)
 * Inspired by reference journal UI: Clean, publication-focused, using the official Sanjeevani stethoscope logo.
 */
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SanjeevaniLogo from '../common/SanjeevaniLogo.jsx';

export default function JournalNavbar() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/blog?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/blog');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200/80 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Official Stethoscope Logo */}
        <Link to="/blog" className="flex items-center gap-3 group flex-shrink-0 py-1" aria-label="Sanjeevani Health Journal">
          <SanjeevaniLogo className="h-11 sm:h-13 w-auto transition-transform duration-200 group-hover:scale-[1.02]" />
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-[var(--color-primary)] border border-blue-100 hidden sm:inline-block">
            Journal
          </span>
        </Link>

        {/* Center: Search articles, guides, and news */}
        <div className="hidden md:flex items-center flex-1 max-w-lg mx-6">
          <form onSubmit={handleSearch} className="w-full relative flex items-center">
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles, guides, and news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-24 py-2 rounded-full border border-gray-200 text-xs focus:outline-hidden focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all bg-gray-50/60"
            />
            <button
              type="submit"
              className="absolute right-1 px-4 py-1.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Link
            to="/"
            className="text-xs font-bold text-gray-600 hover:text-[var(--color-primary)] px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1.5"
          >
            <span>← Store & Pharmacy</span>
          </Link>
          <Link
            to="/login"
            className="text-xs font-bold text-gray-900 hover:text-[var(--color-primary)] flex items-center gap-1 px-3.5 py-2 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <span>Log in</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
