# Sanjeevani — Project Context

> This file is the single source of truth. Re-read before each epic.
> Last updated: 2026-11-22

---

## 1. What Is Sanjeevani?

A **multivendor marketplace** where verified pharmacies and medical-equipment suppliers serve patients and caregivers in Nepal.

**Two transaction types in one platform:**

| Mode | Description |
|------|-------------|
| **BUY** | Medicines, health products (OTC + Rx with mandatory upload) |
| **RENT** | Medical equipment (wheelchairs, hospital beds, oxygen concentrators) for chosen date ranges with a **100% refundable security deposit** |

**Core features:**
- Prescription upload & pharmacist verification for Rx medicines
- Admin-verified vendors across Nepal
- Nearby-vendor discovery by location
- Khalti payment gateway (Official digital payment partner)

**Roles:** Customer · Vendor · Admin

> **Sanjeevani does NOT offer:** doctor consultation, lab tests, or any medical advice. Never design UI or write copy that implies it does.

---

## 2. Design Tokens & Brand System

### Colours
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#1A56DB` | Primary brand blue, action buttons, active tabs |
| `--color-primary-50` | `#EBF2FF` | Soft section & badge backgrounds |
| `--color-primary-900` | `#081F5F` | Deep header bar background |
| `--color-khalti` | `#5C2D91` | Khalti brand purple |
| `--color-white` | `#FFFFFF` | Page backgrounds, card containers |
| `--color-gray-50` | `#F9FAFB` | Alternate section backgrounds |
| `--color-gray-100` | `#F3F4F6` | Card borders, dividers |
| `--color-gray-500` | `#6B7280` | Secondary copy |
| `--color-gray-900` | `#111827` | Primary typography |
| `--color-success` | `#059669` | In-stock, verified tags |
| `--color-warning` | `#D97706` | Rx prescription badges |
| `--color-error` | `#DC2626` | Cart badges, flash discounts |

### Typography
| Token | Font | Source | Usage |
|-------|------|--------|-------|
| `--font-heading` | **Plus Jakarta Sans** | `@fontsource/plus-jakarta-sans` | Headings (h1–h4) |
| `--font-body` | **Inter** | `@fontsource/inter` | Body text, UI actions |

---

## 3. Implemented Sections Sequence

1. **TopStrip**: Continuous live infinite marquee with DDA licensing, cold chain delivery, and Khalti cashback.
2. **Navbar**: Location picker, search bar with Medicines/Equipment toggle, account dropdown, cart count, language switcher, and **functional ARIA Accessibility Toolbar** (Keyboard focus, contrast mode, font size scaling, dyslexia readable font, link highlight).
3. **HeroBanners**: 4 realistic photographic banners sized ~570×240 (3 visible + 1 scroll peek) with smooth mouse drag and 6s auto-play.
4. **QuickActions**: Order Medicines, Rent Equipment, Upload Rx, Nearby Pharmacies.
5. **KhaltiPromoBanner**: Official Khalti partner banner with coupon copy functionality.
6. **ShopByHealthConcern**: 7 large photographic condition cards with smooth horizontal scroll.
7. **CouponStripBanner (A)**: Long intermediate voucher banner (`CARE15`).
8. **Trending Medicines Near You**: Clean PNG-style products on white background.
9. **CouponStripBanner (B)**: Long intermediate delivery perk banner (`FREEDEL`).
10. **RentEquipmentSection**: Equipment cards with blue "Select Rental Dates" button + refundable deposit.
11. **DealsOfTheDay**: Flash deals with real-time countdown clock (`Hours:Minutes:Seconds`).
12. **FeaturedBrands**: Authentic Nepali pharmaceutical brands (DJPL, Lomus, NPL, Omnica, etc.).
13. **SpotlightProducts**: "Ads In The Spotlight" carousel.
14. **WellnessEssentials**: "Wellness Essentials of the Week" curated healthcare picks.
15. **MembershipBanner**: Sanjeevani Plus membership poster.
16. **HowItWorks**: Step-by-step Buy vs. Rent flows.
17. **VerifiedVendors**: Nearby local pharmacies across Nepal.
18. **PrescriptionCtaBand**: Real doctor photo background with pharmacist verification guarantee.
19. **HealthArticles**: Health awareness guides (strictly no medical advice).
20. **CustomerReviews**: Infinite auto-gliding review cards with pause-on-hover.
21. **TrustSection**: "Say Goodbye to All Your Healthcare Worries With Sanjeevani!"
22. **Footer**: 4-column directory, static QR code, Khalti badge, legal healthcare disclaimer.
