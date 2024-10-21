import React, { useState } from 'react';
import { User, Mail, Lock, Phone, RefreshCw } from 'lucide-react';
import InputField from './InputField';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    captcha: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.username.length < 4 || formData.username.length > 16) {
      newErrors.username = '用户名长度应为4-16个字符';
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(formData.password)) {
      newErrors.password = '密码长度应为8-20个字符，必须包含字母和数字';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入有效的手机号码';
    }

    if (!formData.captcha) {
      newErrors.captcha = '请输入验证码';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !agreedToTerms) return;

    setIsSubmitting(true);
    // Simulating API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('注册成功！');
      // Reset form or redirect user
    } catch (error) {
      alert('注册失败，请稍后再试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        icon={<User className="w-5 h-5 text-gray-400" />}
        type="text"
        name="username"
        placeholder="请输入用户名"
        value={formData.username}
        onChange={handleInputChange}
        error={errors.username}
      />
      <InputField
        icon={<Mail className="w-5 h-5 text-gray-400" />}
        type="email"
        name="email"
        placeholder="请输入有效的邮箱地址"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
      />
      <InputField
        icon={<Lock className="w-5 h-5 text-gray-400" />}
        type="password"
        name="password"
        placeholder="请输入密码"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
      />
      <InputField
        icon={<Lock className="w-5 h-5 text-gray-400" />}
        type="password"
        name="confirmPassword"
        placeholder="请再次输入密码"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={errors.confirmPassword}
      />
      <InputField
        icon={<Phone className="w-5 h-5 text-gray-400" />}
        type="tel"
        name="phone"
        placeholder="请输入手机号（可选）"
        value={formData.phone}
        onChange={handleInputChange}
        error={errors.phone}
      />
      <div className="flex items-center space-x-2">
        <InputField
          icon={<RefreshCw className="w-5 h-5 text-gray-400" />}
          type="text"
          name="captcha"
          placeholder="请输入验证码"
          value={formData.captcha}
          onChange={handleInputChange}
          error={errors.captcha}
        />
        <img src="https://via.placeholder.com/100x40?text=Captcha" alt="Captcha" className="h-10 rounded" />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
          我已阅读并同意<a href="#" className="text-indigo-600 hover:text-indigo-500">《用户协议》</a>和<a href="#" className="text-indigo-600 hover:text-indigo-500">《隐私政策》</a>
        </label>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !agreedToTerms}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          (isSubmitting || !agreedToTerms) && 'opacity-50 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? '正在提交...' : '立即注册'}
      </button>
    </form>
  );
};

export default RegistrationForm;