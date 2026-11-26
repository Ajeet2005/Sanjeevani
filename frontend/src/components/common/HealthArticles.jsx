/*
 * HealthArticles.jsx — Health awareness articles & education powered by Sanity CMS
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestPosts, urlFor } from '../../lib/sanity.js';

export default function HealthArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getLatestPosts(4)
      .then((data) => {
        if (active) setArticles(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) setArticles([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="Health Articles">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-[var(--font-heading)]">
            Health Articles &amp; Guides
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Verified medicine storage guides and equipment rental tips
          </p>
        </div>

        <Link
          to="/blog"
          className="text-xs sm:text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="w-full h-44 bg-gray-100" />
              <div className="p-4 space-y-2.5">
                <div className="h-3 w-16 bg-gray-100 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-3 w-4/5 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <p className="text-sm font-semibold text-gray-700">No health articles published yet.</p>
          <p className="text-xs text-gray-500 mt-1">
            Publish posts in Sanity Studio to display them here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {articles.map((art) => {
            const imgUrl = art.featuredImage ? urlFor(art.featuredImage)?.width(600).height(400).url() : null;
            const categoryLabel = art.categories?.[0]?.title || 'Health Guide';
            return (
              <Link
                key={art._id}
                to={`/blog/${art.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-44 bg-blue-50 overflow-hidden relative">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={art.featuredImage?.alt || art.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--color-primary)]/40 text-xs font-semibold">
                        Sanjeevani Journal
                      </div>
                    )}
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded">
                      {categoryLabel}
                    </span>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] text-gray-400 font-medium">
                      {art.readingTime ? `${art.readingTime} min read` : 'Health Guide'}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mt-1 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {art.title}
                    </h3>
                    {art.excerpt && (
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {art.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <span className="text-xs font-bold text-[var(--color-primary)] flex items-center gap-1 group-hover:gap-2 transition-all">
                    <span>Read guide</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
