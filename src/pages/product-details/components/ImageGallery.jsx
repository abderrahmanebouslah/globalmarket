import React, { useState, useRef, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageGallery = ({ images = [], productName = "", language = "en" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const imageRef = useRef(null);
  const thumbnailsRef = useRef(null);

  const isRTL = language === 'ar';
  const minSwipeDistance = 50;

  const defaultImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop"
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };

    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isZoomed]);

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      isRTL ? handlePrevious() : handleNext();
    }
    if (isRightSwipe) {
      isRTL ? handleNext() : handlePrevious();
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      const scrollAmount = 120;
      const scrollDirection = isRTL ? -direction : direction;
      thumbnailsRef.current.scrollBy({
        left: scrollDirection * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Image Display */}
      <div className="relative bg-surface rounded-lg overflow-hidden border border-border">
        <div 
          className="relative aspect-square cursor-zoom-in"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseMove={handleMouseMove}
          onClick={handleZoomToggle}
        >
          <Image
            ref={imageRef}
            src={galleryImages[currentImageIndex]}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={isZoomed ? {
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            } : {}}
          />
          
          {/* Navigation Arrows */}
          {galleryImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className={`absolute top-1/2 transform -translate-y-1/2 ${
                  isRTL ? 'right-2' : 'left-2'
                } w-10 h-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70 rounded-full`}
              >
                <Icon name={isRTL ? "ChevronRight" : "ChevronLeft"} size={20} />
              </Button>
              
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className={`absolute top-1/2 transform -translate-y-1/2 ${
                  isRTL ? 'left-2' : 'right-2'
                } w-10 h-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70 rounded-full`}
              >
                <Icon name={isRTL ? "ChevronLeft" : "ChevronRight"} size={20} />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>

          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full">
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} />
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {galleryImages.length > 1 && (
        <div className="relative">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => scrollThumbnails(-1)}
              className="flex-shrink-0 w-8 h-8 p-0 bg-surface-hover hover:bg-surface-active rounded-full"
            >
              <Icon name={isRTL ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
            
            <div 
              ref={thumbnailsRef}
              className="flex space-x-2 overflow-x-auto scrollbar-hide flex-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'border-primary shadow-md'
                      : 'border-border hover:border-border-dark'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            
            <Button
              variant="ghost"
              onClick={() => scrollThumbnails(1)}
              className="flex-shrink-0 w-8 h-8 p-0 bg-surface-hover hover:bg-surface-active rounded-full"
            >
              <Icon name={isRTL ? "ChevronLeft" : "ChevronRight"} size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-modal flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70 rounded-full"
            >
              <Icon name="X" size={20} />
            </Button>
            
            <Image
              src={galleryImages[currentImageIndex]}
              alt={`${productName} - Zoomed view`}
              className="max-w-full max-h-full object-contain"
            />
            
            {galleryImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  className={`absolute top-1/2 transform -translate-y-1/2 ${
                    isRTL ? 'right-4' : 'left-4'
                  } w-12 h-12 bg-black bg-opacity-50 text-white hover:bg-opacity-70 rounded-full`}
                >
                  <Icon name={isRTL ? "ChevronRight" : "ChevronLeft"} size={24} />
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={handleNext}
                  className={`absolute top-1/2 transform -translate-y-1/2 ${
                    isRTL ? 'left-4' : 'right-4'
                  } w-12 h-12 bg-black bg-opacity-50 text-white hover:bg-opacity-70 rounded-full`}
                >
                  <Icon name={isRTL ? "ChevronLeft" : "ChevronRight"} size={24} />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;