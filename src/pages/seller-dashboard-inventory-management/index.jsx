import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ContextualSidebar from '../../components/ui/ContextualSidebar';
import MobileTabNavigation from '../../components/ui/MobileTabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MetricsCard from './components/MetricsCard';
import InventoryTable from './components/InventoryTable';
import OrderManagement from './components/OrderManagement';
import AnalyticsCharts from './components/AnalyticsCharts';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SellerDashboardInventoryManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en');

  // Mock data
  const metricsData = [
    {
      title: 'Total Revenue',
      value: '$24,580',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      trend: true
    },
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'ShoppingBag',
      trend: true
    },
    {
      title: 'Product Views',
      value: '45,892',
      change: '+15.3%',
      changeType: 'positive',
      icon: 'Eye',
      trend: true
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.5%',
      changeType: 'negative',
      icon: 'TrendingUp',
      trend: false
    }
  ];

  const productsData = [
    {
      id: 'PRD001',
      name: 'Wireless Bluetooth Headphones',
      sku: 'WBH-001',
      category: 'Electronics',
      price: 89.99,
      stock: 45,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
    },
    {
      id: 'PRD002',
      name: 'Gaming Mechanical Keyboard',
      sku: 'GMK-002',
      category: 'Electronics',
      price: 129.99,
      stock: 23,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop'
    },
    {
      id: 'PRD003',
      name: 'Ergonomic Office Chair',
      sku: 'EOC-003',
      category: 'Furniture',
      price: 299.99,
      stock: 8,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
    },
    {
      id: 'PRD004',
      name: 'Smartphone Case',
      sku: 'SPC-004',
      category: 'Accessories',
      price: 19.99,
      stock: 0,
      status: 'inactive',
      image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop'
    },
    {
      id: 'PRD005',
      name: 'Fitness Tracker Watch',
      sku: 'FTW-005',
      category: 'Electronics',
      price: 199.99,
      stock: 67,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop'
    }
  ];

  const ordersData = [
    {
      id: 'ORD001',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com'
      },
      products: [
        {
          name: 'Wireless Headphones',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
        },
        {
          name: 'Phone Case',
          image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop'
        }
      ],
      total: 109.98,
      status: 'pending',
      priority: 'high',
      date: '2024-01-15T10:30:00Z'
    },
    {
      id: 'ORD002',
      customer: {
        name: 'Michael Chen',
        email: 'michael.chen@email.com'
      },
      products: [
        {
          name: 'Gaming Keyboard',
          image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=100&h=100&fit=crop'
        }
      ],
      total: 129.99,
      status: 'processing',
      priority: 'medium',
      date: '2024-01-15T09:15:00Z'
    },
    {
      id: 'ORD003',
      customer: {
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com'
      },
      products: [
        {
          name: 'Office Chair',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop'
        }
      ],
      total: 299.99,
      status: 'shipped',
      priority: 'low',
      date: '2024-01-14T16:45:00Z'
    }
  ];

  const salesData = [
    { date: 'Jan 1', revenue: 1200 },
    { date: 'Jan 2', revenue: 1800 },
    { date: 'Jan 3', revenue: 1600 },
    { date: 'Jan 4', revenue: 2200 },
    { date: 'Jan 5', revenue: 1900 },
    { date: 'Jan 6', revenue: 2400 },
    { date: 'Jan 7', revenue: 2100 }
  ];

  const productPerformanceData = [
    { name: 'Wireless Headphones', sales: 145 },
    { name: 'Gaming Keyboard', sales: 98 },
    { name: 'Fitness Tracker', sales: 87 },
    { name: 'Office Chair', sales: 76 },
    { name: 'Phone Case', sales: 65 }
  ];

  const customerDemographicsData = {
    ageGroups: [
      { name: '18-24', value: 25 },
      { name: '25-34', value: 35 },
      { name: '35-44', value: 20 },
      { name: '45-54', value: 15 },
      { name: '55+', value: 5 }
    ],
    locations: [
      { country: 'USA', customers: 450 },
      { country: 'Canada', customers: 280 },
      { country: 'UK', customers: 220 },
      { country: 'Germany', customers: 180 },
      { country: 'France', customers: 150 }
    ]
  };

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleUpdateProduct = (productId, updates) => {
    console.log('Updating product:', productId, updates);
    // In a real app, this would make an API call
  };

  const handleBulkAction = (action, productIds) => {
    console.log('Bulk action:', action, productIds);
    // In a real app, this would make an API call
  };

  const handleUpdateOrder = (orderId, updates) => {
    console.log('Updating order:', orderId, updates);
    // In a real app, this would make an API call
  };

  const handleQuickAction = (action, data) => {
    console.log('Quick action:', action, data);
    // In a real app, this would handle various quick actions
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  const customBreadcrumbs = [
    { label: 'Dashboard', path: '/seller-dashboard-inventory-management', icon: 'Home' },
    { label: 'Seller Dashboard', path: '/seller-dashboard-inventory-management', icon: 'Store', isCurrentPage: true }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  trend={metric.trend}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Analytics Charts */}
              <div className="lg:col-span-2">
                <AnalyticsCharts
                  salesData={salesData}
                  productData={productPerformanceData}
                  customerData={customerDemographicsData}
                />
              </div>

              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <QuickActions onAction={handleQuickAction} />
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Recent Orders</h3>
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange('orders')}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  View All Orders
                </Button>
              </div>
              <div className="space-y-3">
                {ordersData.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon name="ShoppingBag" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">#{order.id}</p>
                        <p className="text-sm text-text-secondary">{order.customer.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-text-primary">${order.total.toFixed(2)}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'pending' ? 'bg-warning-100 text-warning-700' :
                        order.status === 'processing'? 'bg-primary-100 text-primary-700' : 'bg-success-100 text-success-700'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'products': case'add': case'categories': case'alerts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">Inventory Management</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64"
                  />
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                </div>
                <Button variant="primary" iconName="Plus" iconPosition="left">
                  Add Product
                </Button>
              </div>
            </div>
            <InventoryTable
              products={productsData}
              onUpdateProduct={handleUpdateProduct}
              onBulkAction={handleBulkAction}
            />
          </div>
        );

      case 'orders': case'pending': case'processing': case'shipped': case'completed':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">Order Management</h2>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Filter" iconPosition="left">
                  Filter Orders
                </Button>
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export
                </Button>
              </div>
            </div>
            <OrderManagement
              orders={ordersData}
              onUpdateOrder={handleUpdateOrder}
            />
          </div>
        );

      case 'sales': case'performance': case'customers':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">Analytics & Reports</h2>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Calendar" iconPosition="left">
                  Date Range
                </Button>
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Report
                </Button>
              </div>
            </div>
            <AnalyticsCharts
              salesData={salesData}
              productData={productPerformanceData}
              customerData={customerDemographicsData}
            />
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  trend={metric.trend}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AnalyticsCharts
                  salesData={salesData}
                  productData={productPerformanceData}
                  customerData={customerDemographicsData}
                />
              </div>
              <div className="lg:col-span-1">
                <QuickActions onAction={handleQuickAction} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <GlobalHeader
        userRole="seller"
        isAuthenticated={true}
        language={language}
        onLanguageChange={handleLanguageChange}
        onSearch={handleSearch}
      />

      <ContextualSidebar
        userRole="seller"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-sidebar'
      } pt-header pb-20 lg:pb-8`}>
        <BreadcrumbTrail
          customBreadcrumbs={customBreadcrumbs}
          language={language}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {renderTabContent()}
        </div>
      </main>

      <MobileTabNavigation
        isAuthenticated={true}
        cartCount={2}
        wishlistCount={3}
      />
    </div>
  );
};

export default SellerDashboardInventoryManagement;