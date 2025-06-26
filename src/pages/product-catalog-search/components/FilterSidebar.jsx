import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isVisible = true, 
  onClose,
  language = 'en' 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: false,
    rating: false,
    location: false,
    features: false
  });

  const [priceRange, setPriceRange] = useState({
    min: filters.priceRange?.min || '',
    max: filters.priceRange?.max || ''
  });

  const isRTL = language === 'ar';

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    
    if (newRange.min !== '' || newRange.max !== '') {
      onFilterChange('priceRange', {
        min: newRange.min ? parseFloat(newRange.min) : null,
        max: newRange.max ? parseFloat(newRange.max) : null
      });
    } else {
      onFilterChange('priceRange', null);
    }
  };

  const handleCheckboxChange = (filterType, value, checked) => {
    const currentValues = filters[filterType] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }
    
    onFilterChange(filterType, newValues.length > 0 ? newValues : null);
  };

  const categories = [
    { id: 'electronics', name: 'Electronics', count: 1250 },
    { id: 'clothing', name: 'Clothing & Fashion', count: 890 },
    { id: 'home', name: 'Home & Garden', count: 654 },
    { id: 'sports', name: 'Sports & Outdoors', count: 432 },
    { id: 'books', name: 'Books & Media', count: 321 },
    { id: 'beauty', name: 'Beauty & Personal Care', count: 298 },
    { id: 'automotive', name: 'Automotive', count: 187 },
    { id: 'toys', name: 'Toys & Games', count: 156 }
  ];

  const brands = [
    { id: 'apple', name: 'Apple', count: 89 },
    { id: 'samsung', name: 'Samsung', count: 76 },
    { id: 'nike', name: 'Nike', count: 65 },
    { id: 'adidas', name: 'Adidas', count: 54 },
    { id: 'sony', name: 'Sony', count: 43 },
    { id: 'lg', name: 'LG', count: 38 },
    { id: 'hp', name: 'HP', count: 32 },
    { id: 'dell', name: 'Dell', count: 28 }
  ];

  const locations = [
    { id: 'usa', name: 'United States', count: 2340 },
    { id: 'canada', name: 'Canada', count: 567 },
    { id: 'uk', name: 'United Kingdom', count: 432 },
    { id: 'germany', name: 'Germany', count: 321 },
    { id: 'france', name: 'France', count: 298 },
    { id: 'saudi', name: 'Saudi Arabia', count: 187 }
  ];

  const features = [
    { id: 'freeShipping', name: 'Free Shipping', count: 1890 },
    { id: 'fastDelivery', name: 'Fast Delivery (1-2 days)', count: 756 },
    { id: 'warranty', name: 'Warranty Included', count: 543 },
    { id: 'returnPolicy', name: '30-Day Returns', count: 432 },
    { id: 'newArrival', name: 'New Arrivals', count: 234 },
    { id: 'onSale', name: 'On Sale', count: 189 }
  ];

  const renderFilterSection = (title, items, filterKey, icon) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => toggleSection(filterKey)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <div className="flex items-center space-x-2">
          <Icon name={icon} size={18} className="text-text-secondary" />
          <span className="font-medium text-text-primary">{title}</span>
        </div>
        <Icon
          name="ChevronDown"
          size={16}
          className={`text-text-secondary transition-transform duration-200 ${
            expandedSections[filterKey] ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {expandedSections[filterKey] && (
        <div className="mt-3 space-y-2 animate-slide-down">
          {items.map((item) => (
            <label
              key={item.id}
              className="flex items-center justify-between cursor-pointer hover:bg-surface-hover p-2 rounded transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={(filters[filterKey] || []).includes(item.id)}
                  onChange={(e) => handleCheckboxChange(filterKey, item.id, e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-200"
                />
                <span className="text-sm text-text-primary">{item.name}</span>
              </div>
              <span className="text-xs text-text-secondary">({item.count})</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const renderPriceFilter = () => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => toggleSection('price')}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <div className="flex items-center space-x-2">
          <Icon name="DollarSign" size={18} className="text-text-secondary" />
          <span className="font-medium text-text-primary">Price Range</span>
        </div>
        <Icon
          name="ChevronDown"
          size={16}
          className={`text-text-secondary transition-transform duration-200 ${
            expandedSections.price ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {expandedSections.price && (
        <div className="mt-3 space-y-3 animate-slide-down">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="flex items-center">
              <span className="text-text-secondary">-</span>
            </div>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
          
          {/* Quick Price Ranges */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Under $25', min: null, max: 25 },
              { label: '$25 - $50', min: 25, max: 50 },
              { label: '$50 - $100', min: 50, max: 100 },
              { label: 'Over $100', min: 100, max: null }
            ].map((range) => (
              <button
                key={`${range.min}-${range.max}`}
                onClick={() => {
                  setPriceRange({ min: range.min || '', max: range.max || '' });
                  onFilterChange('priceRange', range);
                }}
                className="px-3 py-2 text-xs border border-border rounded hover:border-primary hover:bg-primary-50 transition-colors duration-200"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderRatingFilter = () => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => toggleSection('rating')}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={18} className="text-text-secondary" />
          <span className="font-medium text-text-primary">Customer Rating</span>
        </div>
        <Icon
          name="ChevronDown"
          size={16}
          className={`text-text-secondary transition-transform duration-200 ${
            expandedSections.rating ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {expandedSections.rating && (
        <div className="mt-3 space-y-2 animate-slide-down">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center justify-between cursor-pointer hover:bg-surface-hover p-2 rounded transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={(filters.rating || []).includes(rating)}
                  onChange={(e) => handleCheckboxChange('rating', rating, e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-200"
                />
                <div className="flex items-center space-x-1">
                  {[...Array(rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-accent fill-current" />
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-border-dark" />
                  ))}
                  <span className="text-sm text-text-primary ml-1">& Up</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  if (!isVisible) return null;

  return (
    <div className={`bg-surface border-r border-border h-full overflow-y-auto ${isRTL ? 'border-l border-r-0' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        <Button variant="ghost" onClick={onClose} className="p-2">
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="p-4">
        {/* Clear Filters */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary hidden lg:block">Filters</h3>
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary-700"
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        </div>

        {/* Filter Sections */}
        {renderFilterSection('Categories', categories, 'categories', 'Grid3X3')}
        {renderPriceFilter()}
        {renderFilterSection('Brands', brands, 'brands', 'Tag')}
        {renderRatingFilter()}
        {renderFilterSection('Location', locations, 'location', 'MapPin')}
        {renderFilterSection('Features', features, 'features', 'Zap')}
      </div>

      {/* Mobile Apply Button */}
      <div className="lg:hidden sticky bottom-0 p-4 bg-surface border-t border-border">
        <Button
          variant="primary"
          onClick={onClose}
          className="w-full"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;