/*
 * FeaturedOffersSection.jsx — "Featured Offers" (30%, 25%, 20%, 15% OFF)
 *
 * Implements the exact layout from user reference screenshot:
 * 1. "Featured Offers" title.
 * 2. 4 cards in a single row/grid.
 * 3. Fresh healthcare pastel color tones for Sanjeevani (Warm Peach, Soft Sky Blue, Gentle Rose, Calming Mint).
 * 4. Exact discount percentages: Up To 30% OFF, 25% OFF, 20% OFF, 15% OFF.
 * 5. Relevant Nepal healthcare & medicine categories:
 *    - Up To 30% OFF on Selected Supplements & Chronic Care
 *    - Up To 25% OFF on Skin Care & Derma Essentials
 *    - Up To 20% OFF on Mother & Baby Health Care
 *    - Up To 15% OFF on Personal Care & First Aid Essentials
 * 6. Clean transparent realistic product clusters & white "Shop Now" pill buttons.
 */

import { Link } from 'react-router-dom';
import prod1 from '../../assets/images/products/featured_offer_prod_1.png';
import prod2 from '../../assets/images/products/featured_offer_prod_2.png';
import prod3 from '../../assets/images/products/featured_offer_prod_3.png';
import prod4 from '../../assets/images/products/featured_offer_prod_4.png';

const OFFERS = [
  {
    id: 'offer-1',
    percentage: '30%',
    subtitle: 'On selected Supplements',
    link: '/medicines?category=supplements',
    image: prod1,
    imageAlt: 'Supplements, Multivitamins & Vitamin C',
    bgClass: 'bg-[#FFF7ED]', // Soft warm peach
    borderClass: 'border-orange-200/70',
    percentColor: 'text-[#EA580C]',
    subColor: 'text-orange-950',
  },
  {
    id: 'offer-2',
    percentage: '25%',
    subtitle: 'On Skin Care Products',
    link: '/medicines?category=skin',
    image: prod2,
    imageAlt: 'Cetaphil Cleansers & Salinibrin Care',
    bgClass: 'bg-[#EFF6FF]', // Soft sky blue
    borderClass: 'border-blue-200/70',
    percentColor: 'text-[#2563EB]',
    subColor: 'text-blue-950',
  },
  {
    id: 'offer-3',
    percentage: '20%',
    subtitle: 'On Baby & Mother Care',
    link: '/medicines?category=baby',
    image: prod3,
    imageAlt: 'Baby Soap, Powders & Family Care Kit',
    bgClass: 'bg-[#FDF2F8]', // Soft gentle pink
    borderClass: 'border-pink-200/70',
    percentColor: 'text-[#DB2777]',
    subColor: 'text-pink-950',
  },
  {
    id: 'offer-4',
    percentage: '15%',
    subtitle: 'On Personal Care & First Aid',
    link: '/medicines?category=personal',
    image: prod4,
    imageAlt: 'Therapeutic Cleanser, Creams & First Aid',
    bgClass: 'bg-[#F0FDF4]', // Soft calming mint
    borderClass: 'border-emerald-200/70',
    percentColor: 'text-[#059669]',
    subColor: 'text-emerald-950',
  },
];

export default function FeaturedOffersSection() {
  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5"
      aria-label="Featured Offers"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-[var(--font-heading)]">
            Featured Offers
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Exclusive multi-category savings on verified medications & daily healthcare
          </p>
        </div>

        <Link
          to="/medicines"
          className="text-xs sm:text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
        >
          <span>View All Deals</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {OFFERS.map((offer) => (
          <div
            key={offer.id}
            className={`${offer.bgClass} border ${offer.borderClass} rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden group shadow-xs hover:shadow-lg transition-all duration-300 min-h-[200px] sm:min-h-[220px]`}
          >
            {/* Top Text Info */}
            <div className="z-10 max-w-[130px] sm:max-w-[145px]">
              <span className="text-[11px] font-bold text-gray-500 block uppercase tracking-wider">
                Up To
              </span>
              <span className={`text-2xl sm:text-3xl font-black font-[var(--font-heading)] ${offer.percentColor} block leading-tight tracking-tight`}>
                {offer.percentage} OFF
              </span>
              <p className={`text-xs font-semibold ${offer.subColor} mt-1 leading-snug line-clamp-2`}>
                {offer.subtitle}
              </p>
            </div>

            {/* Bottom Button */}
            <div className="z-10 mt-4">
              <Link
                to={offer.link}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 text-xs font-bold px-4 py-2 rounded-full shadow-xs hover:shadow-md transition-all duration-200"
              >
                Shop Now
              </Link>
            </div>

            {/* Product Cluster Graphic on Right */}
            <div className="absolute right-2 bottom-1 w-[46%] max-w-[125px] pointer-events-none select-none transition-transform duration-500 group-hover:scale-105">
              <img
                src={offer.image}
                alt={offer.imageAlt}
                className="w-full h-auto object-contain block ml-auto"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
