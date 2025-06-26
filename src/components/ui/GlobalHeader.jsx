import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../AppIcon';
import Input from './Input';
import Button from './Button';

const GlobalHeader = ({ userRole = 'guest', isAuthenticated = false, onSearch }) => {
  const { t, i18n } = useTranslation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/user-authentication-login-register';
  const isDashboard = location.pathname.includes('dashboard');
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === 'ar';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu-container')) setIsProfileMenuOpen(false);
      if (!event.target.closest('.language-menu-container')) setIsLanguageMenuOpen(false);
      if (!event.target.closest('.mobile-menu-container')) setIsMobileMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [currentLanguage, isRTL]);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      navigate(`/product-catalog-search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogoClick = () => navigate('/marketplace-homepage');
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLanguageMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const publicNavItems = [
    { labelKey: 'navigation.home', path: '/marketplace-homepage', icon: 'Home' },
    { labelKey: 'navigation.products', path: '/product-catalog-search', icon: 'Package' },
    { labelKey: 'navigation.categories', path: '/product-catalog-search?view=categories', icon: 'Grid3X3' }
  ];

  const dashboardNavItems = {
    seller: [
      { labelKey: 'navigation.dashboard', path: '/seller-dashboard-inventory-management', icon: 'BarChart3' },
      { labelKey: 'navigation.marketplace', path: '/marketplace-homepage', icon: 'Store' }
    ],
    admin: [
      { labelKey: 'navigation.adminPanel', path: '/admin', icon: 'Settings' }, // Updated path to /admin
      { labelKey: 'navigation.marketplace', path: '/marketplace-homepage', icon: 'Store' }
    ]
  };

  const profileMenuItems = [
      { labelKey: 'profile.settings', action: () => handleNavigation('/profile-settings') },
      { labelKey: 'profile.orderHistory', action: () => handleNavigation('/order-history') },
  ];

  const renderLogo = () => (
    <div 
      className="flex items-center cursor-pointer group"
      onClick={handleLogoClick}
      aria-label={t('ariaLabels.navigateToHome')}
    >
      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg group-hover:bg-primary-700 transition-colors duration-200">
        <Icon name="Globe" size={24} color="white" />
      </div>
      <div className={`flex flex-col ${isRTL ? 'mr-3 text-right' : 'ml-3 text-left'}`}>
        <span className="text-xl font-bold text-primary font-heading">GlobalMarket</span>
        <span className="text-xs text-text-secondary font-caption -mt-1">{t('header.tagline')}</span>
      </div>
    </div>
  );

  const renderSearchBar = () => {
    if (isAuthPage) return null;
    return (
      <div className={`flex-1 max-w-2xl ${isRTL ? 'ml-4' : 'mr-4'} ${isDashboard ? 'hidden lg:block' : ''}`}>
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative">
            <Input
              type="search"
              placeholder={t('header.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-3 bg-background border-border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all duration-200 ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
            />
            <Icon 
              name="Search" 
              size={20} 
              className={`absolute top-1/2 transform -translate-y-1/2 text-text-secondary ${isRTL ? 'right-4' : 'left-4'}`}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className={`absolute top-1/2 transform -translate-y-1/2 px-4 py-1.5 ${isRTL ? 'left-2' : 'right-2'}`}
          >
            {t('header.searchButton')}
          </Button>
        </form>
      </div>
    );
  };

  const renderLanguageSelector = (isMobile = false) => (
    <div className={`relative language-menu-container ${isMobile ? 'w-full' : ''}`}>
      <Button
        variant="ghost"
        onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
        className={`flex items-center space-x-2 px-3 py-2 ${isMobile ? 'justify-between w-full' : ''}`}
        aria-expanded={isLanguageMenuOpen}
        aria-haspopup="true"
        aria-label={t('ariaLabels.selectLanguage')}
      >
        <div className="flex items-center space-x-2">
            <span className="text-lg">{languages.find(lang => lang.code === currentLanguage)?.flag}</span>
            {!isMobile && <span className="hidden sm:inline text-sm font-medium">
            {languages.find(lang => lang.code === currentLanguage)?.name}
            </span>}
        </div>
        <Icon name="ChevronDown" size={16} />
      </Button>
      {isLanguageMenuOpen && (
        <div className={`absolute mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-dropdown animate-slide-down ${isMobile ? 'left-0 right-0' : (isRTL ? 'left-0' : 'right-0')}`}>
          <ul className="py-1">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 hover:bg-surface-hover transition-colors duration-200 ${currentLanguage === lang.code ? 'font-semibold text-primary' : 'text-text-primary'}`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {currentLanguage === lang.code && <Icon name="Check" size={16} className="text-primary ml-auto" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderUserActions = () => {
    if (isAuthPage) return null;

    if (!isAuthenticated) {
      return (
        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
          <Button
            variant="ghost"
            onClick={() => handleNavigation('/user-authentication-login-register')}
            className="hidden sm:flex"
          >
            {t('auth.signIn')}
          </Button>
          <Button
            variant="primary"
            onClick={() => handleNavigation('/user-authentication-login-register')}
          >
            {t('auth.joinNow')}
          </Button>
        </div>
      );
    }

    return (
      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
        {!isDashboard && (
          <>
            <Button variant="ghost" className="relative p-2" aria-label={t('ariaLabels.wishlist')} onClick={() => handleNavigation('/wishlist')}>
              <Icon name="Heart" size={20} />
              {/* Dynamic count can be added later */}
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </Button>
            <Button variant="ghost" className="relative p-2" aria-label={t('ariaLabels.cart')} onClick={() => handleNavigation('/cart')}>
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </Button>
          </>
        )}
        
        <div className="relative profile-menu-container">
          <Button
            variant="ghost"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-2 p-2"
            aria-expanded={isProfileMenuOpen}
            aria-haspopup="true"
            aria-label={t('ariaLabels.userMenu')}
          >
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="var(--color-primary)" />
            </div>
            <Icon name="ChevronDown" size={16} className="hidden sm:block" />
          </Button>

          {isProfileMenuOpen && (
            <div className={`absolute mt-2 w-56 bg-surface border border-border rounded-lg shadow-lg z-dropdown animate-slide-down ${isRTL ? 'left-0' : 'right-0'}`}>
              <div className="py-1">
                <div className={`px-4 py-3 border-b border-border ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm font-medium text-text-primary truncate">John Doe</p> {/* Placeholder */}
                  <p className="text-xs text-text-secondary truncate">john@example.com</p> {/* Placeholder */}
                </div>
                {profileMenuItems.map(item => (
                    <button
                        key={item.labelKey}
                        onClick={item.action}
                        className={`w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                        {t(item.labelKey)}
                    </button>
                ))}
                {userRole === 'seller' && (
                  <button 
                    onClick={() => handleNavigation('/seller-dashboard-inventory-management')}
                    className={`w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {t('navigation.sellerDashboard')}
                  </button>
                )}
                {userRole === 'admin' && (
                  <button 
                    onClick={() => handleNavigation('/admin')}
                    className={`w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {t('navigation.adminPanel')}
                  </button>
                )}
                <div className="border-t border-border mt-1 pt-1">
                  <button
                    onClick={() => console.log("Sign out clicked")} // Replace with actual sign out logic
                    className={`w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {t('auth.signOut')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMobileMenuNavItems = (items) => items.map((item) => (
    <button
      key={item.path}
      onClick={() => handleNavigation(item.path)}
      className={`flex items-center space-x-3 w-full px-3 py-3 text-text-primary hover:bg-surface-hover rounded-lg transition-colors duration-200 ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : 'text-left'}`}
    >
      <Icon name={item.icon} size={20} />
      <span>{t(item.labelKey)}</span>
    </button>
  ));


  const renderMobileMenu = () => (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 mobile-menu-container"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        aria-label={t('ariaLabels.toggleMobileMenu')}
      >
        <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
      </Button>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="absolute top-full left-0 right-0 bg-surface border-t border-border shadow-lg z-mobile-overlay animate-slide-down max-h-[calc(100vh-var(--h-header))] overflow-y-auto">
          <div className="px-4 py-4">
            {!isAuthPage && (
              <div className="mb-4">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder={t('header.searchPlaceholderMobile')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full py-2 border-border focus:border-primary ${isRTL ? 'pr-10 pl-3 text-right' : 'pl-10 pr-3 text-left'}`}
                    />
                    <Icon 
                      name="Search" 
                      size={18} 
                      className={`absolute top-1/2 transform -translate-y-1/2 text-text-secondary ${isRTL ? 'right-3' : 'left-3'}`}
                    />
                  </div>
                </form>
              </div>
            )}

            <nav className="space-y-1">
              {isDashboard
                ? renderMobileMenuNavItems(dashboardNavItems[userRole] || [])
                : renderMobileMenuNavItems(publicNavItems)
              }
            </nav>

            <div className="mt-4 pt-4 border-t border-border">
              {renderLanguageSelector(true)}
            </div>

            {isAuthenticated && (
                 <div className="mt-4 pt-4 border-t border-border space-y-1">
                    {profileMenuItems.map(item => (
                        <button
                            key={item.labelKey}
                            onClick={item.action}
                            className={`flex items-center space-x-3 w-full px-3 py-3 text-text-primary hover:bg-surface-hover rounded-lg transition-colors duration-200 ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : 'text-left'}`}
                        >
                           {/* Consider adding icons to mobile profile items too */}
                           <span>{t(item.labelKey)}</span>
                        </button>
                    ))}
                    {userRole === 'seller' && (
                      <button
                        onClick={() => handleNavigation('/seller-dashboard-inventory-management')}
                        className={`flex items-center space-x-3 w-full px-3 py-3 text-text-primary hover:bg-surface-hover rounded-lg transition-colors duration-200 ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : 'text-left'}`}
                      >
                        <Icon name="BarChart3" size={20}/>
                        <span>{t('navigation.sellerDashboard')}</span>
                      </button>
                    )}
                    {userRole === 'admin' && (
                      <button
                        onClick={() => handleNavigation('/admin')}
                         className={`flex items-center space-x-3 w-full px-3 py-3 text-text-primary hover:bg-surface-hover rounded-lg transition-colors duration-200 ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : 'text-left'}`}
                      >
                        <Icon name="Settings" size={20}/>
                        <span>{t('navigation.adminPanel')}</span>
                      </button>
                    )}
                     <button
                        onClick={() => console.log("Sign out clicked")}
                        className={`flex items-center space-x-3 w-full px-3 py-3 text-error hover:bg-error-50 rounded-lg transition-colors duration-200 ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : 'text-left'}`}
                     >
                        <Icon name="LogOut" size={20}/>
                        <span>{t('auth.signOut')}</span>
                    </button>
                 </div>
            )}
            {!isAuthenticated && !isAuthPage && (
                <div className="mt-6 space-y-3">
                     <Button
                        variant="primary"
                        onClick={() => handleNavigation('/user-authentication-login-register')}
                        className="w-full"
                    >
                        {t('auth.joinNow')}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleNavigation('/user-authentication-login-register')}
                        className="w-full"
                    >
                        {t('auth.signIn')}
                    </Button>
                </div>
            )}

          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="nav-header fixed top-0 left-0 right-0 z-header bg-surface border-b border-border shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-header">
          <div className={`flex items-center ${isRTL ? 'ml-4' : 'mr-4'}`}>
            {renderLogo()}
          </div>
          
          {!isAuthPage && !isDashboard && (
            <nav className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
              {publicNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${ location.pathname === item.path ? 'text-primary bg-primary-50' : 'text-text-primary hover:text-primary hover:bg-surface-hover'} ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{t(item.labelKey)}</span>
                </button>
              ))}
            </nav>
          )}

          <div className="flex-grow flex justify-center">
            {renderSearchBar()}
          </div>

          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 sm:space-x-3' : 'space-x-2 sm:space-x-3'}`}>
            <div className="hidden lg:block">
              {renderLanguageSelector()}
            </div>
            {renderUserActions()}
            {renderMobileMenu()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;