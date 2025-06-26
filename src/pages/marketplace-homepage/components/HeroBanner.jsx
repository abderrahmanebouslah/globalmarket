import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroBanner = ({ language = 'en' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const isRTL = language === 'ar';

  const banners = [
    {
      id: 1,
      title: "Summer Sale - Up to 70% Off",
      subtitle: "Discover amazing deals on electronics, fashion, and home essentials",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop",
      ctaText: "Shop Now",
      ctaAction: () => navigate('/product-catalog-search?category=electronics'),
      backgroundColor: "bg-gradient-to-r from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "New Arrivals Collection",
      subtitle: "Fresh styles and trending products from top sellers worldwide",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      ctaText: "Explore",
      ctaAction: () => navigate('/product-catalog-search?sort=newest'),
      backgroundColor: "bg-gradient-to-r from-green-600 to-teal-600"
    },
    {
      id: 3,
      title: "Global Sellers Marketplace",
      subtitle: "Connect with sellers from around the world and discover unique products",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
      ctaText: "Browse All",
      ctaAction: () => navigate('/product-catalog-search'),
      backgroundColor: "bg-gradient-to-r from-orange-600 to-red-600"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentBanner = banners[currentSlide];

  return (
    <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg bg-surface shadow-md">
      {/* Banner Content */}
      <div className={`relative w-full h-full ${currentBanner.backgroundColor}`}>
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        
        {/* Background Image */}
        <Image
          src={currentBanner.image}
          alt={currentBanner.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content Overlay */}
        <div className={`absolute inset-0 flex items-center ${isRTL ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-lg p-6 sm:p-8 lg:p-12 text-white ${isRTL ? 'text-right' : 'text-left'}`}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 font-heading leading-tight">
              {currentBanner.title}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg mb-6 opacity-90 leading-relaxed">
              {currentBanner.subtitle}
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={currentBanner.ctaAction}
              className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
            >
              {currentBanner.ctaText}
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm`}
          aria-label="Previous slide"
        >
          <Icon name={isRTL ? "ChevronRight" : "ChevronLeft"} size={20} color="white" />
        </button>

        <button
          onClick={handleNextSlide}
          className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm`}
          aria-label="Next slide"
        >
          <Icon name={isRTL ? "ChevronLeft" : "ChevronRight"} size={20} color="white" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-110' :'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} color="white" />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;