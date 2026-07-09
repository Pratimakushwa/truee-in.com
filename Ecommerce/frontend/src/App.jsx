

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// ⚡ 1. NAYA LOGIC: Server-Driven Theme Hook
import { useServerTheme } from './hooks/useServerTheme';

// ── Auth & Registration
import Login from './pages/Admin/Login';
import SetupPassword from './pages/Admin/SetPassword';
import CompanyRegistration from './pages/Admin/CompanyRegistration';
import CustomerRegister from './pages/CustomerRegister';

// ── Shared UI
import Header from './pages/Home/Header1';
import Footer from './pages/Home/Footer';

// ── Public Shop Pages
import Home from './pages/Home/Home';
import ShopHome from './pages/Shop/ShopHome';
import NewCollection from './pages/Shop/NewCollection';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BrandsSection from './components/Brands';
import Wishlist from './pages/Wishlist'; // Make sure the path is correct!
// about us
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import RefundPolicy from './pages/RefundPolicy';
import ContactUs from './pages/ContactUs';
import ShippingPolicy from './pages/ShippingPolicy';

// ── Customer Protected Pages
import OrderSuccess from './pages/orderSuccess';
import ProfilePage from './pages/Profile/ProfilePage';
// ⚡ NAYA IMPORT: Order Details Page ke liye ⚡
import OrderDetails from "./components/OrderDetails";
// ── Super-Admin Pages
import SuperAdminLayout from './layouts/SuperAdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminManagement from './pages/Admin/AdminManagement';
import CompanyProfileEdit from './pages/Admin/CompanyProfileEdit';
import Analytics from './pages/Admin/Analytics';

// ── Admin Pages
import AdminLayout from './layouts/AdminLayout';
import CouponManager from './pages/Admin/CouponManager';
import AdminReviews from './pages/Admin/AdminReviews';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminThemeManager from './pages/Admin/AdminThemeManager';
import AdminProfile from './pages/Admin/AdminProfile';
import RewardSettings from './pages/Admin/RewardSettings';
import RewardAnalytics from './pages/Admin/RewardAnalytics';
import ManagePolicies from './pages/Admin/ManagePolicies';
import NewsletterSubscribers from './pages/Admin/NewsletterSubscribers';
import ScrollToTop from './components/ScrollTop';

// Layout wrapper for pages that DO NOT have their own header/footer (like Cart, Profile)
const PublicLayout = ({ children }) => (
  <div className="min-h-screen bg-[var(--theme-bg-light)] text-[var(--theme-text-main)] transition-colors duration-500">
    <Header />
    <main className="min-h-[calc(100vh-200px)]">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  useServerTheme();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[var(--theme-bg-light)] text-[var(--theme-text-main)] transition-colors duration-700 ease-in-out">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* ── Public Routes ──────────────── */}
            <Route path="/company/register" element={<CompanyRegistration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CustomerRegister />} />
            {/* About page */}
            <Route path="/about" element={<PublicLayout><AboutUs /></PublicLayout>} />
            {/* ⚡ FUTURE FOOTER ROUTES (Inke aage se '//' hata dena jab ye pages bana lo) */}
            <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
            <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
            <Route path="/refund-policy" element={<PublicLayout><RefundPolicy /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactUs /></PublicLayout>} />
            <Route path="/ShippingPolicy" element={<PublicLayout><ShippingPolicy /></PublicLayout>} />
            {/* ── Shop & Discovery ──────────────────────────────────── */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/shop"             element={<ShopHome />} /> */}
            <Route path="/shop" element={<NewCollection />} />
            <Route path="/products" element={<ShopHome />} />

            <Route path="/brands" element={<PublicLayout><BrandsSection /></PublicLayout>} />
            <Route path="/cart" element={<PublicLayout><Cart standalone /></PublicLayout>} />
            <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
            {/* ── Customer Private Routes ───────────────────────────── */}
            {/* ⚡ FIX: Yahan 'user' aur 'admin' ko bhi allow kar diya hai */}
            <Route path="/profile" element={
              <ProtectedRoute roles={['customer', 'user', 'admin', 'super-admin']}>
                <PublicLayout><ProfilePage /></PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/wishlist" element={<PublicLayout><Wishlist /></PublicLayout>} />


            {/* ⚡ NAYA ROUTE: Single Order Details aur Track karne ke liye ⚡ */}
            <Route path="/profile/order/:id" element={
              <ProtectedRoute roles={['customer', 'user', 'admin', 'super-admin']}>
                <PublicLayout><OrderDetails /></PublicLayout>
              </ProtectedRoute>
            } />

            <Route path="/orders" element={
              <ProtectedRoute roles={['customer', 'user', 'admin', 'super-admin']}>
                <PublicLayout><div className="p-10">My Orders</div></PublicLayout>
              </ProtectedRoute>
            } />

            <Route path='/order-success' element={
              <ProtectedRoute roles={['customer', 'user', 'admin', 'super-admin']}>
                <PublicLayout><OrderSuccess /></PublicLayout>
              </ProtectedRoute>
            } />

            {/* ── Admin / Super-Admin Setup ─────────────────────────── */}
            <Route path="/update-password" element={
              <ProtectedRoute roles={['super-admin', 'admin']}>
                <SetupPassword />
              </ProtectedRoute>
            }
            />

            {/* ── Super-Admin Panel ─────────────────────────────────── */}
            <Route path="/superadmin" element={
              <ProtectedRoute roles={['super-admin']}>
                <SuperAdminLayout />
              </ProtectedRoute>
            }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="manage-admins" element={<AdminManagement />} />
              <Route path="company-profile" element={<CompanyProfileEdit />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>

            {/* ── Admin Panel ───────────────────────────────────────── */}
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="coupons" element={<CouponManager />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="theme" element={<AdminThemeManager />} />
              <Route path="rewards" element={<RewardAnalytics />} />
              <Route path="rewards/settings" element={<RewardSettings />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="legal-policies" element={<ManagePolicies />} />
              <Route path="Legal & Policies" element={<ManagePolicies />} />
              <Route path="newsletter" element={<NewsletterSubscribers />} />
            </Route>

            {/* ── Error / Fallback ──────────────────────────────────── */}
            <Route path="/unauthorized" element={
              <div className="min-h-screen flex items-center justify-center bg-[var(--theme-bg-dark)]">
                <p className="font-serif text-xl text-[var(--theme-primary)] tracking-widest uppercase">
                  Access Denied
                </p>
              </div>
            } />

          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;