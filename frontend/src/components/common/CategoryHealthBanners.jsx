/*
 * CategoryHealthBanners.jsx — Disease & Category Spotlight Banners
 * Placed immediately after "Ads in the Spotlight".
 * Styled identically to the Hero Banners carousel (~570px wide cards with realistic photography,
 * high-contrast clinical gradients, and direct category actions for:
 * 1. Skin, Hair & Nails
 * 2. Stomach & Digestive Relief
 * 3. Heart & Vital Signs Care
 * 4. First Aid & Emergency Kits
 */
import { Link } from 'react-router-dom';
import Carousel from '../ui/Carousel.jsx';
import { CATEGORY_HEALTH_BANNERS } from '../../data/banners.js';

export default function CategoryHealthBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" aria-label="Health Category Spotlights">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
            Targeted Healthcare Categories
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-[var(--font-heading)] mt-1">
            Condition-Specific Care & Wellness Solutions
          </h2>
        </div>
      </div>

      <Carousel
        autoPlay={true}
        interval={4500}
        showArrows={true}
        showDots={true}
        totalItems={CATEGORY_HEALTH_BANNERS.length}
        itemWidth={570}
        infiniteLoop={true}
        ariaLabel="Health Category Banners"
      >
        {CATEGORY_HEALTH_BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="w-[88vw] sm:w-[480px] lg:w-[570px] h-[230px] sm:h-[250px] flex-shrink-0 rounded-3xl text-white p-6 sm:p-7 flex flex-col justify-between shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-xl group"
          >
            {/* Realistic Photographic Background Image */}
            <img
              src={banner.image}
              alt={banner.headline}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              loading="lazy"
            />

            {/* High Contrast Healthcare Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.overlay} pointer-events-none`} />

            {/* Top Tag & Badge */}
            <div className="flex items-center justify-between gap-2 z-10">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                {banner.tag}
              </span>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${banner.badgeBg}`}>
                {banner.badge}
              </span>
            </div>

            {/* Middle Content */}
            <div className="z-10 my-auto max-w-md">
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold font-[var(--font-heading)] leading-tight text-white drop-shadow-sm">
                {banner.headline}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 mt-2 line-clamp-2 leading-relaxed drop-shadow-xs">
                {banner.subline}
              </p>
            </div>

            {/* Bottom CTA Button */}
            <div className="z-10 flex items-center justify-between pt-1">
              <Link
                to={banner.ctaLink}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-md ${banner.buttonColor}`}
              >
                <span>{banner.ctaText}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
