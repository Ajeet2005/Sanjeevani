/*
 * HomePage.jsx — Sanjeevani Landing Page
 *
 * Fully refined according to user design feedback:
 * 1.  Hero Banners Carousel (2.5s auto-play, realistic photography)
 * 2.  Quick Actions (Buy, Rent, Rx Upload, Nearby Pharmacies)
 * 3.  Khalti Payment Partner Banner (Exact girl image + "Get 10% Cashback" + original Khalti logo)
 * 4.  Shop by Health Concern (7 large condition cards, scrollable)
 * 5.  Deals You Manifested Are Here! (Clean campaign banner without coupon noise)
 * 6.  Trending Medicines Near You (Isolated white background PNG-style products)
 * 7.  Free Delivery Banner (Scooter delivery artwork, warm yellow/red tone, matching Khalti scale)
 * 8.  Rent Medical Equipment (Brand Blue "Select Rental Dates" button + refundable deposit)
 * 9.  Deals of the Day (With live clock timer)
 * 10. Featured Pharmaceutical Brands (Nepali DJPL, Lomus, NPL, Omnica)
 * 11. Ads in the Spotlight (Full cream-yellow section with hanging ceiling lamp & conical beam)
 * 12. Wellness Essentials of the Week
 * 13. Sanjeevani Plus Membership Poster (Authentic Asian family photo, purple & gold theme)
 * 14. How It Works (Step-by-step Buy vs. Rent flows)
 * 15. Verified Vendors Discovery
 * 16. Have a Doctor’s Prescription? (Full edge-to-edge monochromatic doctor backdrop)
 * 17. Health Educational Guides (No medical advice)
 * 18. Customer Reviews (Continuously gliding marquee, pauses on hover, draggable with mouse)
 * 19. Trust Section ("Say Goodbye to All Your Healthcare Worries With Sanjeevani!")
 */

import HeroBanners from '../../components/common/HeroBanners.jsx';
import QuickActions from '../../components/common/QuickActions.jsx';
import KhaltiPromoBanner from '../../components/common/KhaltiPromoBanner.jsx';
import ShopByHealthConcern from '../../components/common/ShopByHealthConcern.jsx';
import DealsManifestedBanner from '../../components/common/DealsManifestedBanner.jsx';
import NewLaunches from '../../components/common/NewLaunches.jsx';
import FreeDeliveryBanner from '../../components/common/FreeDeliveryBanner.jsx';
import RentEquipmentSection from '../../components/common/RentEquipmentSection.jsx';
import DealsOfTheDay from '../../components/common/DealsOfTheDay.jsx';
import FeaturedBrands from '../../components/common/FeaturedBrands.jsx';
import RentEquipmentPromoBanner from '../../components/common/RentEquipmentPromoBanner.jsx';
import SpotlightProducts from '../../components/common/SpotlightProducts.jsx';
import CategoryHealthBanners from '../../components/common/CategoryHealthBanners.jsx';
import WellnessEssentials from '../../components/common/WellnessEssentials.jsx';
import MembershipBanner from '../../components/common/MembershipBanner.jsx';
import HowItWorks from '../../components/common/HowItWorks.jsx';
import VerifiedVendors from '../../components/common/VerifiedVendors.jsx';
import PrescriptionCtaBand from '../../components/common/PrescriptionCtaBand.jsx';
import HealthArticles from '../../components/common/HealthArticles.jsx';
import CustomerReviews from '../../components/common/CustomerReviews.jsx';
import RunAdsPromoBanner from '../../components/common/RunAdsPromoBanner.jsx';
import TrustSection from '../../components/common/TrustSection.jsx';

export default function HomePage() {
  return (
    <div className="space-y-4 sm:space-y-8 pb-14">
      {/* 1. Hero Banners Carousel (2.5s auto-advance) */}
      <HeroBanners />

      {/* 2. Core Service Quick Actions */}
      <QuickActions />

      {/* 3. Official Khalti Payment Partner Promotion (Exact girl image + 10% Cashback) */}
      <KhaltiPromoBanner />

      {/* 4. Shop by Health Concern (7 large scrollable photographic cards) */}
      <ShopByHealthConcern />

      {/* 5. Deals You Manifested Are Here! Banner */}
      <DealsManifestedBanner />

      {/* 6. Trending Medicines Near You (PNG on white bg) */}
      <NewLaunches title="Trending Medicines Near You" />

      {/* 7. Free Doorstep Delivery Banner (Scooter delivery artwork, warm yellow/red palette) */}
      <FreeDeliveryBanner />

      {/* 8. Rent Medical Equipment Section (Brand Blue buttons) */}
      <RentEquipmentSection />

      {/* 9. Limited Time Flash Deals of the Day (Live Clock Timer) */}
      <DealsOfTheDay />

      {/* 10. Top Pharmaceutical Brands (Nepali DJPL, Lomus, NPL, etc.) */}
      <FeaturedBrands />

      {/* 11. Medical Equipment on Rent Campaign Banner */}
      <RentEquipmentPromoBanner />

      {/* 12. Ads in the Spotlight (Full cream-yellow section with hanging ceiling lamp & conical light) */}
      <SpotlightProducts />

      {/* 12. Health Category Spotlight Banners (Skin, Stomach, Heart, First Aid) */}
      <CategoryHealthBanners />

      {/* 13. Wellness Essentials of the Week */}
      <WellnessEssentials />

      {/* 13. Sanjeevani Plus Membership Poster (Authentic Asian family photo, purple & gold theme) */}
      <MembershipBanner />

      {/* 14. How It Works (Buy vs. Rent flows) */}
      <HowItWorks />

      {/* 15. Verified Vendors Discovery */}
      <VerifiedVendors />

      {/* 16. Prescription Upload Band (Full edge-to-edge monochromatic doctor backdrop) */}
      <PrescriptionCtaBand />

      {/* 17. Health Educational Guides */}
      <HealthArticles />

      {/* 19. Customer Reviews (Continuously gliding marquee, pauses on hover, draggable with mouse) */}
      <CustomerReviews />

      {/* 20. Run Ads on Sanjeevani Campaign Banner */}
      <RunAdsPromoBanner />

      {/* 21. Guarantees & Trust Section */}
      <TrustSection />
    </div>
  );
}
