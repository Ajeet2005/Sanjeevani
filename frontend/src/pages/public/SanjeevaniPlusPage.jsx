/*
 * SanjeevaniPlusPage.jsx — Sanjeevani Plus & Plus Pro Membership (/plus)
 * Inspired by PharmEasy Plus layout, styled in Sanjeevani's healthcare blue theme.
 * Transparent medical benefits (equal care for all, no priority tiers):
 * - Sanjeevani Plus: Rs. 199 / 3 months
 * - Sanjeevani Plus Pro: Rs. 499 / 3 months
 */
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const PLANS = [
  {
    id: 'plus',
    name: 'Sanjeevani Plus',
    price: 199,
    duration: '3 months',
    monthlyEq: 66,
    description: 'Essential savings on everyday medicines, delivery, and purchased medical devices.',
    badge: null,
    highlight: false,
    features: [
      '5% extra discount on all medicines & wellness products',
      'Free delivery on orders above Rs. 499',
      'Free installation on purchased medical equipment',
      '2x Reward Points on every order',
      'Zero convenience or handling fee',
      'Covers 1 user profile',
    ],
  },
  {
    id: 'plus-pro',
    name: 'Sanjeevani Plus Pro',
    price: 499,
    duration: '3 months',
    monthlyEq: 166,
    description: 'Complete household coverage with zero-minimum free delivery and rental equipment benefits.',
    badge: 'Most Popular',
    highlight: true,
    features: [
      '5% extra discount on all medicines & wellness products',
      'Free delivery on any order (Rs. 0 minimum)',
      'Free installation & pickup on purchased and rented equipment',
      '10% off medical equipment rental fees',
      '3x Reward Points on every order',
      'Monthly pharmacist consultation & refill reminders',
      'Family coverage for up to 4 members',
    ],
  },
];

const COMPARISON_ROWS = [
  { feature: 'Extra Discount on All Products', plus: '5% off', pro: '5% off' },
  { feature: 'Free Delivery Threshold', plus: 'Above Rs. 499', pro: 'Any order (Rs. 0 min)' },
  { feature: 'Purchased Equipment Installation', plus: 'Free', pro: 'Free' },
  { feature: 'Rented Equipment Installation & Pickup', plus: 'Standard fee', pro: 'Free' },
  { feature: 'Equipment Rental Discount', plus: '—', pro: '10% off' },
  { feature: 'Reward Points Multiplier', plus: '2x Points', pro: '3x Points' },
  { feature: 'Convenience / Handling Fee', plus: 'Rs. 0', pro: 'Rs. 0' },
  { feature: 'Pharmacist Consultation & Refill Reminders', plus: '—', pro: 'Monthly included' },
  { feature: 'Family Members Covered', plus: '1 profile', pro: 'Up to 4 members' },
];

const FAQS = [
  {
    q: 'Does Sanjeevani Plus affect medicine availability or prescription review times?',
    a: 'No. Because healthcare should be fair and transparent for every patient, all prescriptions and medical orders follow the exact same licensed pharmacist verification standards regardless of membership.',
  },
  {
    q: 'What is the difference between Sanjeevani Plus and Plus Pro?',
    a: 'Both plans give you 5% off all products, zero convenience fees, and free installation on purchased equipment. Plus Pro removes the Rs. 499 minimum for free delivery, adds free installation & pickup plus 10% off on rented equipment, covers up to 4 family members, and includes monthly pharmacist consultations.',
  },
  {
    q: 'How can I pay for my 3-month membership?',
    a: 'You can activate either plan via Khalti, eSewa, or card checkout. Your benefits apply immediately to your next medicine or equipment order.',
  },
  {
    q: 'Are equipment installation benefits valid across Nepal?',
    a: 'Free doorstep installation on purchased equipment (and rented equipment on Plus Pro) is available in Kathmandu Valley, Pokhara, Lalitpur, Bhaktapur, and major partner pharmacy zones.',
  },
];

