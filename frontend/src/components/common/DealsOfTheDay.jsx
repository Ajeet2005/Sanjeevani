/*
 * DealsOfTheDay.jsx — Deals of the day with live countdown timer
 * Shows:
 * - Real-time countdown timer (e.g., "21:36:00 MINS LEFT, HURRY!")
 * - High discount cards with progress bar of claimed stock
 */
import { useState, useEffect } from 'react';
import Carousel from '../ui/Carousel.jsx';
import { DEALS_OF_THE_DAY } from '../../data/deals.js';
import { useCart } from '../../context/CartContext.jsx';

export default function DealsOfTheDay() {
  const { addToCart } = useCart();
  
  // Countdown timer state initialized to 21 hours 36 mins
  const [timeLeft, setTimeLeft] = useState({
    hours: 21,
    minutes: 36,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // reset daily
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigits = (n) => String(n).padStart(2, '0');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="Deals of the Day">
      <div className="bg-gradient-to-r from-[#0C2D7F] via-[var(--color-primary)] to-[#1548BE] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        
        {/* Header with Countdown Clock */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/20">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/15 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-white/10">
              <span>⚡</span>
              <span>LIMITED TIME FLASH DEALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)]">
              Deals of the Day
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Save big on essential health monitors and daily wellness kits
            </p>
          </div>

          {/* Clock Timer Widget */}
          <div className="flex items-center gap-3 bg-black/25 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
            <div className="flex items-center gap-1 text-yellow-300 font-extrabold text-xs">
              <svg className="w-5 h-5 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>HURRY!</span>
            </div>

            <div className="flex items-center gap-1 font-mono text-base sm:text-lg font-black tracking-wider text-white">
              <span className="bg-white/20 px-2 py-1 rounded-lg">{formatDigits(timeLeft.hours)}</span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-1 rounded-lg">{formatDigits(timeLeft.minutes)}</span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-1 rounded-lg text-yellow-300">{formatDigits(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>

        {/* Product Cards Row */}
        <div className="mt-6">
          <Carousel
            showArrows={true}
            showDots={false}
            totalItems={DEALS_OF_THE_DAY.length}
            itemWidth={280}
            ariaLabel="Daily Deals Products"
          >
            {DEALS_OF_THE_DAY.map((deal) => (
              <div
                key={deal.id}
                className="w-[260px] sm:w-[280px] flex-shrink-0 bg-white text-gray-900 rounded-2xl p-4 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-50 text-[var(--color-primary)] border border-blue-200 text-xs font-black px-2 py-0.5 rounded-md">
                      {deal.discountPercent}% OFF
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">{deal.brand}</span>
                  </div>

                  <div className="w-full h-32 flex items-center justify-center p-2 bg-gray-50 rounded-xl my-2">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 mt-2">
                    {deal.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">{deal.unit}</p>

                  {/* Stock Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-gray-500 font-medium mb-1">
                      <span>Claimed: {deal.soldPercent}%</span>
                      <span className="text-amber-600 font-bold">Few Left</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--color-primary)] rounded-full"
                        style={{ width: `${deal.soldPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-extrabold text-gray-900">
                      Rs. {deal.dealPrice}
                    </span>
                    <span className="text-xs text-gray-400 line-through ml-1.5">
                      Rs. {deal.originalPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart({ id: deal.id, name: deal.name, price: deal.dealPrice })}
                    className="px-3 py-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
