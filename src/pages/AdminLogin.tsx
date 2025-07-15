import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real authentication logic
    if (username === 'admin' && password === '1234') {
      // تسجيل الدخول في السياق ثم التنقل
      login();
      setUsername('');
      setPassword('');
      setError('');
      setShowPassword(false);
      navigate('/admin', { replace: true });
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-4 rounded-t-2xl mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">تسجيل دخول المشرف</h2>
        </div>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">اسم المستخدم</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="أدخل اسم المستخدم"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-1">كلمة المرور</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="أدخل كلمة المرور"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-2 rounded-2xl shadow-md transition-transform transform hover:scale-105"
          >
            تسجيل الدخول
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          غير مسجل كمشرف؟{' '}
          <a href="/" className="text-yellow-500 hover:underline">
            العودة للرئيسية
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
