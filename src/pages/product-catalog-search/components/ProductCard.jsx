import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist = false }) => {
  const { t, i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showVariants, setShowVariants] = useState(false);
  const navigate = useNavigate();

  const isRTL = i18n.language === 'ar';

  const handleProductClick = () => {
    navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      setShowVariants(true);
    } else {
      onAddToCart(product, selectedVariant); // selectedVariant could be null
      setShowVariants(false);
    }
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    onAddToWishlist(product);
  };

  const formatPrice = (price, currency = 'USD') => {
    // Consider using Intl.NumberFormat based on i18n.language for more robust localization
    const options = { style: 'currency', currency: currency };
    try {
        return new Intl.NumberFormat(i18n.language, options).format(price);
    } catch (e) {
        // Fallback for unsupported locales or currencies by Intl
        return isRTL ? `${price} ${currency}` : `${currency}${price}`;
    }
  };

  const renderRating = () => {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className={`flex items-center space-x-1 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {[...Array(fullStars)].map((_, i) => (
          <Icon key={`full-${i}`} name="Star" size={14} className="text-accent fill-current" />
        ))}
        {hasHalfStar && (
          <Icon key="half" name="StarHalf" size={14} className="text-accent fill-current" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon key={`empty-${i}`} name="Star" size={14} className="text-border-dark" />
        ))}
        <span className={`text-xs text-text-secondary ${isRTL ? 'mr-1' : 'ml-1'}`}>({product.reviewCount})</span>
      </div>
    );
  };

  const renderVariantSelector = () => {
    if (!showVariants || !product.variants) return null;

    return (
      <div className="absolute inset-0 bg-surface bg-opacity-95 flex flex-col justify-center items-center p-4 rounded-lg z-10">
        <h4 className="text-sm font-medium text-text-primary mb-3">{t('productCard.selectOption')}</h4>
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
              {variant.name} {/* Variant names might also need translation depending on data structure */}
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
            {t('productCard.cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={handleQuickAdd}
            disabled={!selectedVariant}
            className="flex-1 text-xs py-2"
          >
            {t('productCard.addToCart')}
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
          alt={product.name} // Product name is not translated here
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        <button
          onClick={handleWishlistToggle}
          aria-label={isInWishlist ? t('productCard.removeFromWishlist') : t('productCard.addToWishlist')}
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

        {product.discount && (
          <div className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} bg-error text-white px-2 py-1 rounded text-xs font-medium`}>
            -{product.discount}%
          </div>
        )}

        {product.stock <= 5 && product.stock > 0 && (
          <div className={`absolute bottom-2 ${isRTL ? 'right-2' : 'left-2'} bg-warning text-white px-2 py-1 rounded text-xs font-medium`}>
            {t('productCard.onlyLeft', { count: product.stock })}
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">{t('productCard.outOfStock')}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="mb-2">
          <h3 className="text-sm font-medium text-text-primary line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-text-secondary">
            {t('trendingProducts.bySeller', { sellerName: product.seller })}
          </p>
        </div>

        <div className="mb-3">
          {renderRating()}
        </div>

        <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className={`text-sm text-text-secondary line-through ${isRTL ? 'mr-2' : 'ml-2'}`}>
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
          </div>
        </div>

        <Button
          variant="primary"
          onClick={handleQuickAdd}
          disabled={product.stock === 0}
          className="w-full text-sm py-2"
          iconName="ShoppingCart"
          iconPosition={isRTL ? 'right' : 'left'}
        >
          {product.variants && product.variants.length > 0 && !showVariants ? t('productCard.quickAdd') : t('productCard.addToCart')}
        </Button>

        {product.freeShipping && (
          <div className={`mt-2 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-xs text-success font-medium flex items-center">
              <Icon name="Truck" size={12} className={isRTL ? 'ml-1' : 'mr-1'} />
              {t('productCard.freeShipping')}
            </span>
          </div>
        )}
      </div>

      {renderVariantSelector()}
    </div>
  );
};

export default ProductCard;