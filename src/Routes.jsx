import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import MarketplaceHomepage from "pages/marketplace-homepage";
import UserAuthenticationLoginRegister from "pages/user-authentication-login-register";
import SellerDashboardInventoryManagement from "pages/seller-dashboard-inventory-management";
import ProductCatalogSearch from "pages/product-catalog-search";
import ProductDetails from "pages/product-details";
import AdminDashboard from "pages/admin-dashboard"; // Import AdminDashboard
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MarketplaceHomepage />} />
        <Route path="/marketplace-homepage" element={<MarketplaceHomepage />} />
        <Route path="/user-authentication-login-register" element={<UserAuthenticationLoginRegister />} />
        <Route path="/seller-dashboard-inventory-management" element={<SellerDashboardInventoryManagement />} />
        <Route path="/product-catalog-search" element={<ProductCatalogSearch />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* Add Admin Route */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;