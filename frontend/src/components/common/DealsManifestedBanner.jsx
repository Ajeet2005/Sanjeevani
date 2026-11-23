/*
 * DealsManifestedBanner.jsx — "Deals You Manifested Are Here!"
 * Features the exact high-resolution graphic banner from the document (2048x705)
 * with the 3D gift box, healthcare pills, and "Buy Now ->" button.
 */
import { Link } from 'react-router-dom';
import dealsImg from '../../assets/images/banners/banner_deals_manifested_box.png';

export default function DealsManifestedBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3" aria-label="Deals You Manifested Are Here">
      <Link
        to="/medicines"
        className="block rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group border border-teal-100"
      >
        <img
          src={dealsImg}
          alt="Deals You Manifested Are Here! — Buy Now"
          className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.01] transition-transform duration-500 block"
          loading="lazy"
        />
      </Link>
    </section>
  );
}
