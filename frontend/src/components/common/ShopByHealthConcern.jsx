/*
 * ShopByHealthConcern.jsx — Category Explorer with Official Illustration Cards
 *
 * Sized 20% more compact as requested:
 * Card width reduced by 20% (from ~185px to ~148px on desktop, ~136px on tablet, ~120px on mobile).
 * Direct squircle illustration placement with smooth hover effect and arrow controls.
 */

import Carousel from '../ui/Carousel.jsx';
import { HEALTH_CONCERNS } from '../../data/healthConcerns.js';
import { Link } from 'react-router-dom';

export default function ShopByHealthConcern() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5" aria-label="Shop by Health Concern">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
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
        itemWidth={148}
        ariaLabel="Health Concern Categories"
      >
        {HEALTH_CONCERNS.map((item) => (
          <Link
            key={item.id}
            to={item.link || '/medicines'}
            className="w-[120px] sm:w-[136px] lg:w-[148px] flex-shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block group border border-gray-100 bg-white"
            aria-label={item.label}
          >
            {/* Direct Image Placement without redundant text */}
            <div className="w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </Carousel>
    </section>
  );
}
