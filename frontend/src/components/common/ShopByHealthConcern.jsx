/*
 * ShopByHealthConcern.jsx — Condition-based category explorer
 * Displays 7 large, photographic condition cards in a smooth horizontal scroller.
 */
import Carousel from '../ui/Carousel.jsx';
import { HEALTH_CONCERNS } from '../../data/healthConcerns.js';
import { Link } from 'react-router-dom';

export default function ShopByHealthConcern() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" aria-label="Shop by Health Concern">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-[var(--font-heading)]">
            Shop by Health Concern
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Browse verified medicines and supportive healthcare devices by medical need
          </p>
        </div>

        <Link
          to="/medicines"
          className="text-xs sm:text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
        >
          <span>View All Categories</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <Carousel
        showArrows={true}
        showDots={false}
        totalItems={HEALTH_CONCERNS.length}
        itemWidth={180}
        ariaLabel="Health Concerns"
      >
        {HEALTH_CONCERNS.map((item) => (
          <Link
            key={item.id}
            to="/medicines"
            className={`w-[160px] sm:w-[175px] h-[210px] flex-shrink-0 bg-white border rounded-3xl p-3.5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between group ${item.color}`}
          >
            {/* Realistic Rounded Image Container */}
            <div className="w-24 h-24 rounded-2xl bg-white shadow-xs p-1.5 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
            </div>

            {/* Labels */}
            <div className="text-center mt-2">
              <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                {item.label}
              </h3>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                {item.count}
              </span>
            </div>

            {/* Micro pill */}
            <div className="w-full mt-1">
              <span className="block text-[9px] font-bold text-gray-600 bg-white/90 py-1 px-2 rounded-full border border-gray-100 text-center truncate">
                {item.tag}
              </span>
            </div>
          </Link>
        ))}
      </Carousel>
    </section>
  );
}
