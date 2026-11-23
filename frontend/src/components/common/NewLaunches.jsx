/*
 * NewLaunches.jsx — Trending medicines and new releases
 */
import Carousel from '../ui/Carousel.jsx';
import ProductCard from './ProductCard.jsx';
import { MEDICINES } from '../../data/medicines.js';
import { Link } from 'react-router-dom';

export default function NewLaunches({ title = 'New Launches & Trending Medicines' }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label={title}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-[var(--font-heading)]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Frequently dispensed medicines and newly stocked health essentials
          </p>
        </div>

        <Link
          to="/medicines"
          className="text-xs sm:text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <Carousel
        showArrows={true}
        showDots={false}
        totalItems={MEDICINES.length}
        itemWidth={270}
        ariaLabel={title}
      >
        {MEDICINES.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </Carousel>
    </section>
  );
}
