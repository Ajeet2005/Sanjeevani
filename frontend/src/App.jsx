/*
 * App.jsx — Root component
 * Sets up route definitions and wraps everything in the CartProvider context.
 */
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import MainLayout from './components/layout/MainLayout.jsx';
import LoadingSpinner from './components/ui/LoadingSpinner.jsx';

// ─── Eager-loaded (home page — always needed) ───
import HomePage from './pages/public/HomePage.jsx';

// ─── Lazy-loaded placeholder pages (code-split for performance) ───
const LoginPage = lazy(() => import('./pages/auth/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage.jsx'));
const CartPage = lazy(() => import('./pages/customer/CartPage.jsx'));
const MedicinesPage = lazy(() => import('./pages/public/MedicinesPage.jsx'));
const NutritionSupplementsPage = lazy(() => import('./pages/public/NutritionSupplementsPage.jsx'));
const EquipmentPage = lazy(() => import('./pages/public/EquipmentPage.jsx'));
const VendorsPage = lazy(() => import('./pages/public/VendorsPage.jsx'));
const UploadPrescriptionPage = lazy(() => import('./pages/public/UploadPrescriptionPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage.jsx'));

function App() {
  return (
    <CartProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* All pages use the main layout (header + footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/medicines" element={<MedicinesPage />} />
            <Route path="/nutrition" element={<NutritionSupplementsPage />} />
            <Route path="/health-devices" element={<MedicinesPage />} />
            <Route path="/healthcare" element={<MedicinesPage />} />
            <Route path="/offers" element={<MedicinesPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/upload-prescription" element={<UploadPrescriptionPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </CartProvider>
  );
}

export default App;
