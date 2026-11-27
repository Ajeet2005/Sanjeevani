/*
 * CategoryBar.jsx — Horizontal scrollable category navigation strip
 * Sits below the navbar. Each category links to its section or page.
 * Inspired by PharMeasy/1mg category bars.
 */
import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* Category data with inline SVG icon descriptions */
const CATEGORIES = [
  {
    id: 'medicines',
    label: 'Medicines',
    href: '/medicines',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    id: 'nutrition',
    label: 'Nutrition & Supplements',
    href: '/nutrition',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    id: 'health-devices',
    label: 'Health Devices',
    href: '/health-devices',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    id: 'rental',
    label: 'Equipment Rental',
    href: '/equipment',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.149-.504 1.149-1.125v-5.432c0-.396-.216-.764-.564-.95l-4.333-2.167a1.5 1.5 0 00-.67-.158H7.5M15.75 18.75h-6M2.25 14.25h18.75" />
      </svg>
    ),
  },
  {
    id: 'healthcare',
    label: 'Healthcare Essentials',
    href: '/healthcare',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'plus',
    label: 'Plus',
    href: '/plus',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: 'offers',
    label: 'Offers',
    href: '/offers',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
];

function CategoryBar() {
  const location = useLocation();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 200, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  return (
    <div className="bg-white border-b border-[var(--color-gray-100)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Left scroll arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 hover:bg-white transition-colors"
            aria-label="Scroll categories left"
          >
            <svg className="w-4 h-4 text-[var(--color-gray-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}

        {/* Scrollable category strip */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2"
          role="tablist"
          aria-label="Product categories"
        >
          {CATEGORIES.map((cat) => {
            const isActive = location.pathname === cat.href;
            return (
              <Link
                key={cat.id}
                to={cat.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap flex-shrink-0 transition-all duration-200 group ${
                  isActive
                    ? 'text-[var(--color-primary)] bg-[var(--color-primary-50)] ring-1 ring-[var(--color-primary)]/20 font-bold shadow-xs'
                    : 'text-[var(--color-gray-600)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-50)] font-medium'
                }`}
                role="tab"
                aria-selected={isActive}
              >
                <span className={`transition-colors duration-200 ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-gray-400)] group-hover:text-[var(--color-primary)]'}`}>
                  {cat.icon}
                </span>
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Right scroll arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-1.5 hover:bg-white transition-colors"
            aria-label="Scroll categories right"
          >
            <svg className="w-4 h-4 text-[var(--color-gray-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoryBar;
