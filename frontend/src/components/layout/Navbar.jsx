/*
 * Navbar.jsx — Main navigation bar
 * Includes:
 * - Brand logo & Nepal location picker
 * - Search bar with Medicines / Equipment toggle
 * - Account dropdown, Cart item badge, Language switcher
 * - Fully functional ARIA Accessibility Toolbar (Keyboard nav, High contrast, Font resize, Readable font, Link highlights)
 */
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import SearchBar from '../common/SearchBar.jsx';
import LocationSelector from '../common/LocationSelector.jsx';
import SanjeevaniLogo from '../common/SanjeevaniLogo.jsx';

function LanguageFlag({ lang }) {
  if (lang === 'ने') {
    return (
      <span className="w-5 h-4 flex items-center justify-center flex-shrink-0 inline-flex" aria-hidden="true">
        <svg className="w-3.5 h-4 drop-shadow-xs" viewBox="0 0 24 30">
          <polygon points="0,0 21,13 8,13 23,29 0,29" fill="#003893" />
          <polygon points="2,2.5 18,12 6.5,12 19.5,27 2,27" fill="#DC143C" />
          <path d="M4.5 7.2a2.5 2.5 0 0 0 4 0 2 2 0 0 1-3.5 0z" fill="#FFFFFF" />
          <circle cx="6.5" cy="8" r="0.7" fill="#FFFFFF" />
          <circle cx="7.5" cy="19.5" r="2.5" fill="#FFFFFF" />
        </svg>
      </span>
    );
  }

  return (
    <span className="w-5 h-3.5 rounded-[2px] overflow-hidden shadow-xs border border-gray-200 flex-shrink-0 inline-flex" aria-hidden="true">
      <svg className="w-full h-full" viewBox="0 0 60 36">
        <rect width="60" height="36" fill="#012169" />
        <path d="M0 0 L60 36 M60 0 L0 36" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0 0 L30 18 M60 36 L30 18" stroke="#C8102E" strokeWidth="2" />
        <path d="M60 0 L30 18 M0 36 L30 18" stroke="#C8102E" strokeWidth="2" />
        <path d="M30 0 v36 M0 18 h60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30 0 v36 M0 18 h60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [ariaOpen, setAriaOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  // Accessibility Functional States
  const [a11yState, setA11yState] = useState({
    keyboardNav: false,
    contrast: false,
    fontSize: 16,
    readableFont: false,
    highlightLinks: false,
  });

  const accountRef = useRef(null);
  const langRef = useRef(null);
  const ariaRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (ariaRef.current && !ariaRef.current.contains(e.target)) setAriaOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on Escape key
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') {
        setAccountOpen(false);
        setLangOpen(false);
        setAriaOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Apply Accessibility Classes to DOM
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (a11yState.keyboardNav) body.classList.add('a11y-focus');
    else body.classList.remove('a11y-focus');

    if (a11yState.contrast) body.classList.add('a11y-contrast');
    else body.classList.remove('a11y-contrast');

    if (a11yState.readableFont) body.classList.add('a11y-readable-font');
    else body.classList.remove('a11y-readable-font');

    if (a11yState.highlightLinks) body.classList.add('a11y-highlight-links');
    else body.classList.remove('a11y-highlight-links');

    html.style.fontSize = `${a11yState.fontSize}px`;
  }, [a11yState]);

  const toggleA11y = (key) => {
    setA11yState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const increaseFontSize = () => {
    setA11yState((prev) => ({ ...prev, fontSize: Math.min(prev.fontSize + 2, 22) }));
  };

  const decreaseFontSize = () => {
    setA11yState((prev) => ({ ...prev, fontSize: Math.max(prev.fontSize - 2, 14) }));
  };

  const resetA11y = () => {
    setA11yState({
      keyboardNav: false,
      contrast: false,
      fontSize: 16,
      readableFont: false,
      highlightLinks: false,
    });
  };

  return (
    <header className="bg-white shadow-xs sticky top-0 z-40 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-[72px] sm:h-20 gap-4">

          {/* ─── Logo ─── */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center group py-1"
            aria-label="Sanjeevani — Home"
          >
            <SanjeevaniLogo className="h-12 sm:h-14 w-auto transition-transform duration-200 group-hover:scale-[1.03]" />
          </Link>

          {/* ─── Location Selector (hidden on small mobile) ─── */}
          <div className="hidden md:block">
            <LocationSelector />
          </div>

          {/* ─── Search Bar ─── */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-2">
            <SearchBar />
          </div>

          {/* ─── Right Icons Group ─── */}
          <div className="flex items-center gap-1 sm:gap-2">

            {/* Account Dropdown */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 relative text-gray-700"
                aria-expanded={accountOpen}
                aria-haspopup="true"
                aria-label="Account menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-up">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-xs font-bold text-gray-900">Welcome to Sanjeevani</p>
                    <p className="text-[11px] text-gray-400">Access your healthcare orders</p>
                  </div>
                  <Link to="/login" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[var(--color-primary)] transition-colors" onClick={() => setAccountOpen(false)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                    Sign In
                  </Link>
                  <Link to="/register" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[var(--color-primary)] transition-colors" onClick={() => setAccountOpen(false)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                    Register New Account
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <Link to="/cart" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[var(--color-primary)] transition-colors" onClick={() => setAccountOpen(false)}>
                    <span>📦</span> My Orders & Rentals
                  </Link>
                </div>
              )}
            </div>

            {/* Cart Icon with badge */}
            <Link
              to="/cart"
              className="p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 relative text-gray-700"
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Language Dropdown with Globe Icon & Active Flag */}
            <div className="relative hidden sm:block" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center gap-1.5 text-gray-700"
                aria-expanded={langOpen}
                aria-label={`Select language (current: ${currentLang === 'ने' ? 'Nepali' : 'English'})`}
              >
                {/* Globe Icon */}
                <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <LanguageFlag lang={currentLang} />
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-up">
                  <button
                    onClick={() => { setCurrentLang('EN'); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-2.5 ${
                      currentLang === 'EN' ? 'text-[var(--color-primary)] bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <LanguageFlag lang="EN" />
                    <span>English</span>
                  </button>
                  <button
                    onClick={() => { setCurrentLang('ने'); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-2.5 ${
                      currentLang === 'ने' ? 'text-[var(--color-primary)] bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <LanguageFlag lang="ने" />
                    <span>नेपाली</span>
                  </button>
                </div>
              )}
            </div>

            {/* ─── ARIA Accessibility Button & Functional Toolbar ─── */}
            <div className="relative" ref={ariaRef}>
              <button
                onClick={() => setAriaOpen(!ariaOpen)}
                className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center ${
                  ariaOpen || a11yState.contrast || a11yState.keyboardNav
                    ? 'bg-blue-100 text-[var(--color-primary)]'
                    : 'hover:bg-gray-50 text-gray-700 hover:text-[var(--color-primary)]'
                }`}
                aria-expanded={ariaOpen}
                aria-label="Universal Accessibility Toolbar"
                title="Universal Accessibility Tools"
              >
                {/* Clean Universal Accessibility Silhouette (matches ISO accessibility icon, no blue circle background) */}
                <svg className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="currentColor">
                  {/* Head */}
                  <circle cx="12" cy="4.5" r="2.5" />
                  {/* Outstretched arms, torso & legs */}
                  <path d="M4.5 9a1.5 1.5 0 0 0 0 3H9v2.5l-2.4 6.8a1.5 1.5 0 1 0 2.8 1L12 15l2.6 7.3a1.5 1.5 0 1 0 2.8-1L15 14.5V12h4.5a1.5 1.5 0 0 0 0-3h-15z" />
                </svg>
              </button>

              {ariaOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-fade-in-up overflow-hidden"
                  role="dialog"
                  aria-label="Accessibility Toolbar"
                >
                  <div className="bg-[var(--color-primary)] text-white px-5 py-3.5 flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-sm flex items-center gap-2">
                        <span>♿</span> Accessibility Toolbar
                      </h3>
                      <p className="text-[11px] text-blue-100 mt-0.5">Custom assistive viewing modes</p>
                    </div>
                    <button
                      onClick={() => setAriaOpen(false)}
                      className="text-white/80 hover:text-white p-1 rounded-md"
                      aria-label="Close accessibility options"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  <div className="p-3 space-y-1 divide-y divide-gray-50">
                    {/* Keyboard Focus Navigation */}
                    <div className="pt-2">
                      <FunctionalToggle
                        active={a11yState.keyboardNav}
                        onClick={() => toggleA11y('keyboardNav')}
                        icon="⌨️"
                        label="Keyboard Focus Navigation"
                        desc="Enhanced high-contrast outline on all interactive items"
                      />
                    </div>

                    {/* High Contrast */}
                    <div className="pt-2">
                      <FunctionalToggle
                        active={a11yState.contrast}
                        onClick={() => toggleA11y('contrast')}
                        icon="🌓"
                        label="High Contrast Mode"
                        desc="Boosts clarity and separation between UI layers"
                      />
                    </div>

                    {/* Text Size Control */}
                    <div className="pt-2 px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🔤</span>
                        <div>
                          <p className="text-xs font-bold text-gray-800">Text Size: {a11yState.fontSize}px</p>
                          <p className="text-[10px] text-gray-400">Scale readable font size</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={decreaseFontSize}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold flex items-center justify-center text-sm"
                          aria-label="Decrease text size"
                        >
                          A-
                        </button>
                        <button
                          onClick={increaseFontSize}
                          className="w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold flex items-center justify-center text-sm"
                          aria-label="Increase text size"
                        >
                          A+
                        </button>
                      </div>
                    </div>

                    {/* Readable Font */}
                    <div className="pt-2">
                      <FunctionalToggle
                        active={a11yState.readableFont}
                        onClick={() => toggleA11y('readableFont')}
                        icon="📖"
                        label="Dyslexia Readable Font"
                        desc="Standardizes typography to high-legibility font"
                      />
                    </div>

                    {/* Highlight Links */}
                    <div className="pt-2">
                      <FunctionalToggle
                        active={a11yState.highlightLinks}
                        onClick={() => toggleA11y('highlightLinks')}
                        icon="🔗"
                        label="Highlight Links & Buttons"
                        desc="Adds distinct underline markers to every action link"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={resetA11y}
                      className="text-xs font-bold text-gray-500 hover:text-red-600 transition-colors"
                    >
                      Reset All Settings
                    </button>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      WCAG AA Ready
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-50 text-gray-700"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Expanded Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-4 animate-fade-in-up">
            <SearchBar />
            <div className="space-y-1">
              <Link to="/medicines" className="block px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[var(--color-primary)]" onClick={() => setMobileMenuOpen(false)}>Medicines (OTC & Rx)</Link>
              <Link to="/equipment" className="block px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[var(--color-primary)]" onClick={() => setMobileMenuOpen(false)}>Rent Medical Equipment</Link>
              <Link to="/upload-prescription" className="block px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[var(--color-primary)]" onClick={() => setMobileMenuOpen(false)}>Upload Doctor Prescription</Link>
              <Link to="/vendors" className="block px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[var(--color-primary)]" onClick={() => setMobileMenuOpen(false)}>Verified Local Pharmacies</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function FunctionalToggle({ active, onClick, icon, label, desc }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-left"
      role="switch"
      aria-checked={active}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-base">{icon}</span>
        <div>
          <p className="text-xs font-bold text-gray-800">{label}</p>
          <p className="text-[10px] text-gray-400 line-clamp-1">{desc}</p>
        </div>
      </div>
      <div className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 ml-2 ${active ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow-xs absolute top-0.5 transition-transform ${active ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
      </div>
    </button>
  );
}