export default function SanjeevaniPlusPage() {
  const [selectedPlanId, setSelectedPlanId] = useState('plus-pro');
  const [activatedPlan, setActivatedPlan] = useState(null);

  // Interactive Savings Calculator states
  const [monthlyMedSpend, setMonthlyMedSpend] = useState(3000);
  const [ordersPerMonth, setOrdersPerMonth] = useState(2);
  const [usesEquipmentRental, setUsesEquipmentRental] = useState(true);
  const [monthlyRentalSpend, setMonthlyRentalSpend] = useState(2000);

  const calc = useMemo(() => {
    const threeMonthMed = monthlyMedSpend * 3;
    const threeMonthOrders = ordersPerMonth * 3;
    const productDiscount = Math.round(threeMonthMed * 0.05);

    // Assume Rs. 60 average delivery fee per order
    const plusDeliverySaved = Math.round(threeMonthOrders * 0.65 * 60);
    const proDeliverySaved = threeMonthOrders * 60;

    // Assume 1 equipment installation (~Rs. 400) + 10% off 3-month rental on Pro
    const plusInstallSaved = 400;
    const proEquipmentSaved = usesEquipmentRental
      ? 400 + Math.round(monthlyRentalSpend * 3 * 0.1)
      : 400;

    const plusGross = productDiscount + plusDeliverySaved + plusInstallSaved;
    const proGross = productDiscount + proDeliverySaved + proEquipmentSaved;

    return {
      productDiscount,
      plusDeliverySaved,
      proDeliverySaved,
      plusInstallSaved,
      proEquipmentSaved,
      plusNet: plusGross - 199,
      proNet: proGross - 499,
      plusGross,
      proGross,
    };
  }, [monthlyMedSpend, ordersPerMonth, usesEquipmentRental, monthlyRentalSpend]);

  const activePlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[1];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16">
      {/* ─── Hero Section (Sanjeevani Healthcare Blue Gradient) ─── */}
      <section className="bg-gradient-to-br from-[#081F5F] via-[#0C2D7F] to-[var(--color-primary)] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 80% 20%, #93C5FD 0%, transparent 45%), radial-gradient(circle at 15% 85%, #FDE047 0%, transparent 35%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
              <span className="text-amber-300">✦</span>
              <span>Sanjeevani Plus Membership</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-[var(--font-heading)] leading-tight">
              Save more on every medicine &amp; medical equipment order
            </h1>
            <p className="text-sm sm:text-base text-blue-100 mt-4 max-w-2xl leading-relaxed">
              Simple, transparent 3-month healthcare plans starting at{' '}
              <strong className="text-white">Rs. 199</strong>. Enjoy 5% off all products, free doorstep delivery, free equipment installation, and reward points.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-7">
              <a
                href="#plans"
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold text-sm rounded-2xl shadow-lg transition-all active:scale-98"
              >
                Explore Plans (From Rs. 199)
              </a>
              <a
                href="#calculator"
                className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-2xl border border-white/25 transition-all"
              >
                Calculate Your Savings
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mt-10">
        {/* ─── Activation Toast Banner ─── */}
        {activatedPlan && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-950">
                  {activatedPlan.name} (Rs. {activatedPlan.price} / {activatedPlan.duration}) selected!
                </p>
                <p className="text-xs text-emerald-700">
                  Khalti subscription checkout integration is ready to connect at payment step.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActivatedPlan(null)}
              className="text-xs font-bold text-emerald-800 hover:underline self-end sm:self-center cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ─── 2-Tier Pricing Cards ─── */}
        <section id="plans" aria-label="Membership Plans">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-[var(--font-heading)]">
              Choose the plan that fits your home
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
              3-month transparent memberships with instant savings on medicines and equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    plan.highlight
                      ? 'bg-gradient-to-b from-white to-blue-50/60 border-2 border-[var(--color-primary)] shadow-lg'
                      : 'bg-white border border-gray-200 shadow-xs hover:border-blue-300'
                  } ${isSelected ? 'ring-4 ring-[var(--color-primary)]/15' : ''}`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3.5 right-6 bg-[var(--color-primary)] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                      {plan.badge}
                    </span>
                  )}

                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-[var(--font-heading)]">
                          {plan.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                          {plan.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pb-6 border-b border-gray-100 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-[var(--color-primary)] font-[var(--font-heading)]">
                        Rs. {plan.price}
                      </span>
                      <span className="text-sm font-semibold text-gray-500">/ {plan.duration}</span>
                      <span className="ml-auto text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                        ~Rs. {plan.monthlyEq}/mo
                      </span>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-blue-100 text-[var(--color-primary)] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlanId(plan.id);
                      setActivatedPlan(plan);
                    }}
                    className={`mt-8 w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm transition-all cursor-pointer ${
                      plan.highlight
                        ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)] text-white shadow-md'
                        : 'bg-blue-50 hover:bg-blue-100 text-[var(--color-primary)] border border-blue-200'
                    }`}
                  >
                    Join {plan.name} — Rs. {plan.price}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Interactive Savings Calculator (PharmEasy-style, Sanjeevani Blue) ─── */}
        <section
          id="calculator"
          className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-xs"
          aria-label="Savings Calculator"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                Interactive Estimator
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-[var(--font-heading)] mt-1">
                Calculate your 3-month savings
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Adjust your monthly medicine and equipment needs to compare Plus vs. Plus Pro
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-800 mb-2">
                  <span>Monthly medicine &amp; wellness spend</span>
                  <span className="text-[var(--color-primary)]">Rs. {monthlyMedSpend.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={15000}
                  step={250}
                  value={monthlyMedSpend}
                  onChange={(e) => setMonthlyMedSpend(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>Rs. 500</span>
                  <span>Rs. 7,500</span>
                  <span>Rs. 15,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-800 mb-2">
                  <span>Orders placed per month</span>
                  <span className="text-[var(--color-primary)]">{ordersPerMonth} orders/mo</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={ordersPerMonth}
                  onChange={(e) => setOrdersPerMonth(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>1 order</span>
                  <span>4 orders</span>
                  <span>8 orders</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs sm:text-sm font-bold text-gray-800">
                    Include medical equipment rental?
                  </span>
                  <input
                    type="checkbox"
                    checked={usesEquipmentRental}
                    onChange={(e) => setUsesEquipmentRental(e.target.checked)}
                    className="w-4 h-4 accent-[var(--color-primary)] rounded cursor-pointer"
                  />
                </label>

                {usesEquipmentRental && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
                      <span>Monthly equipment rental spend</span>
                      <span className="text-[var(--color-primary)]">Rs. {monthlyRentalSpend.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={10000}
                      step={250}
                      value={monthlyRentalSpend}
                      onChange={(e) => setMonthlyRentalSpend(Number(e.target.value))}
                      className="w-full accent-[var(--color-primary)] cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0C2D7F] to-[var(--color-primary)] text-white rounded-3xl p-6 sm:p-7 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <div>
                  <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">
                    Estimated 3-Month Net Benefit
                  </p>
                  <p className="text-3xl font-black mt-1">
                    Rs. {Math.max(0, selectedPlanId === 'plus' ? calc.plusNet : calc.proNet).toLocaleString()}
                  </p>
                </div>
                <div className="flex bg-white/15 rounded-xl p-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setSelectedPlanId('plus')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      selectedPlanId === 'plus' ? 'bg-white text-[var(--color-primary)]' : 'text-white'
                    }`}
                  >
                    Plus
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanId('plus-pro')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      selectedPlanId === 'plus-pro' ? 'bg-white text-[var(--color-primary)]' : 'text-white'
                    }`}
                  >
                    Plus Pro
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between text-blue-100">
                  <span>5% Extra Product Discount</span>
                  <span className="font-bold text-white">+ Rs. {calc.productDiscount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-blue-100">
                  <span>Delivery Fee Savings</span>
                  <span className="font-bold text-white">
                    + Rs. {(selectedPlanId === 'plus' ? calc.plusDeliverySaved : calc.proDeliverySaved).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-blue-100">
                  <span>Installation &amp; Rental Savings</span>
                  <span className="font-bold text-white">
                    + Rs. {(selectedPlanId === 'plus' ? calc.plusInstallSaved : calc.proEquipmentSaved).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-blue-200 pt-2 border-t border-white/15">
                  <span>{activePlan.name} 3-month fee</span>
                  <span className="font-semibold">- Rs. {activePlan.price}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActivatedPlan(activePlan)}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold text-xs sm:text-sm rounded-2xl transition-colors cursor-pointer"
              >
                Get {activePlan.name} for Rs. {activePlan.price}
              </button>
            </div>
          </div>
        </section>

        {/* ─── Side-by-Side Comparison Table ─── */}
        <section className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs" aria-label="Plan Comparison">
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-[var(--font-heading)]">
              Compare Plus &amp; Plus Pro Benefits
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50/70 text-xs sm:text-sm font-extrabold text-gray-900">
                  <th className="py-4 px-6">Benefit</th>
                  <th className="py-4 px-6 text-center">Sanjeevani Plus (Rs. 199)</th>
                  <th className="py-4 px-6 text-center text-[var(--color-primary)]">Sanjeevani Plus Pro (Rs. 499)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-gray-50/60">
                    <td className="py-3.5 px-6 font-medium text-gray-800">{row.feature}</td>
                    <td className="py-3.5 px-6 text-center text-gray-600">{row.plus}</td>
                    <td className="py-3.5 px-6 text-center font-bold text-[var(--color-primary)]">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="max-w-4xl mx-auto" aria-label="Frequently Asked Questions">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-[var(--font-heading)] text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs"
              >
                <summary className="font-bold text-sm text-gray-900 cursor-pointer flex items-center justify-between list-none">
                  <span>{item.q}</span>
                  <span className="text-[var(--color-primary)] text-lg font-bold ml-4 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/medicines"
              className="text-xs sm:text-sm font-bold text-[var(--color-primary)] hover:underline"
            >
              ← Browse Medicines &amp; Healthcare Essentials
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
