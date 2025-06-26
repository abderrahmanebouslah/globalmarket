import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll, language = 'en' }) => {
  const isRTL = language === 'ar';

  const formatFilterValue = (key, value) => {
    switch (key) {
      case 'categories':
        const categoryNames = {
          'electronics': 'Electronics',
          'clothing': 'Clothing & Fashion',
          'home': 'Home & Garden',
          'sports': 'Sports & Outdoors',
          'books': 'Books & Media',
          'beauty': 'Beauty & Personal Care',
          'automotive': 'Automotive',
          'toys': 'Toys & Games'
        };
        return categoryNames[value] || value;
      
      case 'brands':
        return value.charAt(0).toUpperCase() + value.slice(1);
      
      case 'location':
        const locationNames = {
          'usa': 'United States',
          'canada': 'Canada',
          'uk': 'United Kingdom',
          'germany': 'Germany',
          'france': 'France',
          'saudi': 'Saudi Arabia'
        };
        return locationNames[value] || value;
      
      case 'features':
        const featureNames = {
          'freeShipping': 'Free Shipping',
          'fastDelivery': 'Fast Delivery',
          'warranty': 'Warranty Included',
          'returnPolicy': '30-Day Returns',
          'newArrival': 'New Arrivals',
          'onSale': 'On Sale'
        };
        return featureNames[value] || value;
      
      case 'rating':
        return `${value}+ Stars`;
      
      case 'priceRange':
        if (value.min && value.max) {
          return `$${value.min} - $${value.max}`;
        } else if (value.min) {
          return `Over $${value.min}`;
        } else if (value.max) {
          return `Under $${value.max}`;
        }
        return 'Price Range';
      
      default:
        return value;
    }
  };

  const getFilterChips = () => {
    const chips = [];
    
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (!value) return;
      
      if (key === 'priceRange') {
        chips.push({
          key: `${key}`,
          label: formatFilterValue(key, value),
          onRemove: () => onRemoveFilter(key)
        });
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          chips.push({
            key: `${key}-${item}`,
            label: formatFilterValue(key, item),
            onRemove: () => onRemoveFilter(key, item)
          });
        });
      } else {
        chips.push({
          key: `${key}-${value}`,
          label: formatFilterValue(key, value),
          onRemove: () => onRemoveFilter(key, value)
        });
      }
    });
    
    return chips;
  };

  const chips = getFilterChips();

  if (chips.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 p-4 bg-background border-b border-border ${isRTL ? 'flex-row-reverse' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center space-x-2">
        <Icon name="Filter" size={16} className="text-text-secondary" />
        <span className="text-sm font-medium text-text-primary">Active Filters:</span>
      </div>
      
      <div className="flex flex-wrap gap-2 flex-1">
        {chips.map((chip) => (
          <div
            key={chip.key}
            className="inline-flex items-center bg-primary-50 text-primary px-3 py-1 rounded-full text-sm border border-primary-200"
          >
            <span className="mr-2">{chip.label}</span>
            <button
              onClick={chip.onRemove}
              className="hover:bg-primary-100 rounded-full p-0.5 transition-colors duration-200"
              aria-label={`Remove ${chip.label} filter`}
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ))}
      </div>
      
      {chips.length > 1 && (
        <Button
          variant="ghost"
          onClick={onClearAll}
          className="text-sm text-text-secondary hover:text-primary"
          iconName="X"
          iconPosition="left"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default FilterChips;