/*
 * Footer.jsx — Site footer
 * 4-column layout with links, contact info, Khalti badge, disclaimer.
 */
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[var(--color-gray-900)] text-[var(--color-gray-300)]" role="contentinfo">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-lg font-bold text-white font-[var(--font-heading)]">Sanjeevani</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted online marketplace for medicines and medical equipment rental.
              Connecting you with verified pharmacies across Nepal.
            </p>
            {/* QR Code placeholder — static for now */}
            <div className="mt-4 p-3 bg-white rounded-lg inline-block">
              <div className="w-20 h-20 bg-[var(--color-gray-200)] rounded flex items-center justify-center">
                <span className="text-[9px] text-[var(--color-gray-500)] text-center leading-tight">
                  QR Code<br/>Coming Soon
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[var(--color-gray-500)] mt-2">Scan to visit Sanjeevani</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Medicines', href: '/medicines' },
                { label: 'Equipment Rental', href: '/equipment' },
                { label: 'Upload Prescription', href: '/upload-prescription' },
                { label: 'Find Vendors', href: '/vendors' },
                { label: 'Offers & Deals', href: '/medicines' },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-2.5">
              {[
                'About Us',
                'Contact Us',
                'FAQs',
                'Shipping Policy',
                'Return & Refund Policy',
                'Privacy Policy',
                'Terms & Conditions',
              ].map((label) => (
                <li key={label}>
                  <button className="text-sm hover:text-white hover:pl-1 transition-all duration-200 text-left">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-primary-300)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-sm">Kathmandu, Nepal</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-primary-300)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-sm">support@sanjeevani.com.np</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-primary-300)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-sm">01-XXXXXXX</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-primary-300)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm">8:00 AM – 10:00 PM, 7 days</span>
              </li>
            </ul>

            {/* Social media icons */}
            <div className="flex items-center gap-3 mt-6">
              {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                <button
                  key={social}
                  className="w-9 h-9 rounded-full bg-[var(--color-gray-800)] hover:bg-[var(--color-primary)] transition-colors duration-200 flex items-center justify-center"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="text-xs font-bold text-white">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-gray-800)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-[var(--color-gray-500)]">
              © {new Date().getFullYear()} Sanjeevani. All rights reserved.
            </p>

            {/* Payment badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-gray-500)]">Secure payment via</span>
              <div className="bg-[#5C2D91] text-white text-xs font-bold px-3 py-1 rounded">
                Khalti
              </div>
            </div>
          </div>

          {/* Platform disclaimer */}
          <p className="text-[11px] text-[var(--color-gray-600)] mt-4 text-center leading-relaxed max-w-3xl mx-auto">
            Sanjeevani is a marketplace platform that connects customers to licensed, verified vendors.
            We do not provide medical advice, diagnosis, or treatment. All medicines are dispensed by
            licensed pharmacies. Always consult your healthcare provider before starting any medication.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
