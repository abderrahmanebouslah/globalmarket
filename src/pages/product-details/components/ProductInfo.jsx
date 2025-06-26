import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ProductInfo = ({ product, language = "en", onAddToCart, onBuyNow, onContactSeller }) => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const isRTL = language === 'ar';

  const defaultProduct = {
    id: "prod-001",
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    currency: "USD",
    rating: 4.5,
    reviewCount: 1247,
    availability: "in_stock",
    stockCount: 15,
    seller: {
      name: "TechGear Store",
      rating: 4.8,
      reviewCount: 2341,
      verified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    variants: {
      color: [
        { name: "Black", value: "#000000", available: true, stock: 8 },
        { name: "White", value: "#FFFFFF", available: true, stock: 5 },
        { name: "Blue", value: "#2563EB", available: true, stock: 2 },
        { name: "Red", value: "#EF4444", available: false, stock: 0 }
      ],
      size: [
        { name: "Standard", available: true, stock: 10 },
        { name: "Large", available: true, stock: 5 }
      ]
    },
    features: [
      "Active Noise Cancellation",
      "40-hour Battery Life",
      "Quick Charge Technology",
      "Premium Audio Quality",
      "Comfortable Design"
    ],
    description: `Experience premium audio quality with these state-of-the-art wireless headphones. Featuring advanced noise cancellation technology and exceptional battery life, these headphones are perfect for music lovers and professionals alike.\n\nThe ergonomic design ensures comfort during extended use, while the premium materials provide durability and style. Compatible with all major devices and platforms.`,
    shipping: {
      freeShipping: true,
      estimatedDays: "3-5",
      expeditedAvailable: true
    },
    warranty: "2 years manufacturer warranty",
    returnPolicy: "30-day return policy"
  };

  const productData = product || defaultProduct;

  const formatPrice = (price, currency = "USD") => {
    const formatter = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: currency
    });
    return formatter.format(price);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US').format(number);
  };

  const handleVariantChange = (variantType, variantValue) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantType]: variantValue
    }));
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= productData.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const getAvailabilityStatus = () => {
    switch (productData.availability) {
      case 'in_stock':
        return { text: 'In Stock', color: 'text-success', icon: 'CheckCircle' };
      case 'low_stock':
        return { text: 'Low Stock', color: 'text-warning', icon: 'AlertTriangle' };
      case 'out_of_stock':
        return { text: 'Out of Stock', color: 'text-error', icon: 'XCircle' };
      default:
        return { text: 'Available', color: 'text-success', icon: 'CheckCircle' };
    }
  };

  const availabilityStatus = getAvailabilityStatus();
  const discountPercentage = productData.originalPrice ? 
    Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100) : 0;

  const canAddToCart = productData.availability === 'in_stock' && quantity <= productData.stockCount;

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Product Title and Rating */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary font-heading">
          {productData.name}
        </h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={`${
                    i < Math.floor(productData.rating)
                      ? 'text-accent fill-current'
                      : i < productData.rating
                      ? 'text-accent fill-current opacity-50' :'text-text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-text-primary ml-2">
              {productData.rating}
            </span>
          </div>
          
          <span className="text-sm text-text-secondary">
            ({formatNumber(productData.reviewCount)} reviews)
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-text-primary">
            {formatPrice(productData.price, productData.currency)}
          </span>
          
          {productData.originalPrice && (
            <>
              <span className="text-lg text-text-muted line-through">
                {formatPrice(productData.originalPrice, productData.currency)}
              </span>
              <span className="bg-accent text-white px-2 py-1 rounded-md text-sm font-medium">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>
        
        {productData.shipping.freeShipping && (
          <div className="flex items-center space-x-2 text-success">
            <Icon name="Truck" size={16} />
            <span className="text-sm font-medium">Free Shipping</span>
          </div>
        )}
      </div>

      {/* Availability Status */}
      <div className="flex items-center space-x-2">
        <Icon name={availabilityStatus.icon} size={16} className={availabilityStatus.color} />
        <span className={`text-sm font-medium ${availabilityStatus.color}`}>
          {availabilityStatus.text}
        </span>
        {productData.stockCount <= 10 && productData.availability === 'in_stock' && (
          <span className="text-sm text-text-secondary">
            (Only {formatNumber(productData.stockCount)} left)
          </span>
        )}
      </div>

      {/* Seller Information */}
      <div className="bg-surface-hover rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={productData.seller.avatar}
              alt={productData.seller.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-text-primary">
                  {productData.seller.name}
                </span>
                {productData.seller.verified && (
                  <Icon name="BadgeCheck" size={16} className="text-primary" />
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-accent fill-current" />
                <span className="text-sm text-text-secondary">
                  {productData.seller.rating} ({formatNumber(productData.seller.reviewCount)} reviews)
                </span>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={onContactSeller}
            iconName="MessageCircle"
            iconPosition="left"
            className="text-sm"
          >
            Contact
          </Button>
        </div>
      </div>

      {/* Variant Selection */}
      {productData.variants && (
        <div className="space-y-4">
          {Object.entries(productData.variants).map(([variantType, options]) => (
            <div key={variantType} className="space-y-2">
              <label className="text-sm font-medium text-text-primary capitalize">
                {variantType}:
                {selectedVariants[variantType] && (
                  <span className="ml-2 text-text-secondary">
                    {selectedVariants[variantType].name}
                  </span>
                )}
              </label>
              
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => handleVariantChange(variantType, option)}
                    disabled={!option.available}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      selectedVariants[variantType]?.name === option.name
                        ? 'border-primary bg-primary-50 text-primary'
                        : option.available
                        ? 'border-border hover:border-primary hover:bg-surface-hover' :'border-border bg-surface-hover text-text-muted cursor-not-allowed opacity-50'
                    }`}
                  >
                    {variantType === 'color' && (
                      <div
                        className="w-4 h-4 rounded-full border border-border mr-2 inline-block"
                        style={{ backgroundColor: option.value }}
                      />
                    )}
                    {option.name}
                    {!option.available && (
                      <span className="ml-1 text-xs">(Out of stock)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">Quantity:</label>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 p-0 rounded-r-none border-r border-border"
            >
              <Icon name="Minus" size={16} />
            </Button>
            
            <span className="px-4 py-2 text-center min-w-[60px] font-medium">
              {formatNumber(quantity)}
            </span>
            
            <Button
              variant="ghost"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= productData.stockCount}
              className="w-10 h-10 p-0 rounded-l-none border-l border-border"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
          
          <span className="text-sm text-text-secondary">
            {formatNumber(productData.stockCount)} available
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="primary"
            onClick={() => onAddToCart?.(productData, selectedVariants, quantity)}
            disabled={!canAddToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            className="w-full py-3"
          >
            Add to Cart
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => onBuyNow?.(productData, selectedVariants, quantity)}
            disabled={!canAddToCart}
            iconName="Zap"
            iconPosition="left"
            className="w-full py-3"
          >
            Buy Now
          </Button>
        </div>
        
        <Button
          variant="ghost"
          iconName="Heart"
          iconPosition="left"
          className="w-full py-2 text-text-secondary hover:text-primary"
        >
          Add to Wishlist
        </Button>
      </div>

      {/* Key Features */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Key Features</h3>
        <ul className="space-y-2">
          {productData.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Description</h3>
        <div className="text-sm text-text-secondary leading-relaxed">
          {isExpanded ? (
            <div className="whitespace-pre-line">{productData.description}</div>
          ) : (
            <div className="whitespace-pre-line">
              {productData.description.split('\n')[0]}
            </div>
          )}
          
          {productData.description.includes('\n') && (
            <Button
              variant="link"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 p-0 text-primary hover:underline"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </Button>
          )}
        </div>
      </div>

      {/* Shipping & Returns */}
      <div className="bg-surface-hover rounded-lg p-4 space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Shipping & Returns</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={16} />
            <span>
              {productData.shipping.freeShipping ? 'Free shipping' : 'Shipping available'} 
              - Estimated delivery: {productData.shipping.estimatedDays} business days
            </span>
          </div>
          
          {productData.shipping.expeditedAvailable && (
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} />
              <span>Express shipping available</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Icon name="RotateCcw" size={16} />
            <span>{productData.returnPolicy}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} />
            <span>{productData.warranty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;