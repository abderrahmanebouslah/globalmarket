import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const FeaturedCategories = ({ language = 'en' }) => {
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const categories = [
    {
      id: 1,
      name: "Electronics",
      nameAr: "الإلكترونيات",
      nameFr: "Électronique",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      productCount: "15,234",
      icon: "Smartphone",
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Fashion",
      nameAr: "الأزياء",
      nameFr: "Mode",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      productCount: "28,567",
      icon: "Shirt",
      color: "bg-pink-500"
    },
    {
      id: 3,
      name: "Home & Garden",
      nameAr: "المنزل والحديقة",
      nameFr: "Maison et Jardin",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      productCount: "12,890",
      icon: "Home",
      color: "bg-green-500"
    },
    {
      id: 4,
      name: "Sports & Fitness",
      nameAr: "الرياضة واللياقة",
      nameFr: "Sport et Fitness",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      productCount: "9,456",
      icon: "Dumbbell",
      color: "bg-orange-500"
    },
    {
      id: 5,
      name: "Books & Media",
      nameAr: "الكتب والوسائط",
      nameFr: "Livres et Médias",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      productCount: "7,123",
      icon: "Book",
      color: "bg-purple-500"
    },
    {
      id: 6,
      name: "Beauty & Health",
      nameAr: "الجمال والصحة",
      nameFr: "Beauté et Santé",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      productCount: "11,789",
      icon: "Heart",
      color: "bg-red-500"
    }
  ];

  const getCategoryName = (category) => {
    switch (language) {
      case 'ar':
        return category.nameAr;
      case 'fr':
        return category.nameFr;
      default:
        return category.name;
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/product-catalog-search?category=${encodeURIComponent(category.name.toLowerCase())}`);
  };

  const handleViewAllCategories = () => {
    navigate('/product-catalog-search?view=categories');
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h2 className="text-2xl font-bold text-text-primary font-heading mb-2">
            {language === 'ar' ? 'الفئات المميزة' : language === 'fr' ? 'Catégories en vedette' : 'Featured Categories'}
          </h2>
          <p className="text-text-secondary">
            {language === 'ar' ? 'اكتشف المنتجات حسب الفئة' : language === 'fr' ? 'Découvrez les produits par catégorie' : 'Discover products by category'}
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={handleViewAllCategories}
          className="flex items-center space-x-2 text-primary hover:text-primary-700"
          iconName={isRTL ? "ChevronLeft" : "ChevronRight"}
          iconPosition="right"
        >
          {language === 'ar' ? 'عرض الكل' : language === 'fr' ? 'Voir tout' : 'View All'}
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="group cursor-pointer bg-surface rounded-lg border border-border hover:border-primary-200 hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Category Image */}
            <div className="relative h-32 sm:h-36 overflow-hidden">
              <Image
                src={category.image}
                alt={getCategoryName(category)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-200" />
              
              {/* Category Icon */}
              <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-8 h-8 ${category.color} rounded-full flex items-center justify-center shadow-lg`}>
                <Icon name={category.icon} size={16} color="white" />
              </div>
            </div>

            {/* Category Info */}
            <div className={`p-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="font-semibold text-text-primary text-sm mb-1 group-hover:text-primary transition-colors duration-200">
                {getCategoryName(category)}
              </h3>
              <p className="text-xs text-text-secondary">
                {category.productCount} {language === 'ar' ? 'منتج' : language === 'fr' ? 'produits' : 'products'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="mt-6 sm:hidden">
        <Button
          variant="outline"
          onClick={handleViewAllCategories}
          className="w-full"
          iconName="Grid3X3"
          iconPosition="left"
        >
          {language === 'ar' ? 'عرض جميع الفئات' : language === 'fr' ? 'Voir toutes les catégories' : 'View All Categories'}
        </Button>
      </div>
    </div>
  );
};

export default FeaturedCategories;