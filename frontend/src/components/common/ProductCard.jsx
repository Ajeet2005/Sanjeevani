/*
 * ProductCard.jsx — Reusable medicine/product card
 * Clean isolated PNG-style medicine container with pure white background.
 * Enforces Rx validation badge and Khalti payment integration readiness.
 */
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.requiresPrescription) return;
    addToCart(product);
  };

  return (
    <div className="w-[240px] sm:w-[260px] flex-shrink-0 bg-white border border-gray-100 rounded-3xl p-4 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative select-none">
      
      {/* Top badges: Discount & Rx badge */}
      <div className="flex items-center justify-between mb-2">
        {product.discountPercent > 0 ? (
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-lg border border-emerald-200">
            {product.discountPercent}% OFF
          </span>
        ) : <span />}

        {product.requiresPrescription && (
          <span
            className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-lg tracking-wider flex items-center gap-1 shadow-xs"
            title="Prescription Required"
          >
            <span>℞</span>
            <span>Rx Only</span>
          </span>
        )}
      </div>

      {/* Clean White Isolated Image Container */}
      <div className="w-full h-36 rounded-2xl bg-white border border-gray-50 flex items-center justify-center p-3 overflow-hidden my-1 shadow-inner group-hover:scale-105 transition-transform duration-300">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain filter drop-shadow-sm"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80';
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between mt-2">
        <div>
          <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider block">
            {product.brand}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 mt-0.5 group-hover:text-[var(--color-primary)] transition-colors">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-400 mt-1">
            {product.unit}
          </p>
        </div>

        {/* Rating & Delivery */}
        <div className="mt-3 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
            <span>★</span>
            <span className="text-gray-800">{product.rating}</span>
            <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
          </div>
          <span className="text-emerald-700 font-medium text-[10px]">{product.deliveryTime}</span>
        </div>

        {/* Price & Action button */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-gray-900 font-[var(--font-heading)]">
                Rs. {product.price}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-[11px] text-gray-400 line-through">
                  Rs. {product.mrp}
                </span>
              )}
            </div>
          </div>

          {product.requiresPrescription ? (
            <Link
              to="/upload-prescription"
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-gray-950 font-extrabold text-[11px] rounded-xl shadow-xs transition-colors flex items-center gap-1"
            >
              <span>Upload Rx</span>
            </Link>
          ) : (
            <button
              onClick={handleAdd}
              className="px-3.5 py-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)] text-white font-black text-xs rounded-xl shadow-xs transition-transform active:scale-95"
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
