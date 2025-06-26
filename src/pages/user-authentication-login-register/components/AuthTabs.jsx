import React from 'react';

const AuthTabs = ({ activeTab, onTabChange, language = 'en' }) => {
  const isRTL = language === 'ar';
  
  const tabs = [
    { id: 'login', label: language === 'ar' ? 'تسجيل الدخول' : language === 'fr' ? 'Connexion' : 'Sign In' },
    { id: 'register', label: language === 'ar' ? 'إنشاء حساب' : language === 'fr' ? 'S\'inscrire' : 'Create Account' }
  ];

  return (
    <div className="flex bg-secondary-100 rounded-lg p-1 mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-surface text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;