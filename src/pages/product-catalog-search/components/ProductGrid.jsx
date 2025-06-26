import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ 
  products, 
  viewMode = 'grid', 
  onLoadMore, 
  hasMore = false, 
  loading = false,
  onAddToCart,
  onAddToWishlist,
  wishlistItems = [],
  language = 'en' 
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const isRTL = language === 'ar';

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, onLoadMore]);

  // Infinite scroll implementation
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        handleLoadMore();
      }
    };

    if (hasMore && !loadingMore) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [hasMore, loadingMore, handleLoadMore]);

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const getGridClasses = () => {
    if (viewMode === 'list') {
      return 'grid grid-cols-1 gap-4';
    }
    
    return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4';
  };

  const renderProductList = (product) => (
    <div key={product.id} className="flex bg-surface border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="w-32 h-32 flex-shrink-0 bg-background">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/assets/images/no_image.png';
          }}
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-text-secondary mb-2">by {product.seller}</p>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-accent fill-current' :'text-border-dark'
                }`}
              />
            ))}
            <span className="text-xs text-text-secondary ml-1">({product.reviewCount})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl font-bold text-primary">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-text-secondary line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="primary"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="flex-1"
            iconName="ShoppingCart"
            iconPosition="left"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          <Button
            variant="ghost"
            onClick={() => onAddToWishlist(product)}
            className="p-2"
          >
            <Icon
              name="Heart"
              size={20}
              className={`${
                isInWishlist(product.id)
                  ? 'text-error fill-current' :'text-text-secondary hover:text-error'
              }`}
            />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mb-4">
        <Icon name="Package" size={48} className="text-text-muted" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">No Products Found</h3>
      <p className="text-text-secondary mb-6 max-w-md">
        We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
      </p>
      <Button
        variant="primary"
        onClick={() => window.location.reload()}
        iconName="RotateCcw"
        iconPosition="left"
      >
        Reset Search
      </Button>
    </div>
  );

  const renderLoadingState = () => (
    <div className="col-span-full flex items-center justify-center py-16">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-text-secondary">Loading products...</p>
      </div>
    </div>
  );

  if (loading && products.length === 0) {
    return (
      <div className={getGridClasses()}>
        {renderLoadingState()}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={getGridClasses()}>
        {renderEmptyState()}
      </div>
    );
  }

  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={getGridClasses()}>
        {products.map((product) => (
          viewMode === 'list' ? (
            renderProductList(product)
          ) : (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              isInWishlist={isInWishlist(product.id)}
              language={language}
            />
          )
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-8 py-3"
            iconName={loadingMore ? "Loader" : "ChevronDown"}
            iconPosition="left"
          >
            {loadingMore ? 'Loading...' : 'Load More Products'}
          </Button>
        </div>
      )}

      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-text-secondary">Loading more products...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;