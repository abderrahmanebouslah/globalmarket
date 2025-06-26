import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const MarketplaceShowcase = ({ language = 'en' }) => {
  const isRTL = language === 'ar';

  const content = {
    en: {
      title: 'Join the Global Marketplace',
      subtitle: 'Connect with buyers and sellers worldwide',
      features: [
        {
          icon: 'Globe',
          title: 'Global Reach',
          description: 'Access customers and products from around the world'
        },
        {
          icon: 'Shield',
          title: 'Secure Transactions',
          description: 'Protected payments and verified seller profiles'
        },
        {
          icon: 'TrendingUp',
          title: 'Grow Your Business',
          description: 'Powerful tools to scale your online presence'
        },
        {
          icon: 'Users',
          title: 'Trusted Community',
          description: 'Join millions of satisfied buyers and sellers'
        }
      ],
      stats: [
        { value: '2M+', label: 'Active Users' },
        { value: '50K+', label: 'Products' },
        { value: '180+', label: 'Countries' }
      ]
    },
    ar: {
      title: 'انضم إلى السوق العالمي',
      subtitle: 'تواصل مع المشترين والبائعين في جميع أنحاء العالم',
      features: [
        {
          icon: 'Globe',
          title: 'وصول عالمي',
          description: 'الوصول إلى العملاء والمنتجات من جميع أنحاء العالم'
        },
        {
          icon: 'Shield',
          title: 'معاملات آمنة',
          description: 'مدفوعات محمية وملفات بائعين موثقة'
        },
        {
          icon: 'TrendingUp',
          title: 'نمي عملك',
          description: 'أدوات قوية لتوسيع حضورك على الإنترنت'
        },
        {
          icon: 'Users',
          title: 'مجتمع موثوق',
          description: 'انضم إلى ملايين المشترين والبائعين الراضين'
        }
      ],
      stats: [
        { value: '2M+', label: 'مستخدم نشط' },
        { value: '50K+', label: 'منتج' },
        { value: '180+', label: 'دولة' }
      ]
    },
    fr: {
      title: 'Rejoignez la Marketplace Mondiale',
      subtitle: 'Connectez-vous avec des acheteurs et vendeurs du monde entier',
      features: [
        {
          icon: 'Globe',
          title: 'Portée Mondiale',
          description: 'Accédez aux clients et produits du monde entier'
        },
        {
          icon: 'Shield',
          title: 'Transactions Sécurisées',
          description: 'Paiements protégés et profils vendeurs vérifiés'
        },
        {
          icon: 'TrendingUp',
          title: 'Développez Votre Entreprise',
          description: 'Outils puissants pour développer votre présence en ligne'
        },
        {
          icon: 'Users',
          title: 'Communauté de Confiance',
          description: 'Rejoignez des millions d\'acheteurs et vendeurs satisfaits'
        }
      ],
      stats: [
        { value: '2M+', label: 'Utilisateurs Actifs' },
        { value: '50K+', label: 'Produits' },
        { value: '180+', label: 'Pays' }
      ]
    }
  };

  const t = content[language] || content.en;

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-primary-50 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-accent rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-secondary rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-primary-200 rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center px-12 py-16">
        {/* Hero Content */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4 font-heading">
            {t.title}
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            {t.subtitle}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-6">
          {t.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name={feature.icon} size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Marketplace Image */}
        <div className="mt-12">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Global marketplace illustration"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceShowcase;