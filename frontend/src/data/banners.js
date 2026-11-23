/**
 * MOCK DATA: banners.js
 * Highlighting hero banners for Sanjeevani
 * Features 4 high-definition photographic banners for Nepal healthcare:
 * 1. A Healthier Tomorrow Starts Today (Family)
 * 2. स्वस्थ जीवन, सुखी परिवार (Healthy living & nutrition)
 * 3. Healthcare Made Easier, Every Day (Medicines cart & delivery)
 * 4. स्वस्थ रहौं, अघि बढौं (Heart vital care & verified dispensing)
 */

import heroBanner1 from '../assets/images/banners/hero_banner_1_healthier_tomorrow.png';
import heroBanner2 from '../assets/images/banners/hero_banner_2_sukhi_pariwar.png';
import heroBanner3 from '../assets/images/banners/hero_banner_3_healthcare_easier.png';
import heroBanner4 from '../assets/images/banners/hero_banner_4_swastha_rahau.png';

export const HERO_BANNERS = [
  {
    id: 'hero-1',
    headline: 'A Healthier Tomorrow Starts Today',
    subline: 'Genuine batch-tracked medicines and healthcare supplies delivered directly across Nepal.',
    image: heroBanner1,
    link: '/medicines',
    alt: 'A Healthier Tomorrow Starts Today — Sanjeevani Healthcare',
  },
  {
    id: 'hero-2',
    headline: 'स्वस्थ जीवन, सुखी परिवार',
    subline: 'Complete wellness, balanced nutrition and essential healthcare devices for your family.',
    image: heroBanner2,
    link: '/medicines',
    alt: 'स्वस्थ जीवन, सुखी परिवार — सञ्जीवनी स्वास्थ्य सेवा',
  },
  {
    id: 'hero-3',
    headline: 'Healthcare Made Easier, Every Day',
    subline: 'Order verified OTC medications, medical devices and daily care essentials in one place.',
    image: heroBanner3,
    link: '/medicines',
    alt: 'Healthcare Made Easier, Every Day — Sanjeevani Nepal',
  },
  {
    id: 'hero-4',
    headline: 'स्वस्थ रहौं, अघि बढौं',
    subline: 'Connect with verified pharmacies, safe prescription verification, and urgent healthcare supplies.',
    image: heroBanner4,
    link: '/medicines',
    alt: 'स्वस्थ रहौं, अघि बढौं — सञ्जीवनी नेपाल',
  },
];

export const KHALTI_PROMO = {
  title: 'Pay with Khalti Digital Wallet',
  subtitle: 'Enjoy 10% Instant Cashback on Medicines & Zero Fee on Rental Deposits',
  badge: 'Official Digital Payment Partner',
  code: 'KHALTICARE',
  ctaText: 'Pay via Khalti',
  image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&auto=format&fit=crop&q=80',
};

export const CATEGORY_HEALTH_BANNERS = [
  {
    id: 'cat-banner-1',
    categoryKey: 'skin',
    tag: 'DERMA & NUTRITION',
    badge: '★ TRIPLE ACTION FORMULA',
    headline: 'Triple Action Care for Skin, Hair & Nails',
    subline: 'Dermatologist-recommended nutrition, biotin essentials, and genuine derma solutions for lasting vitality.',
    ctaText: 'Shop Skin & Hair Care',
    ctaLink: '/medicines?category=derma',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&auto=format&fit=crop&q=80',
    overlay: 'from-[#3B124D]/95 via-[#581C87]/80 to-transparent',
    buttonColor: 'bg-amber-400 text-gray-950 hover:bg-amber-300',
    badgeBg: 'bg-purple-400/30 text-purple-200 border-purple-300/40',
  },
  {
    id: 'cat-banner-2',
    categoryKey: 'stomach',
    tag: 'GASTRO & GUT HEALTH',
    badge: 'FAST & GENTLE ACTION',
    headline: 'Gentle Relief for Acidity, Indigestion & Gut Care',
    subline: 'Doctor-trusted digestive syrups, antacids, probiotics, and gentle chronic stomach comfort supplies.',
    ctaText: 'Shop Stomach Care',
    ctaLink: '/medicines?category=digestive',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80',
    overlay: 'from-[#064E3B]/95 via-[#047857]/80 to-transparent',
    buttonColor: 'bg-white text-emerald-950 hover:bg-emerald-50',
    badgeBg: 'bg-emerald-400/30 text-emerald-200 border-emerald-300/40',
  },
  {
    id: 'cat-banner-3',
    categoryKey: 'heart',
    tag: 'HEART & VITAL SIGNS',
    badge: 'DAILY CARDIAC CARE',
    headline: 'Cardiovascular Wellness & Daily Vital Monitoring',
    subline: 'Accurate digital BP monitors, pulse oximeters, and daily cardiovascular care from licensed pharmacies.',
    ctaText: 'Shop Cardiac Health',
    ctaLink: '/medicines?category=cardiac',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    overlay: 'from-[#881337]/95 via-[#9F1239]/80 to-transparent',
    buttonColor: 'bg-amber-400 text-gray-950 hover:bg-amber-300',
    badgeBg: 'bg-rose-400/30 text-rose-200 border-rose-300/40',
  },
  {
    id: 'cat-banner-4',
    categoryKey: 'firstaid',
    tag: 'FIRST AID & EMERGENCY',
    badge: '100% STERILE KITS',
    headline: 'Home, Travel & Clinic First Aid Essentials',
    subline: 'Antiseptics, sterile gauze dressings, crepe bandages, and multi-piece emergency response supplies.',
    ctaText: 'Shop First Aid Kits',
    ctaLink: '/medicines?category=firstaid',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=1200&auto=format&fit=crop&q=80',
    overlay: 'from-[#1E3A8A]/95 via-[#1D4ED8]/80 to-transparent',
    buttonColor: 'bg-white text-blue-950 hover:bg-blue-50',
    badgeBg: 'bg-blue-400/30 text-blue-200 border-blue-300/40',
  },
];
