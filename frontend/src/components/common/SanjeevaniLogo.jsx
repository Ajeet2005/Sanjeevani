/*
 * SanjeevaniLogo.jsx — Full brand logo (asymmetrical crossed bandages, wordmark, stethoscope swoosh & tagline)
 * Rendered in Sanjeevani's primary healthcare blue (#1A56DB) with transparent background.
 */

function BandageBody() {
  return (
    <>
      {/* Outer capsule border */}
      <rect
        x="-19"
        y="-52"
        width="38"
        height="104"
        rx="19"
        stroke="currentColor"
        strokeWidth="4.4"
      />
      {/* Center gauze pad */}
      <rect x="-11" y="-16" width="22" height="32" rx="3" fill="currentColor" />
      {/* Top perforation dots (3-4-3 grid) */}
      <circle cx="-6" cy="-39" r="1.9" fill="currentColor" />
      <circle cx="0" cy="-42" r="1.9" fill="currentColor" />
      <circle cx="6" cy="-39" r="1.9" fill="currentColor" />
      <circle cx="-8.5" cy="-32" r="1.9" fill="currentColor" />
      <circle cx="-2.8" cy="-32" r="1.9" fill="currentColor" />
      <circle cx="2.8" cy="-32" r="1.9" fill="currentColor" />
      <circle cx="8.5" cy="-32" r="1.9" fill="currentColor" />
      <circle cx="-6" cy="-25" r="1.9" fill="currentColor" />
      <circle cx="0" cy="-25" r="1.9" fill="currentColor" />
      <circle cx="6" cy="-25" r="1.9" fill="currentColor" />
      {/* Bottom perforation dots (3-4-3 grid) */}
      <circle cx="-6" cy="25" r="1.9" fill="currentColor" />
      <circle cx="0" cy="25" r="1.9" fill="currentColor" />
      <circle cx="6" cy="25" r="1.9" fill="currentColor" />
      <circle cx="-8.5" cy="32" r="1.9" fill="currentColor" />
      <circle cx="-2.8" cy="32" r="1.9" fill="currentColor" />
      <circle cx="2.8" cy="32" r="1.9" fill="currentColor" />
      <circle cx="8.5" cy="32" r="1.9" fill="currentColor" />
      <circle cx="-6" cy="39" r="1.9" fill="currentColor" />
      <circle cx="0" cy="42" r="1.9" fill="currentColor" />
      <circle cx="6" cy="39" r="1.9" fill="currentColor" />
    </>
  );
}

export default function SanjeevaniLogo({ className = 'h-12 sm:h-14 w-auto' }) {
  return (
    <svg
      viewBox="0 0 410 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[var(--color-primary)] ${className}`}
      role="img"
      aria-label="Sanjeevani — Medicine and Equipments"
    >
      <defs>
        {/* Mask so the front bandage cleanly overlaps the shifted back bandage on any background */}
        <mask id="sanjeevani-back-bandage-mask">
          <rect width="410" height="115" fill="white" />
          <g transform="translate(55 58) rotate(-44)">
            <rect x="-23" y="-56" width="46" height="112" rx="23" fill="black" />
          </g>
        </mask>
      </defs>

      {/* ─── Back Bandage (shifted up-right so both bandages remain clearly distinct) ─── */}
      <g mask="url(#sanjeevani-back-bandage-mask)">
        <g transform="translate(76 47) rotate(45)">
          <BandageBody />
        </g>
      </g>

      {/* ─── Front Bandage (top-left to bottom-right) ─── */}
      <g transform="translate(55 58) rotate(-44)">
        {/* Tapered crescent accent along the bottom-left edge */}
        <path
          d="M -26 4 C -27 19, -24 31, -14 40 C -21 29, -23 18, -26 4 Z"
          fill="currentColor"
        />
        <BandageBody />
      </g>

      {/* ─── Wordmark: "Sanjeevani" ─── */}
      <text
        x="126"
        y="62"
        fill="currentColor"
        fontFamily="'Plus Jakarta Sans', 'Nunito', 'Arial Rounded MT Bold', sans-serif"
        fontWeight="900"
        fontSize="44"
        letterSpacing="-0.5"
      >
        Sanjeevani
      </text>

      {/* ─── Stethoscope & Curved Tube Underline (spaced cleanly after "i") ─── */}
      <circle cx="381" cy="22" r="2.8" fill="currentColor" />
      <circle cx="393" cy="22" r="2.8" fill="currentColor" />
      <path
        d="M 381 22 C 373 24, 373 51, 387 51 C 401 51, 401 24, 393 22"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 387 51 C 387 77, 360 81, 323 77 C 263 71, 180 73, 125 83"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* ─── Tagline: "Medicine and Equipments" ─── */}
      <text
        x="129"
        y="106"
        fill="currentColor"
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        fontWeight="700"
        fontStyle="italic"
        fontSize="19"
        letterSpacing="0.1"
      >
        Medicine and Equipments
      </text>
    </svg>
  );
}
