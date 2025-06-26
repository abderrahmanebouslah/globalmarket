import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MobileTabNavigation from '../../components/ui/MobileTabNavigation';
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import ReviewsSection from './components/ReviewsSection';
import RelatedProducts from './components/RelatedProducts';
import ProductSpecifications from './components/ProductSpecifications';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [language, setLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('buyer');
  const [cartCount, setCartCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);

  const productId = searchParams.get('id') || 'prod-001';
  const productName = searchParams.get('name') || 'Premium Wireless Headphones';
  const category = searchParams.get('category') || 'Electronics';

  const isRTL = language === 'ar';

  useEffect(() => {
    // Simulate loading product data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [productId]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleSearch = (query) => {
    navigate(`/product-catalog-search?q=${encodeURIComponent(query)}`);
  };

  const handleAddToCart = (product, variants, quantity) => {
    setCartCount(prev => prev + quantity);
    // Show success message or toast
    console.log('Added to cart:', { product, variants, quantity });
  };

  const handleBuyNow = (product, variants, quantity) => {
    // Navigate to checkout or show buy now modal
    console.log('Buy now:', { product, variants, quantity });
  };

  const handleContactSeller = () => {
    setShowContactModal(true);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'specifications', label: 'Specifications', icon: 'FileText' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' }
  ];

  const customBreadcrumbs = [
    { label: 'Home', path: '/marketplace-homepage', icon: 'Home' },
    { label: 'Products', path: '/product-catalog-search', icon: 'Package' },
    { label: decodeURIComponent(category), path: `/product-catalog-search?category=${category}`, icon: 'Tag' },
    { label: decodeURIComponent(productName), path: `/product-details?id=${productId}`, isCurrentPage: true }
  ];

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
        
        <div className="space-header">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-text-secondary">Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <GlobalHeader
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        language={language}
        onLanguageChange={handleLanguageChange}
        onSearch={handleSearch}
      />

      <BreadcrumbTrail
        customBreadcrumbs={customBreadcrumbs}
        language={language}
      />

      <main className="space-header pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Product Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Image Gallery */}
            <div className="order-1">
              <ImageGallery
                productName={decodeURIComponent(productName)}
                language={language}
              />
            </div>

            {/* Product Information */}
            <div className="order-2">
              <ProductInfo
                language={language}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onContactSeller={handleContactSeller}
              />
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-dark'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Product Overview</h3>
                    <div className="text-text-secondary leading-relaxed space-y-4">
                      <p>
                        Experience premium audio quality with these state-of-the-art wireless headphones. 
                        Featuring advanced noise cancellation technology and exceptional battery life, 
                        these headphones are perfect for music lovers and professionals alike.
                      </p>
                      <p>
                        The ergonomic design ensures comfort during extended use, while the premium materials 
                        provide durability and style. Compatible with all major devices and platforms, 
                        these headphones deliver an unparalleled listening experience.
                      </p>
                      <p>
                        Whether you're commuting, working, or relaxing at home, these headphones adapt to 
                        your lifestyle with intelligent features and customizable settings through the 
                        companion mobile app.
                      </p>
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        icon: 'Volume2',
                        title: 'Premium Audio Quality',
                        description: 'High-fidelity sound with deep bass and crystal-clear highs'
                      },
                      {
                        icon: 'Battery',
                        title: 'Long Battery Life',
                        description: 'Up to 40 hours of continuous playback on a single charge'
                      },
                      {
                        icon: 'Headphones',
                        title: 'Active Noise Cancellation',
                        description: 'Block out distractions with advanced ANC technology'
                      },
                      {
                        icon: 'Smartphone',
                        title: 'Universal Compatibility',
                        description: 'Works seamlessly with all your devices and platforms'
                      },
                      {
                        icon: 'Settings',
                        title: 'Customizable Controls',
                        description: 'Personalize your listening experience with touch controls'
                      },
                      {
                        icon: 'Shield',
                        title: 'Premium Build Quality',
                        description: 'Durable materials with 2-year manufacturer warranty'
                      }
                    ].map((benefit, index) => (
                      <div key={index} className="bg-surface rounded-lg p-6 border border-border">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <Icon name={benefit.icon} size={20} className="text-primary" />
                          </div>
                          <h4 className="font-medium text-text-primary">{benefit.title}</h4>
                        </div>
                        <p className="text-sm text-text-secondary">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <ProductSpecifications language={language} />
              )}

              {activeTab === 'reviews' && (
                <ReviewsSection productId={productId} language={language} />
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-text-primary">Shipping Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-surface rounded-lg p-6 border border-border">
                      <div className="flex items-center space-x-3 mb-4">
                        <Icon name="Truck" size={24} className="text-primary" />
                        <h4 className="text-lg font-medium text-text-primary">Standard Shipping</h4>
                      </div>
                      <div className="space-y-3 text-sm text-text-secondary">
                        <div className="flex justify-between">
                          <span>Delivery Time:</span>
                          <span className="font-medium">3-5 business days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost:</span>
                          <span className="font-medium text-success">FREE</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tracking:</span>
                          <span className="font-medium">Included</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-surface rounded-lg p-6 border border-border">
                      <div className="flex items-center space-x-3 mb-4">
                        <Icon name="Zap" size={24} className="text-accent" />
                        <h4 className="text-lg font-medium text-text-primary">Express Shipping</h4>
                      </div>
                      <div className="space-y-3 text-sm text-text-secondary">
                        <div className="flex justify-between">
                          <span>Delivery Time:</span>
                          <span className="font-medium">1-2 business days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost:</span>
                          <span className="font-medium">$9.99</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tracking:</span>
                          <span className="font-medium">Real-time</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-hover rounded-lg p-6">
                    <h4 className="text-lg font-medium text-text-primary mb-4">Return Policy</h4>
                    <div className="space-y-3 text-sm text-text-secondary">
                      <div className="flex items-center space-x-2">
                        <Icon name="RotateCcw" size={16} className="text-success" />
                        <span>30-day return window from delivery date</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Package" size={16} className="text-success" />
                        <span>Items must be in original packaging and condition</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="CreditCard" size={16} className="text-success" />
                        <span>Full refund processed within 5-7 business days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Truck" size={16} className="text-success" />
                        <span>Free return shipping for defective items</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <RelatedProducts
              currentProductId={productId}
              category={category}
              language={language}
            />
          </div>
        </div>
      </main>

      {/* Contact Seller Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Contact Seller</h3>
              <Button
                variant="ghost"
                onClick={() => setShowContactModal(false)}
                className="w-8 h-8 p-0"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="Store" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">TechGear Store</p>
                  <p className="text-sm text-text-secondary">Verified Seller • 4.8★ (2,341 reviews)</p>
                </div>
              </div>
              
              <textarea
                placeholder="Type your message to the seller..."
                className="w-full p-3 border border-border rounded-lg resize-none h-24 focus:ring-2 focus:ring-primary-200 focus:border-primary"
              />
              
              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  iconName="Send"
                  iconPosition="left"
                >
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowContactModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <MobileTabNavigation
        isAuthenticated={isAuthenticated}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </div>
  );
};

export default ProductDetails;