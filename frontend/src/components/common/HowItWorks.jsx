/*
 * HowItWorks.jsx — Step-by-step explainer for Buy vs. Rent
 * Clarifies Sanjeevani's dual transaction model:
 * 1. BUY medicines (Rx verification -> delivery)
 * 2. RENT equipment (Choose dates -> Refundable deposit -> Pickup return)
 */

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-label="How Sanjeevani Works">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-blue-50 px-3 py-1 rounded-full">
          Clear & Simple Process
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 font-[var(--font-heading)]">
          How Sanjeevani Works
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Whether you need daily prescription medicines or temporary medical equipment, we have you covered.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BUY Flow */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[var(--color-primary)] font-black flex items-center justify-center text-lg">
              💊
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-[var(--font-heading)]">
                Buying Medicines & Health Supplies
              </h3>
              <p className="text-xs text-gray-500">Fast, genuine, and verified by pharmacists</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '01',
                title: 'Search or Upload Prescription',
                desc: 'Find your medicines or upload a clear photo of your doctor’s prescription.',
              },
              {
                step: '02',
                title: 'Pharmacist Review & Verification',
                desc: 'A licensed pharmacist verifies dosage and confirms stock availability.',
              },
              {
                step: '03',
                title: 'Khalti Payment & Fast Dispatch',
                desc: 'Pay securely via Khalti sandbox and track doorstep delivery from a local pharmacy.',
              },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 p-3 rounded-2xl bg-gray-50/70">
                <span className="font-mono text-sm font-extrabold text-[var(--color-primary)] bg-white w-8 h-8 rounded-lg flex items-center justify-center shadow-xs flex-shrink-0">
                  {s.step}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">{s.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RENT Flow */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-black flex items-center justify-center text-lg">
              🦽
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-[var(--font-heading)]">
                Renting Medical Equipment
              </h3>
              <p className="text-xs text-gray-500">Cost-effective rentals with 100% refundable deposit</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '01',
                title: 'Select Equipment & Date Range',
                desc: 'Choose wheelchairs, hospital beds, or oxygen concentrators and rental duration.',
              },
              {
                step: '02',
                title: 'Pay Rental + Refundable Deposit',
                desc: 'Pay low daily rental rates plus security deposit securely via Khalti.',
              },
              {
                step: '03',
                title: 'Sanitized Delivery & Deposit Refund',
                desc: 'Receive sterilized equipment. Once returned undamaged, your full deposit is refunded.',
              },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 p-3 rounded-2xl bg-teal-50/50">
                <span className="font-mono text-sm font-extrabold text-teal-800 bg-white w-8 h-8 rounded-lg flex items-center justify-center shadow-xs flex-shrink-0">
                  {s.step}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">{s.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
