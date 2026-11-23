/*
 * QuickActions.jsx — Primary service cards
 * Instant shortcuts to Sanjeevani's 4 core verticals:
 * 1. Order Medicines (Buy)
 * 2. Rent Medical Equipment (Rent)
 * 3. Upload Prescription (Rx)
 * 4. Find Nearby Pharmacies (Discovery)
 */
import { Link } from 'react-router-dom';

const ACTIONS = [
  {
    id: 'medicines',
    title: 'Order Medicines',
    desc: '100% genuine OTC & prescription medicines',
    link: '/medicines',
    tag: 'Flat savings',
    iconBg: 'bg-blue-50 text-[var(--color-primary)]',
    hoverBorder: 'hover:border-blue-300',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 'rent-equipment',
    title: 'Rent Equipment',
    desc: 'Wheelchairs, hospital beds & concentrators with refundable deposit',
    link: '/equipment',
    tag: 'Flexible dates',
    iconBg: 'bg-emerald-50 text-emerald-600',
    hoverBorder: 'hover:border-emerald-300',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'upload-rx',
    title: 'Upload Prescription',
    desc: 'Quick snap & verified pharmacists dispense your medicines',
    link: '/upload-prescription',
    tag: 'Quick Rx check',
    iconBg: 'bg-amber-50 text-amber-600',
    hoverBorder: 'hover:border-amber-300',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    id: 'nearby-vendors',
    title: 'Nearby Pharmacies',
    desc: 'Discover licensed medical stores & equipment suppliers near you',
    link: '/vendors',
    tag: 'Fast delivery',
    iconBg: 'bg-purple-50 text-purple-600',
    hoverBorder: 'hover:border-purple-300',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function QuickActions() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" aria-label="Quick Actions">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {ACTIONS.map((action) => (
          <Link
            key={action.id}
            to={action.link}
            className={`group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between ${action.hoverBorder}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${action.iconBg}`}>
                  {action.icon}
                </div>
                <span className="text-[11px] font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                  {action.tag}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 font-[var(--font-heading)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                {action.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                {action.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center text-xs font-semibold text-[var(--color-primary)] gap-1 group-hover:gap-2 transition-all">
              <span>Explore now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
