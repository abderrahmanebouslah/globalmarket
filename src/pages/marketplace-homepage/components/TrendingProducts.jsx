import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TrendingProducts = ({ language = 'en' }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const isRTL = language === 'ar';

  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      nameAr: "سماعات بلوتوث لاسلكية",
      nameFr: "Écouteurs Bluetooth sans fil",
      price: 89.99,
      originalPrice: 129.99,
      currency: "$",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 1234,
      seller: "TechStore Global",
      badge: "Best Seller",
      discount: 31
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      nameAr: "ساعة ذكية للياقة البدنية",
      nameFr: "Montre de fitness intelligente",
      price: 199.99,
      originalPrice: 249.99,
      currency: "$",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 856,
      seller: "FitTech Pro",
      badge: "Trending",
      discount: 20
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      nameAr: "قميص قطني عضوي",
      nameFr: "T-shirt en coton biologique",
      price: 24.99,
      originalPrice: 34.99,
      currency: "$",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 432,
      seller: "EcoFashion",
      badge: "Eco-Friendly",
      discount: 29
    },
    {
      id: 4,
      name: "Portable Coffee Maker",
      nameAr: "صانعة قهوة محمولة",
      nameFr: "Cafetière portable",
      price: 45.99,
      originalPrice: 59.99,
      currency: "$",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 678,
      seller: "BrewMaster",
      badge: "New Arrival",
      discount: 23
    },
    {
      id: 5,
      name: "LED Desk Lamp",
      nameAr: "مصباح مكتب LED",
      nameFr: "Lampe de bureau LED",
      price: 32.99,
      originalPrice: 42.99,
      currency: "$",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 321,
      seller: "LightCraft",
      badge: "Energy Efficient",
      discount: 23
    },
    {
      id: 6,
      name: "Wireless Phone Charger",
      nameAr: "شاحن هاتف لاسلكي",
      nameFr: "Chargeur de téléphone sans fil",
      price: 19.99,
      originalPrice: 29.99,
      currency: "$",
      image: "https://images.unsplash.com/photo-1609592806955-d4b5e5b6e5e5?w=300&h=300&fit=crop",
      rating: 4.2,
      reviewCount: 567,
      seller: "ChargeTech",
      badge: "Fast Charging",
      discount: 33
    }
  ];

  const getProductName = (product) => {
    switch (language) {
      case 'ar':
        return product.nameAr;
      case 'fr':
        return product.nameFr;
      default:
        return product.name;
    }
  };

  const formatPrice = (price, currency) => {
    return language === 'ar' ? `${price} ${currency}` : `${currency}${price}`;
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
    // Mock add to cart functionality
    console.log('Added to cart:', product.name);
  };

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    // Mock add to wishlist functionality
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
    <div className="w-full">
      {/* Section Header */}
      <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h2 className="text-2xl font-bold text-text-primary font-heading mb-2">
            {language === 'ar' ? 'المنتجات الرائجة' : language === 'fr' ? 'Produits tendance' : 'Trending Products'}
          </h2>
          <p className="text-text-secondary">
            {language === 'ar' ? 'اكتشف أحدث المنتجات الشائعة' : language === 'fr' ? 'Découvrez les derniers produits populaires' : 'Discover the latest popular products'}
          </p>
        </div>

        {/* Desktop Navigation Buttons */}
        <div className="hidden sm:flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="p-2 rounded-full"
          >
            <Icon name={isRTL ? "ChevronRight" : "ChevronLeft"} size={20} />
          </Button>
          <Button
            variant="ghost"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="p-2 rounded-full"
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
                  alt={getProductName(product)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-accent text-white text-xs px-2 py-1 rounded-full font-medium`}>
                    {product.badge}
                  </div>
                )}

                {/* Discount Badge */}
                {product.discount && (
                  <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium`}>
                    -{product.discount}%
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => handleAddToWishlist(e, product)}
                  className={`absolute bottom-3 ${isRTL ? 'left-3' : 'right-3'} w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100`}
                >
                  <Icon name="Heart" size={16} className="text-text-secondary hover:text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="font-semibold text-text-primary text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {getProductName(product)}
                </h3>

                {/* Rating */}
                <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center ${isRTL ? 'ml-2' : 'mr-2'}`}>
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-text-secondary">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Seller */}
                <p className="text-xs text-text-secondary mb-3">
                  {language === 'ar' ? 'بواسطة' : language === 'fr' ? 'par' : 'by'} {product.seller}
                </p>

                {/* Price */}
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

                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => handleAddToCart(e, product)}
                    className="px-3 py-1"
                    iconName="ShoppingCart"
                    iconPosition="left"
                  >
                    {language === 'ar' ? 'أضف' : language === 'fr' ? 'Ajouter' : 'Add'}
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
          {language === 'ar' ? 'عرض جميع المنتجات الرائجة' : language === 'fr' ? 'Voir tous les produits tendance' : 'View All Trending Products'}
        </Button>
      </div>
    </div>
  );
};

export default TrendingProducts;