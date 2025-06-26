import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ContextualSidebar = ({ userRole = 'seller', isCollapsed = false, onToggleCollapse }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname.includes('dashboard');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const sellerMenuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'BarChart3',
      path: '/seller-dashboard-inventory-management',
      badge: null
    },
    {
      key: 'inventory',
      label: 'Inventory Management',
      icon: 'Package',
      expandable: true,
      children: [
        { label: 'All Products', path: '/seller-dashboard-inventory-management?tab=products', icon: 'List' },
        { label: 'Add Product', path: '/seller-dashboard-inventory-management?tab=add', icon: 'Plus' },
        { label: 'Categories', path: '/seller-dashboard-inventory-management?tab=categories', icon: 'Grid3X3' },
        { label: 'Stock Alerts', path: '/seller-dashboard-inventory-management?tab=alerts', icon: 'AlertTriangle', badge: '3' }
      ]
    },
    {
      key: 'orders',
      label: 'Orders',
      icon: 'ShoppingBag',
      expandable: true,
      badge: '12',
      children: [
        { label: 'All Orders', path: '/seller-dashboard-inventory-management?tab=orders', icon: 'List' },
        { label: 'Pending', path: '/seller-dashboard-inventory-management?tab=pending', icon: 'Clock', badge: '5' },
        { label: 'Processing', path: '/seller-dashboard-inventory-management?tab=processing', icon: 'Loader', badge: '3' },
        { label: 'Shipped', path: '/seller-dashboard-inventory-management?tab=shipped', icon: 'Truck' },
        { label: 'Completed', path: '/seller-dashboard-inventory-management?tab=completed', icon: 'CheckCircle' }
      ]
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: 'TrendingUp',
      expandable: true,
      children: [
        { label: 'Sales Report', path: '/seller-dashboard-inventory-management?tab=sales', icon: 'DollarSign' },
        { label: 'Product Performance', path: '/seller-dashboard-inventory-management?tab=performance', icon: 'Activity' },
        { label: 'Customer Insights', path: '/seller-dashboard-inventory-management?tab=customers', icon: 'Users' }
      ]
    },
    {
      key: 'marketing',
      label: 'Marketing',
      icon: 'Megaphone',
      expandable: true,
      children: [
        { label: 'Promotions', path: '/seller-dashboard-inventory-management?tab=promotions', icon: 'Tag' },
        { label: 'Coupons', path: '/seller-dashboard-inventory-management?tab=coupons', icon: 'Ticket' },
        { label: 'Campaigns', path: '/seller-dashboard-inventory-management?tab=campaigns', icon: 'Target' }
      ]
    },
    {
      key: 'settings',
      label: 'Store Settings',
      icon: 'Settings',
      expandable: true,
      children: [
        { label: 'Store Profile', path: '/seller-dashboard-inventory-management?tab=profile', icon: 'Store' },
        { label: 'Payment Methods', path: '/seller-dashboard-inventory-management?tab=payments', icon: 'CreditCard' },
        { label: 'Shipping Options', path: '/seller-dashboard-inventory-management?tab=shipping', icon: 'Truck' },
        { label: 'Tax Settings', path: '/seller-dashboard-inventory-management?tab=tax', icon: 'Calculator' }
      ]
    }
  ];

  const adminMenuItems = [
    {
      key: 'dashboard',
      label: 'Admin Dashboard',
      icon: 'LayoutDashboard',
      path: '/admin-dashboard-management',
      badge: null
    },
    {
      key: 'users',
      label: 'User Management',
      icon: 'Users',
      expandable: true,
      children: [
        { label: 'All Users', path: '/admin-dashboard-management?tab=users', icon: 'List' },
        { label: 'Sellers', path: '/admin-dashboard-management?tab=sellers', icon: 'Store' },
        { label: 'Buyers', path: '/admin-dashboard-management?tab=buyers', icon: 'ShoppingCart' },
        { label: 'Pending Approvals', path: '/admin-dashboard-management?tab=approvals', icon: 'Clock', badge: '7' }
      ]
    },
    {
      key: 'products',
      label: 'Product Management',
      icon: 'Package',
      expandable: true,
      children: [
        { label: 'All Products', path: '/admin-dashboard-management?tab=products', icon: 'List' },
        { label: 'Categories', path: '/admin-dashboard-management?tab=categories', icon: 'Grid3X3' },
        { label: 'Reported Products', path: '/admin-dashboard-management?tab=reported', icon: 'Flag', badge: '2' },
        { label: 'Featured Products', path: '/admin-dashboard-management?tab=featured', icon: 'Star' }
      ]
    },
    {
      key: 'orders',
      label: 'Order Management',
      icon: 'ShoppingBag',
      expandable: true,
      children: [
        { label: 'All Orders', path: '/admin-dashboard-management?tab=orders', icon: 'List' },
        { label: 'Disputes', path: '/admin-dashboard-management?tab=disputes', icon: 'AlertCircle', badge: '4' },
        { label: 'Refunds', path: '/admin-dashboard-management?tab=refunds', icon: 'RotateCcw' }
      ]
    },
    {
      key: 'analytics',
      label: 'Platform Analytics',
      icon: 'BarChart3',
      expandable: true,
      children: [
        { label: 'Revenue Report', path: '/admin-dashboard-management?tab=revenue', icon: 'DollarSign' },
        { label: 'User Activity', path: '/admin-dashboard-management?tab=activity', icon: 'Activity' },
        { label: 'Market Trends', path: '/admin-dashboard-management?tab=trends', icon: 'TrendingUp' }
      ]
    },
    {
      key: 'content',
      label: 'Content Management',
      icon: 'FileText',
      expandable: true,
      children: [
        { label: 'Pages', path: '/admin-dashboard-management?tab=pages', icon: 'File' },
        { label: 'Announcements', path: '/admin-dashboard-management?tab=announcements', icon: 'Megaphone' },
        { label: 'Support Tickets', path: '/admin-dashboard-management?tab=support', icon: 'HelpCircle', badge: '15' }
      ]
    },
    {
      key: 'system',
      label: 'System Settings',
      icon: 'Settings',
      expandable: true,
      children: [
        { label: 'General Settings', path: '/admin-dashboard-management?tab=general', icon: 'Sliders' },
        { label: 'Payment Gateway', path: '/admin-dashboard-management?tab=gateway', icon: 'CreditCard' },
        { label: 'Email Templates', path: '/admin-dashboard-management?tab=emails', icon: 'Mail' },
        { label: 'Security', path: '/admin-dashboard-management?tab=security', icon: 'Shield' }
      ]
    }
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : sellerMenuItems;

  const renderMenuItem = (item, level = 0) => {
    const isActive = location.pathname === item.path || 
                    (item.children && item.children.some(child => location.pathname === child.path));
    const isExpanded = expandedSections[item.key];

    return (
      <div key={item.key} className="mb-1">
        <button
          onClick={() => {
            if (item.expandable) {
              toggleSection(item.key);
            } else if (item.path) {
              handleNavigation(item.path);
            }
          }}
          className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            isActive
              ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-primary hover:bg-surface-hover hover:text-primary'
          } ${level > 0 ? 'ml-4 pl-6' : ''}`}
        >
          <div className="flex items-center space-x-3">
            {!isCollapsed && (
              <Icon 
                name={item.icon} 
                size={18} 
                className={isActive ? 'text-primary' : 'text-text-secondary'} 
              />
            )}
            {!isCollapsed && <span>{item.label}</span>}
            {item.badge && !isCollapsed && (
              <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
          {item.expandable && !isCollapsed && (
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transform transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          )}
        </button>

        {item.expandable && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1 animate-slide-down">
            {item.children?.map((child) => (
              <button
                key={child.path}
                onClick={() => handleNavigation(child.path)}
                className={`w-full flex items-center justify-between px-3 py-2 ml-6 text-sm rounded-lg transition-colors duration-200 ${
                  location.pathname === child.path || location.search.includes(child.path.split('?')[1])
                    ? 'bg-primary-100 text-primary' :'text-text-secondary hover:bg-surface-hover hover:text-primary'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={child.icon} size={16} />
                  <span>{child.label}</span>
                </div>
                {child.badge && (
                  <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                    {child.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderQuickActions = () => {
    if (isCollapsed) return null;

    const quickActions = userRole === 'admin' 
      ? [
          { label: 'View Marketplace', path: '/marketplace-homepage', icon: 'ExternalLink' },
          { label: 'System Status', path: '/admin-dashboard-management?tab=status', icon: 'Activity' }
        ]
      : [
          { label: 'Add Product', path: '/seller-dashboard-inventory-management?tab=add', icon: 'Plus' },
          { label: 'View Store', path: '/marketplace-homepage', icon: 'ExternalLink' }
        ];

    return (
      <div className="px-3 py-4 border-t border-border">
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2">
          {quickActions.map((action) => (
            <Button
              key={action.path}
              variant="ghost"
              onClick={() => handleNavigation(action.path)}
              className="w-full justify-start text-sm"
              iconName={action.icon}
              iconPosition="left"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  if (!isDashboard) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`nav-sidebar fixed left-0 top-header bottom-0 z-sidebar bg-surface border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-sidebar'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-semibold text-text-primary font-heading">
                  {userRole === 'admin' ? 'Admin Panel' : 'Seller Dashboard'}
                </h2>
                <p className="text-sm text-text-secondary">
                  {userRole === 'admin' ? 'Platform Management' : 'Manage your store'}
                </p>
              </div>
            )}
            <Button
              variant="ghost"
              onClick={onToggleCollapse}
              className="p-2"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={18} />
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {menuItems.map((item) => renderMenuItem(item))}
          </nav>

          {/* Quick Actions */}
          {renderQuickActions()}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 z-mobile-overlay transition-opacity duration-300 ${
        isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMobileOpen(false)}
        />
        <aside className={`absolute left-0 top-0 bottom-0 w-80 bg-surface transform transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h2 className="text-lg font-semibold text-text-primary font-heading">
                  {userRole === 'admin' ? 'Admin Panel' : 'Seller Dashboard'}
                </h2>
                <p className="text-sm text-text-secondary">
                  {userRole === 'admin' ? 'Platform Management' : 'Manage your store'}
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setIsMobileOpen(false)}
                className="p-2"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-2">
              {menuItems.map((item) => renderMenuItem(item))}
            </nav>

            {/* Mobile Quick Actions */}
            {renderQuickActions()}
          </div>
        </aside>
      </div>

      {/* Mobile Toggle Button */}
      <Button
        variant="primary"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-dropdown p-3 rounded-full shadow-lg"
      >
        <Icon name="Menu" size={20} />
      </Button>
    </>
  );
};

export default ContextualSidebar;