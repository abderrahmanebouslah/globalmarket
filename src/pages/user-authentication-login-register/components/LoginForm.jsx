import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, language = 'en' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const isRTL = language === 'ar';

  const labels = {
    en: {
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember me',
      signIn: 'Sign In',
      forgotPassword: 'Forgot your password?',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      invalidEmail: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      invalidCredentials: 'Invalid email or password. Please try again.'
    },
    ar: {
      email: 'عنوان البريد الإلكتروني',
      password: 'كلمة المرور',
      rememberMe: 'تذكرني',
      signIn: 'تسجيل الدخول',
      forgotPassword: 'نسيت كلمة المرور؟',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      passwordPlaceholder: 'أدخل كلمة المرور',
      invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
      passwordRequired: 'كلمة المرور مطلوبة',
      invalidCredentials: 'بريد إلكتروني أو كلمة مرور غير صحيحة. يرجى المحاولة مرة أخرى.'
    },
    fr: {
      email: 'Adresse e-mail',
      password: 'Mot de passe',
      rememberMe: 'Se souvenir de moi',
      signIn: 'Se connecter',
      forgotPassword: 'Mot de passe oublié ?',
      emailPlaceholder: 'Entrez votre e-mail',
      passwordPlaceholder: 'Entrez votre mot de passe',
      invalidEmail: 'Veuillez entrer une adresse e-mail valide',
      passwordRequired: 'Le mot de passe est requis',
      invalidCredentials: 'E-mail ou mot de passe invalide. Veuillez réessayer.'
    }
  };

  const t = labels[language] || labels.en;

  // Mock credentials for demo
  const mockCredentials = {
    buyer: { email: 'buyer@globalmarket.com', password: 'buyer123' },
    seller: { email: 'seller@globalmarket.com', password: 'seller123' },
    admin: { email: 'admin@globalmarket.com', password: 'admin123' }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = t.invalidEmail;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    
    if (!formData.password) {
      newErrors.password = t.passwordRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Check mock credentials
    const isValidCredentials = Object.values(mockCredentials).some(
      cred => cred.email === formData.email && cred.password === formData.password
    );

    if (!isValidCredentials) {
      setErrors({ general: t.invalidCredentials });
      return;
    }

    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {errors.general && (
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {t.email}
        </label>
        <Input
          type="email"
          placeholder={t.emailPlaceholder}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full ${errors.email ? 'border-error' : ''}`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {t.password}
        </label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={t.passwordPlaceholder}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full ${isRTL ? 'pl-10' : 'pr-10'} ${errors.password ? 'border-error' : ''}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              isRTL ? 'left-3' : 'right-3'
            } text-text-secondary hover:text-text-primary`}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <Input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-text-secondary">{t.rememberMe}</span>
        </label>
        <button
          type="button"
          className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
        >
          {t.forgotPassword}
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        {t.signIn}
      </Button>
    </form>
  );
};

export default LoginForm;