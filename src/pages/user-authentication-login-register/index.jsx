import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import MarketplaceShowcase from './components/MarketplaceShowcase';

const UserAuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isRTL = language === 'ar';

  useEffect(() => {
    // Check if there's a redirect parameter
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [location]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic
      const mockCredentials = {
        'buyer@globalmarket.com': { role: 'buyer', name: 'John Buyer' },
        'seller@globalmarket.com': { role: 'seller', name: 'Jane Seller' },
        'admin@globalmarket.com': { role: 'admin', name: 'Admin User' }
      };

      const user = mockCredentials[formData.email];
      
      if (user) {
        // Store user data (in real app, this would be handled by auth context)
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          role: user.role,
          name: user.name,
          isAuthenticated: true
        }));

        // Redirect based on user role
        switch (user.role) {
          case 'seller': navigate('/seller-dashboard-inventory-management');
            break;
          case 'admin': navigate('/admin-dashboard-management');
            break;
          default:
            navigate('/marketplace-homepage');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      const newUser = {
        email: formData.email,
        role: formData.accountType,
        name: formData.fullName,
        isAuthenticated: true
      };

      localStorage.setItem('user', JSON.stringify(newUser));

      // Redirect based on account type
      if (formData.accountType === 'seller') {
        navigate('/seller-dashboard-inventory-management');
      } else {
        navigate('/marketplace-homepage');
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock social login success
      const socialUser = {
        email: `user@${provider}.com`,
        role: 'buyer',
        name: `${provider} User`,
        isAuthenticated: true,
        provider
      };

      localStorage.setItem('user', JSON.stringify(socialUser));
      navigate('/marketplace-homepage');
    } catch (error) {
      console.error('Social login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const labels = {
    en: {
      welcomeBack: 'Welcome back',
      createAccount: 'Create your account',
      loginSubtitle: 'Sign in to your GlobalMarket account',
      registerSubtitle: 'Join our global marketplace community'
    },
    ar: {
      welcomeBack: 'مرحباً بعودتك',
      createAccount: 'إنشاء حسابك',
      loginSubtitle: 'تسجيل الدخول إلى حساب GlobalMarket الخاص بك',
      registerSubtitle: 'انضم إلى مجتمع السوق العالمي لدينا'
    },
    fr: {
      welcomeBack: 'Bon retour',
      createAccount: 'Créez votre compte',
      loginSubtitle: 'Connectez-vous à votre compte GlobalMarket',
      registerSubtitle: 'Rejoignez notre communauté marketplace mondiale'
    }
  };

  const t = labels[language] || labels.en;

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <AuthHeader 
        language={language} 
        onLanguageChange={handleLanguageChange} 
      />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Authentication Form Section */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md space-y-8">
            {/* Form Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-text-primary font-heading">
                {activeTab === 'login' ? t.welcomeBack : t.createAccount}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                {activeTab === 'login' ? t.loginSubtitle : t.registerSubtitle}
              </p>
            </div>

            {/* Authentication Card */}
            <div className="bg-surface rounded-lg shadow-md border border-border p-8">
              <AuthTabs 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                language={language}
              />

              {activeTab === 'login' ? (
                <LoginForm
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                  language={language}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegister}
                  isLoading={isLoading}
                  language={language}
                />
              )}

              <SocialLogin
                onSocialLogin={handleSocialLogin}
                language={language}
              />
            </div>

            {/* Demo Credentials Info */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-sm">
              <h4 className="font-semibold text-primary mb-2">Demo Credentials:</h4>
              <div className="space-y-1 text-text-secondary">
                <div><strong>Buyer:</strong> buyer@globalmarket.com / buyer123</div>
                <div><strong>Seller:</strong> seller@globalmarket.com / seller123</div>
                <div><strong>Admin:</strong> admin@globalmarket.com / admin123</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketplace Showcase Section */}
        <MarketplaceShowcase language={language} />
      </div>
    </div>
  );
};

export default UserAuthenticationPage;