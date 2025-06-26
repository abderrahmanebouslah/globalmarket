import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  onSearch, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  resultsCount,
  onToggleFilters,
  language = 'en' 
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  const isRTL = language === 'ar';

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearchChange(value);
  };

  const currentSortOption = sortOptions.find(option => option.value === sortBy) || sortOptions[0];

  return (
    <div className={`bg-surface border-b border-border ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products, brands, categories..."
              value={localSearchQuery}
              onChange={handleSearchChange}
              className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 bg-background border-border rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary`}
            />
            <Icon 
              name="Search" 
              size={20} 
              className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-text-secondary`}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 px-4 py-1.5`}
          >
            Search
          </Button>
        </form>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between p-4">
        {/* Results Count & Filter Toggle */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onToggleFilters}
            className="lg:hidden flex items-center space-x-2 px-3 py-2"
            iconName="Filter"
            iconPosition="left"
          >
            Filters
          </Button>
          
          <div className="text-sm text-text-secondary">
            {resultsCount > 0 ? (
              <span>
                Showing <span className="font-medium text-text-primary">{resultsCount.toLocaleString()}</span> results
                {searchQuery && (
                  <span> for "<span className="font-medium text-text-primary">{searchQuery}</span>"</span>
                )}
              </span>
            ) : (
              <span>No results found</span>
            )}
          </div>
        </div>

        {/* Sort & View Controls */}
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg"
            >
              <Icon name={currentSortOption.icon} size={16} />
              <span className="hidden sm:inline text-sm">{currentSortOption.label}</span>
              <span className="sm:hidden text-sm">Sort</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {showSortDropdown && (
              <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-dropdown animate-slide-down`}>
                <div className="py-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center space-x-3 ${
                        sortBy === option.value
                          ? 'bg-primary-50 text-primary' :'text-text-primary hover:bg-surface-hover'
                      }`}
                    >
                      <Icon name={option.icon} size={16} />
                      <span>{option.label}</span>
                      {sortBy === option.value && (
                        <Icon name="Check" size={16} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
            {viewModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => onViewModeChange(mode.value)}
                className={`px-3 py-2 transition-colors duration-200 ${
                  viewMode === mode.value
                    ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:bg-surface-hover hover:text-primary'
                }`}
                title={mode.label}
              >
                <Icon name={mode.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showSortDropdown && (
        <div
          className="fixed inset-0 z-dropdown"
          onClick={() => setShowSortDropdown(false)}
        />
      )}
    </div>
  );
};

export default SearchHeader;