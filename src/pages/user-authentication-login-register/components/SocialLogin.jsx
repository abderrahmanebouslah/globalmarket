import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin, language = 'en' }) => {
  const isRTL = language === 'ar';

  const labels = {
    en: {
      continueWith: 'Or continue with',
      google: 'Continue with Google',
      facebook: 'Continue with Facebook'
    },
    ar: {
      continueWith: 'أو تابع مع',
      google: 'تابع مع جوجل',
      facebook: 'تابع مع فيسبوك'
    },
    fr: {
      continueWith: 'Ou continuer avec',
      google: 'Continuer avec Google',
      facebook: 'Continuer avec Facebook'
    }
  };

  const t = labels[language] || labels.en;

  const socialProviders = [
    {
      id: 'google',
      name: t.google,
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-text-primary',
      borderColor: 'border-border',
      hoverBg: 'hover:bg-gray-50'
    },
    {
      id: 'facebook',
      name: t.facebook,
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
      hoverBg: 'hover:bg-blue-700'
    }
  ];

  return (
    <div className="mt-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-secondary">
            {t.continueWith}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onSocialLogin(provider.id)}
            className={`w-full flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
              provider.bgColor
            } ${provider.textColor} ${provider.borderColor} ${provider.hoverBg} hover:shadow-sm`}
          >
            <Icon 
              name={provider.icon} 
              size={20} 
              className={`${isRTL ? 'ml-3' : 'mr-3'}`}
            />
            {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;