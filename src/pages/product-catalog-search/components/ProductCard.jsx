import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist = false, language = 'en' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showVariants, setShowVariants] = useState(false);
  const navigate = useNavigate();

  const isRTL = language === 'ar';

  const handleProductClick = () => {
    navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      setShowVariants(true);
    } else {
      onAddToCart(product, selectedVariant);
      setShowVariants(false);
    }
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    onAddToWishlist(product);
  };

  const formatPrice = (price, currency = 'USD') => {
    const formatters = {
      'USD': new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
      'EUR': new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }),
      'SAR': new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' })
    };
    return formatters[currency]?.format(price) || `$${price}`;
  };

  const renderRating = () => {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Icon key={i} name="Star" size={14} className="text-accent fill-current" />
        ))}
        {hasHalfStar && (
          <Icon name="Star" size={14} className="text-accent fill-current opacity-50" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon key={i} name="Star" size={14} className="text-border-dark" />
        ))}
        <span className="text-xs text-text-secondary ml-1">({product.reviewCount})</span>
      </div>
    );
  };

  const renderVariantSelector = () => {
    if (!showVariants || !product.variants) return null;

    return (
      <div className="absolute inset-0 bg-surface bg-opacity-95 flex flex-col justify-center items-center p-4 rounded-lg z-10">
        <h4 className="text-sm font-medium text-text-primary mb-3">Select Option</h4>
        <div className="grid grid-cols-2 gap-2 mb-4 w-full">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVariant(variant);
              }}
              className={`px-3 py-2 text-xs rounded border transition-colors duration-200 ${
                selectedVariant?.id === variant.id
                  ? 'bg-primary text-white border-primary' :'bg-surface text-text-primary border-border hover:border-primary'
              }`}
            >
              {variant.name}
            </button>
          ))}
        </div>
        <div className="flex space-x-2 w-full">
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              setShowVariants(false);
              setSelectedVariant(null);
            }}
            className="flex-1 text-xs py-2"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleQuickAdd}
            disabled={!selectedVariant}
            className="flex-1 text-xs py-2"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative bg-surface border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:border-primary-200 ${
        isHovered ? 'transform -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-background">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} p-2 bg-surface bg-opacity-90 rounded-full transition-all duration-200 hover:bg-opacity-100 hover:scale-110`}
        >
          <Icon
            name="Heart"
            size={16}
            className={`transition-colors duration-200 ${
              isInWishlist ? 'text-error fill-current' : 'text-text-secondary hover:text-error'
            }`}
          />
        </button>

        {/* Discount Badge */}
        {product.discount && (
          <div className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} bg-error text-white px-2 py-1 rounded text-xs font-medium`}>
            -{product.discount}%
          </div>
        )}

        {/* Stock Status */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-2 left-2 bg-warning text-white px-2 py-1 rounded text-xs font-medium">
            Only {product.stock} left
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-text-primary line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-text-secondary">
            by {product.seller}
          </p>
        </div>

        {/* Rating */}
        <div className="mb-3">
          {renderRating()}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-text-secondary line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
          </div>
        </div>

        {/* Quick Add Button */}
        <Button
          variant="primary"
          onClick={handleQuickAdd}
          disabled={product.stock === 0}
          className="w-full text-sm py-2"
          iconName="ShoppingCart"
          iconPosition="left"
        >
          {product.variants && product.variants.length > 0 ? 'Quick Add' : 'Add to Cart'}
        </Button>

        {/* Free Shipping Badge */}
        {product.freeShipping && (
          <div className="mt-2 flex items-center justify-center">
            <span className="text-xs text-success font-medium flex items-center">
              <Icon name="Truck" size={12} className="mr-1" />
              Free Shipping
            </span>
          </div>
        )}
      </div>

      {/* Variant Selector Overlay */}
      {renderVariantSelector()}
    </div>
  );
};

export default ProductCard;