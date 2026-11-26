/*
 * BlogPage.jsx — Sanjeevani Health Journal (/blog)
 * Powered by Sanity CMS with category pills, sticky filter sidebar (Categories + Topics),
 * search, and 3-column article grid blended with Sanjeevani healthcare blue tones.
 */
import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAllPosts, urlFor } from '../../lib/sanity.js';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [catOpen, setCatOpen] = useState(true);
  const [tagOpen, setTagOpen] = useState(true);
  const [showAllCats, setShowAllCats] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  useEffect(() => {
    let active = true;
    getAllPosts()
      .then((data) => {
        if (active) setPosts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Error fetching articles from Sanity:', err);
        if (active) setPosts([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const counts = new Map();
    posts.forEach((p) => {
      (p.categories || []).forEach((c) => {
        if (c?.title) counts.set(c.title, (counts.get(c.title) || 0) + 1);
      });
    });
    return Array.from(counts.entries()).map(([title, count]) => ({ title, count }));
  }, [posts]);

  const tags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => (p.tags || []).forEach((t) => t && set.add(t)));
    return Array.from(set);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((p) => {
      const matchCat =
        selectedCategory === 'All' ||
        (p.categories || []).some((c) => c?.title === selectedCategory);
      const matchTag = !selectedTag || (p.tags || []).includes(selectedTag);
      const matchQuery =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchCat && matchTag && matchQuery;
    });
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  const visibleCategories = showAllCats ? categories : categories.slice(0, 7);
  const hasFilters = selectedCategory !== 'All' || selectedTag !== '' || searchQuery !== '';

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedTag('');
    setSearchQuery('');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* ─── Top Journal Hero Card ─── */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <div className="max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                Sanjeevani Health Journal
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 font-[var(--font-heading)] mt-1.5 leading-tight">
                Practical guides for smarter everyday healthcare
              </h1>
            </div>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed">
              Verified guides on medicine safety, home medical equipment, nutrition, and preventive wellness for families across Nepal.
            </p>
          </div>

          {/* Horizontal Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-5">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[var(--color-primary)] text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}
            >
              All articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat.title}
                type="button"
                onClick={() => setSelectedCategory(cat.title)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.title
                    ? 'bg-[var(--color-primary)] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Main 2-Column Layout ─── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Sticky Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs lg:sticky lg:top-24 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Browse articles</span>
              </div>
              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[var(--color-primary)] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
              />
              <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Categories Section */}
            <div className="border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => setCatOpen(!catOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-gray-800 mb-3 cursor-pointer"
              >
                <span>Categories</span>
                <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${catOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {catOpen && (
                <div className="space-y-1">
                  {categories.length === 0 ? (
                    <p className="text-xs text-gray-400">No categories yet</p>
                  ) : (
                    <>
                      {visibleCategories.map((cat) => {
                        const active = selectedCategory === cat.title;
                        return (
                          <button
                            key={cat.title}
                            type="button"
                            onClick={() => setSelectedCategory(active ? 'All' : cat.title)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                              active
                                ? 'bg-blue-50 text-[var(--color-primary)] font-bold'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className="truncate">{cat.title}</span>
                            <span className="text-[11px] text-gray-400">{cat.count}</span>
                          </button>
                        );
                      })}
                      {categories.length > 7 && (
                        <button
                          type="button"
                          onClick={() => setShowAllCats(!showAllCats)}
                          className="w-full mt-2 py-1.5 px-3 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                        >
                          {showAllCats ? 'Show fewer' : `Show more categories +${categories.length - 7}`}
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Topics / Tags Section */}
            <div className="border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => setTagOpen(!tagOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-gray-800 mb-3 cursor-pointer"
              >
                <span>Topics</span>
                <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${tagOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {tagOpen && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.length === 0 ? (
                    <p className="text-xs text-gray-400">No topics yet</p>
                  ) : (
                    tags.map((tag) => {
                      const active = selectedTag === tag;
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSelectedTag(active ? '' : tag)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                            active
                              ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                          }`}
                        >
                          #{tag}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* Right Articles Grid */}
          <div className="flex-1 min-w-0">
            <div className="mb-4">
              <h2 className="text-xl font-extrabold text-gray-900 font-[var(--font-heading)]">
                Latest articles
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {loading ? 'Loading articles...' : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'article' : 'articles'}`}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden animate-pulse">
                    <div className="aspect-[16/10] bg-gray-100" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 w-24 bg-gray-100 rounded-full" />
                      <div className="h-5 w-full bg-gray-100 rounded" />
                      <div className="h-4 w-4/5 bg-gray-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200/80 p-12 text-center shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  {hasFilters ? 'No matching articles found' : 'No articles published yet'}
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  {hasFilters
                    ? 'Try clearing your active category, topic, or search filters.'
                    : 'Create and publish your first health article in Sanity Studio to see it appear here.'}
                </p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 bg-[var(--color-primary)] text-white text-xs font-bold rounded-xl hover:bg-[var(--color-primary-600)] transition-colors cursor-pointer"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredPosts.map((post) => {
                  const imgUrl = post.featuredImage
                    ? urlFor(post.featuredImage)?.width(700).height(440).url()
                    : null;
                  const avatarUrl = post.author?.image
                    ? urlFor(post.author.image)?.width(80).height(80).url()
                    : null;
                  const primaryCat = post.categories?.[0]?.title;

                  return (
                    <Link
                      key={post._id}
                      to={`/blog/${post.slug}`}
                      className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[16/10] bg-blue-50 overflow-hidden">
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={post.featuredImage?.alt || post.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[var(--color-primary)]/40 text-xs font-semibold">
                              Sanjeevani Journal
                            </div>
                          )}
                        </div>

                        <div className="p-5 pb-3">
                          {primaryCat && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[var(--color-primary)] border border-blue-100 mb-2.5">
                              {primaryCat}
                            </span>
                          )}
                          <h3 className="text-base font-extrabold text-gray-900 line-clamp-2 leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="px-5 py-3.5 border-t border-gray-100 flex items-center gap-2.5">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={post.author?.name || 'Author'}
                            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-[var(--color-primary)] text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {(post.author?.name || 'S')[0].toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate">
                            {post.author?.name || 'Sanjeevani Editorial'}
                          </p>
                          <p className="text-[11px] text-gray-400 flex items-center gap-2">
                            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                            {post.readingTime && <span>• {post.readingTime} min read</span>}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
