/*
 * WellnessEssentials.jsx — "Wellness Essentials of the Week"
 * Curated healthcare, immunity and daily wellness kits.
 */
import Carousel from '../ui/Carousel.jsx';
import ProductCard from './ProductCard.jsx';
import { WELLNESS_ESSENTIALS } from '../../data/medicines.js';
import { Link } from 'react-router-dom';

export default function WellnessEssentials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7" aria-label="Wellness Essentials of the Week">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
            <span>🌿</span>
            <span>Weekly Curated Picks</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-[var(--font-heading)]">
            Wellness Essentials of the Week
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Top-rated immunity boosters, daily monitors & chronic care wellness products
          </p>
        </div>

        <Link
          to="/medicines"
          className="text-xs sm:text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
        >
          <span>View All Wellness</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <Carousel
        showArrows={true}
        showDots={false}
        totalItems={WELLNESS_ESSENTIALS.length}
        itemWidth={270}
        ariaLabel="Wellness Essentials of the Week"
      >
        {WELLNESS_ESSENTIALS.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </Carousel>
    </section>
  );
}
