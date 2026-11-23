/*
 * PrescriptionCtaBand.jsx — Prescription Upload Section
 * Uses a monochromatic edge-to-edge backdrop representing a real clinical doctor at work
 * across the entire background, with high-contrast text and instant upload button.
 */
import { Link } from 'react-router-dom';

export default function PrescriptionCtaBand() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="Upload Prescription">
      <div className="rounded-3xl relative text-white p-7 sm:p-12 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-400/20 group select-none min-h-[250px]">
        
        {/* Full Edge-to-Edge Monochromatic Background Image */}
        <img
          src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1400&auto=format&fit=crop&q=80"
          alt="Clinical doctor examining patient prescription notes"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
        />

        {/* Deep Monochromatic Blue Overlay (matching the hero banner aesthetic) */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/90 to-blue-950/75 pointer-events-none" />

        {/* Content (Overlaid directly on the monochromatic background) */}
        <div className="max-w-2xl text-center md:text-left z-10 flex-1">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-blue-200 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold mb-3 shadow-xs">
            <span>℞</span>
            <span>RESTRICTED MEDICINES SAFETY FIRST</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-[var(--font-heading)] tracking-tight leading-tight">
            Have a Doctor’s Prescription?
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 mt-2.5 max-w-xl leading-relaxed">
            Upload your valid prescription. A licensed community pharmacist will review your prescription, verify dosages, and arrange immediate delivery from a verified local pharmacy.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-5 text-xs text-blue-200 font-medium">
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full border border-white/10">
              <span className="text-emerald-400 font-bold">✓</span> Validated by licensed pharmacists
            </span>
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full border border-white/10">
              <span className="text-emerald-400 font-bold">✓</span> 100% Genuine batch tracking
            </span>
            <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full border border-white/10">
              <span className="text-emerald-400 font-bold">✓</span> Confidential patient records
            </span>
          </div>
        </div>

        {/* Right Action */}
        <div className="z-10 flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
          <Link
            to="/upload-prescription"
            className="px-8 py-4 bg-white text-blue-950 hover:bg-blue-50 font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2.5"
          >
            <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>Upload Prescription Now</span>
          </Link>
          <span className="text-[11px] text-blue-200">Takes less than 1 minute</span>
        </div>

      </div>
    </section>
  );
}
