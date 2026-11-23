/*
 * Skeleton.jsx — Reusable skeleton preloader component
 * Provides accessible, animated loading placeholders with shimmer effect.
 */

export function Skeleton({ className = '', variant = 'rectangular', ...props }) {
  const baseClasses = 'skeleton animate-pulse';
  
  const variantClasses = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4 my-1',
    card: 'rounded-xl h-64 w-full',
  }[variant] || 'rounded-lg';

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

export function BannerSkeleton() {
  return (
    <div className="w-full h-[220px] sm:h-[240px] rounded-2xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center p-8">
      <div className="space-y-4 max-w-md w-full">
        <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
        <div className="h-9 bg-gray-300 rounded-lg w-32 mt-4"></div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm space-y-4">
      <div className="w-full h-40 bg-gray-100 rounded-xl animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded-lg w-20 animate-pulse"></div>
      </div>
    </div>
  );
}
