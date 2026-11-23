/*
 * HealthArticles.jsx — Health awareness articles & education
 * Matches the docx image layout. Educational and helpful only — strictly no medical advice.
 */
import { HEALTH_ARTICLES } from '../../data/articles.js';

export default function HealthArticles() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="Health Articles">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-[var(--font-heading)]">
            Health Articles & Guides
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Verified medicine storage guides and equipment rental tips
          </p>
        </div>

        <button
          onClick={() => alert('Health articles library coming soon!')}
          className="text-xs sm:text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {HEALTH_ARTICLES.map((art) => (
          <article
            key={art.id}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-full h-44 bg-gray-100 overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80';
                  }}
                />
                <span className="absolute bottom-2 left-2 bg-black/60 text-white backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded">
                  {art.category}
                </span>
              </div>

              <div className="p-4">
                <span className="text-[10px] text-gray-400 font-medium">
                  {art.readTime}
                </span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
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
          </article>
        ))}
      </div>
    </section>
  );
}
