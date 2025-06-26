import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ProductComparison = ({ 
  comparisonProducts, 
  onRemoveFromComparison, 
  onClearComparison,
  onAddToCart,
  isVisible = false,
  onClose,
  language = 'en' 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const isRTL = language === 'ar';

  if (!isVisible || comparisonProducts.length === 0) return null;

  const formatPrice = (price, currency = 'USD') => {
    const formatters = {
      'USD': new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
      'EUR': new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }),
      'SAR': new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' })
    };
    return formatters[currency]?.format(price) || `$${price}`;
  };

  const renderRating = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Icon
            key={i}
            name="Star"
            size={14}
            className={`${
              i < Math.floor(rating)
                ? 'text-accent fill-current' :'text-border-dark'
            }`}
          />
        ))}
        <span className="text-sm text-text-secondary ml-1">({rating})</span>
      </div>
    );
  };

  const comparisonTabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'specifications', label: 'Specifications', icon: 'List' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Product Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisonProducts.map((product) => (
          <div key={product.id} className="relative">
            <div className="aspect-square bg-background rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => onRemoveFromComparison(product.id)}
              className="absolute top-2 right-2 p-1 bg-surface bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200"
            >
              <Icon name="X" size={16} className="text-text-secondary hover:text-error" />
            </button>
          </div>
        ))}
      </div>

      {/* Product Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisonProducts.map((product) => (
          <div key={product.id} className="text-center">
            <h3 className="font-semibold text-text-primary mb-2">{product.name}</h3>
            <p className="text-sm text-text-secondary">by {product.seller}</p>
          </div>
        ))}
      </div>

      {/* Ratings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisonProducts.map((product) => (
          <div key={product.id} className="flex justify-center">
            {renderRating(product.rating)}
          </div>
        ))}
      </div>

      {/* Prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisonProducts.map((product) => (
          <div key={product.id} className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {formatPrice(product.price, product.currency)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-sm text-text-secondary line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add to Cart Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisonProducts.map((product) => (
          <Button
            key={product.id}
            variant="primary"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="w-full"
            iconName="ShoppingCart"
            iconPosition="left"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderSpecificationsTab = () => {
    const allSpecs = new Set();
    comparisonProducts.forEach(product => {
      if (product.specifications) {
        Object.keys(product.specifications).forEach(spec => allSpecs.add(spec));
      }
    });

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-semibold text-text-primary">Specification</th>
              {comparisonProducts.map((product) => (
                <th key={product.id} className="text-center p-4 font-semibold text-text-primary min-w-48">
                  {product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(allSpecs).map((spec) => (
              <tr key={spec} className="border-b border-border hover:bg-surface-hover">
                <td className="p-4 font-medium text-text-primary capitalize">
                  {spec.replace(/([A-Z])/g, ' $1').trim()}
                </td>
                {comparisonProducts.map((product) => (
                  <td key={product.id} className="p-4 text-center text-text-secondary">
                    {product.specifications?.[spec] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderReviewsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {comparisonProducts.map((product) => (
        <div key={product.id} className="space-y-4">
          <h3 className="font-semibold text-text-primary text-center">{product.name}</h3>
          
          <div className="text-center">
            {renderRating(product.rating)}
            <p className="text-sm text-text-secondary mt-1">
              Based on {product.reviewCount} reviews
            </p>
          </div>

          <div className="space-y-3">
            {product.topReviews?.slice(0, 3).map((review, index) => (
              <div key={index} className="bg-background p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">{review.author}</span>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-text-secondary line-clamp-3">{review.comment}</p>
              </div>
            )) || (
              <p className="text-sm text-text-secondary text-center">No reviews available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPricingTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comparisonProducts.map((product) => (
          <div key={product.id} className="bg-background p-6 rounded-lg">
            <h3 className="font-semibold text-text-primary mb-4 text-center">{product.name}</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Current Price:</span>
                <span className="font-bold text-primary text-lg">
                  {formatPrice(product.price, product.currency)}
                </span>
              </div>
              
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Original Price:</span>
                  <span className="text-text-secondary line-through">
                    {formatPrice(product.originalPrice, product.currency)}
                  </span>
                </div>
              )}
              
              {product.discount && (
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Discount:</span>
                  <span className="text-success font-medium">{product.discount}% OFF</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Shipping:</span>
                <span className={`font-medium ${product.freeShipping ? 'text-success' : 'text-text-primary'}`}>
                  {product.freeShipping ? 'Free' : '$9.99'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Stock:</span>
                <span className={`font-medium ${
                  product.stock > 10 ? 'text-success' : 
                  product.stock > 0 ? 'text-warning' : 'text-error'
                }`}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-surface rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="GitCompare" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-text-primary">
              Compare Products ({comparisonProducts.length})
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={onClearComparison}
              className="text-error hover:text-error-700"
              iconName="Trash2"
              iconPosition="left"
            >
              Clear All
            </Button>
            <Button variant="ghost" onClick={onClose} className="p-2">
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {comparisonTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-surface-hover'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'specifications' && renderSpecificationsTab()}
          {activeTab === 'reviews' && renderReviewsTab()}
          {activeTab === 'pricing' && renderPricingTab()}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;