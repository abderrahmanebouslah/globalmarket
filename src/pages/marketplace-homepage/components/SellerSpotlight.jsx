import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SellerSpotlight = ({ language = 'en' }) => {
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const featuredSellers = [
    {
      id: 1,
      name: "TechWorld Electronics",
      nameAr: "عالم التكنولوجيا للإلكترونيات",
      nameFr: "TechWorld Électronique",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop",
      rating: 4.8,
      reviewCount: 2456,
      productCount: 1234,
      location: "San Francisco, USA",
      locationAr: "سان فرانسيسكو، الولايات المتحدة",
      locationFr: "San Francisco, États-Unis",
      description: "Premium electronics and gadgets from trusted brands worldwide",
      descriptionAr: "إلكترونيات وأدوات عالية الجودة من علامات تجارية موثوقة حول العالم",
      descriptionFr: "Électronique et gadgets haut de gamme de marques de confiance dans le monde entier",
      badge: "Verified Seller",
      specialOffer: "Free shipping on orders over $50"
    },
    {
      id: 2,
      name: "Fashion Forward",
      nameAr: "الأزياء المتقدمة",
      nameFr: "Mode Avant-garde",
      logo: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=100&h=100&fit=crop",
      banner: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=200&fit=crop",
      rating: 4.6,
      reviewCount: 1789,
      productCount: 856,
      location: "Milan, Italy",
      locationAr: "ميلان، إيطاليا",
      locationFr: "Milan, Italie",
      description: "Trendy fashion and accessories for the modern lifestyle",
      descriptionAr: "أزياء وإكسسوارات عصرية لنمط الحياة الحديث",
      descriptionFr: "Mode tendance et accessoires pour le style de vie moderne",
      badge: "Top Rated",
      specialOffer: "30% off on new arrivals"
    },
    {
      id: 3,
      name: "Green Living Co.",
      nameAr: "شركة الحياة الخضراء",
      nameFr: "Green Living Co.",
      logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop",
      banner: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=200&fit=crop",
      rating: 4.9,
      reviewCount: 987,
      productCount: 432,
      location: "Portland, USA",
      locationAr: "بورتلاند، الولايات المتحدة",
      locationFr: "Portland, États-Unis",
      description: "Eco-friendly products for sustainable living",
      descriptionAr: "منتجات صديقة للبيئة للعيش المستدام",
      descriptionFr: "Produits écologiques pour un mode de vie durable",
      badge: "Eco Certified",
      specialOffer: "Buy 2 get 1 free on selected items"
    }
  ];

  const getSellerName = (seller) => {
    switch (language) {
      case 'ar':
        return seller.nameAr;
      case 'fr':
        return seller.nameFr;
      default:
        return seller.name;
    }
  };

  const getSellerLocation = (seller) => {
    switch (language) {
      case 'ar':
        return seller.locationAr;
      case 'fr':
        return seller.locationFr;
      default:
        return seller.location;
    }
  };

  const getSellerDescription = (seller) => {
    switch (language) {
      case 'ar':
        return seller.descriptionAr;
      case 'fr':
        return seller.descriptionFr;
      default:
        return seller.description;
    }
  };

  const handleSellerClick = (seller) => {
    navigate(`/product-catalog-search?seller=${encodeURIComponent(seller.name)}`);
  };

  const handleViewAllSellers = () => {
    navigate('/product-catalog-search?view=sellers');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="StarHalf" size={14} className="text-yellow-400 fill-current" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h2 className="text-2xl font-bold text-text-primary font-heading mb-2">
            {language === 'ar' ? 'البائعون المميزون' : language === 'fr' ? 'Vendeurs en vedette' : 'Featured Sellers'}
          </h2>
          <p className="text-text-secondary">
            {language === 'ar' ? 'تسوق من أفضل البائعين الموثوقين' : language === 'fr' ? 'Achetez auprès des meilleurs vendeurs de confiance' : 'Shop from top trusted sellers'}
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={handleViewAllSellers}
          className="flex items-center space-x-2 text-primary hover:text-primary-700"
          iconName={isRTL ? "ChevronLeft" : "ChevronRight"}
          iconPosition="right"
        >
          {language === 'ar' ? 'عرض الكل' : language === 'fr' ? 'Voir tout' : 'View All'}
        </Button>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredSellers.map((seller) => (
          <div
            key={seller.id}
            onClick={() => handleSellerClick(seller)}
            className="bg-surface rounded-lg border border-border hover:border-primary-200 hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden"
          >
            {/* Seller Banner */}
            <div className="relative h-32 overflow-hidden">
              <Image
                src={seller.banner}
                alt={`${getSellerName(seller)} banner`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-200" />
              
              {/* Badge */}
              <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium`}>
                {seller.badge}
              </div>
            </div>

            {/* Seller Info */}
            <div className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {/* Logo and Name */}
              <div className={`flex items-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
                  <Image
                    src={seller.logo}
                    alt={`${getSellerName(seller)} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`${isRTL ? 'mr-3' : 'ml-3'} min-w-0`}>
                  <h3 className="font-semibold text-text-primary text-sm group-hover:text-primary transition-colors duration-200 truncate">
                    {getSellerName(seller)}
                  </h3>
                  <div className={`flex items-center text-xs text-text-secondary ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon name="MapPin" size={12} className={isRTL ? 'ml-1' : 'mr-1'} />
                    <span className="truncate">{getSellerLocation(seller)}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {getSellerDescription(seller)}
              </p>

              {/* Stats */}
              <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center ${isRTL ? 'ml-2' : 'mr-2'}`}>
                    {renderStars(seller.rating)}
                  </div>
                  <span className="text-xs text-text-secondary">
                    {seller.rating} ({seller.reviewCount})
                  </span>
                </div>
                <span className="text-xs text-text-secondary">
                  {seller.productCount} {language === 'ar' ? 'منتج' : language === 'fr' ? 'produits' : 'products'}
                </span>
              </div>

              {/* Special Offer */}
              <div className="bg-accent-50 border border-accent-200 rounded-lg p-2 mb-3">
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Icon name="Gift" size={14} className={`text-accent ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span className="text-xs text-accent font-medium">
                    {seller.specialOffer}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:border-primary group-hover:text-primary"
                iconName="Store"
                iconPosition="left"
              >
                {language === 'ar' ? 'زيارة المتجر' : language === 'fr' ? 'Visiter la boutique' : 'Visit Store'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="mt-6 md:hidden">
        <Button
          variant="outline"
          onClick={handleViewAllSellers}
          className="w-full"
          iconName="Users"
          iconPosition="left"
        >
          {language === 'ar' ? 'عرض جميع البائعين' : language === 'fr' ? 'Voir tous les vendeurs' : 'View All Sellers'}
        </Button>
      </div>
    </div>
  );
};

export default SellerSpotlight;