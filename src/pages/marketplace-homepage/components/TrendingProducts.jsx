import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TrendingProducts = () => {
  const { t, i18n } = useTranslation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const isRTL = i18n.language === 'ar';

  const products = [
    {
      id: 1,
      name: "Baby T-Shirt",
      price: 15.99,
      originalPrice: 19.99,
      currency: "$",
      image: "https://images.unsplash.com/photo-1599056436280-deddb2010ff9?w=300&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 250,
      seller: "TinyThreads",
      badge: "New Arrival", // Badge text could be translated by using t(product.badgeKey) or similar
      discount: 20,
      size: "6-12 months",
      gender: "Unisex"
    },
    {
      id: 2,
      name: "Toddler Summer Dress",
      price: 25.50,
      currency: "$",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 180,
      seller: "LittleBloom",
      badge: "Popular",
      size: "2-3 years",
      gender: "Girl"
    },
    {
      id: 3,
      name: "Kids Graphic Hoodie",
      price: 30.00,
      originalPrice: 35.00,
      currency: "$",
      image: "https://images.unsplash.com/photo-1611003223101-8609a4738909?w=300&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 320,
      seller: "CoolKidz",
      discount: 14,
      size: "5-6 years",
      gender: "Unisex"
    },
    {
      id: 4,
      name: "School Uniform Polo Shirt",
      price: 18.75,
      currency: "$",
      image: "https://images.unsplash.com/photo-1603252109302-529510058938?w=300&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 450,
      seller: "UniformPro",
      badge: "Essential",
      size: "7-8 years",
      gender: "Boy"
    },
    {
      id: 5,
      name: "Baby Soft Sole Shoes",
      price: 22.00,
      currency: "$",
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=300&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 210,
      seller: "PitterPatter",
      badge: "Top Rated",
      size: "0-6 months",
      gender: "Unisex"
    },
    {
      id: 6,
      name: "Girls' Leggings (2-Pack)",
      price: 19.99,
      originalPrice: 24.99,
      currency: "$",
      image: "https://images.unsplash.com/photo-1600291289602-98a0453111d8?w=300&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 150,
      seller: "ComfyWear",
      discount: 20,
      size: "4-5 years",
      gender: "Girl"
    }
  ];

  const formatPrice = (price, currency) => {
    return isRTL ? `${price} ${currency}` : `${currency}${price}`;
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setScrollPosition(scrollLeft);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: isRTL ? 300 : -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: isRTL ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    console.log('Added to cart:', product.name);
  };

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    console.log('Added to wishlist:', product.name);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="StarHalf" size={12} className="text-yellow-400 fill-current" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Section Header */}
      <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h2 className="text-2xl font-bold text-text-primary font-heading mb-2">
            {t('trendingProducts.title')}
          </h2>
          <p className="text-text-secondary">
            {t('trendingProducts.description')}
          </p>
        </div>

        {/* Desktop Navigation Buttons */}
        <div className="hidden sm:flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="p-2 rounded-full"
            aria-label={isRTL ? t('general.next') : t('general.previous')}
          >
            <Icon name={isRTL ? "ChevronRight" : "ChevronLeft"} size={20} />
          </Button>
          <Button
            variant="ghost"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="p-2 rounded-full"
            aria-label={isRTL ? t('general.previous') : t('general.next')}
          >
            <Icon name={isRTL ? "ChevronLeft" : "ChevronRight"} size={20} />
          </Button>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="flex-shrink-0 w-64 bg-surface rounded-lg border border-border hover:border-primary-200 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={product.image}
                  alt={product.name} // Product names are not translated in this iteration
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {product.badge && (
                  <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-accent text-white text-xs px-2 py-1 rounded-full font-medium`}>
                    {product.badge} {/* This could be t(product.badgeKey) if badges are meant to be translated */}
                  </div>
                )}

                {product.discount && (
                  <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium`}>
                    -{product.discount}%
                  </div>
                )}

                <button
                  onClick={(e) => handleAddToWishlist(e, product)}
                  className={`absolute bottom-3 ${isRTL ? 'left-3' : 'right-3'} w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100`}
                  aria-label={t('productCard.addToWishlist')}
                >
                  <Icon name="Heart" size={16} className="text-text-secondary hover:text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="font-semibold text-text-primary text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {product.name} {/* Product name remains as is */}
                </h3>

                <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center ${isRTL ? 'ml-2' : 'mr-2'}`}>
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-text-secondary">
                    ({product.reviewCount})
                  </span>
                </div>

                <p className="text-xs text-text-secondary mb-3">
                  {t('trendingProducts.bySeller', { sellerName: product.seller })}
                </p>

                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-text-secondary line-through ml-2">
                        {formatPrice(product.originalPrice, product.currency)}
                      </span>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => handleAddToCart(e, product)}
                    className="px-3 py-1"
                    iconName="ShoppingCart"
                    iconPosition="left"
                  >
                    {t('productCard.addToCart')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll indicators */}
        <div className="flex justify-center mt-4 sm:hidden">
          <div className="flex space-x-1">
            {Array.from({ length: Math.ceil(products.length / 2) }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  Math.floor(scrollPosition / 280) === index ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View All Button */}
      <div className="mt-6 text-center">
        <Button
          variant="outline"
          onClick={() => navigate('/product-catalog-search?sort=trending')}
          iconName={isRTL ? "ChevronLeft" : "ChevronRight"}
          iconPosition="right"
        >
          {t('trendingProducts.viewAll')}
        </Button>
      </div>
    </div>
  );
};

export default TrendingProducts;