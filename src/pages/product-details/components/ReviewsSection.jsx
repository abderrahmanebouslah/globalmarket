import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReviewsSection = ({ productId, language = "en" }) => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showPhotosOnly, setShowPhotosOnly] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState(new Set());

  const isRTL = language === 'ar';

  const mockReviews = [
    {
      id: "rev-001",
      user: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        verified: true
      },
      rating: 5,
      title: "Excellent quality and fast delivery!",
      content: `I'm absolutely thrilled with this purchase! The quality exceeded my expectations and the delivery was incredibly fast. The product works exactly as described and the customer service was outstanding.\n\nI've been using it for a few weeks now and it's been perfect. Highly recommend to anyone considering this product.`,
      date: new Date(Date.now() - 86400000 * 3),
      helpful: 24,
      verified: true,
      photos: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop"
      ]
    },
    {
      id: "rev-002",
      user: {
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        verified: true
      },
      rating: 4,
      title: "Good product, minor issues",
      content: `Overall a solid product with good build quality. There were a few minor issues with the setup process, but customer support helped resolve them quickly. The performance has been reliable since then.`,
      date: new Date(Date.now() - 86400000 * 7),
      helpful: 18,
      verified: true,
      photos: []
    },
    {
      id: "rev-003",
      user: {
        name: "Emma Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        verified: false
      },
      rating: 5,
      title: "Perfect for my needs",
      content: `This product is exactly what I was looking for. The design is sleek and modern, and it fits perfectly in my workspace. The functionality is intuitive and user-friendly.`,
      date: new Date(Date.now() - 86400000 * 12),
      helpful: 31,
      verified: false,
      photos: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
      ]
    },
    {
      id: "rev-004",
      user: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        verified: true
      },
      rating: 3,
      title: "Average product",
      content: `The product is okay but nothing special. It does what it's supposed to do, but I expected more for the price point. The build quality could be better.`,
      date: new Date(Date.now() - 86400000 * 18),
      helpful: 7,
      verified: true,
      photos: []
    },
    {
      id: "rev-005",
      user: {
        name: "Lisa Thompson",
        avatar: "https://randomuser.me/api/portraits/women/41.jpg",
        verified: true
      },
      rating: 5,
      title: "Outstanding value!",
      content: `Incredible value for money! The quality is top-notch and it arrived well-packaged. I've recommended this to several friends already. The seller was also very responsive to my questions.`,
      date: new Date(Date.now() - 86400000 * 25),
      helpful: 42,
      verified: true,
      photos: [
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop"
      ]
    }
  ];

  const formatDate = (date) => {
    return new Intl.DateTimeFormat(
      language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US',
      { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }
    ).format(date);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat(
      language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US'
    ).format(number);
  };

  const getFilteredReviews = () => {
    let filtered = mockReviews;

    if (selectedRating !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(selectedRating));
    }

    if (showPhotosOnly) {
      filtered = filtered.filter(review => review.photos.length > 0);
    }

    // Sort reviews
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.date - a.date;
        case 'oldest':
          return a.date - b.date;
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return b.date - a.date;
      }
    });

    return filtered;
  };

  const toggleExpandReview = (reviewId) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const calculateRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    mockReviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = calculateRatingDistribution();
  const totalReviews = mockReviews.length;
  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const filteredReviews = getFilteredReviews();

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Reviews Summary */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-text-primary">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className={`${
                      i < Math.floor(averageRating)
                        ? 'text-accent fill-current'
                        : i < averageRating
                        ? 'text-accent fill-current opacity-50' :'text-text-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-text-secondary">
              Based on {formatNumber(totalReviews)} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = ratingDistribution[rating];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm text-text-secondary">{rating}</span>
                    <Icon name="Star" size={14} className="text-accent fill-current" />
                  </div>
                  
                  <div className="flex-1 bg-surface-hover rounded-full h-2">
                    <div
                      className="bg-accent rounded-full h-2 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  <span className="text-sm text-text-secondary w-8 text-right">
                    {formatNumber(count)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Rating Filter */}
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary-200 focus:border-primary"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          {/* Photos Filter */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showPhotosOnly}
              onChange={(e) => setShowPhotosOnly(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">With Photos</span>
          </label>
        </div>

        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary-200 focus:border-primary"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="MessageSquare" size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">No reviews match your filters.</p>
          </div>
        ) : (
          filteredReviews.map((review) => {
            const isExpanded = expandedReviews.has(review.id);
            const shouldTruncate = review.content.length > 200;
            const displayContent = isExpanded || !shouldTruncate 
              ? review.content 
              : review.content.substring(0, 200) + '...';

            return (
              <div key={review.id} className="bg-surface rounded-lg p-6 border border-border">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={review.user.avatar}
                      alt={review.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-text-primary">
                          {review.user.name}
                        </span>
                        {review.verified && (
                          <span className="bg-success-100 text-success-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={14}
                              className={`${
                                i < review.rating
                                  ? 'text-accent fill-current' :'text-text-muted'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-text-secondary">
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="space-y-3">
                  {review.title && (
                    <h4 className="font-medium text-text-primary">{review.title}</h4>
                  )}
                  
                  <div className="text-text-secondary whitespace-pre-line">
                    {displayContent}
                    {shouldTruncate && (
                      <Button
                        variant="link"
                        onClick={() => toggleExpandReview(review.id)}
                        className="ml-2 p-0 text-primary hover:underline"
                      >
                        {isExpanded ? 'Show Less' : 'Read More'}
                      </Button>
                    )}
                  </div>

                  {/* Review Photos */}
                  {review.photos.length > 0 && (
                    <div className="flex space-x-2 overflow-x-auto">
                      {review.photos.map((photo, index) => (
                        <Image
                          key={index}
                          src={photo}
                          alt={`Review photo ${index + 1}`}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  )}

                  {/* Review Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <Button
                      variant="ghost"
                      iconName="ThumbsUp"
                      iconPosition="left"
                      className="text-text-secondary hover:text-primary"
                    >
                      Helpful ({formatNumber(review.helpful)})
                    </Button>
                    
                    <Button
                      variant="ghost"
                      iconName="Flag"
                      className="text-text-secondary hover:text-error"
                    >
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {filteredReviews.length > 0 && (
        <div className="text-center">
          <Button variant="outline" className="px-8">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;