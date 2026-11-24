/*
 * SpotlightProductFeature.jsx — Featured Product Highlight (Left Image, Right Description)
 *
 * Implements the exact UI/UX from user reference screenshot:
 * 1. Left: Large rounded photographic preview of hand holding the amber bottle.
 * 2. Right:
 *    - "Best Seller" peach badge.
 *    - "Extra Strength Pain Relief Tablets" title.
 *    - 5-Star rating with 4.8 (1,234 reviews).
 *    - 4 structured bullet points.
 *    - "Select Size:" interactive dropdown.
 *    - "Add to Cart - Rs. 450" warm amber rounded CTA button with interactive state.
 *    - Omitted "Free delivery over..." line as explicitly requested by user.
 */

import { useState } from 'react';
import bottleImg from '../../assets/images/products/featured_pain_relief_bottle.png';

export default function SpotlightProductFeature() {
  const [selectedSize, setSelectedSize] = useState('100');
  const [added, setAdded] = useState(false);

  // Dynamic pricing based on selected size
  const sizePrices = {
    '50': 300,
    '100': 450,
    '200': 680,
  };

  const currentPrice = sizePrices[selectedSize] || 450;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      aria-label="Featured Product Spotlight"
    >
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300 p-6 sm:p-10">
        {/* Small Ad badge on top-left beside main content body */}
        <div className="flex items-center mb-3">
          <span className="border border-gray-400 text-gray-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white shadow-2xs">
            Ad
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* LEFT COLUMN: Product Image with Rounded Corners */}
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-[420px] aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FBF6F0] flex items-center justify-center p-2 sm:p-4 shadow-2xs border border-amber-50">
              <img
                src={bottleImg}
                alt="Extra Strength Pain Relief Tablets — Hand holding bottle"
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details & Purchase Form */}
          <div className="flex flex-col justify-center">
            {/* Best Seller Badge */}
            <div>
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] mb-3">
                Best Seller
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)] text-gray-900 leading-tight">
              Extra Strength Pain Relief Tablets
            </h3>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2 mt-2.5 mb-4">
              <div className="flex items-center text-amber-500" aria-label="Rating: 4.8 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">4.8</span>
              <span className="text-sm text-gray-500">(1,234 reviews)</span>
            </div>

            {/* Bullet Points with subtle stars */}
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 font-bold mt-0.5">•</span>
                <span>Fast-acting relief for minor aches and pains</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 font-bold mt-0.5">•</span>
                <span>Contains 500mg acetaminophen per tablet for effective pain management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 font-bold mt-0.5">•</span>
                <span>Versatile formula addresses headaches, muscle aches, backaches, arthritis pain, toothaches, and menstrual cramps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 font-bold mt-0.5">•</span>
                <span>Easy-to-swallow coated tablets for comfort</span>
              </li>
            </ul>

            {/* Select Size Dropdown */}
            <div className="mb-6 max-w-sm">
              <label htmlFor="tablet-size-select" className="block text-xs font-bold text-gray-700 mb-1.5">
                Select Size:
              </label>
              <div className="relative">
                <select
                  id="tablet-size-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors"
                >
                  <option value="50">50 tablets (Standard)</option>
                  <option value="100">100 tablets (+ Rs. 150)</option>
                  <option value="200">200 tablets (Value Pack + Rs. 380)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Add to Cart CTA Button — Warm Amber Matching Reference */}
            <div className="max-w-sm">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-3.5 px-6 rounded-full font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#EAB308] hover:bg-[#CA8A04] text-gray-950 shadow-amber-200'
                }`}
              >
                {added ? (
                  <>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Add to Cart — Rs. {currentPrice}</span>
                  </>
                )}
              </button>
            </div>
            {/* Free delivery line intentionally omitted as per user instructions */}
          </div>
        </div>
      </div>
    </section>
  );
}
