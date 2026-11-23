/*
 * RentEquipmentSection.jsx — Medical equipment rental carousel
 * Features cards showing daily rates, refundable security deposit, and date picker CTA.
 */
import Carousel from '../ui/Carousel.jsx';
import EquipmentCard from './EquipmentCard.jsx';
import { RENTAL_EQUIPMENT } from '../../data/equipment.js';
import { Link } from 'react-router-dom';

export default function RentEquipmentSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="Rent Medical Equipment">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
            <span>🛡️</span>
            <span>100% Refundable Deposit</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-[var(--font-heading)]">
            Rent Medical Equipment
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Wheelchairs, hospital beds & oxygen concentrators on flexible rental dates
          </p>
        </div>

        <Link
          to="/equipment"
          className="text-xs sm:text-sm font-bold text-teal-700 hover:underline flex items-center gap-1"
        >
          <span>View All Equipment</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <Carousel
        showArrows={true}
        showDots={false}
        totalItems={RENTAL_EQUIPMENT.length}
        itemWidth={310}
        ariaLabel="Rentable Medical Equipment"
      >
        {RENTAL_EQUIPMENT.map((item) => (
          <EquipmentCard key={item.id} item={item} />
        ))}
      </Carousel>
    </section>
  );
}
