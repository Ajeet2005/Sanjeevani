/*
 * VerifiedVendors.jsx — Nearby pharmacy & supplier discovery
 * Shows local verified pharmacies in Kathmandu, Pokhara, etc.
 */
import { VERIFIED_VENDORS } from '../../data/brands.js';
import { Link } from 'react-router-dom';

export default function VerifiedVendors() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="Verified Local Vendors">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-[var(--color-primary)] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
            <span>📍</span>
            <span>Local Delivery Across Nepal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-[var(--font-heading)]">
            Verified Vendors Near You
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Licensed community pharmacies and medical suppliers vetted by Sanjeevani
          </p>
        </div>

        <Link
          to="/vendors"
          className="text-xs sm:text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
        >
          <span>View All Vendors</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VERIFIED_VENDORS.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                  ✓ {vendor.badge}
                </span>
                <span className="text-[11px] font-semibold text-gray-400">
                  {vendor.distance}
                </span>
              </div>

              <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                {vendor.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="truncate">{vendor.location}</span>
              </p>

              <p className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-xl mt-3 line-clamp-2">
                {vendor.specialty}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <span>★</span>
                <span className="text-gray-800">{vendor.rating}</span>
                <span className="text-gray-400 font-normal">({vendor.reviews})</span>
              </div>

              <Link
                to="/vendors"
                className="text-xs font-bold text-[var(--color-primary)] hover:underline"
              >
                View Catalog →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
