/*
 * EquipmentCard.jsx — Rentable Medical Equipment card
 * Highlights:
 * - Rate per day in Rs.
 * - 100% Refundable security deposit
 * - Sterilization & condition guarantee
 * - Action: "Select Rental Dates" button in Sanjeevani Brand Blue (#1A56DB)
 */
import { Link } from 'react-router-dom';

export default function EquipmentCard({ item }) {
  return (
    <div className="w-[280px] sm:w-[300px] flex-shrink-0 bg-white border border-gray-100 rounded-3xl p-4 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group select-none">
      
      {/* Category & Condition Badge */}
      <div className="flex items-center justify-between mb-2">
        <span className="bg-blue-50 text-[var(--color-primary)] text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-blue-200">
          {item.category}
        </span>
        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          ✓ {item.condition}
        </span>
      </div>

      {/* Image Container */}
      <div className="w-full h-40 rounded-2xl bg-white border border-gray-50 flex items-center justify-center p-2 overflow-hidden my-2 group-hover:scale-102 transition-transform duration-200 shadow-inner">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="max-h-full max-w-full object-cover rounded-xl"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=80';
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between mt-2">
        <div>
          <h3 className="text-sm sm:text-base font-extrabold text-gray-900 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Pricing block: Daily rent + Refundable deposit */}
        <div className="mt-4 pt-3 border-t border-gray-100 bg-gray-50/80 p-3 rounded-2xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Rental Rate:</span>
            <span className="text-sm font-black text-[var(--color-primary)] font-[var(--font-heading)]">
              Rs. {item.ratePerDay} <span className="text-[11px] font-normal text-gray-500">/ day</span>
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Refundable Deposit:</span>
            <span className="font-extrabold text-gray-800">
              Rs. {item.refundableDeposit}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 italic">
            *100% deposit returned upon undamaged pickup
          </p>
        </div>

        {/* Action Button: In Sanjeevani Brand Blue (#1A56DB) */}
        <div className="mt-3">
          <Link
            to="/equipment"
            className="w-full py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)] text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors text-center block"
          >
            Select Rental Dates
          </Link>
        </div>
      </div>
    </div>
  );
}
