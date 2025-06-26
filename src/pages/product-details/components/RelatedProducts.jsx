import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RelatedProducts = ({ currentProductId, category, language = "en" }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const isRTL = language === 'ar';

  const mockRelatedProducts = [
    {
      id: "prod-002",
      name: "Wireless Gaming Mouse",
      price: 79.99,
      originalPrice: 99.99,
      currency: "USD",
      rating: 4.3,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      seller: "TechGear Store",
      freeShipping: true,
      badge: "Best Seller"
    },
    {
      id: "prod-003",
      name: "Mechanical Keyboard",
      price: 149.99,
      originalPrice: null,
      currency: "USD",
      rating: 4.7,
      reviewCount: 1543,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      seller: "KeyBoard Pro",
      freeShipping: true,
      badge: null
    },
    {
      id: "prod-004",
      name: "USB-C Hub Adapter",
      price: 39.99,
      originalPrice: 59.99,
      currency: "USD",
      rating: 4.1,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
      seller: "ConnectTech",
      freeShipping: false,
      badge: "New"
    },
    {
      id: "prod-005",
      name: "Portable Monitor",
      price: 199.99,
      originalPrice: 249.99,
      currency: "USD",
      rating: 4.5,
      reviewCount: 723,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
      seller: "DisplayMax",
      freeShipping: true,
      badge: "Limited Offer"
    },
    {
      id: "prod-006",
      name: "Webcam HD 1080p",
      price: 89.99,
      originalPrice: null,
      currency: "USD",
      rating: 4.2,
      reviewCount: 634,
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
      seller: "CamTech Solutions",
      freeShipping: true,
      badge: null
    },
    {
      id: "prod-007",
      name: "Bluetooth Speaker",
      price: 59.99,
      originalPrice: 79.99,
      currency: "USD",
      rating: 4.4,
      reviewCount: 1289,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      seller: "AudioWave",
      freeShipping: true,
      badge: "Popular"
    }
  ];

  const formatPrice = (price, currency = "USD") => {
    const formatter = new Intl.NumberFormat(
      language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US',
      {
        style: 'currency',
        currency: currency
      }
    );
    return formatter.format(price);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat(
      language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US'
    ).format(number);
  };

  const handleProductClick = (product) => {
    navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}&category=${encodeURIComponent(category || 'Electronics')}`);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      const scrollDirection = isRTL ? -direction : direction;
      scrollRef.current.scrollBy({
        left: scrollDirection * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-accent text-white';
      case 'New':
        return 'bg-primary text-white';
      case 'Limited Offer':
        return 'bg-error text-white';
      case 'Popular':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  const filteredProducts = mockRelatedProducts.filter(product => product.id !== currentProductId);

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          Related Products
        </h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => scroll(-1)}
            className="w-8 h-8 p-0 rounded-full bg-surface-hover hover:bg-surface-active"
          >
            <Icon name={isRTL ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => scroll(1)}
            className="w-8 h-8 p-0 rounded-full bg-surface-hover hover:bg-surface-active"
          >
            <Icon name={isRTL ? "ChevronLeft" : "ChevronRight"} size={16} />
          </Button>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.map((product) => {
            const discountPercentage = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="flex-shrink-0 w-72 bg-surface rounded-lg border border-border hover:shadow-md transition-all duration-200 cursor-pointer group"
                onClick={() => handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium ${getBadgeStyle(product.badge)}`}>
                      {product.badge}
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {discountPercentage > 0 && (
                    <div className="absolute top-3 right-3 bg-error text-white px-2 py-1 rounded-md text-xs font-medium">
                      -{discountPercentage}%
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to wishlist logic
                        }}
                        className="w-8 h-8 p-0 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full"
                      >
                        <Icon name="Heart" size={16} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Quick view logic
                        }}
                        className="w-8 h-8 p-0 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full"
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  {/* Product Name */}
                  <h3 className="font-medium text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={`${
                            i < Math.floor(product.rating)
                              ? 'text-accent fill-current'
                              : i < product.rating
                              ? 'text-accent fill-current opacity-50' :'text-text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-text-secondary">
                      {product.rating} ({formatNumber(product.reviewCount)})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-text-primary">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-text-muted line-through">
                        {formatPrice(product.originalPrice, product.currency)}
                      </span>
                    )}
                  </div>

                  {/* Seller & Shipping */}
                  <div className="space-y-1">
                    <p className="text-sm text-text-secondary">
                      by {product.seller}
                    </p>
                    {product.freeShipping && (
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="Truck" size={14} />
                        <span className="text-xs font-medium">Free Shipping</span>
                      </div>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic
                    }}
                    iconName="ShoppingCart"
                    iconPosition="left"
                    className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: Math.ceil(filteredProducts.length / 3) }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-text-muted opacity-30"
            />
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center pt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/product-catalog-search?category=${encodeURIComponent(category || 'Electronics')}`)}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All {category || 'Electronics'} Products
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;