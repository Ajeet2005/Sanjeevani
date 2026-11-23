/*
 * FeaturedBrands.jsx — Top pharmaceutical manufacturers in Nepal
 */
import { FEATURED_BRANDS } from '../../data/brands.js';
import { Link } from 'react-router-dom';

export default function FeaturedBrands() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7" aria-label="Featured Brands">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[var(--color-primary)] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
            <span>🇳🇵</span>
            <span>DDA & WHO-GMP Approved</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-[var(--font-heading)]">
            Featured Pharmaceutical Brands
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Certified manufacturers providing authentic medicine batches across Nepal
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {FEATURED_BRANDS.map((brand) => (
          <Link
            key={brand.id}
            to="/medicines"
            className="group p-3.5 bg-white rounded-3xl border border-gray-100 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col items-center text-center justify-between min-h-[130px]"
          >
            {/* Authentic Brand Emblem */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${brand.color} text-white shadow-sm flex items-center justify-center font-black text-xs tracking-tight group-hover:scale-105 transition-transform duration-200`}>
              <span>{brand.abbr}</span>
            </div>

            <div className="mt-2.5">
              <h3 className="text-xs font-extrabold text-gray-900 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                {brand.name}
              </h3>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                {brand.origin}
              </span>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded block mt-1">
                {brand.tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
