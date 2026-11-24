/*
 * SpotlightProducts.jsx — "In The Spotlight" showcase
 *
 * Contained within standard container (max-w-7xl) with rounded corners
 * for consistent design across the page:
 * - Contained rounded container (rounded-3xl, bg-[#FFF9E6], border-[#FFE8A3])
 * - Hanging ceiling spotlight lamp fixture with glowing amber light rays
 * - Lamp light scatters widely to the left and right like a real bulb
 * - Displays strictly 4 cards per row on desktop (no cut-off 5th card peeking)
 * - Smooth previous/next navigation and drag-to-scroll
 */
import { useRef, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import { MEDICINES } from '../../data/medicines.js';

export default function SpotlightProducts() {
  const trackRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const getStep = () => {
    if (!trackRef.current) return 280;
    const card = trackRef.current.querySelector('.spotlight-product-item');
    if (!card) return 280;
    return card.offsetWidth + 20; // card width + gap
  };

  const handleNext = () => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const step = getStep();
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxScroll - 15) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: step, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const step = getStep();
    if (el.scrollLeft <= 15) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: -step, behavior: 'smooth' });
    }
  };

  const onMouseDown = (e) => {
    if (!trackRef.current) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const onMouseMove = (e) => {
    if (!isDownRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const onMouseUp = () => {
    isDownRef.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDownRef.current = false;
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6" aria-label="In The Spotlight">
      {/* Contained Spotlight Card with Rounded Corners */}
      <div className="bg-[#FFF9E6] border border-[#FFE8A3] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs hover:shadow-md transition-shadow">

        {/* ─── Ambient Bulb Light Scattering Smoothly Across Left & Right ─── */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 95% 75% at 50% 36px, rgba(254, 240, 138, 0.6) 0%, rgba(254, 243, 199, 0.35) 45%, rgba(255, 251, 235, 0.1) 75%, transparent 100%)',
          }}
        />

        {/* ─── Wide Angled Light Fan spreading across cards to left and right ─── */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'linear-gradient(180deg, rgba(254, 240, 138, 0.45) 0%, rgba(254, 243, 199, 0.22) 55%, transparent 100%)',
            clipPath: 'polygon(46% 36px, 54% 36px, 100% 100%, 0% 100%)',
            filter: 'blur(20px)',
          }}
        />

        {/* ─── Hanging Ceiling Spotlight Lamp ─── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-0">
          {/* Lamp Cord */}
          <div className="w-[1.5px] h-7 bg-amber-700/80" />

          {/* Hanging Ceiling Lamp Fixture */}
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-7 bg-gradient-to-b from-amber-700 to-amber-600 rounded-t-xl shadow-md border-t border-amber-400" />
            <div className="w-20 h-1.5 bg-amber-500 rounded-full shadow-xs" />
            {/* Bulb and radiating light glow */}
            <div className="w-8 h-4 bg-yellow-100 rounded-full blur-[1px] -mt-1 shadow-[0_0_16px_rgba(253,224,71,0.95)]" />
            {/* Light rays drawing spreading left, center, right */}
            <div className="flex gap-3 -mt-0.5 text-amber-500 text-xs font-black opacity-90">
              <span className="-rotate-30 transform origin-top">\</span>
              <span>|</span>
              <span className="rotate-30 transform origin-top">/</span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <span className="border border-gray-400 text-gray-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white shadow-xs">
              Ad
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-[var(--font-heading)]">
              In The Spotlight
            </h2>
          </div>

          {/* Spotlight Product Cards Slider — Strictly 4 in 1 row on desktop without 5th peeking */}
          <div className="relative group">
            {/* Left Navigation Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous products"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Scrollable Track: exact 4-card distribution */}
            <div
              ref={trackRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-3 select-none cursor-grab active:cursor-grabbing"
              tabIndex={0}
            >
              {MEDICINES.map((prod) => (
                <div
                  key={prod.id}
                  className="spotlight-product-item w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)] flex-shrink-0"
                >
                  <ProductCard product={prod} className="w-full h-full" />
                </div>
              ))}
            </div>

            {/* Right Navigation Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Next products"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
