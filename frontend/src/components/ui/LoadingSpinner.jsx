/*
 * LoadingSpinner.jsx — Full-page loading indicator
 * Shown by React.Suspense while lazy-loaded pages are being fetched.
 */
function LoadingSpinner() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div
          className="w-10 h-10 border-4 border-[var(--color-gray-200)] border-t-[var(--color-primary)] rounded-full animate-spin"
        />
        <p className="text-[var(--color-gray-500)] text-sm font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
