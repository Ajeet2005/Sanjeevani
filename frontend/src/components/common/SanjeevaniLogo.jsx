/*
 * SanjeevaniLogo.jsx — Full brand logo (crossed bandages, wordmark, stethoscope swoosh & tagline)
 * Rendered in Sanjeevani's primary healthcare blue (#1A56DB) with transparent background.
 */

export default function SanjeevaniLogo({ className = 'h-11 sm:h-12 w-auto' }) {
  return (
    <svg
      viewBox="0 0 430 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[var(--color-primary)] ${className}`}
      role="img"
      aria-label="Sanjeevani — Medicines, Equipment & Care"
    >
      <defs>
        {/* Mask so the front bandage cleanly overlaps the back bandage on any background */}
        <mask id="sanjeevani-back-bandage-mask">
          <rect width="430" height="135" fill="white" />
          <g transform="translate(68 68) rotate(-42)">
            <rect x="-23" y="-62" width="46" height="124" rx="23" fill="black" />
          </g>
        </mask>
      </defs>

      {/* ─── Back Bandage (bottom-left to top-right) ─── */}
      <g mask="url(#sanjeevani-back-bandage-mask)">
        <g transform="translate(72 66) rotate(44)">
          {/* Outer capsule border */}
          <rect
            x="-20"
            y="-58"
            width="40"
            height="116"
            rx="20"
            stroke="currentColor"
            strokeWidth="3.2"
          />
          <rect
            x="-16"
            y="-54"
            width="32"
            height="108"
            rx="16"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.7"
          />
          {/* Center pad */}
          <rect x="-11" y="-17" width="22" height="34" rx="2.5" fill="currentColor" />
          {/* Top perforation dots */}
          <circle cx="-6" cy="-42" r="1.7" fill="currentColor" />
          <circle cx="0" cy="-45" r="1.7" fill="currentColor" />
          <circle cx="6" cy="-42" r="1.7" fill="currentColor" />
          <circle cx="-8" cy="-35" r="1.7" fill="currentColor" />
          <circle cx="-2.5" cy="-35" r="1.7" fill="currentColor" />
          <circle cx="2.5" cy="-35" r="1.7" fill="currentColor" />
          <circle cx="8" cy="-35" r="1.7" fill="currentColor" />
          <circle cx="-6" cy="-28" r="1.7" fill="currentColor" />
          <circle cx="0" cy="-28" r="1.7" fill="currentColor" />
          <circle cx="6" cy="-28" r="1.7" fill="currentColor" />
          {/* Bottom perforation dots */}
          <circle cx="-6" cy="28" r="1.7" fill="currentColor" />
          <circle cx="0" cy="28" r="1.7" fill="currentColor" />
          <circle cx="6" cy="28" r="1.7" fill="currentColor" />
          <circle cx="-8" cy="35" r="1.7" fill="currentColor" />
          <circle cx="-2.5" cy="35" r="1.7" fill="currentColor" />
          <circle cx="2.5" cy="35" r="1.7" fill="currentColor" />
          <circle cx="8" cy="35" r="1.7" fill="currentColor" />
          <circle cx="-6" cy="42" r="1.7" fill="currentColor" />
          <circle cx="0" cy="45" r="1.7" fill="currentColor" />
          <circle cx="6" cy="42" r="1.7" fill="currentColor" />
        </g>
      </g>

      {/* ─── Front Bandage (top-left to bottom-right) ─── */}
      <g transform="translate(68 68) rotate(-42)">
        {/* Subtle bottom-left accent curve */}
        <path
          d="M -25 2 C -26 16, -24 28, -19 37"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Outer capsule border */}
        <rect
          x="-20"
          y="-58"
          width="40"
          height="116"
          rx="20"
          stroke="currentColor"
          strokeWidth="3.2"
        />
        <rect
          x="-16"
          y="-54"
          width="32"
          height="108"
          rx="16"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.7"
        />
        {/* Center pad */}
        <rect x="-11" y="-17" width="22" height="34" rx="2.5" fill="currentColor" />
        {/* Top perforation dots */}
        <circle cx="-6" cy="-42" r="1.7" fill="currentColor" />
        <circle cx="0" cy="-45" r="1.7" fill="currentColor" />
        <circle cx="6" cy="-42" r="1.7" fill="currentColor" />
        <circle cx="-8" cy="-35" r="1.7" fill="currentColor" />
        <circle cx="-2.5" cy="-35" r="1.7" fill="currentColor" />
        <circle cx="2.5" cy="-35" r="1.7" fill="currentColor" />
        <circle cx="8" cy="-35" r="1.7" fill="currentColor" />
        <circle cx="-6" cy="-28" r="1.7" fill="currentColor" />
        <circle cx="0" cy="-28" r="1.7" fill="currentColor" />
        <circle cx="6" cy="-28" r="1.7" fill="currentColor" />
        {/* Bottom perforation dots */}
        <circle cx="-6" cy="28" r="1.7" fill="currentColor" />
        <circle cx="0" cy="28" r="1.7" fill="currentColor" />
        <circle cx="6" cy="28" r="1.7" fill="currentColor" />
        <circle cx="-8" cy="35" r="1.7" fill="currentColor" />
        <circle cx="-2.5" cy="35" r="1.7" fill="currentColor" />
        <circle cx="2.5" cy="35" r="1.7" fill="currentColor" />
        <circle cx="8" cy="35" r="1.7" fill="currentColor" />
        <circle cx="-6" cy="42" r="1.7" fill="currentColor" />
        <circle cx="0" cy="45" r="1.7" fill="currentColor" />
        <circle cx="6" cy="42" r="1.7" fill="currentColor" />
      </g>

      {/* ─── Wordmark: "Sanjeevani" ─── */}
      <text
        x="148"
        y="76"
        fill="currentColor"
        fontFamily="'Plus Jakarta Sans', 'Nunito', 'Arial Rounded MT Bold', sans-serif"
        fontWeight="900"
        fontSize="45"
        letterSpacing="-0.5"
      >
        Sanjeevani
      </text>

      {/* ─── Stethoscope & Curved Tube Underline ─── */}
      {/* Left & Right Earpiece Tips */}
      <circle cx="395" cy="33" r="3" fill="currentColor" />
      <circle cx="408" cy="33" r="3" fill="currentColor" />
      {/* Binaural U-tube */}
      <path
        d="M 395 33 C 386 35, 386 64, 401.5 64 C 417 64, 417 35, 408 33"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Stethoscope stem flowing into swooshing underline beneath "Sanjeevani" */}
      <path
        d="M 401.5 64 C 401.5 92, 374 96, 338 92 C 280 86, 200 88, 146 98"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* ─── Tagline: "Medicines, Equipment & Care" ─── */}
      <text
        x="151"
        y="120"
        fill="currentColor"
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        fontWeight="700"
        fontStyle="italic"
        fontSize="16.5"
        letterSpacing="0.2"
      >
        Medicines, Equipment &amp; Care
      </text>
    </svg>
  );
}
