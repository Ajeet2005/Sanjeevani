/*
 * SanjeevaniPlusPage.jsx — Sanjeevani Plus & Plus Pro Membership (/plus)
 * Visually rich, animated membership page with realistic healthcare imagery.
 * Transparent medical benefits (equal care for all, no priority tiers):
 * - Sanjeevani Plus: Rs. 199 / 3 months
 * - Sanjeevani Plus Pro: Rs. 499 / 3 months
 */
import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ─── Plan Data ─── */
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
      { text: '5% extra discount on all medicines & wellness products', icon: 'percent' },
      { text: 'Free delivery on orders above Rs. 499', icon: 'truck' },
      { text: 'Free installation on purchased medical equipment', icon: 'wrench' },
      { text: '2x Reward Points on every order', icon: 'star' },
      { text: 'Zero convenience or handling fee', icon: 'shield' },
      { text: 'Covers 1 user profile', icon: 'user' },
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
      { text: '5% extra discount on all medicines & wellness products', icon: 'percent' },
      { text: 'Free delivery on any order (Rs. 0 minimum)', icon: 'truck' },
      { text: 'Free installation & pickup on purchased and rented equipment', icon: 'wrench' },
      { text: '10% off medical equipment rental fees', icon: 'tag' },
      { text: '3x Reward Points on every order', icon: 'star' },
      { text: 'Monthly pharmacist consultation & refill reminders', icon: 'phone' },
      { text: 'Family coverage for up to 4 members', icon: 'users' },
    ],
  },
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

/* ─── Benefit visual cards data (clear realistic photos, no color wash) ─── */
const BENEFIT_CARDS = [
  {
    title: 'Free Delivery',
    tag: 'Doorstep Across Nepal',
    desc: 'Save on every order with fast, zero-hassle doorstep delivery.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&q=85',
  },
  {
    title: 'Equipment Installation',
    tag: 'Certified Setup',
    desc: 'Professional setup of medical devices at your home, free of charge.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&q=85',
  },
  {
    title: 'Reward Points',
    tag: '2x – 3x Multiplier',
    desc: 'Earn points on every purchase and redeem directly on future orders.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&q=85',
  },
  {
    title: 'Family Coverage',
    tag: 'Up to 4 Profiles',
    desc: 'Plus Pro protects up to 4 family members under one membership.',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop&q=85',
  },
];

/* ─── Feature icon SVGs ─── */
const FEATURE_ICONS = {
  percent: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" /></svg>
  ),
  truck: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.149-.504 1.149-1.125v-5.432c0-.396-.216-.764-.564-.95l-4.333-2.167a1.5 1.5 0 00-.67-.158H7.5M15.75 18.75h-6M2.25 14.25h18.75" /></svg>
  ),
  wrench: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.42 15.17l-5.32-3.07a.563.563 0 010-.974l5.32-3.07a.563.563 0 01.84.488v6.133a.563.563 0 01-.84.488zM20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3" /></svg>
  ),
  star: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
  ),
  user: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
  ),
  tag: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h.008v.008H6V6z" /></svg>
  ),
  phone: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
  ),
  users: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
  ),
};

