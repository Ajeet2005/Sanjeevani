/*
 * HeroBanners.jsx — Large Highlighting Hero Banner Carousel
 *
 * Designed as per docx specifications & reference UI (Outlet Pharmacy):
 * 1. Single prominent full-width banner display (1 banner at a time).
 * 2. Majestic height (~500px-530px on desktop, ~1.5x larger in Y-axis height).
 * 3. 4 official photographic Nepal healthcare banners provided by user.
 * 4. 2-second auto-advance with hover pause.
 * 5. Continuous infinite forward loop: slide 4 smoothly flows forward into slide 1
 *    without jarring backwards rewinds!
 * 6. Pill pagination indicators (elongated active blue pill + circular dots)
 *    matching user reference.
 * 7. Modern rounded circular navigation controls.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HERO_BANNERS } from '../../data/banners.js';

export default function HeroBanners() {
  const totalSlides = HERO_BANNERS.length; // 4
  // We wrap slides with clones for seamless infinite looping:
  // [Clone_Last (idx 0), Slide 1 (idx 1), Slide 2 (idx 2), Slide 3 (idx 3), Slide 4 (idx 4), Clone_First (idx 5)]
  const extendedSlides = [
    HERO_BANNERS[totalSlides - 1], // Clone of Slide 4 at index 0
    ...HERO_BANNERS,               // Real slides at index 1..4
    HERO_BANNERS[0],               // Clone of Slide 1 at index 5
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const transitionRef = useRef(false);
  const autoPlayTimerRef = useRef(null);

  // Mouse / Touch Drag Tracking
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Map currentIndex (0..5) to active dot index (0..3)
  const getActiveDotIndex = () => {
    if (currentIndex === 0) return totalSlides - 1;
    if (currentIndex === 5) return 0;
    return currentIndex - 1;
  };

  const activeDot = getActiveDotIndex();

  // Advance to next slide smoothly forward
  const handleNext = useCallback(() => {
    if (transitionRef.current) return;
    transitionRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Go to previous slide smoothly backward
  const handlePrev = useCallback(() => {
    if (transitionRef.current) return;
    transitionRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Jump directly to specific dot index (0..3)
  const goToSlide = (dotIndex) => {
    if (transitionRef.current) return;
    transitionRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex(dotIndex + 1);
  };

  // Seamless boundary reset on transition end:
  // When at clone_first (idx 5) -> silently reset to real slide 1 (idx 1)
  // When at clone_last (idx 0) -> silently reset to real slide 4 (idx 4)
  const handleTransitionEnd = () => {
    transitionRef.current = false;
    if (currentIndex === 5) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalSlides);
    }
  };

  // Autoplay timer: auto-advance every 2 seconds (2000ms) as requested
  useEffect(() => {
    if (isPaused) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 2000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [handleNext, isPaused]);

  // Touch Swipe Handlers for Mobile Devices
  const handleTouchStart = (e) => {
    setIsPaused(true);
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    dragOffsetRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const diff = e.touches[0].clientX - startXRef.current;
    dragOffsetRef.current = diff;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const diff = dragOffsetRef.current;
    setDragOffset(0);
    dragOffsetRef.current = 0;

    if (diff < -50) {
      handleNext();
    } else if (diff > 50) {
      handlePrev();
    }
    setIsPaused(false);
  };

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e) => {
    setIsPaused(true);
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragOffsetRef.current = 0;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientX - startXRef.current;
    dragOffsetRef.current = diff;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const diff = dragOffsetRef.current;
    setDragOffset(0);
    dragOffsetRef.current = 0;

    if (diff < -60) {
      handleNext();
    } else if (diff > 60) {
      handlePrev();
    }
    setIsPaused(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2"
      aria-label="Sanjeevani Featured Highlights"
    >
      {/* Outer Banner Card Container with Rounded Edges & Shadow */}
      <div
        className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-lg border border-slate-100 bg-slate-50 select-none group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          if (isDraggingRef.current) handleMouseUp();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured Health Promotions"
      >
        {/* Banner Track */}
        <div
          className={`flex w-full h-[260px] sm:h-[360px] md:h-[440px] lg:h-[500px] xl:h-[530px] cursor-grab active:cursor-grabbing ${
            isTransitioning ? 'transition-transform duration-500 ease-out' : 'transition-none'
          }`}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((banner, idx) => (
            <div
              key={`${banner.id}-${idx}`}
              className="w-full h-full flex-shrink-0 relative overflow-hidden"
              aria-hidden={activeDot !== (idx === 0 ? totalSlides - 1 : idx === 5 ? 0 : idx - 1)}
            >
              <Link
                to={banner.link || '/medicines'}
                className="block w-full h-full"
                tabIndex={activeDot === (idx === 0 ? totalSlides - 1 : idx === 5 ? 0 : idx - 1) ? 0 : -1}
                aria-label={banner.headline}
              >
                <img
                  src={banner.image}
                  alt={banner.alt || banner.headline}
                  className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  loading={idx === 1 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Circular Left Navigation Arrow */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 shadow-xl backdrop-blur-sm border border-white/80 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous banner slide"
        >
          <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Circular Right Navigation Arrow */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 shadow-xl backdrop-blur-sm border border-white/80 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next banner slide"
        >
          <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Custom Pill + Dots Pagination Indicator (Matching user reference image) */}
        <div
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-white/60"
          role="tablist"
          aria-label="Slides pagination"
        >
          {HERO_BANNERS.map((banner, idx) => {
            const isActive = activeDot === idx;
            return (
              <button
                key={banner.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to banner ${idx + 1}: ${banner.headline}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isActive
                    ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-blue-600 shadow-xs'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
