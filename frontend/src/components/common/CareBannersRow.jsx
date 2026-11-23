/*
 * CareBannersRow.jsx — Healthcare quotes & facts mini-banners row
 * Sizing 570x240 cards (3 fitted, 1 scrollable with mouse/auto) as requested.
 * Banners highlight factual services (cold chain, oxygen equipment, ortho mobility).
 */
import Carousel from '../ui/Carousel.jsx';
import { HEALTH_CARE_BANNERS } from '../../data/banners.js';
import { Link } from 'react-router-dom';

export default function CareBannersRow({ title = 'Health & Care Solutions' }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" aria-label={title}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-[var(--font-heading)]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Essential care services and genuine supplies curated for Nepal
          </p>
        </div>
      </div>

      <Carousel
        autoPlay={false}
        showArrows={true}
        showDots={false}
        totalItems={HEALTH_CARE_BANNERS.length}
        itemWidth={420}
        ariaLabel={title}
      >
        {HEALTH_CARE_BANNERS.map((item) => (
          <div
            key={item.id}
            className={`w-[85vw] sm:w-[380px] lg:w-[420px] h-[190px] flex-shrink-0 rounded-2xl p-6 flex flex-col justify-between shadow-sm transition-all duration-200 hover:shadow-md ${item.theme}`}
          >
            <div>
              <span className="text-[11px] font-bold text-gray-600 bg-white/80 px-2.5 py-1 rounded-md shadow-xs">
                {item.badge}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-2.5 font-[var(--font-heading)] line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-2">
              <Link
                to={item.link}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
              >
                <span>{item.cta}</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
