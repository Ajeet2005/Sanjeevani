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
      viewBox="0 0 385 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[var(--color-primary)] ${className}`}
      role="img"
      aria-label="Sanjeevani — Medicine and Equipments"
    >
      <defs>
        {/* Mask so the front bandage cleanly overlaps the shifted back bandage on any background */}
        <mask id="sanjeevani-back-bandage-mask">
          <rect width="385" height="112" fill="white" />
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

      {/* ─── Stethoscope & Curved Tube Underline ─── */}
      <circle cx="357" cy="22" r="2.8" fill="currentColor" />
      <circle cx="369" cy="22" r="2.8" fill="currentColor" />
      <path
        d="M 357 22 C 349 24, 349 51, 363 51 C 377 51, 377 24, 369 22"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 363 51 C 363 77, 337 81, 303 77 C 248 71, 175 73, 125 83"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* ─── Tagline: "Medicine and Equipments" ─── */}
      <text
        x="132"
        y="103"
        fill="currentColor"
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        fontWeight="700"
        fontStyle="italic"
        fontSize="16"
        letterSpacing="0.15"
      >
        Medicine and Equipments
      </text>
    </svg>
  );
}
