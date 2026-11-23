# Sanjeevani — Frontend (Final Year Project)

Sanjeevani is a multivendor healthcare marketplace in Nepal connecting patients and caregivers with verified licensed pharmacies and medical equipment suppliers.

## Core Architectural Pillars
1. **Dual Transaction Engine**:
   - **BUY**: OTC & Prescription (Rx) medicines.
   - **RENT**: Medical equipment (wheelchairs, hospital beds, oxygen concentrators) for custom date ranges with a **100% refundable deposit**.
2. **Prescription Security (Rx)**:
   - Prescription-required products enforce an **"Upload Rx"** flow instead of an instant direct checkout.
3. **Local Vendor Discovery**:
   - Nearby licensed pharmacies and equipment centers filtered across Kathmandu, Lalitpur, Pokhara, etc.
4. **Accessible First**:
   - WCAG AA contrast compliance, minimum 16px body font size, visible focus outlines, and built-in ARIA Accessibility toolbar.

---

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Production Build
```bash
npm run build
```
Builds optimized bundle with code-split lazy routes to `dist/`.

---

## Directory Overview
- `src/components/layout/`: `TopStrip`, `Navbar` (with location selector, search toggle, account dropdown, cart count badge, ARIA accessibility toolbar), `CategoryBar`, and `Footer`.
- `src/components/common/`: Modular sections: `HeroBanners`, `QuickActions`, `VoucherPromo`, `ShopByHealthConcern`, `NewLaunches`, `CareBannersRow`, `RentEquipmentSection`, `DealsOfTheDay`, `FeaturedBrands`, `SpotlightProducts`, `MembershipBanner`, `HowItWorks`, `VerifiedVendors`, `PrescriptionCtaBand`, `HealthArticles`, `CustomerReviews`, and `TrustSection`.
- `src/components/ui/`: Reusable `Carousel` (touch/mouse drag + auto-advance + pause on hover) and `Skeleton` preloaders.
- `src/data/`: Clearly commented mock datasets (`medicines.js`, `equipment.js`, `deals.js`, `brands.js`, etc.) structured to map directly to future backend REST/GraphQL APIs.
- `src/context/`: `CartContext.jsx` for global cart count and item management.
