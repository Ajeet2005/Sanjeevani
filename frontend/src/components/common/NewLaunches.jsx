/*
 * NewLaunches.jsx — "Trending Medicines Near You"
 *
 * Updated as per user specification:
 * Replaced horizontal scroller with a static 2 rows × 4 items grid (8 products total),
 * preserving our clean Sanjeevani ProductCard design (Rx badges, pricing in Rs., Add/Upload buttons).
 */

import ProductCard from './ProductCard.jsx';
import { MEDICINES } from '../../data/medicines.js';
import { Link } from 'react-router-dom';

export default function NewLaunches({ title = 'Trending Medicines Near You' }) {
  // Exactly 8 items: 4 items in row 1, 4 items in row 2 on desktop
  const displayMedicines = MEDICINES.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" aria-label={title}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-[var(--font-heading)]">
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

      {/* 2 Rows × 4 Columns Grid (8 Products) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayMedicines.map((prod) => (
          <ProductCard key={prod.id} product={prod} className="!w-full" />
        ))}
      </div>
    </section>
  );
}