/* ─── Intersection Observer hook for scroll-triggered animations ─── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(el); }
    }, { threshold: 0.12, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isVisible];
}

/* ─── Animated counter component ─── */
function AnimatedCounter({ target, prefix = '', suffix = '', duration = 1200 }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useInView();
  useEffect(() => {
    if (!isVisible || target <= 0) return;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─── Floating decorative particles ─── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${20 + i * 12}px`,
            height: `${20 + i * 12}px`,
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
            background: i % 2 === 0 ? '#93C5FD' : '#FDE047',
            animation: `float-particle ${4 + i * 0.8}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function SanjeevaniPlusPage() {
  const [selectedPlanId, setSelectedPlanId] = useState('plus-pro');
  const [activatedPlan, setActivatedPlan] = useState(null);
  const [footerInView, setFooterInView] = useState(false);

  // Savings Calculator
  const [monthlyMedSpend, setMonthlyMedSpend] = useState(3000);
  const [ordersPerMonth, setOrdersPerMonth] = useState(2);
  const [usesEquipmentRental, setUsesEquipmentRental] = useState(true);
  const [monthlyRentalSpend, setMonthlyRentalSpend] = useState(2000);

  // Section refs for scroll animations
  const [heroRef, heroVisible] = useInView();
  const [plansRef, plansVisible] = useInView();
  const [benefitsRef, benefitsVisible] = useInView();
  const [calcRef, calcVisible] = useInView();
  const [faqRef, faqVisible] = useInView();

  // Hide sticky CTA bar once the footer reaches the viewport
  useEffect(() => {
    const footerEl = document.querySelector('footer');
    if (!footerEl) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0.02 }
    );
    obs.observe(footerEl);
    return () => obs.disconnect();
  }, []);

  const calc = useMemo(() => {
    const threeMonthMed = monthlyMedSpend * 3;
    const threeMonthOrders = ordersPerMonth * 3;
    const productDiscount = Math.round(threeMonthMed * 0.05);
    const plusDeliverySaved = Math.round(threeMonthOrders * 0.65 * 60);
    const proDeliverySaved = threeMonthOrders * 60;
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
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Inline keyframes for animations */}
      <style>{`
        @keyframes float-particle { 0% { transform: translateY(0) scale(1); } 100% { transform: translateY(-30px) scale(1.15); } }
        @keyframes shimmer-btn { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes card-glow { 0%, 100% { box-shadow: 0 0 20px rgba(26, 86, 219, 0.08); } 50% { box-shadow: 0 0 40px rgba(26, 86, 219, 0.18); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-left { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes count-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        .animate-slide-up { animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-left { animation: slide-left 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade { animation: fade-in 0.6s ease forwards; }
        .shimmer-btn { background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.35) 50%, transparent 75%); background-size: 200% 100%; animation: shimmer-btn 2.5s ease-in-out infinite; }
        .card-hover-lift { transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease; }
        .card-hover-lift:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 20px 55px rgba(26, 86, 219, 0.14); }
        .plan-glow { animation: card-glow 3s ease-in-out infinite; }
      `}</style>

      {/* ═══ HERO — Full-bleed image with Sanjeevani Blue accent ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-[500px] sm:min-h-[540px] flex items-center overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1600&h=900&fit=crop&q=85"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#103A9E]/90 via-[#1A56DB]/75 to-[#1A56DB]/35" />

        <FloatingParticles />

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full ${heroVisible ? 'animate-fade' : 'opacity-0'}`}>
          {/* Left — Text */}
          <div className={heroVisible ? 'animate-slide-up' : 'opacity-0'}>
            <div className="inline-flex items-center gap-2 text-white bg-white/15 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" style={{ animation: 'pulse-ring 1.5s infinite' }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
              </span>
              <span className="text-white">Sanjeevani Plus Membership</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.1] font-[var(--font-heading)]">
              Save more on every{' '}
              <span className="text-amber-300">medicine</span> &amp;{' '}
              <span className="text-sky-200">equipment</span> order
            </h1>
            <p className="text-sm sm:text-base text-blue-50 mt-5 max-w-xl leading-relaxed">
              Simple, transparent 3-month healthcare plans starting at{' '}
              <strong className="text-white font-extrabold">Rs. 199</strong>. Enjoy 5% off all products, free doorstep delivery, free equipment installation, and reward points — because your health shouldn't cost more than it has to.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mt-8">
              <a
                href="#plans"
                className="relative px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold text-sm rounded-2xl shadow-lg transition-all active:scale-[0.97] overflow-hidden"
              >
                <span className="relative z-10">Explore Plans — From Rs. 199</span>
                <span className="absolute inset-0 shimmer-btn" />
              </a>
              <a
                href="#calculator"
                className="px-7 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-2xl border border-white/30 backdrop-blur-sm transition-all"
              >
                Calculate Your Savings
              </a>
            </div>
          </div>

          {/* Right — Feature highlight image card */}
          <div className={`hidden lg:block ${heroVisible ? 'animate-slide-left' : 'opacity-0'}`} style={{ animationDelay: '0.25s' }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-400/20 to-sky-400/20 rounded-[2rem] blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=450&fit=crop&q=85"
                alt="Medicine delivery and healthcare services"
                className="relative rounded-3xl shadow-2xl border-2 border-white/25 w-full object-cover h-[380px]"
              />
              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100" style={{ animation: 'float-particle 3s ease-in-out infinite alternate' }}>
                <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" /></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Members saved</p>
                  <p className="text-lg font-black text-gray-900">Rs. 2,400+</p>
                </div>
              </div>
              {/* Floating delivery badge */}
              <div className="absolute -top-3 -right-3 bg-[var(--color-primary)] text-white rounded-2xl shadow-xl px-4 py-2.5 text-xs font-bold flex items-center gap-2" style={{ animation: 'float-particle 3.5s ease-in-out infinite alternate-reverse' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.149-.504 1.149-1.125v-5.432c0-.396-.216-.764-.564-.95l-4.333-2.167a1.5 1.5 0 00-.67-.158H7.5M15.75 18.75h-6M2.25 14.25h18.75" /></svg>
                Free Delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-14">
        {/* ═══ Activation Toast ═══ */}
        {activatedPlan && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">✓</div>
              <div>
                <p className="text-sm font-bold text-emerald-950">
                  {activatedPlan.name} (Rs. {activatedPlan.price} / {activatedPlan.duration}) selected!
                </p>
                <p className="text-xs text-emerald-700">
                  Khalti subscription checkout integration is ready to connect at payment step.
                </p>
              </div>
            </div>
            <button type="button" onClick={() => setActivatedPlan(null)} className="text-xs font-bold text-emerald-800 hover:underline self-end sm:self-center cursor-pointer">
              Dismiss
            </button>
          </div>
        )}

        {/* ═══ BENEFIT CARDS — Crystal-clear realistic visuals (no color wash) ═══ */}
        <section ref={benefitsRef} aria-label="Membership Benefits">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)]">Why Join</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-[var(--font-heading)] mt-1">
              Benefits that make healthcare affordable
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFIT_CARDS.map((card, i) => (
              <div
                key={card.title}
                className={`group rounded-3xl overflow-hidden bg-white border border-gray-200/80 shadow-sm card-hover-lift cursor-default flex flex-col ${benefitsVisible ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[var(--color-primary)] bg-blue-50 px-2.5 py-1 rounded-full mb-2">
                      {card.tag}
                    </span>
                    <h3 className="text-lg font-extrabold text-gray-900 font-[var(--font-heading)]">{card.title}</h3>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 2-TIER PRICING CARDS ═══ */}
        <section ref={plansRef} id="plans" aria-label="Membership Plans">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)]">Choose Your Plan</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-[var(--font-heading)] mt-1">
              Transparent plans, real savings
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              3-month memberships with instant savings on medicines and equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {PLANS.map((plan, planIdx) => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`relative rounded-3xl p-7 sm:p-9 transition-all duration-300 cursor-pointer flex flex-col justify-between card-hover-lift ${
                    plan.highlight
                      ? 'bg-gradient-to-b from-white via-blue-50/40 to-sky-50/60 border-2 border-[var(--color-primary)] shadow-lg plan-glow'
                      : 'bg-white border border-gray-200 shadow-sm hover:border-blue-300'
                  } ${isSelected ? 'ring-4 ring-[var(--color-primary)]/15' : ''} ${plansVisible ? 'animate-slide-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${planIdx * 0.15}s` }}
                >
                  {plan.badge && (
                    <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-[var(--color-primary)] to-[#4B83ED] text-white text-[11px] font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                      {plan.badge}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 ${
                        plan.highlight ? 'bg-gradient-to-br from-[var(--color-primary)] to-[#4B83ED] text-white' : 'bg-blue-50 text-[var(--color-primary)]'
                      }`}>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-[var(--font-heading)]">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{plan.description}</p>
                      </div>
                    </div>

                    <div className="pb-6 border-b border-gray-100 flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-[var(--color-primary)] font-[var(--font-heading)]">
                        Rs. {plan.price}
                      </span>
                      <span className="text-sm font-semibold text-gray-500">/ {plan.duration}</span>
                      <span className="ml-auto text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl">
                        ~Rs. {plan.monthlyEq}/mo
                      </span>
                    </div>

                    <ul className="mt-6 space-y-3.5">
                      {plan.features.map((feat, fi) => (
                        <li
                          key={feat.text}
                          className="flex items-start gap-3 text-sm text-gray-700"
                          style={plansVisible ? { animation: `slide-up 0.5s ${0.3 + fi * 0.08}s cubic-bezier(0.16, 1, 0.3, 1) forwards`, opacity: 0 } : { opacity: 0 }}
                        >
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            plan.highlight ? 'bg-blue-100 text-[var(--color-primary)]' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {FEATURE_ICONS[feat.icon]}
                          </span>
                          <span className="pt-1">{feat.text}</span>
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
                    className={`relative mt-9 w-full py-4 px-6 rounded-2xl font-extrabold text-sm transition-all cursor-pointer overflow-hidden ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-[var(--color-primary)] to-[#4B83ED] hover:from-[var(--color-primary-600)] hover:to-[var(--color-primary)] text-white shadow-lg'
                        : 'bg-blue-50 hover:bg-blue-100 text-[var(--color-primary)] border border-blue-200'
                    }`}
                  >
                    <span className="relative z-10">Join {plan.name} — Rs. {plan.price}</span>
                    {plan.highlight && <span className="absolute inset-0 shimmer-btn" />}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ VISUAL BANNER — Single seamless full-width bluish healthcare visual ═══ */}
        <section
          aria-label="Healthcare for Every Family"
          className="relative rounded-3xl overflow-hidden min-h-[250px] sm:min-h-[270px] flex items-center border border-blue-200/70 shadow-sm bg-[#EFF6FF]"
        >
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=500&fit=crop&q=85"
            alt="Healthcare professionals and medical support across Nepal"
            className="absolute inset-0 w-full h-full object-cover object-right"
            loading="lazy"
          />
          {/* Smooth bright bluish-white fade on left blending seamlessly into clear visual on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFF6FF]/96 via-[#EBF2FF]/85 via-50% to-transparent" />

          <div className="relative z-10 px-7 sm:px-12 py-8 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs mb-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" /></svg>
              All-In-One Care Plan
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-[var(--font-heading)] leading-snug">
              Healthcare for every family in{' '}
              <span className="text-[var(--color-primary)]">Nepal</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 mt-2.5 leading-relaxed max-w-lg">
              From daily prescriptions to home medical equipment — save 5% instantly plus free delivery and setup with one transparent membership.
            </p>
            <div className="mt-5">
              <a
                href="#plans"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)] text-white font-bold text-xs sm:text-sm rounded-full shadow-md transition-all"
              >
                Choose Your Plan
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* ═══ INTERACTIVE SAVINGS CALCULATOR ═══ */}
        <section
          ref={calcRef}
          id="calculator"
          className={`bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-sm overflow-hidden relative ${calcVisible ? 'animate-slide-up' : 'opacity-0'}`}
          aria-label="Savings Calculator"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                  Interactive Estimator
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-[var(--font-heading)] mt-1">
                  Calculate your 3-month savings
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Adjust your monthly needs to compare Plus vs. Plus Pro
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-7">
                <div className="bg-gray-50 rounded-2xl p-5">
                  <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-800 mb-3">
                    <span>Monthly medicine &amp; wellness spend</span>
                    <span className="text-[var(--color-primary)] bg-blue-50 px-2.5 py-0.5 rounded-lg">Rs. {monthlyMedSpend.toLocaleString()}</span>
                  </div>
                  <input
                    type="range" min={500} max={15000} step={250}
                    value={monthlyMedSpend}
                    onChange={(e) => setMonthlyMedSpend(Number(e.target.value))}
                    className="w-full accent-[var(--color-primary)] cursor-pointer h-2"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1.5">
                    <span>Rs. 500</span><span>Rs. 7,500</span><span>Rs. 15,000</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5">
                  <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-800 mb-3">
                    <span>Orders placed per month</span>
                    <span className="text-[var(--color-primary)] bg-blue-50 px-2.5 py-0.5 rounded-lg">{ordersPerMonth} orders/mo</span>
                  </div>
                  <input
                    type="range" min={1} max={8} step={1}
                    value={ordersPerMonth}
                    onChange={(e) => setOrdersPerMonth(Number(e.target.value))}
                    className="w-full accent-[var(--color-primary)] cursor-pointer h-2"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1.5">
                    <span>1 order</span><span>4 orders</span><span>8 orders</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs sm:text-sm font-bold text-gray-800">
                      Include medical equipment rental?
                    </span>
                    <div
                      className={`relative w-11 h-6 rounded-full transition-colors ${usesEquipmentRental ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`}
                      onClick={() => setUsesEquipmentRental(!usesEquipmentRental)}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${usesEquipmentRental ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                    </div>
                  </label>
                  {usesEquipmentRental && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
                        <span>Monthly equipment rental spend</span>
                        <span className="text-[var(--color-primary)]">Rs. {monthlyRentalSpend.toLocaleString()}</span>
                      </div>
                      <input
                        type="range" min={500} max={10000} step={250}
                        value={monthlyRentalSpend}
                        onChange={(e) => setMonthlyRentalSpend(Number(e.target.value))}
                        className="w-full accent-[var(--color-primary)] cursor-pointer h-2"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Result card — Sanjeevani Logo primary blue tone */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#1A56DB] via-[#2563EB] to-[#4B83ED] text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-white/25 pb-4">
                    <div>
                      <p className="text-xs text-blue-100 uppercase font-bold tracking-wider">
                        Estimated 3-Month Net Benefit
                      </p>
                      <p className="text-3xl sm:text-4xl font-black mt-1" style={{ animation: 'count-pulse 2s ease-in-out infinite' }}>
                        Rs. <AnimatedCounter target={Math.max(0, selectedPlanId === 'plus' ? calc.plusNet : calc.proNet)} />
                      </p>
                    </div>
                    <div className="flex bg-white/20 rounded-xl p-1 text-xs font-bold">
                      <button
                        type="button" onClick={() => setSelectedPlanId('plus')}
                        className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${selectedPlanId === 'plus' ? 'bg-white text-[var(--color-primary)]' : 'text-white'}`}
                      >Plus</button>
                      <button
                        type="button" onClick={() => setSelectedPlanId('plus-pro')}
                        className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${selectedPlanId === 'plus-pro' ? 'bg-white text-[var(--color-primary)]' : 'text-white'}`}
                      >Plus Pro</button>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm mt-5">
                    <div className="flex justify-between text-blue-50">
                      <span>5% Extra Product Discount</span>
                      <span className="font-bold text-white">+ Rs. {calc.productDiscount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-blue-50">
                      <span>Delivery Fee Savings</span>
                      <span className="font-bold text-white">
                        + Rs. {(selectedPlanId === 'plus' ? calc.plusDeliverySaved : calc.proDeliverySaved).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-blue-50">
                      <span>Installation &amp; Rental Savings</span>
                      <span className="font-bold text-white">
                        + Rs. {(selectedPlanId === 'plus' ? calc.plusInstallSaved : calc.proEquipmentSaved).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-blue-100 pt-3 border-t border-white/20">
                      <span>{activePlan.name} 3-month fee</span>
                      <span className="font-semibold">- Rs. {activePlan.price}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivatedPlan(activePlan)}
                    className="relative w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-gray-950 font-extrabold text-sm rounded-2xl transition-colors cursor-pointer mt-6 overflow-hidden shadow-md"
                  >
                    <span className="relative z-10">Get {activePlan.name} for Rs. {activePlan.price}</span>
                    <span className="absolute inset-0 shimmer-btn" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FAQs ═══ */}
        <section ref={faqRef} className={`max-w-4xl mx-auto ${faqVisible ? 'animate-fade' : 'opacity-0'}`} aria-label="Frequently Asked Questions">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)]">Support</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-[var(--font-heading)] mt-1">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <details
                key={item.q}
                className={`group bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs transition-all hover:shadow-md ${faqVisible ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <summary className="font-bold text-sm text-gray-900 cursor-pointer flex items-center justify-between list-none">
                  <span>{item.q}</span>
                  <span className="w-7 h-7 rounded-full bg-blue-50 text-[var(--color-primary)] flex items-center justify-center text-lg font-bold ml-4 group-open:rotate-45 transition-transform flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/medicines"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-600)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Browse Medicines &amp; Healthcare Essentials
            </Link>
          </div>
        </section>
      </div>

      {/* ═══ STICKY WHITE BOTTOM BAR — Hides cleanly once footer is reached ═══ */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 py-3 px-4 shadow-[0_-6px_25px_rgba(26,86,219,0.10)] transition-all duration-300 ${
          footerInView ? 'opacity-0 translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
        role="region"
        aria-label="Membership Call to Action"
        aria-hidden={footerInView}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <a
            href="#plans"
            className="relative group inline-flex flex-col items-center justify-center px-10 py-2 rounded-xl bg-gradient-to-r from-[#1A56DB] via-[#2563EB] to-[#1A56DB] hover:from-[#1548BE] hover:to-[#1A56DB] text-white shadow-[0_6px_22px_rgba(26,86,219,0.35)] hover:shadow-[0_8px_28px_rgba(26,86,219,0.5)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 text-sm sm:text-base font-extrabold tracking-tight leading-tight text-white">
              Become a Plus Member
            </span>
            <span className="relative z-10 text-[11px] font-semibold text-blue-100">
              Starting at Rs. 66/month
            </span>
            <span className="absolute inset-0 shimmer-btn" />
          </a>
        </div>
      </div>
    </div>
  );
}
