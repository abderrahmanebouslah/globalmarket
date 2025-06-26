import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ language = 'en', userRole = 'guest', isAuthenticated = false }) => {
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const handleAction = (action) => {
    switch (action) {
      case 'sell':
        if (isAuthenticated) {
          navigate('/seller-dashboard-inventory-management');
        } else {
          navigate('/user-authentication-login-register?intent=seller');
        }
        break;
      case 'search': navigate('/product-catalog-search');
        break;
      case 'categories': navigate('/product-catalog-search?view=categories');
        break;
      case 'deals': navigate('/product-catalog-search?filter=deals');
        break;
      case 'support':
        // Mock support action
        console.log('Opening support chat...');
        break;
      case 'wishlist': navigate('/marketplace-homepage?tab=wishlist');
        break;
      default:
        break;
    }
  };

  const quickActions = [
    {
      id: 'sell',
      title: language === 'ar' ? 'ابدأ البيع' : language === 'fr' ? 'Commencer à vendre' : 'Start Selling',
      subtitle: language === 'ar' ? 'انضم كبائع' : language === 'fr' ? 'Rejoindre en tant que vendeur' : 'Join as a seller',
      icon: 'Store',
      color: 'bg-primary',
      hoverColor: 'hover:bg-primary-700',
      textColor: 'text-white',
      action: 'sell'
    },
    {
      id: 'search',
      title: language === 'ar' ? 'البحث المتقدم' : language === 'fr' ? 'Recherche avancée' : 'Advanced Search',
      subtitle: language === 'ar' ? 'ابحث بالفلاتر' : language === 'fr' ? 'Rechercher avec filtres' : 'Search with filters',
      icon: 'Search',
      color: 'bg-secondary',
      hoverColor: 'hover:bg-secondary-700',
      textColor: 'text-white',
      action: 'search'
    },
    {
      id: 'categories',
      title: language === 'ar' ? 'تصفح الفئات' : language === 'fr' ? 'Parcourir les catégories' : 'Browse Categories',
      subtitle: language === 'ar' ? 'جميع الفئات' : language === 'fr' ? 'Toutes les catégories' : 'All categories',
      icon: 'Grid3X3',
      color: 'bg-accent',
      hoverColor: 'hover:bg-accent-700',
      textColor: 'text-white',
      action: 'categories'
    },
    {
      id: 'deals',
      title: language === 'ar' ? 'العروض الخاصة' : language === 'fr' ? 'Offres spéciales' : 'Special Deals',
      subtitle: language === 'ar' ? 'خصومات حتى 70%' : language === 'fr' ? 'Remises jusqu\'à 70%' : 'Up to 70% off',
      icon: 'Tag',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      textColor: 'text-white',
      action: 'deals'
    }
  ];

  const supportActions = [
    {
      id: 'support',
      title: language === 'ar' ? 'الدعم الفني' : language === 'fr' ? 'Support technique' : 'Customer Support',
      icon: 'HelpCircle',
      action: 'support'
    },
    {
      id: 'wishlist',
      title: language === 'ar' ? 'قائمة الأمنيات' : language === 'fr' ? 'Liste de souhaits' : 'Wishlist',
      icon: 'Heart',
      action: 'wishlist',
      requiresAuth: true
    }
  ];

  return (
    <div className="w-full">
      {/* Main Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action.action)}
            className={`${action.color} ${action.hoverColor} ${action.textColor} rounded-lg p-4 transition-all duration-200 transform hover:scale-105 hover:shadow-lg group`}
          >
            <div className={`flex flex-col items-center ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3 group-hover:bg-opacity-30 transition-all duration-200">
                <Icon name={action.icon} size={24} color="white" />
              </div>
              <h3 className="font-semibold text-sm mb-1 font-heading">
                {action.title}
              </h3>
              <p className="text-xs opacity-90">
                {action.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Support Actions */}
      <div className={`flex items-center justify-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {supportActions.map((action) => {
          if (action.requiresAuth && !isAuthenticated) return null;
          
          return (
            <Button
              key={action.id}
              variant="ghost"
              onClick={() => handleAction(action.action)}
              className="flex items-center space-x-2 text-text-secondary hover:text-primary"
              iconName={action.icon}
              iconPosition="left"
            >
              {action.title}
            </Button>
          );
        })}
      </div>

      {/* Seller Dashboard Quick Access */}
      {isAuthenticated && (userRole === 'seller' || userRole === 'admin') && (
        <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className="font-semibold text-primary font-heading mb-1">
                {userRole === 'admin' 
                  ? (language === 'ar' ? 'لوحة الإدارة' : language === 'fr' ? 'Panneau d\'administration' : 'Admin Dashboard')
                  : (language === 'ar' ? 'لوحة البائع' : language === 'fr' ? 'Tableau de bord vendeur' : 'Seller Dashboard')
                }
              </h3>
              <p className="text-sm text-primary-700">
                {userRole === 'admin'
                  ? (language === 'ar' ? 'إدارة المنصة والمستخدمين' : language === 'fr' ? 'Gérer la plateforme et les utilisateurs' : 'Manage platform and users')
                  : (language === 'ar' ? 'إدارة منتجاتك وطلباتك' : language === 'fr' ? 'Gérez vos produits et commandes' : 'Manage your products and orders')
                }
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => navigate(userRole === 'admin' ? '/admin-dashboard-management' : '/seller-dashboard-inventory-management')}
              iconName={userRole === 'admin' ? 'Settings' : 'BarChart3'}
              iconPosition="left"
            >
              {language === 'ar' ? 'فتح' : language === 'fr' ? 'Ouvrir' : 'Open'}
            </Button>
          </div>
        </div>
      )}

      {/* Guest Call to Action */}
      {!isAuthenticated && (
        <div className="mt-6 p-4 bg-surface border border-border rounded-lg text-center">
          <Icon name="Users" size={32} className="text-text-secondary mx-auto mb-3" />
          <h3 className="font-semibold text-text-primary font-heading mb-2">
            {language === 'ar' ? 'انضم إلى مجتمعنا' : language === 'fr' ? 'Rejoignez notre communauté' : 'Join Our Community'}
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            {language === 'ar' ? 'سجل الآن للحصول على تجربة تسوق مخصصة' : language === 'fr' ? 'Inscrivez-vous maintenant pour une expérience d\'achat personnalisée' : 'Sign up now for a personalized shopping experience'}
          </p>
          <div className={`flex items-center justify-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Button
              variant="outline"
              onClick={() => navigate('/user-authentication-login-register')}
              size="sm"
            >
              {language === 'ar' ? 'تسجيل الدخول' : language === 'fr' ? 'Se connecter' : 'Sign In'}
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/user-authentication-login-register?tab=register')}
              size="sm"
            >
              {language === 'ar' ? 'إنشاء حساب' : language === 'fr' ? 'Créer un compte' : 'Sign Up'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;