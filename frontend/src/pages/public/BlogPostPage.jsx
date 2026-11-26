/*
 * BlogPostPage.jsx — Full article reader (/blog/:slug) powered by Sanity CMS
 */
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, urlFor } from '../../lib/sanity.js';

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value)?.width(1000).url();
      if (!src) return null;
      return (
        <figure className="my-6">
          <img
            src={src}
            alt={value.alt || ''}
            className="w-full rounded-2xl border border-gray-100 object-cover"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="text-xs text-gray-500 text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-8 mb-3 font-[var(--font-heading)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-6 mb-2 font-[var(--font-heading)]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-primary)] bg-blue-50/50 px-4 py-3 my-5 rounded-r-xl text-sm sm:text-base italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-1.5 mb-4 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-1.5 mb-4 text-gray-700">{children}</ol>,
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

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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
      .catch(() => {
        if (active) setPost(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-6">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-10 w-3/4 bg-gray-200 rounded" />
        <div className="aspect-[16/9] bg-gray-200 rounded-3xl" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        <p className="text-sm text-gray-500 mt-2">
          This article may have been moved or not yet published in Sanity.
        </p>
        <Link
          to="/blog"
          className="inline-block mt-5 px-5 py-2.5 bg-[var(--color-primary)] text-white text-xs font-bold rounded-xl hover:bg-[var(--color-primary-600)]"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const featuredUrl = post.featuredImage ? urlFor(post.featuredImage)?.width(1200).url() : null;
  const avatarUrl = post.author?.image ? urlFor(post.author.image)?.width(96).height(96).url() : null;
  const publishedLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <article className="bg-[#F8FAFC] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[var(--color-primary)]">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-[var(--color-primary)]">Blog</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{post.title}</span>
        </nav>

        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs">
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

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 font-[var(--font-heading)] leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm sm:text-base text-gray-500 mt-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Author & Metadata */}
          <div className="flex items-center gap-3 mt-6 pb-6 border-b border-gray-100">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={post.author?.name || 'Author'}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[var(--color-primary)] font-bold flex items-center justify-center">
                {(post.author?.name || 'S')[0].toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-bold text-gray-900">
                {post.author?.name || 'Sanjeevani Editorial'}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                {publishedLabel && <span>{publishedLabel}</span>}
                {post.readingTime && <span>• {post.readingTime} min read</span>}
              </p>
            </div>
          </div>

          {/* Featured Image */}
          {featuredUrl && (
            <div className="my-6 rounded-2xl overflow-hidden bg-blue-50">
              <img
                src={featuredUrl}
                alt={post.featuredImage?.alt || post.title}
                className="w-full max-h-[460px] object-cover"
              />
            </div>
          )}

          {/* Body (Portable Text) */}
          <div className="mt-6">
            {post.body ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : null}
          </div>

          {/* Tags & Back Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {(post.tags || []).length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : <div />}

            <Link
              to="/blog"
              className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
            >
              <span>← Back to all articles</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
