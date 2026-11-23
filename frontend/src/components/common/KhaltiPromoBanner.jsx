/*
 * KhaltiPromoBanner.jsx — Khalti Promotional Banner
 * Features the exact full graphic banner from the document (2048x685)
 * with the excited girl holding phone, Khalti logo, 10% Cashback, promo code, and Claim Cashback button.
 * Clicking the banner copies promo code "KHALTI10" and shows a confirmation toast.
 */
import { useState } from 'react';
import khaltiBannerImg from '../../assets/images/banners/banner_khalti_10cashback.png';

export default function KhaltiPromoBanner() {
  const [copied, setCopied] = useState(false);

  const handleBannerClick = () => {
    navigator.clipboard?.writeText('KHALTI10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3" aria-label="Khalti Payment Promotion">
      <div
        onClick={handleBannerClick}
        className="relative rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer border border-purple-100"
        title="Click to copy promo code KHALTI10"
      >
        <img
          src={khaltiBannerImg}
          alt="Get 10% Cashback with Khalti Digital Wallet — Promo Code KHALTI10"
          className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500 rounded-3xl block"
          loading="lazy"
        />

        {/* Interactive copy toast notification */}
        {copied && (
          <div className="absolute top-4 right-4 bg-gray-900/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm animate-fade-in flex items-center gap-1.5 z-20">
            <span className="text-emerald-400">✓</span>
            <span>Promo Code "KHALTI10" copied to clipboard!</span>
          </div>
        )}
      </div>
    </section>
  );
}
