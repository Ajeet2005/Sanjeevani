/*
 * VoucherPromo.jsx — Promotional voucher strip
 * Inspired by Himalayan Bank & discount scroller banner from user doc.
 */
import { VOUCHER_PROMO } from '../../data/banners.js';

export default function VoucherPromo() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Bank and Voucher Promotions">
      <div className="relative rounded-2xl bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 border border-amber-300 p-4 sm:p-6 shadow-sm overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Section: Bank Logo placeholder + Title */}
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="bg-white px-3 py-2 rounded-xl shadow-sm border border-amber-200 flex-shrink-0 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">
              HBL
            </div>
            <span className="text-xs font-bold text-gray-800 hidden sm:inline">
              {VOUCHER_PROMO.bankName}
            </span>
          </div>

          <div>
            <div className="inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
              Payment Partner Offer
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 font-[var(--font-heading)]">
              UPTO <span className="text-red-600">20% EXTRA</span> BANK & KHALTI DISCOUNT
            </h3>
            <p className="text-xs text-gray-700">
              Pay using Himalayan Bank Cards or Khalti on checkout.
            </p>
          </div>
        </div>

        {/* Center: Offers Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
          <div className="bg-red-800/80 text-white px-3 py-2 rounded-xl backdrop-blur-sm text-center shadow-sm">
            <span className="block font-bold">DEBIT CARD: 15% OFF</span>
            <span className="text-[10px] opacity-90">Upto Rs. 1500 · Min Rs. 1500</span>
          </div>
          <div className="bg-red-900 text-white px-3 py-2 rounded-xl text-center shadow-sm">
            <span className="block font-bold">CREDIT CARD: 20% OFF</span>
            <span className="text-[10px] opacity-90">Upto Rs. 2000 · Min Rs. 1500</span>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex-shrink-0">
          <button
            onClick={() => alert('Voucher code SANJEEVANI20 copied to clipboard!')}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {VOUCHER_PROMO.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
