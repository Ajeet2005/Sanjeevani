/*
 * MainLayout.jsx — Page layout wrapper
 * Renders the top strip, navbar, category bar, page content, and footer.
 * Uses <Outlet> from React Router so all child routes share this layout.
 */
import { Outlet, useLocation } from 'react-router-dom';
import TopStrip from './TopStrip.jsx';
import Navbar from './Navbar.jsx';
import CategoryBar from './CategoryBar.jsx';
import JournalNavbar from './JournalNavbar.jsx';
import Footer from './Footer.jsx';

function MainLayout() {
  const location = useLocation();
  const isJournalRoute = location.pathname.startsWith('/blog');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to main content — accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {isJournalRoute ? (
        /* Dedicated journal header (clean publication style, no store/medicine navigation) */
        <JournalNavbar />
      ) : (
        /* Regular marketplace navigation */
        <>
          <TopStrip />
          <Navbar />
          <CategoryBar />
        </>
      )}

      {/* Main page content */}
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
