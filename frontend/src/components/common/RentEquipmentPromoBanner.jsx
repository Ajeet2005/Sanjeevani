/*
 * RentEquipmentPromoBanner.jsx — "Medical Equipment on Rent"
 * Features the user-uploaded campaign graphic banner (1024x353)
 * with wheelchair, hospital bed, oxygen concentrator, and "Rent Now ->" button.
 * Placed immediately after "Featured Pharmaceutical Brands".
 */
import { Link } from 'react-router-dom';
import rentBannerImg from '../../assets/images/banners/banner_medical_equipment_rent.jpg';

export default function RentEquipmentPromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3" aria-label="Medical Equipment on Rent Promotion">
      <Link
        to="/equipment"
        className="block rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group border border-blue-100"
        title="Rent Hospital Beds, Wheelchairs & Oxygen Concentrators"
      >
        <img
          src={rentBannerImg}
          alt="Medical Equipment on Rent — Get the equipment you need, without the high cost. Rent Now"
          className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.01] transition-transform duration-500 block"
          loading="lazy"
        />
      </Link>
    </section>
  );
}
