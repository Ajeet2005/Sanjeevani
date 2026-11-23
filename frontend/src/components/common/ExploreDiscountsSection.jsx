/*
 * ExploreDiscountsSection.jsx — "Explore Up To 25% Discount on Selected Products"
 *
 * Implements the exact UI/UX from user reference screenshot:
 * 1. Bold two-line section heading.
 * 2. 3-card asymmetric Bento grid (1 large card on left, 2 stacked cards on right).
 * 3. Matching pastel color tones (sky blue #BAE6FD, warm yellow #FEF08A, soft pink #FBCFE8).
 * 4. 25% OFF pill badges, product titles, pricing in Nepal Rs. with "Including tax".
 * 5. Pill "Shop Now" action buttons.
 * 6. Product clusters matching reference layout.
 */

import { Link } from 'react-router-dom';
import cluster1 from '../../assets/images/products/discount_product_cluster_1.png';
import cluster2 from '../../assets/images/products/discount_product_cluster_2.png';
import cluster3 from '../../assets/images/products/discount_product_cluster_3.png';

export default function ExploreDiscountsSection() {
  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5"
      aria-label="Promotional Discounts on Healthcare Products"
    >
      {/* Section Heading — Exact styling from reference */}
      <div className="mb-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)] text-gray-900 leading-tight tracking-tight">
          Explore Up To 25% Discount<br />
          on Selected Products
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {/* CARD 1 (Left): Large Card (Spans full height of the 2 right cards) */}
        <div
          className="bg-[#BAE6FD] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300 min-h-[300px] md:min-h-[360px]"
          style={{ backgroundColor: '#BAE6FD' }}
        >
          {/* Top Info */}
          <div className="z-10 max-w-[240px] sm:max-w-[280px]">
            <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-white/80 text-sky-900 shadow-2xs mb-3">
              25% OFF
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-[var(--font-heading)] text-gray-900 leading-snug">
              BloodFlow Plus
            </h3>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-gray-900">
                Rs. 750
              </span>
              <span className="text-xs text-gray-600 font-medium">
                Including tax
              </span>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="z-10 mt-6 pt-2">
            <Link
              to="/medicines?category=cardiac"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all duration-200"
            >
              Shop Now
            </Link>
          </div>

          {/* Product Cluster Imagery — Absolute positioned to right/bottom */}
          <div className="absolute right-0 bottom-0 w-[55%] sm:w-[58%] max-w-[280px] pointer-events-none select-none transition-transform duration-500 group-hover:scale-105">
            <img
              src={cluster1}
              alt="BloodFlow Plus, Omega Concentrate & Essential Derma Care"
              className="w-full h-auto object-contain block ml-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Stack of 2 Horizontal Cards */}
        <div className="flex flex-col gap-5 lg:gap-6 justify-between">
          {/* CARD 2 (Top Right): Warm Yellow */}
          <div
            className="bg-[#FEF08A] rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300 min-h-[160px] sm:min-h-[170px]"
            style={{ backgroundColor: '#FEF08A' }}
          >
            <div className="z-10 max-w-[200px] sm:max-w-[240px]">
              <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-white/80 text-amber-900 shadow-2xs mb-2">
                25% OFF
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-[var(--font-heading)] text-gray-900 leading-tight">
                Hand Sanitizer
              </h3>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-extrabold text-gray-900">
                  Rs. 220
                </span>
                <span className="text-xs text-gray-600 font-medium">
                  Including tax
                </span>
              </div>
            </div>

            <div className="z-10 mt-3">
              <Link
                to="/medicines?category=antiseptic"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 text-xs font-bold px-5 py-2 rounded-full shadow-xs hover:shadow-md transition-all duration-200"
              >
                Shop Now
              </Link>
            </div>

            {/* Product Image */}
            <div className="absolute right-3 sm:right-6 bottom-2 w-[38%] max-w-[170px] pointer-events-none select-none transition-transform duration-500 group-hover:scale-105">
              <img
                src={cluster2}
                alt="Hand Sanitizers and Cleansers"
                className="w-full h-auto object-contain block ml-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* CARD 3 (Bottom Right): Soft Pink */}
          <div
            className="bg-[#FBCFE8] rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300 min-h-[160px] sm:min-h-[170px]"
            style={{ backgroundColor: '#FBCFE8' }}
          >
            <div className="z-10 max-w-[200px] sm:max-w-[240px]">
              <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-white/80 text-pink-900 shadow-2xs mb-2">
                25% OFF
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-[var(--font-heading)] text-gray-900 leading-tight">
                Body Lotion
              </h3>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-extrabold text-gray-900">
                  Rs. 290
                </span>
                <span className="text-xs text-gray-600 font-medium">
                  Including tax
                </span>
              </div>
            </div>

            <div className="z-10 mt-3">
              <Link
                to="/medicines?category=derma"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 text-xs font-bold px-5 py-2 rounded-full shadow-xs hover:shadow-md transition-all duration-200"
              >
                Shop Now
              </Link>
            </div>

            {/* Product Image */}
            <div className="absolute right-3 sm:right-6 bottom-1 w-[44%] max-w-[190px] pointer-events-none select-none transition-transform duration-500 group-hover:scale-105">
              <img
                src={cluster3}
                alt="Body Lotion, Multivitamins and Skin Care Essentials"
                className="w-full h-auto object-contain block ml-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
