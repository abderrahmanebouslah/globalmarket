import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ customBreadcrumbs = null, showHome = true, language = 'en' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isRTL = language === 'ar';
  const isDashboard = location.pathname.includes('dashboard');
  const isAuthPage = location.pathname === '/user-authentication-login-register';

  // Don't show breadcrumbs on auth pages or dashboard (they have their own navigation)
  if (isAuthPage || isDashboard) return null;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const searchParams = new URLSearchParams(location.search);
    
    let breadcrumbs = [];

    // Always include home if showHome is true
    if (showHome) {
      breadcrumbs.push({
        label: 'Home',
        path: '/marketplace-homepage',
        icon: 'Home'
      });
    }

    // Generate breadcrumbs based on current path
    switch (location.pathname) {
      case '/marketplace-homepage':
        // Home page - no additional breadcrumbs needed
        break;

      case '/product-catalog-search':
        const query = searchParams.get('q');
        const category = searchParams.get('category');
        const view = searchParams.get('view');

        if (view === 'categories') {
          breadcrumbs.push({
            label: 'Categories',
            path: '/product-catalog-search?view=categories',
            icon: 'Grid3X3'
          });
        } else if (category) {
          breadcrumbs.push({
            label: 'Categories',
            path: '/product-catalog-search?view=categories',
            icon: 'Grid3X3'
          });
          breadcrumbs.push({
            label: decodeURIComponent(category),
            path: `/product-catalog-search?category=${category}`,
            icon: 'Tag'
          });
        } else if (query) {
          breadcrumbs.push({
            label: 'Search Results',
            path: '/product-catalog-search',
            icon: 'Search'
          });
          breadcrumbs.push({
            label: `"${decodeURIComponent(query)}"`,
            path: `/product-catalog-search?q=${query}`,
            icon: null,
            isCurrentPage: true
          });
        } else {
          breadcrumbs.push({
            label: 'All Products',
            path: '/product-catalog-search',
            icon: 'Package'
          });
        }
        break;

      case '/product-details':
        const productId = searchParams.get('id');
        const productName = searchParams.get('name');
        const productCategory = searchParams.get('category');

        breadcrumbs.push({
          label: 'Products',
          path: '/product-catalog-search',
          icon: 'Package'
        });

        if (productCategory) {
          breadcrumbs.push({
            label: decodeURIComponent(productCategory),
            path: `/product-catalog-search?category=${productCategory}`,
            icon: 'Tag'
          });
        }

        if (productName) {
          breadcrumbs.push({
            label: decodeURIComponent(productName),
            path: `/product-details?id=${productId}`,
            icon: null,
            isCurrentPage: true
          });
        } else {
          breadcrumbs.push({
            label: 'Product Details',
            path: '/product-details',
            icon: null,
            isCurrentPage: true
          });
        }
        break;

      default:
        // Fallback for unknown routes
        pathSegments.forEach((segment, index) => {
          const path = '/' + pathSegments.slice(0, index + 1).join('/');
          const label = segment.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
          
          breadcrumbs.push({
            label,
            path,
            icon: index === pathSegments.length - 1 ? null : 'ChevronRight',
            isCurrentPage: index === pathSegments.length - 1
          });
        });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render if only home breadcrumb exists
  if (breadcrumbs.length <= 1 && location.pathname === '/marketplace-homepage') {
    return null;
  }

  const renderSeparator = () => (
    <Icon 
      name={isRTL ? "ChevronLeft" : "ChevronRight"} 
      size={16} 
      className="text-text-muted mx-2 flex-shrink-0"
    />
  );

  return (
    <nav 
      className="flex items-center space-x-1 py-3 px-4 sm:px-6 lg:px-8 bg-background border-b border-border-light overflow-x-auto"
      aria-label="Breadcrumb"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <ol className="flex items-center space-x-1 min-w-0">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center min-w-0">
            {index > 0 && renderSeparator()}
            
            <div className="flex items-center min-w-0">
              {crumb.isCurrentPage ? (
                <span className="flex items-center text-sm font-medium text-text-primary truncate">
                  {crumb.icon && (
                    <Icon 
                      name={crumb.icon} 
                      size={16} 
                      className="mr-2 flex-shrink-0 text-text-secondary" 
                    />
                  )}
                  <span className="truncate" title={crumb.label}>
                    {crumb.label}
                  </span>
                </span>
              ) : (
                <button
                  onClick={() => handleNavigation(crumb.path)}
                  className="flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200 truncate group"
                  title={crumb.label}
                >
                  {crumb.icon && (
                    <Icon 
                      name={crumb.icon} 
                      size={16} 
                      className="mr-2 flex-shrink-0 text-text-muted group-hover:text-primary transition-colors duration-200" 
                    />
                  )}
                  <span className="truncate group-hover:underline">
                    {crumb.label}
                  </span>
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* Mobile scroll indicator */}
      <div className="sm:hidden flex-shrink-0 w-4 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </nav>
  );
};

export default BreadcrumbTrail;