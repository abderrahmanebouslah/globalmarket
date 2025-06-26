import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading, language = 'en' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: 'buyer',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isRTL = language === 'ar';

  const labels = {
    en: {
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      accountType: 'Account Type',
      buyer: 'Buyer',
      seller: 'Seller',
      acceptTerms: 'I agree to the Terms of Service and Privacy Policy',
      createAccount: 'Create Account',
      fullNamePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email',
      phonePlaceholder: 'Enter your phone number',
      passwordPlaceholder: 'Create a password',
      confirmPasswordPlaceholder: 'Confirm your password',
      nameRequired: 'Full name is required',
      invalidEmail: 'Please enter a valid email address',
      phoneRequired: 'Phone number is required',
      passwordRequired: 'Password is required',
      passwordTooShort: 'Password must be at least 8 characters',
      passwordMismatch: 'Passwords do not match',
      termsRequired: 'You must accept the terms and conditions'
    },
    ar: {
      fullName: 'الاسم الكامل',
      email: 'عنوان البريد الإلكتروني',
      phone: 'رقم الهاتف',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      accountType: 'نوع الحساب',
      buyer: 'مشتري',
      seller: 'بائع',
      acceptTerms: 'أوافق على شروط الخدمة وسياسة الخصوصية',
      createAccount: 'إنشاء حساب',
      fullNamePlaceholder: 'أدخل اسمك الكامل',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      phonePlaceholder: 'أدخل رقم هاتفك',
      passwordPlaceholder: 'إنشاء كلمة مرور',
      confirmPasswordPlaceholder: 'تأكيد كلمة المرور',
      nameRequired: 'الاسم الكامل مطلوب',
      invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
      phoneRequired: 'رقم الهاتف مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
      passwordTooShort: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      termsRequired: 'يجب قبول الشروط والأحكام'
    },
    fr: {
      fullName: 'Nom complet',
      email: 'Adresse e-mail',
      phone: 'Numéro de téléphone',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      accountType: 'Type de compte',
      buyer: 'Acheteur',
      seller: 'Vendeur',
      acceptTerms: 'J\'accepte les Conditions de Service et la Politique de Confidentialité',
      createAccount: 'Créer un compte',
      fullNamePlaceholder: 'Entrez votre nom complet',
      emailPlaceholder: 'Entrez votre e-mail',
      phonePlaceholder: 'Entrez votre numéro de téléphone',
      passwordPlaceholder: 'Créez un mot de passe',
      confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
      nameRequired: 'Le nom complet est requis',
      invalidEmail: 'Veuillez entrer une adresse e-mail valide',
      phoneRequired: 'Le numéro de téléphone est requis',
      passwordRequired: 'Le mot de passe est requis',
      passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      termsRequired: 'Vous devez accepter les termes et conditions'
    }
  };

  const t = labels[language] || labels.en;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = t.nameRequired;
    }
    
    if (!formData.email) {
      newErrors.email = t.invalidEmail;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t.phoneRequired;
    }
    
    if (!formData.password) {
      newErrors.password = t.passwordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = t.passwordTooShort;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = t.termsRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {t.fullName}
        </label>
        <Input
          type="text"
          placeholder={t.fullNamePlaceholder}
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className={`w-full ${errors.fullName ? 'border-error' : ''}`}
          required
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-error">{errors.fullName}</p>
        )}
      </div>

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
          {t.phone}
        </label>
        <Input
          type="tel"
          placeholder={t.phonePlaceholder}
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`w-full ${errors.phone ? 'border-error' : ''}`}
          required
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-error">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {t.accountType}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleInputChange('accountType', 'buyer')}
            className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
              formData.accountType === 'buyer' ?'border-primary bg-primary-50 text-primary' :'border-border text-text-secondary hover:border-primary-200'
            }`}
          >
            <Icon name="ShoppingCart" size={20} className="mx-auto mb-1" />
            {t.buyer}
          </button>
          <button
            type="button"
            onClick={() => handleInputChange('accountType', 'seller')}
            className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
              formData.accountType === 'seller' ?'border-primary bg-primary-50 text-primary' :'border-border text-text-secondary hover:border-primary-200'
            }`}
          >
            <Icon name="Store" size={20} className="mx-auto mb-1" />
            {t.seller}
          </button>
        </div>
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

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {t.confirmPassword}
        </label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={t.confirmPasswordPlaceholder}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`w-full ${isRTL ? 'pl-10' : 'pr-10'} ${errors.confirmPassword ? 'border-error' : ''}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              isRTL ? 'left-3' : 'right-3'
            } text-text-secondary hover:text-text-primary`}
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label className="flex items-start space-x-3">
          <Input
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
            className={`mt-1 ${errors.acceptTerms ? 'border-error' : ''}`}
          />
          <span className="text-sm text-text-secondary leading-relaxed">
            {t.acceptTerms}
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="mt-1 text-sm text-error">{errors.acceptTerms}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        className="mt-6"
      >
        {t.createAccount}
      </Button>
    </form>
  );
};

export default RegisterForm;