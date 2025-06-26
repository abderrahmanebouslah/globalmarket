import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MobileTabNavigation from '../../components/ui/MobileTabNavigation';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import SearchHeader from './components/SearchHeader';
import ProductGrid from './components/ProductGrid';
import ProductComparison from './components/ProductComparison';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductCatalogSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  // State management
  const [language, setLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('buyer');
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    categories: searchParams.get('category') ? [searchParams.get('category')] : null,
    brands: null,
    priceRange: null,
    rating: null,
    location: null,
    features: null
  });
  
  // Product data
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [comparisonProducts, setComparisonProducts] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);

  const isRTL = language === 'ar';

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB Natural Titanium",
      seller: "Apple Store",
      price: 1199,
      originalPrice: 1299,
      currency: "USD",
      discount: 8,
      rating: 4.8,
      reviewCount: 2847,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      category: "electronics",
      brand: "apple",
      stock: 15,
      freeShipping: true,
      variants: [
        { id: 'v1', name: '128GB', price: 999 },
        { id: 'v2', name: '256GB', price: 1199 },
        { id: 'v3', name: '512GB', price: 1399 }
      ],
      specifications: {
        display: "6.7-inch Super Retina XDR",
        processor: "A17 Pro chip",
        camera: "48MP Main camera",
        battery: "Up to 29 hours video playback",
        storage: "256GB"
      },
      topReviews: [
        { author: "John D.", rating: 5, comment: "Amazing phone with incredible camera quality. The titanium build feels premium." },
        { author: "Sarah M.", rating: 4, comment: "Great performance but battery could be better for heavy usage." }
      ]
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra 512GB Titanium Black",
      seller: "Samsung Official",
      price: 1299,
      originalPrice: null,
      currency: "USD",
      discount: null,
      rating: 4.7,
      reviewCount: 1923,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      category: "electronics",
      brand: "samsung",
      stock: 8,
      freeShipping: true,
      variants: [
        { id: 'v4', name: '256GB', price: 1199 },
        { id: 'v5', name: '512GB', price: 1299 },
        { id: 'v6', name: '1TB', price: 1599 }
      ],
      specifications: {
        display: "6.8-inch Dynamic AMOLED 2X",
        processor: "Snapdragon 8 Gen 3",
        camera: "200MP Main camera",
        battery: "5000mAh",
        storage: "512GB"
      },
      topReviews: [
        { author: "Mike R.", rating: 5, comment: "Best Android phone I\'ve ever used. S Pen is incredibly useful." },
        { author: "Lisa K.", rating: 4, comment: "Excellent camera system and display quality." }
      ]
    },
    {
      id: 3,
      name: "Nike Air Max 270 React Running Shoes",
      seller: "Nike Store",
      price: 89.99,
      originalPrice: 129.99,
      currency: "USD",
      discount: 31,
      rating: 4.5,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      category: "clothing",
      brand: "nike",
      stock: 23,
      freeShipping: false,
      variants: [
        { id: 'v7', name: 'Size 8', price: 89.99 },
        { id: 'v8', name: 'Size 9', price: 89.99 },
        { id: 'v9', name: 'Size 10', price: 89.99 }
      ],
      specifications: {
        material: "Synthetic and textile upper",
        sole: "React foam midsole",
        closure: "Lace-up",
        weight: "320g (approx.)"
      },
      topReviews: [
        { author: "Alex T.", rating: 5, comment: "Super comfortable for daily wear and running." },
        { author: "Emma W.", rating: 4, comment: "Great value for money. Stylish and comfortable." }
      ]
    },
    {
      id: 4,
      name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      seller: "Sony Electronics",
      price: 349.99,
      originalPrice: 399.99,
      currency: "USD",
      discount: 13,
      rating: 4.9,
      reviewCount: 1234,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      category: "electronics",
      brand: "sony",
      stock: 12,
      freeShipping: true,
      specifications: {
        batteryLife: "Up to 30 hours",
        connectivity: "Bluetooth 5.2",
        noiseCancellation: "Industry-leading",
        weight: "250g"
      },
      topReviews: [
        { author: "David L.", rating: 5, comment: "Best noise cancellation I've experienced. Perfect for travel." },
        { author: "Rachel P.", rating: 5, comment: "Exceptional sound quality and comfort for long listening sessions." }
      ]
    },
    {
      id: 5,
      name: "Adidas Ultraboost 22 Running Shoes",
      seller: "Adidas Official",
      price: 119.99,
      originalPrice: 179.99,
      currency: "USD",
      discount: 33,
      rating: 4.6,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
      category: "clothing",
      brand: "adidas",
      stock: 0,
      freeShipping: true,
      variants: [
        { id: 'v10', name: 'Size 8', price: 119.99 },
        { id: 'v11', name: 'Size 9', price: 119.99 },
        { id: 'v12', name: 'Size 10', price: 119.99 }
      ],
      specifications: {
        technology: "Boost midsole",
        upper: "Primeknit+",
        outsole: "Continental Rubber",
        drop: "10mm"
      },
      topReviews: [
        { author: "Tom H.", rating: 5, comment: "Most comfortable running shoes I've owned." },
        { author: "Jenny S.", rating: 4, comment: "Great for long runs, excellent energy return." }
      ]
    },
    {
      id: 6,
      name: "MacBook Pro 14-inch M3 Pro 512GB Space Black",
      seller: "Apple Store",
      price: 2399,
      originalPrice: null,
      currency: "USD",
      discount: null,
      rating: 4.8,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      category: "electronics",
      brand: "apple",
      stock: 6,
      freeShipping: true,
      specifications: {
        processor: "Apple M3 Pro chip",
        memory: "18GB unified memory",
        storage: "512GB SSD",
        display: "14.2-inch Liquid Retina XDR",
        battery: "Up to 18 hours"
      },
      topReviews: [
        { author: "Mark B.", rating: 5, comment: "Incredible performance for video editing and development work." },
        { author: "Anna C.", rating: 5, comment: "Best laptop I\'ve ever used. The display is stunning." }
      ]
    }
  ];

  // Initialize products based on search/filters
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filteredProducts = [...mockProducts];
      
      // Apply search filter
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply category filter
      if (filters.categories && filters.categories.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters.categories.includes(product.category)
        );
      }
      
      // Apply brand filter
      if (filters.brands && filters.brands.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters.brands.includes(product.brand)
        );
      }
      
      // Apply price range filter
      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(product => {
          const price = product.price;
          const min = filters.priceRange.min;
          const max = filters.priceRange.max;
          
          if (min && max) return price >= min && price <= max;
          if (min) return price >= min;
          if (max) return price <= max;
          return true;
        });
      }
      
      // Apply rating filter
      if (filters.rating && filters.rating.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          filters.rating.some(rating => product.rating >= rating)
        );
      }
      
      // Apply features filter
      if (filters.features && filters.features.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
          return filters.features.every(feature => {
            switch (feature) {
              case 'freeShipping':
                return product.freeShipping;
              case 'fastDelivery':
                return product.freeShipping; // Mock condition
              case 'warranty':
                return true; // Mock condition
              case 'returnPolicy':
                return true; // Mock condition
              case 'newArrival':
                return product.id <= 3; // Mock condition
              case 'onSale':
                return product.discount > 0;
              default:
                return true;
            }
          });
        });
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
        case 'popular':
          filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default: // relevance
          break;
      }
      
      setProducts(filteredProducts);
      setResultsCount(filteredProducts.length);
      setLoading(false);
    }, 500);
  }, [searchQuery, filters, sortBy]);

  // Handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    const newSearchParams = new URLSearchParams(location.search);
    if (query) {
      newSearchParams.set('q', query);
    } else {
      newSearchParams.delete('q');
    }
    navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
  }, [location, navigate]);

  // Handle filter changes
  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  // Handle filter removal
  const handleRemoveFilter = useCallback((filterType, value = null) => {
    if (value && Array.isArray(filters[filterType])) {
      const newValues = filters[filterType].filter(item => item !== value);
      handleFilterChange(filterType, newValues.length > 0 ? newValues : null);
    } else {
      handleFilterChange(filterType, null);
    }
  }, [filters, handleFilterChange]);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setFilters({
      categories: null,
      brands: null,
      priceRange: null,
      rating: null,
      location: null,
      features: null
    });
    
    // Clear URL parameters except search query
    const newSearchParams = new URLSearchParams();
    if (searchQuery) {
      newSearchParams.set('q', searchQuery);
    }
    navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
  }, [searchQuery, location, navigate]);

  // Handle cart operations
  const handleAddToCart = useCallback((product, variant = null) => {
    console.log('Adding to cart:', product, variant);
    // Mock cart functionality
    alert(`Added ${product.name} to cart!`);
  }, []);

  // Handle wishlist operations
  const handleAddToWishlist = useCallback((product) => {
    setWishlistItems(prev => {
      const isInWishlist = prev.some(item => item.id === product.id);
      if (isInWishlist) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  }, []);

  // Handle product comparison
  const handleAddToComparison = useCallback((product) => {
    setComparisonProducts(prev => {
      if (prev.length >= 3) {
        alert('You can compare up to 3 products at a time');
        return prev;
      }
      
      const isInComparison = prev.some(item => item.id === product.id);
      if (isInComparison) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  }, []);

  const handleRemoveFromComparison = useCallback((productId) => {
    setComparisonProducts(prev => prev.filter(item => item.id !== productId));
  }, []);

  const handleClearComparison = useCallback(() => {
    setComparisonProducts([]);
  }, []);

  // Handle load more (infinite scroll)
  const handleLoadMore = useCallback(async () => {
    // Mock load more functionality
    setHasMore(false);
  }, []);

  // Get active filters for display
  const getActiveFilters = () => {
    const active = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value) && value.length > 0) {
          active[key] = value;
        } else if (!Array.isArray(value)) {
          active[key] = value;
        }
      }
    });
    return active;
  };

  const activeFilters = getActiveFilters();

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Global Header */}
      <GlobalHeader
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        language={language}
        onLanguageChange={setLanguage}
        onSearch={handleSearch}
      />

      {/* Breadcrumb Navigation */}
      <div className="space-header">
        <BreadcrumbTrail language={language} />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            language={language}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Search Header */}
          <SearchHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleSearch}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            resultsCount={resultsCount}
            onToggleFilters={() => setShowFilters(true)}
            language={language}
          />

          {/* Active Filter Chips */}
          <FilterChips
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearFilters}
            language={language}
          />

          {/* Product Grid */}
          <div className="flex-1 p-4 lg:p-6">
            <ProductGrid
              products={products}
              viewMode={viewMode}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              loading={loading}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              wishlistItems={wishlistItems}
              language={language}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-mobile-overlay">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)} />
          <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-80 max-w-[90vw]`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isVisible={showFilters}
              onClose={() => setShowFilters(false)}
              language={language}
            />
          </div>
        </div>
      )}

      {/* Product Comparison Modal */}
      <ProductComparison
        comparisonProducts={comparisonProducts}
        onRemoveFromComparison={handleRemoveFromComparison}
        onClearComparison={handleClearComparison}
        onAddToCart={handleAddToCart}
        isVisible={showComparison}
        onClose={() => setShowComparison(false)}
        language={language}
      />

      {/* Floating Comparison Button */}
      {comparisonProducts.length > 0 && (
        <Button
          variant="primary"
          onClick={() => setShowComparison(true)}
          className="fixed bottom-20 right-4 z-dropdown shadow-lg rounded-full px-4 py-3"
          iconName="GitCompare"
          iconPosition="left"
        >
          Compare ({comparisonProducts.length})
        </Button>
      )}

      {/* Floating Add to Comparison Buttons */}
      <div className="hidden lg:block">
        {products.slice(0, 3).map((product, index) => (
          <Button
            key={product.id}
            variant="ghost"
            onClick={() => handleAddToComparison(product)}
            className={`fixed top-1/2 right-4 transform -translate-y-1/2 z-dropdown bg-surface border border-border shadow-md rounded-full p-3 ${
              comparisonProducts.some(p => p.id === product.id) ? 'bg-primary text-white' : ''
            }`}
            style={{ marginTop: `${(index - 1) * 60}px` }}
            title={`${comparisonProducts.some(p => p.id === product.id) ? 'Remove from' : 'Add to'} comparison`}
          >
            <Icon name="GitCompare" size={20} />
          </Button>
        ))}
      </div>

      {/* Mobile Tab Navigation */}
      <MobileTabNavigation
        isAuthenticated={isAuthenticated}
        cartCount={2}
        wishlistCount={wishlistItems.length}
      />
    </div>
  );
};

export default ProductCatalogSearch;