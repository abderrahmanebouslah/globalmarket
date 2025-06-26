import React from 'react';
import { useTranslation } from 'react-i18next';
import GlobalHeader from '../../components/ui/GlobalHeader'; // Assuming GlobalHeader is used

// Placeholder components for sections
const ViewProducts = () => {
  const { t } = useTranslation();
  return <div className="p-4 border rounded-lg shadow-sm bg-surface">
    <h2 className="text-xl font-semibold mb-2 text-text-primary">{t('adminDashboard.viewProducts.title')}</h2>
    <p className="text-text-secondary">{t('adminDashboard.viewProducts.description')}</p>
    {/* TODO: Implement product listing table */}
  </div>;
};

const ProductManagement = () => {
  const { t } = useTranslation();
  return <div className="p-4 border rounded-lg shadow-sm bg-surface">
    <h2 className="text-xl font-semibold mb-2 text-text-primary">{t('adminDashboard.productManagement.title')}</h2>
    <p className="text-text-secondary">{t('adminDashboard.productManagement.description')}</p>
    {/* TODO: Implement Add/Edit/Delete forms */}
  </div>;
};

const RevenueAnalytics = () => {
  const { t } = useTranslation();
  return <div className="p-4 border rounded-lg shadow-sm bg-surface">
    <h2 className="text-xl font-semibold mb-2 text-text-primary">{t('adminDashboard.revenueAnalytics.title')}</h2>
    <p className="text-text-secondary">{t('adminDashboard.revenueAnalytics.description')}</p>
    {/* TODO: Implement revenue/cost/profit display */}
  </div>;
};

const SellerAssignment = () => {
  const { t } = useTranslation();
  return <div className="p-4 border rounded-lg shadow-sm bg-surface">
    <h2 className="text-xl font-semibold mb-2 text-text-primary">{t('adminDashboard.sellerAssignment.title')}</h2>
    <p className="text-text-secondary">{t('adminDashboard.sellerAssignment.description')}</p>
    {/* TODO: Implement seller assignment UI */}
  </div>;
};

const TopSellingProducts = () => {
  const { t } = useTranslation();
  return <div className="p-4 border rounded-lg shadow-sm bg-surface">
    <h2 className="text-xl font-semibold mb-2 text-text-primary">{t('adminDashboard.topSelling.title')}</h2>
    <p className="text-text-secondary">{t('adminDashboard.topSelling.description')}</p>
    {/* TODO: Implement chart or table */}
  </div>;
};


const AdminDashboard = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // For now, assuming admin is authenticated. Auth logic will be handled later.
  const isAdminAuthenticated = true;
  // const userRole = 'admin'; // This would typically come from auth context

  if (!isAdminAuthenticated) {
    // Redirect to login or show an unauthorized message
    // For now, just a simple message. In a real app, use Navigate from react-router-dom
    return (
      <div className="flex flex-col min-h-screen">
        <GlobalHeader isAuthenticated={false} userRole="guest" />
        <main className="flex-grow container mx-auto px-4 py-8 pt-24 text-center">
          <h1 className="text-2xl font-bold text-error">{t('adminDashboard.auth.unauthorized')}</h1>
          <p className="text-text-secondary">{t('adminDashboard.auth.signInToAccess')}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-alt" dir={isRTL ? 'rtl' : 'ltr'}>
      <GlobalHeader isAuthenticated={isAdminAuthenticated} userRole="admin" />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24"> {/* pt-24 to offset fixed header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-text-primary font-heading">{t('adminDashboard.title')}</h1>
          <p className="text-lg text-text-secondary">{t('adminDashboard.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Sections */}
          <div className="lg:col-span-2"><ViewProducts /></div>
          <ProductManagement />
          <div className="lg:col-span-2"><RevenueAnalytics /></div>
          <SellerAssignment />
          <div className="lg:col-span-3"><TopSellingProducts /></div>
        </div>
      </main>
       {/* Basic Footer Example */}
       <footer className="py-6 bg-surface border-t border-border text-center">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} {t('adminDashboard.footer.copyrightText')}
          </p>
        </footer>
    </div>
  );
};

export default AdminDashboard;
