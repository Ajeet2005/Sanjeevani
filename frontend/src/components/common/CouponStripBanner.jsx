/*
 * CouponStripBanner.jsx — Large Format Promotional & Voucher Banner
 * Sized ~851x296 matching the Premium Membership banner scale.
 * Features realistic human character imagery, authentic healthcare promos, and coupon copy tools.
 */
import { useState } from 'react';

export default function CouponStripBanner({
  tag = 'SPECIAL VOUCHER',
  title = 'Deals You Manifested Are Here!',
  subtitle = 'Get Flat 15% OFF on Chronic Care Essentials & Doorstep Delivery in Nepal',
  code = 'CARE15',
  bgStyle = 'from-teal-900 via-emerald-800 to-teal-950',
  characterImage = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&auto=format&fit=crop&q=80',
  btnColor = 'bg-amber-400 text-gray-950 hover:bg-amber-300',
  highlightText = 'Flat 15% OFF',
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" aria-label="Promotion Banner">
      <div className={`relative min-h-[280px] sm:min-h-[296px] rounded-3xl bg-gradient-to-r ${bgStyle} text-white p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 select-none group`}>
        
        {/* Decorative background glow */}
        <div className="absolute -left-16 -top-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Side: Offer Details */}
        <div className="max-w-xl z-10 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-amber-300 border border-white/20 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <span>🎁</span>
            <span>{tag}</span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-[var(--font-heading)] leading-none text-white">
            {title.includes('!') ? (
              <>
                {title.split('!')[0]}!<br/>
                <span className="text-amber-300">{highlightText}</span>
              </>
            ) : (
              title
            )}
          </h3>

          <p className="text-xs sm:text-sm text-gray-200 mt-3 leading-relaxed max-w-md">
            {subtitle}
          </p>

          {/* Coupon Code & Button */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
            <div className="bg-black/35 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-3">
              <div>
                <span className="text-[9px] text-gray-300 uppercase font-bold block">Coupon Code</span>
                <span className="font-mono text-sm font-extrabold text-amber-300">{code}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            <button
              onClick={handleCopy}
              className={`px-7 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 ${btnColor}`}
            >
              Apply Discount
            </button>
          </div>
        </div>

        {/* Right Side: Realistic Character Photo */}
        <div className="z-10 relative flex-shrink-0 flex items-end justify-center md:justify-end h-[240px] sm:h-[280px] w-full md:w-[320px] lg:w-[380px]">
          <div className="relative w-full h-full flex items-end justify-center">
            <div className="absolute w-56 h-56 rounded-full bg-white/10 blur-2xl top-4 pointer-events-none" />

            <img
              src={characterImage}
              alt={title}
              className="h-full object-cover object-top rounded-2xl md:rounded-3xl shadow-2xl border-2 border-white/20 group-hover:scale-102 transition-transform duration-500"
              loading="lazy"
            />

            {/* Micro Badge */}
            <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:-left-4 bg-white text-gray-900 rounded-2xl p-2.5 shadow-xl border border-gray-100 flex items-center gap-2">
              <span className="text-xl">🩺</span>
              <div className="text-left pr-2">
                <span className="text-[10px] text-gray-400 block font-semibold">Nepal Healthcare</span>
                <span className="text-xs font-black text-emerald-600">Verified Savings</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
