import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';
import Button from './Button';

const GlobalHeader = ({ userRole = 'guest', isAuthenticated = false, language = 'en', onLanguageChange, onSearch }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/user-authentication-login-register';
  const isDashboard = location.pathname.includes('dashboard');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false);
      }
      if (!event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      navigate(`/product-catalog-search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogoClick = () => {
    navigate('/marketplace-homepage');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const publicNavItems = [
    { label: 'Home', path: '/marketplace-homepage', icon: 'Home' },
    { label: 'Products', path: '/product-catalog-search', icon: 'Package' },
    { label: 'Categories', path: '/product-catalog-search?view=categories', icon: 'Grid3X3' }
  ];

  const dashboardNavItems = {
    seller: [
      { label: 'Dashboard', path: '/seller-dashboard-inventory-management', icon: 'BarChart3' },
      { label: 'Marketplace', path: '/marketplace-homepage', icon: 'Store' }
    ],
    admin: [
      { label: 'Admin Panel', path: '/admin-dashboard-management', icon: 'Settings' },
      { label: 'Marketplace', path: '/marketplace-homepage', icon: 'Store' }
    ]
  };

  const renderLogo = () => (
    <div 
      className="flex items-center cursor-pointer group"
      onClick={handleLogoClick}
    >
      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg mr-3 group-hover:bg-primary-700 transition-colors duration-200">
        <Icon name="Globe" size={24} color="white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-primary font-heading">GlobalMarket</span>
        <span className="text-xs text-text-secondary font-caption -mt-1">Worldwide Commerce</span>
      </div>
    </div>
  );

  const renderSearchBar = () => {
    if (isAuthPage) return null;

    return (
      <div className={`flex-1 max-w-2xl mx-4 ${isDashboard ? 'hidden lg:block' : ''}`}>
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border-border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all duration-200"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5"
          >
            Search
          </Button>
        </form>
      </div>
    );
  };

  const renderLanguageSelector = () => (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="flex items-center space-x-2 px-3 py-2"
      >
        <span className="text-lg">{languages.find(lang => lang.code === language)?.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {languages.find(lang => lang.code === language)?.name}
        </span>
        <Icon name="ChevronDown" size={16} />
      </Button>
    </div>
  );

  const renderUserActions = () => {
    if (isAuthPage) return null;

    if (!isAuthenticated) {
      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => handleNavigation('/user-authentication-login-register')}
            className="hidden sm:flex"
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            onClick={() => handleNavigation('/user-authentication-login-register')}
          >
            Join Now
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        {!isDashboard && (
          <>
            <Button variant="ghost" className="relative p-2">
              <Icon name="Heart" size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" className="relative p-2">
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Button>
          </>
        )}
        
        <div className="relative profile-menu-container">
          <Button
            variant="ghost"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-2 p-2"
          >
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="var(--color-primary)" />
            </div>
            <Icon name="ChevronDown" size={16} className="hidden sm:block" />
          </Button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-dropdown animate-slide-down">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-text-primary">John Doe</p>
                  <p className="text-xs text-text-secondary">john@example.com</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-200">
                  Profile Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-200">
                  Order History
                </button>
                {userRole === 'seller' && (
                  <button 
                    onClick={() => handleNavigation('/seller-dashboard-inventory-management')}
                    className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-200"
                  >
                    Seller Dashboard
                  </button>
                )}
                {userRole === 'admin' && (
                  <button 
                    onClick={() => handleNavigation('/admin-dashboard-management')}
                    className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors duration-200"
                  >
                    Admin Panel
                  </button>
                )}
                <div className="border-t border-border mt-2 pt-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-200">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMobileMenu = () => (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 mobile-menu-container"
      >
        <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
      </Button>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface border-t border-border shadow-lg z-mobile-overlay animate-slide-down">
          <div className="px-4 py-4">
            {!isAuthPage && (
              <div className="mb-4">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2"
                    />
                    <Icon 
                      name="Search" 
                      size={18} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                    />
                  </div>
                </form>
              </div>
            )}

            <nav className="space-y-2">
              {isDashboard ? (
                dashboardNavItems[userRole]?.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-left text-text-primary hover:bg-surface-hover rounded-lg transition-colors duration-200"
                  >
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </button>
                ))
              ) : (
                publicNavItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-left text-text-primary hover:bg-surface-hover rounded-lg transition-colors duration-200"
                  >
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </button>
                ))
              )}
            </nav>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Language</span>
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => onLanguageChange?.(lang.code)}
                      className={`px-2 py-1 text-xs rounded ${
                        language === lang.code 
                          ? 'bg-primary text-white' :'bg-surface-hover text-text-secondary'
                      }`}
                    >
                      {lang.flag} {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="nav-header fixed top-0 left-0 right-0 z-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-header">
          {renderLogo()}
          
          {!isAuthPage && !isDashboard && (
            <nav className="hidden lg:flex items-center space-x-8">
              {publicNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary-50' :'text-text-primary hover:text-primary hover:bg-surface-hover'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          {renderSearchBar()}

          <div className="flex items-center space-x-4">
            {renderLanguageSelector()}
            {renderUserActions()}
            {renderMobileMenu()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;