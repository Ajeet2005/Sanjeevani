/*
 * MembershipBanner.jsx — Sanjeevani Plus Membership Poster
 * Features the exact full graphic banner from the document (2048x725)
 * with the authentic multi-generational family, "Become a PLUS Member",
 * 5% cashback, free delivery, 2x reward points, and "Explore Now" button.
 */
import { Link } from 'react-router-dom';
import membershipBannerImg from '../../assets/images/banners/banner_plus_member_family.png';

export default function MembershipBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Sanjeevani Plus Membership">
      <Link
        to="/plus"
        className="relative block rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer border border-blue-200"
        title="Explore Sanjeevani Plus & Plus Pro Membership Plans"
      >
        <img
          src={membershipBannerImg}
          alt="Become a PLUS Member — Explore Now"
          className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.01] transition-transform duration-500 block"
          loading="lazy"
        />
      </Link>
    </section>
  );
}
