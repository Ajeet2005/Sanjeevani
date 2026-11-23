/*
 * MembershipBanner.jsx — Sanjeevani Plus Membership Poster
 * Features the exact full graphic banner from the document (2048x725)
 * with the authentic multi-generational family, "Become a PLUS Member",
 * 5% cashback, free delivery, 2x reward points, and "Explore Now" button.
 */
import { useState } from 'react';
import membershipBannerImg from '../../assets/images/banners/banner_plus_member_family.png';

export default function MembershipBanner() {
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Sanjeevani Plus Membership">
      <div
        onClick={handleClick}
        className="relative block rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer border border-purple-200"
        title="Click to explore Sanjeevani PLUS Member perks"
      >
        <img
          src={membershipBannerImg}
          alt="Become a PLUS Member — Explore Now"
          className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.01] transition-transform duration-500 block"
          loading="lazy"
        />

        {/* Toast confirmation */}
        {showToast && (
          <div className="absolute top-4 right-4 bg-gray-900/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm animate-fade-in flex items-center gap-1.5 z-20">
            <span>✨</span>
            <span>Sanjeevani Plus membership launching with Khalti soon!</span>
          </div>
        )}
      </div>
    </section>
  );
}
