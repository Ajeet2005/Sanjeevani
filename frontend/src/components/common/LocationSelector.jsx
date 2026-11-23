/*
 * LocationSelector.jsx — City/location picker for nearby vendor discovery
 * Uses mock Nepal city data. Will connect to geolocation API later.
 */
import { useState, useRef, useEffect } from 'react';

/* MOCK DATA — Nepal cities for nearby vendor discovery */
const NEPAL_CITIES = [
  { id: 1, name: 'Kathmandu', district: 'Kathmandu' },
  { id: 2, name: 'Lalitpur', district: 'Lalitpur' },
  { id: 3, name: 'Bhaktapur', district: 'Bhaktapur' },
  { id: 4, name: 'Pokhara', district: 'Kaski' },
  { id: 5, name: 'Bharatpur', district: 'Chitwan' },
  { id: 6, name: 'Biratnagar', district: 'Morang' },
  { id: 7, name: 'Birgunj', district: 'Parsa' },
  { id: 8, name: 'Dharan', district: 'Sunsari' },
];

function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(NEPAL_CITIES[0]); // Default: Kathmandu
  const dropdownRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[var(--color-gray-50)] transition-colors duration-200 text-sm"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Current location: ${selectedCity.name}. Click to change.`}
      >
        {/* Map pin icon */}
        <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-[var(--color-gray-700)] font-medium truncate max-w-[100px]">
          {selectedCity.name}
        </span>
        <svg className={`w-3.5 h-3.5 text-[var(--color-gray-400)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* City dropdown */}
      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[var(--color-gray-100)] py-2 z-50 max-h-64 overflow-y-auto animate-fade-in-up"
          role="listbox"
          aria-label="Select your city"
        >
          <p className="px-4 py-1.5 text-[11px] font-semibold text-[var(--color-gray-400)] uppercase tracking-wider">
            Select your city
          </p>
          {NEPAL_CITIES.map((city) => (
            <button
              key={city.id}
              onClick={() => { setSelectedCity(city); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                selectedCity.id === city.id
                  ? 'text-[var(--color-primary)] bg-[var(--color-primary-50)] font-semibold'
                  : 'text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]'
              }`}
              role="option"
              aria-selected={selectedCity.id === city.id}
            >
              <span>{city.name}</span>
              <span className="text-[11px] text-[var(--color-gray-400)]">{city.district}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationSelector;
