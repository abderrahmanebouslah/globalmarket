import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MobileTabNavigation from '../../components/ui/MobileTabNavigation';
import HeroBanner from './components/HeroBanner';
import FeaturedCategories from './components/FeaturedCategories';
import TrendingProducts from './components/TrendingProducts';
import SellerSpotlight from './components/SellerSpotlight';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MarketplaceHomepage = () => {
  const [language, setLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('guest');
  const [cartCount, setCartCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const isRTL = language === 'ar';

  // Mock authentication check
  useEffect(() => {
    const checkAuth = () => {
      // Mock authentication logic
      const mockAuth = localStorage.getItem('mockAuth');
      if (mockAuth) {
        const authData = JSON.parse(mockAuth);
        setIsAuthenticated(true);
        setUserRole(authData.role || 'buyer');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // Mock language persistence
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  // Handle search from global header
  const handleSearch = (query) => {
    navigate(`/product-catalog-search?q=${encodeURIComponent(query)}`);
  };

  // Handle pull-to-refresh on mobile
  const handleRefresh = async () => {
    setRefreshing(true);
    // Mock refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Handle tab navigation from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    
    if (tab === 'wishlist' && !isAuthenticated) {
      navigate('/user-authentication-login-register');
    } else if (tab === 'cart' && !isAuthenticated) {
      navigate('/user-authentication-login-register');
    }
  }, [location.search, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader 
          userRole={userRole}
          isAuthenticated={isAuthenticated}
          language={language}
          onLanguageChange={handleLanguageChange}
          onSearch={handleSearch}
        />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">
              {language === 'ar' ? 'جاري التحميل...' : language === 'fr' ? 'Chargement...' : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Global Header */}
      <GlobalHeader 
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        language={language}
        onLanguageChange={handleLanguageChange}
        onSearch={handleSearch}
      />

      {/* Breadcrumb Trail */}
      <div className="pt-16">
        <BreadcrumbTrail 
          language={language}
          showHome={false}
        />
      </div>

      {/* Main Content */}
      <main className="pb-20 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pull to Refresh Indicator */}
          {refreshing && (
            <div className="fixed top-16 left-0 right-0 bg-primary text-white text-center py-2 z-50 animate-slide-down">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="text-sm">
                  {language === 'ar' ? 'جاري التحديث...' : language === 'fr' ? 'Actualisation...' : 'Refreshing...'}
                </span>
              </div>
            </div>
          )}

          {/* Hero Banner Section */}
          <section className="py-6">
            <HeroBanner language={language} />
          </section>

          {/* Quick Actions Section */}
          <section className="py-6">
            <QuickActions 
              language={language}
              userRole={userRole}
              isAuthenticated={isAuthenticated}
            />
          </section>

          {/* Featured Categories Section */}
          <section className="py-8">
            <FeaturedCategories language={language} />
          </section>

          {/* Trending Products Section */}
          <section className="py-8">
            <TrendingProducts language={language} />
          </section>

          {/* Seller Spotlight Section */}
          <section className="py-8">
            <SellerSpotlight language={language} />
          </section>

          {/* Newsletter Signup Section */}
          <section className="py-8">
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
              <Icon name="Mail" size={32} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary font-heading mb-2">
                {language === 'ar' ? 'اشترك في النشرة الإخبارية' : language === 'fr' ? 'Abonnez-vous à la newsletter' : 'Subscribe to Newsletter'}
              </h3>
              <p className="text-text-secondary mb-4 max-w-md mx-auto">
                {language === 'ar' ? 'احصل على آخر العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني' : language === 'fr' ? 'Recevez les dernières offres et nouveaux produits directement dans votre boîte e-mail' : 'Get the latest deals and new products delivered straight to your inbox'}
              </p>
              <div className={`flex items-center max-w-md mx-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  type="email"
                  placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : language === 'fr' ? 'Entrez votre e-mail' : 'Enter your email'}
                  className={`flex-1 px-4 py-2 border border-border rounded-lg ${isRTL ? 'rounded-r-none border-r-0' : 'rounded-r-none border-r-0'} focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary`}
                />
                <Button
                  variant="primary"
                  className={`${isRTL ? 'rounded-l-lg' : 'rounded-l-lg'} px-6`}
                >
                  {language === 'ar' ? 'اشتراك' : language === 'fr' ? 'S\'abonner' : 'Subscribe'}
                </Button>
              </div>
            </div>
          </section>

          {/* App Features Section */}
          <section className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`text-center ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={24} className="text-green-600" />
                </div>
                <h4 className="font-semibold text-text-primary font-heading mb-2">
                  {language === 'ar' ? 'تسوق آمن' : language === 'fr' ? 'Achat sécurisé' : 'Secure Shopping'}
                </h4>
                <p className="text-sm text-text-secondary">
                  {language === 'ar' ? 'حماية كاملة لمعلوماتك الشخصية والمالية' : language === 'fr' ? 'Protection complète de vos informations personnelles et financières' : 'Complete protection for your personal and financial information'}
                </p>
              </div>
              
              <div className={`text-center ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={24} className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-text-primary font-heading mb-2">
                  {language === 'ar' ? 'شحن سريع' : language === 'fr' ? 'Livraison rapide' : 'Fast Delivery'}
                </h4>
                <p className="text-sm text-text-secondary">
                  {language === 'ar' ? 'توصيل سريع وموثوق إلى جميع أنحاء العالم' : language === 'fr' ? 'Livraison rapide et fiable dans le monde entier' : 'Fast and reliable delivery worldwide'}
                </p>
              </div>
              
              <div className={`text-center ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Headphones" size={24} className="text-purple-600" />
                </div>
                <h4 className="font-semibold text-text-primary font-heading mb-2">
                  {language === 'ar' ? 'دعم 24/7' : language === 'fr' ? 'Support 24/7' : '24/7 Support'}
                </h4>
                <p className="text-sm text-text-secondary">
                  {language === 'ar' ? 'فريق دعم متاح على مدار الساعة لمساعدتك' : language === 'fr' ? 'Équipe de support disponible 24h/24 pour vous aider' : 'Support team available around the clock to help you'}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Tab Navigation */}
      <MobileTabNavigation 
        isAuthenticated={isAuthenticated}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-20 right-4 sm:hidden z-50">
        <Button
          variant="primary"
          onClick={() => navigate('/product-catalog-search')}
          className="w-14 h-14 rounded-full shadow-lg"
        >
          <Icon name="Search" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceHomepage;