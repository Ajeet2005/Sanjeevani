/*
 * SpotlightProducts.jsx — "In The Spotlight" showcase
 *
 * Contained within standard container (max-w-7xl) with rounded corners
 * for consistent design across the page:
 * - Contained rounded container (rounded-3xl, bg-[#FFF9E6], border-[#FFE8A3])
 * - Hanging ceiling spotlight lamp fixture with glowing amber light rays
 * - Crisp white product cards with ratings, delivery speed, slashed price & discount percentage
 */
import Carousel from '../ui/Carousel.jsx';
import ProductCard from './ProductCard.jsx';
import { MEDICINES } from '../../data/medicines.js';

export default function SpotlightProducts() {
  return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6" aria-label="In The Spotlight">
          {/* Contained Spotlight Card with Rounded Corners */}
          <div className="bg-[#FFF9E6] border border-[#FFE8A3] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs hover:shadow-md transition-shadow">

                {/* ─── Hanging Ceiling Spotlight Lamp & Beaming Light Cone ─── */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-0">
                  {/* Lamp Cord */}
                  <div className="w-[1.5px] h-7 bg-amber-700/80" />

                  {/* Hanging Ceiling Lamp Fixture */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-16 h-7 bg-gradient-to-b from-amber-700 to-amber-600 rounded-t-xl shadow-md border-t border-amber-400" />
                    <div className="w-20 h-1.5 bg-amber-500 rounded-full shadow-xs" />
                    {/* Bulb and radiating light rays */}
                    <div className="w-6 h-3 bg-yellow-200 rounded-full blur-[1px] -mt-1" />
                    {/* Light rays drawing */}
                    <div className="flex gap-2 -mt-1 text-amber-500 text-xs font-black opacity-80">
                      <span>\</span>
                      <span>|</span>
                      <span>/</span>
                    </div>
                  </div>

                  {/* Soft Golden Conical Light Beam Spanning Across Cards */}
                  <div
                    className="w-full max-w-4xl h-96 bg-gradient-to-b from-amber-200/40 via-amber-100/20 to-transparent pointer-events-none -mt-2"
                    style={{
                      clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
                    }}
                  />
                </div>

              {/* Content Container */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="border border-gray-400 text-gray-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white shadow-xs">
                    Ad
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-[var(--font-heading)]">
                    In The Spotlight
                  </h2>
                </div>

                    {/* Spotlight Product Cards */}
                    <Carousel
                      showArrows={true}
                      showDots={false}
                      totalItems={MEDICINES.length}
                      itemWidth={270}
                      ariaLabel="In The Spotlight Products"
                    >
                      {MEDICINES.map((prod) => (
                        <ProductCard key={prod.id} product={prod} />
                      ))}
                    </Carousel>
                  </div>
                </div>
              </section>
              );
}
