/*
 * Carousel.jsx — Accessible, smooth mouse click-and-drag horizontal scroller
 *
 * Sliding happens strictly via:
 * 1. Smooth mouse click & drag (bounded, never drags into empty space)
 * 2. Left / Right navigation buttons with continuous looping
 * 3. Dot indicators showing position
 * 4. Configurable auto-advance that pauses on hover/drag and resumes on mouse leave
 * 5. Infinite forward loop that joins the first slide from the last smoothly
 *    WITHOUT jarring backward rewinds!
 */
import { useRef, useState, useEffect, useCallback } from 'react';

export default function Carousel({
  children,
  autoPlay = false,
  interval = 4000,
  showArrows = true,
  showDots = false,
  totalItems = 0,
  itemWidth = 350,
  className = '',
  ariaLabel = 'Content Carousel',
  infiniteLoop = true,
  onIndexChange,
}) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const normalizingRef = useRef(false);

  // Mouse Drag Tracking
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Single set width
  const getSingleSetWidth = useCallback(() => {
    const el = containerRef.current;
    if (!el || totalItems <= 0) return 0;
    return itemWidth * totalItems;
  }, [totalItems, itemWidth]);

  // Check scroll boundary & active slide index
  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(infiniteLoop || el.scrollLeft > 10);
    setCanScrollRight(infiniteLoop || el.scrollLeft < maxScroll - 10);

    const singleSet = getSingleSetWidth();
    if (totalItems > 0 && singleSet > 0) {
      const normalizedScroll = el.scrollLeft % singleSet;
      const idx = Math.min(Math.round(normalizedScroll / itemWidth), totalItems - 1);
      setActiveIndex(Math.max(0, idx));
      if (onIndexChange) onIndexChange(Math.max(0, idx));
    }
  }, [totalItems, itemWidth, infiniteLoop, getSingleSetWidth, onIndexChange]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByAmount = (offset) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Smooth continuous forward step: joins slide 1 seamlessly from the last slide
  const handleNext = () => {
    const el = containerRef.current;
    if (!el) return;

    if (infiniteLoop && totalItems > 0) {
      const singleSet = getSingleSetWidth();
      // Scroll smoothly forward
      el.scrollBy({ left: itemWidth, behavior: 'smooth' });

      // After the smooth transition completes, silently normalize scroll position
      setTimeout(() => {
        if (containerRef.current && !normalizingRef.current) {
          const c = containerRef.current;
          if (c.scrollLeft >= singleSet * 1.5) {
            normalizingRef.current = true;
            c.scrollTo({ left: c.scrollLeft - singleSet, behavior: 'instant' });
            normalizingRef.current = false;
          }
        }
      }, 420);
    } else {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 20) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollByAmount(itemWidth);
      }
    }
  };

  const handlePrev = () => {
    const el = containerRef.current;
    if (!el) return;

    if (infiniteLoop && totalItems > 0) {
      const singleSet = getSingleSetWidth();
      if (el.scrollLeft < itemWidth) {
        // Silently shift to clone and slide left
        el.scrollTo({ left: el.scrollLeft + singleSet, behavior: 'instant' });
      }
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
      }, 20);
    } else {
      scrollByAmount(-itemWidth);
    }
  };

  const scrollToIndex = (idx) => {
    const el = containerRef.current;
    if (!el || totalItems <= 0) return;
    const singleSet = getSingleSetWidth();
    const currentCycle = Math.floor(el.scrollLeft / singleSet);
    const target = currentCycle * singleSet + idx * itemWidth;
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  // Auto-advance with hover pause & resume on mouse leave
  useEffect(() => {
    if (!autoPlay || isPaused || isDragging) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, isDragging, interval, itemWidth, totalItems]);

  // Mouse Drag handlers
  const onMouseDown = (e) => {
    const el = containerRef.current;
    if (!el) return;
    isDownRef.current = true;
    setIsDragging(true);
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onMouseMove = (e) => {
    if (!isDownRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const onMouseUp = () => {
    isDownRef.current = false;
    setIsDragging(false);
  };

  // Global mouseup in case cursor leaves window
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDownRef.current) {
        isDownRef.current = false;
        setIsDragging(false);
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        onMouseUp();
      }}
      aria-label={ariaLabel}
      role="region"
    >
      {/* Left Arrow Button */}
      {showArrows && canScrollLeft && (
        <button
          onClick={handlePrev}
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all"
          aria-label="Previous items"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Scrollable track — duplicates children if infiniteLoop so it flows continuously */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        className={`flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-3 px-1 select-none cursor-grab active:cursor-grabbing ${
          isDragging ? 'scroll-auto' : 'scroll-smooth'
        }`}
        tabIndex={0}
      >
        {children}
        {infiniteLoop && children}
      </div>

      {/* Right Arrow Button */}
      {showArrows && canScrollRight && (
        <button
          onClick={handleNext}
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all"
          aria-label="Next items"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Dots navigation & Position Indicators */}
      {showDots && totalItems > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-4" aria-hidden="true">
          {Array.from({ length: totalItems }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === idx
                  ? 'w-6 h-2 bg-[var(--color-primary)]'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
