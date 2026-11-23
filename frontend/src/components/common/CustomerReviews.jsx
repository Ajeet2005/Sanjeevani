/*
 * CustomerReviews.jsx — Customer testimonials section
 * - Calm, comfortable auto-advance speed (5.5s interval) so reviews are easy to read
 * - Fully navigable side-by-side using the mouse:
 *   - Click Left / Right navigation arrows (exact like hero section)
 *   - Click and drag smoothly with the mouse left and right
 * - Infinite seamless loop: connects the first review smoothly from the last without backward rewind
 * - Pauses on hover/drag and resumes when mouse leaves
 * - Clean section header with no counter
 */
import Carousel from '../ui/Carousel.jsx';
import { TESTIMONIALS } from '../../data/articles.js';

export default function CustomerReviews() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="Customer Reviews">
      {/* Clean section header without counter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="Caregiver and patient">
            👥
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-[var(--font-heading)]">
              What our customers have to say
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Verified stories from patients and caregivers across Nepal · Click arrows or drag with mouse to browse
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-side Review Carousel with calm speed, arrows & mouse drag */}
      <Carousel
        autoPlay={true}
        interval={5500}
        showArrows={true}
        showDots={true}
        totalItems={TESTIMONIALS.length}
        itemWidth={380}
        infiniteLoop={true}
        ariaLabel="Customer Testimonials"
      >
        {TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            className="w-[84vw] sm:w-[360px] lg:w-[380px] flex-shrink-0 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between min-h-[240px] select-none"
          >
            <div>
              {/* Reviewer Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900">{review.name}</h3>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {review.date} · {review.location}
                    </span>
                  </div>
                </div>
                <span className="bg-blue-50 text-[var(--color-primary)] text-[10px] font-black px-2.5 py-1 rounded-full border border-blue-100 flex-shrink-0">
                  {review.service}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic mt-3 line-clamp-4">
                "{review.review}"
              </p>
            </div>

            {/* Review Footer with Rating & Verified Badge */}
            <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400 text-sm" aria-label="5 out of 5 stars">
                {'★★★★★'}
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified Patient / Caregiver
              </span>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
