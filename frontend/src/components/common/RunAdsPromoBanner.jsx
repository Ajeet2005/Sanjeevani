/*
 * RunAdsPromoBanner.jsx — "Run Ads on Sanjeevani"
 * Features the user-uploaded campaign banner (1024x352)
 * with 3D laptop, megaphone, chart bars, and "Advertise Now ->" button.
 * Placed immediately after "What our customers have to say" (Customer Reviews).
 */
import runAdsBannerImg from '../../assets/images/banners/banner_run_ads_sanjeevani.jpg';

export default function RunAdsPromoBanner() {
  const handleClick = () => {
    alert('Sanjeevani Ad Manager & Partner Inquiries Portal will launch soon with Khalti Sandbox!');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Advertise with Sanjeevani">
      <div
        onClick={handleClick}
        className="block rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer border border-purple-100"
        title="Click to Advertise on Sanjeevani"
      >
        <img
          src={runAdsBannerImg}
          alt="Run Ads on Sanjeevani — Advertise Now"
          className="w-full h-auto object-cover rounded-3xl group-hover:scale-[1.01] transition-transform duration-500 block"
          loading="lazy"
        />
      </div>
    </section>
  );
}
