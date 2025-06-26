import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileTabNavigation = ({ isAuthenticated = false, cartCount = 0, wishlistCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname.includes('dashboard');
  const isAuthPage = location.pathname === '/user-authentication-login-register';

  // Don't show mobile tabs on dashboard or auth pages
  if (isDashboard || isAuthPage) return null;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const tabItems = [
    {
      key: 'home',
      label: 'Home',
      icon: 'Home',
      path: '/marketplace-homepage',
      badge: null
    },
    {
      key: 'categories',
      label: 'Categories',
      icon: 'Grid3X3',
      path: '/product-catalog-search?view=categories',
      badge: null
    },
    {
      key: 'search',
      label: 'Search',
      icon: 'Search',
      path: '/product-catalog-search',
      badge: null
    },
    {
      key: 'wishlist',
      label: 'Wishlist',
      icon: 'Heart',
      path: '/marketplace-homepage?tab=wishlist',
      badge: wishlistCount > 0 ? wishlistCount : null,
      requiresAuth: true
    },
    {
      key: 'cart',
      label: 'Cart',
      icon: 'ShoppingCart',
      path: '/marketplace-homepage?tab=cart',
      badge: cartCount > 0 ? cartCount : null,
      requiresAuth: true
    }
  ];

  const getVisibleTabs = () => {
    if (!isAuthenticated) {
      return [
        ...tabItems.filter(item => !item.requiresAuth),
        {
          key: 'account',
          label: 'Sign In',
          icon: 'User',
          path: '/user-authentication-login-register',
          badge: null
        }
      ];
    }
    return tabItems;
  };

  const visibleTabs = getVisibleTabs();

  const isActiveTab = (tabPath) => {
    if (tabPath === '/marketplace-homepage') {
      return location.pathname === '/marketplace-homepage' && !location.search;
    }
    
    if (tabPath.includes('?')) {
      const [path, query] = tabPath.split('?');
      return location.pathname === path && location.search.includes(query);
    }
    
    return location.pathname === tabPath;
  };

  return (
    <nav className="nav-mobile-tabs fixed bottom-0 left-0 right-0 z-mobile-overlay bg-surface border-t border-border shadow-lg sm:hidden">
      <div className="flex items-center justify-around h-mobile-tabs px-2">
        {visibleTabs.map((tab) => {
          const isActive = isActiveTab(tab.path);
          
          return (
            <button
              key={tab.key}
              onClick={() => handleNavigation(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-all duration-200 ${
                isActive
                  ? 'text-primary' :'text-text-secondary hover:text-primary'
              }`}
            >
              <div className="relative">
                <Icon 
                  name={tab.icon} 
                  size={20} 
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-text-secondary'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-text-secondary'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileTabNavigation;