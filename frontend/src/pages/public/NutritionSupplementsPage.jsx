/*
 * NutritionSupplementsPage.jsx — Nutrients & Supplements Landing Page
 * Designed following reference layout with Sanjeevani brand tokens:
 * - Top breadcrumbs & subcategory horizontal pill tabs
 * - Left sticky filter sidebar with Price, Category, Brand Search, Tags, and Recently Viewed
 * - Right product grid with 4 items per row (responsive: 1 col on mobile, 2 on sm, 3 on md, 4 on lg)
 * - Wishlist toggling, instant add-to-cart feedback with Sanjeevani reward ePoints
 */

import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import {
  NUTRITION_PRODUCTS,
  NUTRITION_SUBCATEGORIES,
  NUTRITION_PRICE_RANGES,
  NUTRITION_TAGS,
} from '../../data/nutritionProducts.js';

export default function NutritionSupplementsPage() {
  const { addToCart } = useCart();

  // ─── Filter States ───
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // ─── Interactive UI States ───
  const [wishlist, setWishlist] = useState({});
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle wishlist toggle
  const toggleWishlist = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => {
      const nextState = !prev[id];
      showToast(nextState ? 'Added to your wishlist' : 'Removed from wishlist');
      return { ...prev, [id]: nextState };
    });
  };

  // Handle add to cart with animated feedback
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setRecentlyAddedId(product.id);
    showToast(`Added ${product.name.slice(0, 24)}... to cart`);
    setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === product.id ? null : curr));
    }, 1200);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // ─── Unique Brands & Counts ───
  const allBrandsWithCounts = useMemo(() => {
    const brandMap = {};
    NUTRITION_PRODUCTS.forEach((p) => {
      brandMap[p.brand] = (brandMap[p.brand] || 0) + 1;
    });
    return Object.entries(brandMap).map(([brand, count]) => ({ brand, count }));
  }, []);

  // Filtered brands for search input
  const visibleBrands = useMemo(() => {
    let list = allBrandsWithCounts;
    if (brandSearchQuery.trim()) {
      list = list.filter((item) =>
        item.brand.toLowerCase().includes(brandSearchQuery.toLowerCase())
      );
    }
    if (!showAllBrands && !brandSearchQuery.trim()) {
      return list.slice(0, 6);
    }
    return list;
  }, [allBrandsWithCounts, brandSearchQuery, showAllBrands]);

  // Subcategory product counts
  const categoryCounts = useMemo(() => {
    const counts = { all: NUTRITION_PRODUCTS.length };
    NUTRITION_PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Price range toggle
  const togglePriceRange = (rangeId) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((id) => id !== rangeId)
        : [...prev, rangeId]
    );
  };

  // Brand toggle
  const toggleBrand = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
  };

  // Tag toggle
  const toggleTag = (tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRanges([]);
    setSelectedBrands([]);
    setBrandSearchQuery('');
    setSelectedTag(null);
    setSortBy('popularity');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedPriceRanges.length > 0 ||
    selectedBrands.length > 0 ||
    selectedTag !== null ||
    brandSearchQuery !== '';

  // ─── Filter & Sort Products ───
  const filteredProducts = useMemo(() => {
    let list = [...NUTRITION_PRODUCTS];

    // Filter by Subcategory
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Price Ranges
    if (selectedPriceRanges.length > 0) {
      list = list.filter((p) =>
        selectedPriceRanges.some((rangeId) => {
          const range = NUTRITION_PRICE_RANGES.find((r) => r.id === rangeId);
          if (!range) return false;
          return p.price >= range.min && p.price <= range.max;
        })
      );
    }

    // Filter by Brands
    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }

    // Filter by Tag
    if (selectedTag) {
      list = list.filter((p) => p.tags && p.tags.includes(selectedTag));
    }

    // Sort Products
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    }

    return list;
  }, [selectedCategory, selectedPriceRanges, selectedBrands, selectedTag, sortBy]);

  // Sidebar filter markup (reused in desktop sticky sidebar and mobile drawer)
  const FilterContent = (
    <div className="flex flex-col gap-6 text-sm">
      {/* Sidebar Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-bold text-gray-900 text-base font-[var(--font-heading)]">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-[var(--color-primary)] hover:underline transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* PRICE Section */}
      <div>
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">PRICE</h4>
        <div className="space-y-2.5">
          {NUTRITION_PRICE_RANGES.map((range) => {
            const isChecked = selectedPriceRanges.includes(range.id);
            return (
              <label
                key={range.id}
                className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-[var(--color-primary)] transition-colors select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => togglePriceRange(range.id)}
                  className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] accent-[var(--color-primary)] cursor-pointer"
                />
                <span>{range.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* CATEGORY Section */}
      <div>
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">CATEGORY</h4>
        <div className="space-y-2">
          {NUTRITION_SUBCATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`w-full flex items-center justify-between text-left text-xs py-1 px-1.5 rounded-lg transition-colors ${
                  isSelected
                    ? 'font-bold text-[var(--color-primary)] bg-[var(--color-primary-50)]'
                    : 'text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{cat.label}</span>
                </div>
                <span className="text-[11px] text-gray-400 font-normal">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MANUFACTURER Section */}
      <div>
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">MANUFACTURER</h4>
        
        {/* Brand Search Input */}
        <div className="relative mb-3">
          <svg
            className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={brandSearchQuery}
            onChange={(e) => setBrandSearchQuery(e.target.value)}
            placeholder="Search brands"
            className="w-full text-xs pl-8 pr-3 py-1.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all bg-gray-50/50"
          />
          {brandSearchQuery && (
            <button
              onClick={() => setBrandSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Brand Checklist */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 no-scrollbar">
          {visibleBrands.length === 0 ? (
            <p className="text-xs text-gray-400 py-1">No brands found</p>
          ) : (
            visibleBrands.map(({ brand, count }) => {
              const isChecked = selectedBrands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:text-[var(--color-primary)] transition-colors select-none py-0.5"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] accent-[var(--color-primary)] cursor-pointer"
                    />
                    <span className="truncate max-w-[140px]">{brand}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{count}</span>
                </label>
              );
            })
          )}
        </div>

        {allBrandsWithCounts.length > 6 && !brandSearchQuery && (
          <button
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="mt-2 text-xs font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-1"
          >
            {showAllBrands ? 'Show less' : `Show all ${allBrandsWithCounts.length} brands`}
          </button>
        )}
      </div>

      {/* TAGS Section */}
      <div>
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">TAGS</h4>
        <div className="flex flex-wrap gap-1.5">
          {NUTRITION_TAGS.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                  isActive
                    ? 'bg-[var(--color-primary-50)] text-[var(--color-primary)] border-[var(--color-primary)] font-bold shadow-xs'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* RECENTLY VIEWED PRODUCTS */}
      <div className="pt-3 border-t border-gray-100">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">RECENTLY VIEWED</h4>
        <div className="flex items-center gap-3 p-2 bg-gray-50/80 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
          <img
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&auto=format&fit=crop&q=80"
            alt="Centrum Adult Daily Multivitamin"
            className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-gray-100"
          />
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-gray-900 truncate">Centrum Adult Daily Multivitamin</h5>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-black text-gray-900">Rs. 720</span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">In Stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)] pb-16 pt-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-xs text-gray-500">
            <li>
              <Link to="/" className="hover:text-[var(--color-primary)] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-300">›</li>
            <li className="text-gray-400">Categories</li>
            <li className="text-gray-300">›</li>
            <li className="text-gray-900 font-semibold" aria-current="page">
              Nutrients & Supplements
            </li>
          </ol>
        </nav>

        {/* Category Header & Subcategory Tabs Bar */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-[var(--font-heading)]">
                Nutrients & Supplements
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Authentic vitamins, clinical minerals, whey protein isolates & trusted Ayurvedic wellness
              </p>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 shadow-xs hover:border-[var(--color-primary)] transition-colors"
              >
                <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>
            </div>
          </div>

          {/* Horizontal Subcategory Pill Bar (from reference UI) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {NUTRITION_SUBCATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[var(--color-primary)] text-white font-bold shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-medium'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Main Content: Left Sticky Sidebar + Right 4-in-a-row Grid ─── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start relative">
          
          {/* Desktop Left Sidebar: Sticky & Static so it stays visible during scroll */}
          <aside
            className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar"
            aria-label="Filter sidebar"
          >
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs">
              {FilterContent}
            </div>
          </aside>

          {/* Mobile Filter Drawer Modal */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden bg-black/40 backdrop-blur-xs animate-fade-in">
              <div className="w-5/6 max-w-sm bg-white h-full p-5 overflow-y-auto shadow-2xl ml-auto flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                    <span className="font-bold text-gray-900 text-lg">Filter Products</span>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-1 rounded-full text-gray-400 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  {FilterContent}
                </div>
                <div className="pt-4 border-t border-gray-100 mt-6 flex gap-2">
                  <button
                    onClick={() => {
                      resetFilters();
                      setIsMobileFilterOpen(false);
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Product Grid Area */}
          <main className="flex-1 w-full min-w-0">
            {/* Top Bar: Count & Sort */}
            <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-gray-900">Featured products</span>
                <span className="text-xs text-gray-400">({filteredProducts.length} items)</span>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-dropdown" className="text-xs text-gray-500 font-medium">
                  Sort by:
                </label>
                <select
                  id="sort-dropdown"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Discount (% Off)</option>
                </select>
              </div>
            </div>

            {/* Products Grid: 4 in a row on Desktop as explicitly requested */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((product) => {
                  const isWishlisted = !!wishlist[product.id];
                  const isJustAdded = recentlyAddedId === product.id;

                  return (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-100 rounded-3xl p-3.5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative select-none hover:-translate-y-0.5"
                    >
                      {/* Top Badges & Wishlist Heart Button */}
                      <div className="flex items-center justify-between gap-1 mb-1">
                        {/* ePoints / Rewards Tag */}
                        <div className="flex items-center gap-1">
                          {product.ePoints ? (
                            <span className="bg-blue-50 text-[var(--color-primary)] text-[10px] font-extrabold px-2 py-0.5 rounded-lg border border-blue-100 flex items-center gap-0.5">
                              <span>★</span>
                              <span>{product.ePoints} ePoints</span>
                            </span>
                          ) : null}

                          {product.discountPercent > 0 && (
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-1.5 py-0.5 rounded-md border border-emerald-100">
                              {product.discountPercent}% OFF
                            </span>
                          )}
                        </div>

                        {/* Wishlist Heart Icon Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(product.id, e)}
                          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            isWishlisted
                              ? 'bg-red-50 text-red-500 scale-110'
                              : 'text-gray-300 hover:text-red-500 hover:bg-gray-50'
                          }`}
                        >
                          <svg
                            className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-current' : 'fill-none'}`}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Clean Product Image Container */}
                      <div className="w-full h-36 rounded-2xl bg-white border border-gray-50 flex items-center justify-center p-3 overflow-hidden my-2 group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80';
                          }}
                        />
                      </div>

                      {/* Product Content Details */}
                      <div className="flex-1 flex flex-col justify-between mt-1">
                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                            {product.brand}
                          </span>
                          <h3
                            className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 mt-0.5 group-hover:text-[var(--color-primary)] transition-colors"
                            title={product.name}
                          >
                            {product.name}
                          </h3>
                          <p className="text-[11px] text-gray-400 mt-0.5 truncate">{product.unit}</p>
                        </div>

                        {/* Rating row */}
                        <div className="mt-2.5 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                            <span>★</span>
                            <span className="text-gray-800">{product.rating}</span>
                            <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
                          </div>
                          <span className="text-emerald-700 font-medium text-[10px]">{product.deliveryTime}</span>
                        </div>

                        {/* Price & Add to Cart '+' Button (from Reference Image) */}
                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-sm sm:text-base font-black text-gray-900 font-[var(--font-heading)]">
                                Rs. {product.price}
                              </span>
                              {product.mrp && product.mrp > product.price && (
                                <span className="text-[11px] text-gray-400 line-through">
                                  Rs. {product.mrp}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Plus Add Button with animated feedback */}
                          <button
                            type="button"
                            onClick={(e) => handleAddToCart(product, e)}
                            aria-label={`Add ${product.name} to cart`}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-base transition-all duration-200 active:scale-90 shadow-xs ${
                              isJustAdded
                                ? 'bg-emerald-500 text-white scale-110'
                                : 'bg-[var(--color-primary-50)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
                            }`}
                          >
                            {isJustAdded ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span>+</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-xs">
                <div className="w-16 h-16 bg-blue-50 text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">No products match your filters</h3>
                <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
                  Try unchecking some filter criteria or selecting another subcategory to explore more supplements.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
