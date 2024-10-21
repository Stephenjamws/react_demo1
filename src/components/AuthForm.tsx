import React, { useState } from 'react';
import { User, Lock, Mail, Phone, Eye, EyeOff, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AuthForm() {
  const [authState, setAuthState] = useState('login'); // 'login', 'register', 'forgotPassword'
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    usernameOrEmail: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    agreeTerms: false,
    rememberMe: false,
    resetEmail: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
    if (authState === 'login') {
      if (!form.usernameOrEmail) newErrors.usernameOrEmail = '用户名或邮箱不能为空';
      if (!form.password) newErrors.password = '密码不能为空';
    } else if (authState === 'register') {
      if (form.username.length < 4 || form.username.length > 16) {
        newErrors.username = '用户名长度应为4-16个字符';
      }
      if (form.password.length < 8 || form.password.length > 20) {
        newErrors.password = '密码长度应为8-20个字符';
      }
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = '两次输入的密码不一致';
      }
      if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = '请输入有效的邮箱地址';
      }
      if (!form.agreeTerms) {
        newErrors.agreeTerms = '请同意用户协议和隐私政策';
      }
    } else if (authState === 'forgotPassword') {
      if (!/\S+@\S+\.\S+/.test(form.resetEmail)) {
        newErrors.resetEmail = '请输入有效的邮箱地址';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Form submitted:', form);
        if (authState === 'login') {
          alert('登录成功！');
        } else if (authState === 'register') {
          alert('注册成功！');
        } else if (authState === 'forgotPassword') {
          alert('密码重置链接已发送到您的邮箱！');
        }
        // Here you would typically redirect to a welcome or dashboard page
      } catch (error) {
        console.error('Submission failed:', error);
        alert('操作失败，请稍后再试');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderForm = () => {
    switch (authState) {
      case 'login':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700 mb-1">用户名或邮箱</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="请输入用户名或邮箱"
                  value={form.usernameOrEmail}
                  onChange={handleChange}
                />
              </div>
              {errors.usernameOrEmail && <p className="text-red-500 text-xs mt-1">{errors.usernameOrEmail}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="请输入密码"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition duration-300 ease-in-out"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  记住我
                </label>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setAuthState('forgotPassword')}
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300 ease-in-out"
                >
                  忘记密码？
                </button>
              </div>
            </div>
          </>
        );
      case 'register':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="请输入用户名"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="请输入有效的邮箱地址"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="请输入密码"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="请再次输入密码"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">手机号（选填）</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="请输入手机号（可选）"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="agree-terms"
                name="agreeTerms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition duration-300 ease-in-out"
                checked={form.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                我已阅读并同意
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300 ease-in-out"> 《用户协议》 </a>
                和
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300 ease-in-out"> 《隐私政策》 </a>
              </label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
          </>
        );
      case 'forgotPassword':
        return (
          <div className="mb-4">
            <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="resetEmail"
                name="resetEmail"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                placeholder="请输入您的邮箱地址"
                value={form.resetEmail}
                onChange={handleChange}
              />
            </div>
            {errors.resetEmail && <p className="text-red-500 text-xs mt-1">{errors.resetEmail}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform transition-all hover:scale-105 duration-300">
        <div>
          <img className="mx-auto h-16 w-auto" src="/placeholder.svg?height=64&width=64" alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {authState === 'login' ? '登录您的账户' : authState === 'register' ? '创建新账户' : '重置密码'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {authState === 'login' ? '开始您的学习之旅' : authState === 'register' ? '加入我们，开始您的学习之旅' : '我们将向您发送密码重置链接'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {renderForm()}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <CheckCircle className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                )}
              </span>
              {isSubmitting ? '提交中...' : (authState === 'login' ? '登录' : authState === 'register' ? '注册' : '发送重置链接')}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            {authState === 'login' ? '还没有账号？' : authState === 'register' ? '已有账号？' : '记起密码了？'}
            <button
              type="button"
              onClick={() => setAuthState(authState === 'login' ? 'register' : 'login')}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300 ease-in-out ml-1 focus:outline-none"
            >
              {authState === 'login' ? '立即注册' : authState === 'register' ? '立即登录' : '返回登录'}
              <ArrowRight className="inline-block w-4 h-4 ml-1" />
            </button>
          </p>
        </div>
        {authState === 'forgotPassword' && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setAuthState('login')}
              className="flex items-center justify-center w-full text-sm text-indigo-600 hover:text-indigo-500 transition duration-300 ease-in-out focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回登录
            </button>
          </div>
        )}
      </div>
    </div>
  );
}