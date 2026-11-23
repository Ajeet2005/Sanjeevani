/*
 * TrustSection.jsx — Platform Trust & Core Guarantees
 * "Say Goodbye to All Your Healthcare Worries With Sanjeevani!"
 * As highlighted in the user prompt and document.
 */

export default function TrustSection() {
  const GUARANTEES = [
    {
      icon: '🛡️',
      title: '100% Genuine Medicines',
      desc: 'Sourced directly from certified pharmaceutical distributors with active batch numbers.',
    },
    {
      icon: '🏥',
      title: 'Admin-Verified Vendors',
      desc: 'Every pharmacy and equipment supplier on Sanjeevani holds a valid DDA Nepal license.',
    },
    {
      icon: '🦽',
      title: 'Refundable Rental Deposit',
      desc: 'Transparent equipment rental with 100% security deposit returned immediately upon pickup.',
    },
    {
      icon: '🔒',
      title: 'Secure Khalti Payments',
      desc: 'Safe, encrypted digital transactions through Khalti sandbox payment gateway.',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 border-t border-b border-gray-100" aria-label="Platform Guarantees">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-blue-100/70 px-3 py-1 rounded-full">
            Nepal’s Premier Medical Marketplace
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 font-[var(--font-heading)]">
            Say Goodbye to All Your Healthcare Worries With Sanjeevani!
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            We bridge the gap between verified local suppliers and families caring for patients at home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUARANTEES.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 font-[var(--font-heading)]">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
