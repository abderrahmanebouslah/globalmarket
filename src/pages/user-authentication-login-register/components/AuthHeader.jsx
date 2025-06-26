import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ language = 'en', onLanguageChange }) => {
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const handleLogoClick = () => {
    navigate('/marketplace-homepage');
  };

  return (
    <header className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg mr-3 group-hover:bg-primary-700 transition-colors duration-200">
              <Icon name="Globe" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary font-heading">GlobalMarket</span>
              <span className="text-xs text-text-secondary font-caption -mt-1">Worldwide Commerce</span>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange?.(lang.code)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  language === lang.code
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="hidden sm:inline">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;