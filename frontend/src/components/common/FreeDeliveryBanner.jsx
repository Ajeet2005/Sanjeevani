/*
 * FreeDeliveryBanner.jsx — Free Doorstep Delivery Banner
 * Features the exact full graphic banner from the document (2048x705)
 * with the 3D delivery rider on scooter, "Zero Delivery Fee on Orders Above Rs. 499!",
 * "Fast. Hassle-Free. Right to Your Doorstep." and "Order Now >" button.
 */
import { Link } from 'react-router-dom';
import scooterBannerImg from '../../assets/images/banners/banner_free_delivery_scooter.png';

export default function FreeDeliveryBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3" aria-label="Free Delivery Perk">
      <Link
        to="/medicines"
        className="block rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group border border-amber-200"
      >
        <img
          src={scooterBannerImg}
          alt="Zero Delivery Fee on Orders Above Rs. 499! Fast. Hassle-Free. Right to Your Doorstep. Order Now"
          className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.01] transition-transform duration-500 block"
          loading="lazy"
        />
      </Link>
    </section>
  );
}
