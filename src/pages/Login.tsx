import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BackgroundEffects } from '@/components/common/BackgroundEffects';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema } from '@/lib/validation';
import { Fingerprint, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundEffects />
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1B2B44',
            color: '#F8F9FA',
            border: '1px solid rgba(0, 217, 255, 0.2)',
          },
        }}
      />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-10 py-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-glow to-teal-accent rounded-lg flex items-center justify-center">
            <Fingerprint className="w-5 h-5 text-navy-base" />
          </div>
          <h2 className="text-white text-xl font-bold font-syne">PRISM</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Button>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card w-full max-w-[440px] rounded-xl p-8 md:p-12"
        >
          {/* Logo & Header */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-cyan-glow/10 rounded-full flex items-center justify-center mb-4 mx-auto border border-cyan-glow/20"
            >
              <Fingerprint className="text-cyan-glow text-3xl" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-syne text-white tracking-tight mb-2"
            >
              Dashboard Login
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-cool text-sm"
            >
              Secure Professional Access
            </motion.p>
          </div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <Input
              label="Professional Email"
              type="email"
              placeholder="name@company.com"
              {...register('email')}
              error={errors.email?.message}
            />

            <div className="flex flex-col gap-2">
              <label className="text-gray-cool text-sm font-medium">
                Access Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input-field h-14 pr-12 w-full"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-cool hover:text-cyan-glow transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-gray-cool/30 bg-transparent text-cyan-glow focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                  />
                </div>
                <span className="text-gray-cool text-sm group-hover:text-white transition-colors">
                  Remember device
                </span>
              </label>
              <a 
                href="#" 
                className="text-cyan-glow text-sm font-medium hover:underline decoration-cyan-glow/30"
              >
                Forgot key?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full h-14 text-base"
            >
              <Fingerprint className="w-5 h-5" />
              Authorize Session
            </Button>
          </motion.form>

          {/* Footer Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-cool text-xs">
              Don't have access?{' '}
              <a href="#" className="text-cyan-glow font-semibold hover:underline">
                Request Entry
              </a>
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-10 text-center">
        <p className="text-gray-cool/40 text-[10px] uppercase tracking-[0.2em]">
          Encrypted Session • TLS 1.3 • PRISM Security
        </p>
      </footer>
    </div>
  );
};

export default Login;