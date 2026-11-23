/*
 * TopStrip.jsx — Live moving trust ticker bar at the very top of the page
 * Continuously glides horizontally with key trust attributes.
 * Pauses automatically on hover so users can easily read.
 */
import { useState } from 'react';

const TICKER_ITEMS = [
  { icon: '✓', text: '100% DDA Nepal Licensed Community Pharmacies', highlight: true },
  { icon: '⚡', text: 'Express Delivery in Kathmandu Valley, Pokhara & Chitwan' },
  { icon: '🔒', text: '100% Refundable Security Deposit on Equipment Rentals', highlight: true },
  { icon: '💊', text: 'Genuine Batch-Tracked OTC & Prescription Dispensing' },
  { icon: '💳', text: 'Instant Cashback with Khalti Digital Wallet', highlight: true },
  { icon: '❄️', text: 'Temperature-Controlled Cold-Chain for Insulin & Biologicals' },
  { icon: '📄', text: 'Fast Prescription Upload & Licensed Pharmacist Verification' },
];

export default function TopStrip() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="bg-[var(--color-primary-900)] text-white text-xs py-2 px-3 relative overflow-hidden border-b border-blue-950 select-none z-50"
      role="region"
      aria-label="Live announcements"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Live Badge */}
        <div className="flex items-center gap-1.5 flex-shrink-0 bg-blue-800/80 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-200 mr-3 border border-blue-700/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Verified</span>
        </div>

        {/* Continuous Gliding Ticker */}
        <div className="overflow-hidden flex-1 relative flex items-center mask-gradient">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
            {/* Duplicated list to create a seamless infinite loop */}
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-2 text-xs text-blue-100">
                <span className={item.highlight ? 'text-amber-300 font-bold' : 'text-blue-300'}>
                  {item.icon}
                </span>
                <span className={item.highlight ? 'text-white font-semibold' : 'text-blue-100'}>
                  {item.text}
                </span>
                <span className="text-blue-500/60 ml-4 font-normal">|</span>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="ml-3 p-1 text-blue-300 hover:text-white rounded hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Close notification ticker"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
