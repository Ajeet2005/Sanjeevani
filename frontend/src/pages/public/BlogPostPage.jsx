/*
 * BlogPostPage.jsx — Full article reader (/blog/:slug)
 * Editorial 2-column layout matching reference design:
 * - Clean open canvas (no card box around the body)
 * - Author row with avatar & meta at the top
 * - Sticky sidebar with dynamic Table of Contents ("📖 On this page") & Social Share
 * - "About the Author" card directly below the conclusion
 * - Topics hashtags
 * - "Related articles" (auto-updates when new posts are published in Sanity)
 */
import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, getRelatedPosts, urlFor } from '../../lib/sanity.js';

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);

    getPostBySlug(slug)
      .then((data) => {
        if (!active) return;
        setPost(data || null);
        if (data?.title) {
          document.title = `${data.title} — Sanjeevani Health Journal`;
          const ogImg = data.openGraphImage || data.featuredImage;
          const ogUrl = ogImg ? urlFor(ogImg)?.width(1200).height(630).url() : null;
          if (ogUrl) {
            let meta = document.querySelector('meta[property="og:image"]');
            if (!meta) {
              meta = document.createElement('meta');
              meta.setAttribute('property', 'og:image');
              document.head.appendChild(meta);
            }
            meta.setAttribute('content', ogUrl);
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching post:', err);
        if (active) setPost(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    // Fetch related articles (excluding current slug)
    getRelatedPosts(slug, 3)
      .then((rel) => {
        if (active) setRelatedPosts(Array.isArray(rel) ? rel : []);
      })
      .catch(() => {
        if (active) setRelatedPosts([]);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  // Extract H2 headings from PortableText body for dynamic Table of Contents
  const headings = useMemo(() => {
    if (!post?.body || !Array.isArray(post.body)) return [];
    return post.body
      .filter((block) => block._type === 'block' && block.style === 'h2')
      .map((block) => {
        const text = (block.children || []).map((child) => child.text).join('');
        return {
          id: slugify(text),
          text,
        };
      })
      .filter((h) => Boolean(h.text));
  }, [post?.body]);

  // Active heading observer for dynamic highlighting in Table of Contents
  useEffect(() => {
    if (!headings || headings.length === 0) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0% -60% 0%' }
    );

    headings.forEach((h) => {
      if (h.id) {
        const el = document.getElementById(h.id);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Custom portable text components matching reference style
  const portableTextComponents = useMemo(() => {
    return {
      types: {
        image: ({ value }) => {
          const src = urlFor(value)?.width(1000).url();
          if (!src) return null;
          return (
            <figure className="my-8">
              <img
                src={src}
                alt={value.alt || ''}
                className="w-full rounded-2xl border border-gray-100 object-cover shadow-xs"
                loading="lazy"
              />
              {value.caption && (
                <figcaption className="text-xs text-gray-500 text-center mt-2.5">
                  {value.caption}
                </figcaption>
              )}
            </figure>
          );
        },
      },
      block: {
        h2: ({ value, children }) => {
          const rawText =
            (value?.children || []).map((c) => c.text).join('') ||
            (typeof children === 'string' ? children : '');
          const id = slugify(rawText);
          return (
            <h2
              id={id}
              className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-10 mb-4 font-[var(--font-heading)] scroll-mt-24 tracking-tight"
            >
              {children}
            </h2>
          );
        },
        h3: ({ value, children }) => {
          const rawText =
            (value?.children || []).map((c) => c.text).join('') ||
            (typeof children === 'string' ? children : '');
          const id = slugify(rawText);
          return (
            <h3
              id={id}
              className="text-xl sm:text-2xl font-bold text-gray-900 mt-7 mb-3 font-[var(--font-heading)] scroll-mt-24"
            >
              {children}
            </h3>
          );
        },
        normal: ({ children }) => (
          <p className="text-base sm:text-[17px] text-gray-700 leading-relaxed mb-6 text-justify [text-justify:inter-word]">
            {children}
          </p>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-3 border-gray-900 bg-gray-50/80 pl-5 py-3 my-6 text-gray-800 italic text-base sm:text-lg rounded-r-lg font-serif">
            {children}
          </blockquote>
        ),
      },
      list: {
        bullet: ({ children }) => (
          <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700 text-base sm:text-[17px]">
            {children}
          </ul>
        ),
        number: ({ children }) => (
          <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-700 text-base sm:text-[17px]">
            {children}
          </ol>
        ),
      },
      marks: {
        link: ({ value, children }) => (
          <a
            href={value?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-primary)] font-semibold underline hover:text-[var(--color-primary-600)]"
          >
            {children}
          </a>
        ),
      },
    };
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || 'Sanjeevani Health Journal');
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=500');
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-6">
        <div className="h-4 w-48 bg-gray-200 rounded" />
        <div className="h-12 w-4/5 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="aspect-[16/9] bg-gray-200 rounded-3xl" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        <p className="text-sm text-gray-500 mt-2">
          This article may have been moved or has unpublished changes in Sanity Studio.
        </p>
        <Link
          to="/blog"
          className="inline-block mt-6 px-5 py-2.5 bg-[var(--color-primary)] text-white text-xs font-bold rounded-xl hover:bg-[var(--color-primary-600)] shadow-xs"
        >
          Back to Journal
        </Link>
      </div>
    );
  }

  const featuredUrl = post.featuredImage ? urlFor(post.featuredImage)?.width(1400).url() : null;
  const avatarUrl = post.author?.image ? urlFor(post.author.image)?.width(120).height(120).url() : null;
  const publishedLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="bg-white min-h-screen">
      {/* ─── Breadcrumb & Top Article Header (Open Canvas, No Card Box) ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-[var(--color-primary)] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium truncate max-w-md">{post.title}</span>
        </nav>

        {/* Categories */}
        {(post.categories || []).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((cat) => (
              <span
                key={cat._id || cat.title}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[var(--color-primary)] border border-blue-100"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}

        {/* Article Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 font-[var(--font-heading)] leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-base sm:text-lg text-gray-600 mt-4 leading-relaxed text-justify [text-justify:inter-word]">
            {post.excerpt}
          </p>
        )}

        {/* Author & Published Info Row (Matching Reference) */}
        <div className="flex items-center gap-3.5 mt-6 pb-8 border-b border-gray-100">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={post.author?.name || 'Author'}
              className="w-11 h-11 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-blue-100 text-[var(--color-primary)] font-bold text-base flex items-center justify-center">
              {(post.author?.name || 'A')[0].toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-gray-900">
              {post.author?.name || 'Ajeet Kumar Thapa'}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
              {publishedLabel && <span>{publishedLabel}</span>}
              {post.readingTime && <span>• {post.readingTime} min read</span>}
            </p>
          </div>
        </div>

        {/* Featured Image */}
        {featuredUrl && (
          <div className="my-8 rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-xs">
            <img
              src={featuredUrl}
              alt={post.featuredImage?.alt || post.title}
              className="w-full max-h-[520px] object-cover"
            />
          </div>
        )}
      </div>

      {/* ─── 2-Column Article Body & Sticky Sidebar ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Content Column (Open canvas, no outer box) */}
          <main className="lg:col-span-8">
            {/* Article PortableText Content */}
            <div className="article-body">
              {post.body ? (
                <PortableText value={post.body} components={portableTextComponents} />
              ) : null}
            </div>

            {/* Topics Section (Tags with #) */}
            {(post.tags || []).length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                  Topics
                </span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200/80 hover:bg-gray-100 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ─── About the Author Card (Under Conclusion & Topics) ─── */}
            <div className="mt-10 p-6 sm:p-7 rounded-2xl border border-gray-200/90 bg-white shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-blue-100 text-[var(--color-primary)] flex items-center justify-center font-extrabold text-xl border border-gray-200">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={post.author?.name || 'Author'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{(post.author?.name || 'A')[0].toUpperCase()}</span>
                )}
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  ABOUT THE AUTHOR
                </span>
                <h4 className="text-lg font-bold text-gray-900 font-[var(--font-heading)]">
                  {post.author?.name || 'Ajeet Kumar Thapa'}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed italic">
                  {post.authorBio ||
                    'Blogger at Sanjeevani, sharing practical insights on healthcare accessibility, medical equipment rentals, healthcare products, and digital healthcare solutions.'}
                </p>
              </div>
            </div>
          </main>

          {/* Sticky Right Sidebar (Table of Contents + Social Share) */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6 hidden lg:block">
            {/* Table of Contents ("📖 On this page" - Matching Reference Image 2) */}
            {headings.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3.5">
                  <span className="text-base">📖</span>
                  <span>On this page</span>
                </h4>
                <nav className="border-l border-gray-200 pl-4 space-y-3">
                  {headings.map((h, i) => {
                    const isActive = activeId === h.id;
                    return (
                      <a
                        key={h.id || i}
                        href={`#${h.id}`}
                        onClick={() => setActiveId(h.id)}
                        className={`block text-xs sm:text-[13px] leading-snug transition-colors no-underline ${
                          isActive
                            ? 'text-gray-900 font-bold'
                            : 'text-gray-500 font-normal hover:text-gray-900 hover:font-bold'
                        }`}
                      >
                        {h.text}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Social Share Buttons */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2 mb-3">
                <span>🔗</span> Share article
              </h4>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShare('twitter')}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Share on X"
                >
                  <span className="font-bold">𝕏</span> X
                </button>
                <button
                  type="button"
                  onClick={() => handleShare('facebook')}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Share on Facebook"
                >
                  Facebook
                </button>
                <button
                  type="button"
                  onClick={() => handleShare('linkedin')}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Share on LinkedIn"
                >
                  LinkedIn
                </button>
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="mt-3 w-full py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-xs font-semibold text-gray-700 border border-gray-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{copied ? '✓ Link copied!' : '📋 Copy article link'}</span>
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── Related Articles Section (Matching Reference Image 4) ─── */}
      <section className="border-t border-gray-200/80 bg-gray-50/50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                KEEP READING
              </span>
              <h3 className="text-2xl font-extrabold text-gray-900 font-[var(--font-heading)]">
                Related articles
              </h3>
            </div>
            <Link
              to="/blog"
              className="text-xs font-bold text-gray-900 hover:text-[var(--color-primary)] flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {relatedPosts.length > 0 ? (
            /* 3-Column Related Article Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => {
                const rImg = rPost.featuredImage ? urlFor(rPost.featuredImage)?.width(600).url() : null;
                const rDate = rPost.publishedAt
                  ? new Date(rPost.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : '';
                const rCat = (rPost.categories || [])[0]?.title || 'Health Guide';

                return (
                  <Link
                    key={rPost._id}
                    to={`/blog/${rPost.slug}`}
                    className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col"
                  >
                    {rImg && (
                      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                        <img
                          src={rImg}
                          alt={rPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                          {rCat}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 mt-1.5 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                          {rPost.title}
                        </h4>
                        {rPost.excerpt && (
                          <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                            {rPost.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-400">
                        <span className="font-semibold text-gray-700">{rPost.author?.name || 'Sanjeevani'}</span>
                        <span>•</span>
                        <span>{rDate}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* Reserved Space: Clean Empty State until user publishes next article */
            <div className="p-10 rounded-2xl border border-dashed border-gray-300 bg-white text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-[var(--color-primary)] flex items-center justify-center text-xl mb-3">
                📚
              </div>
              <h4 className="text-sm font-bold text-gray-800">
                More articles coming soon
              </h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
                As you publish more articles in Sanity Studio, related health guides and equipment tips will automatically appear here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
