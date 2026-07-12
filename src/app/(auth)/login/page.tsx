'use client';

import { authClient } from '@/lib/auth-client';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    const { data: authData, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || 'Sign in failed');
      return;
    }

    toast.success('Signed in successfully!');
    router.push('/');
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (error) {
      toast.error((error as Error).message || 'Google sign in failed');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white font-sans antialiased">
      <div className="w-full max-w-[480px] bg-neutral-800 border border-neutral-700/80 rounded-xl p-8 md:p-10 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="mb-8 text-center flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-neutral-400 text-sm mt-1.5 font-medium">
            Sign in to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="you@example.com"
              className="w-full bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            {errors.email && (
              <span className="text-danger text-xs">
                {errors.email.message as string}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                placeholder="••••••••"
                className="w-full bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-4 py-3 text-sm pr-10 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 cursor-pointer transition-colors duration-150"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-danger text-xs">
                {errors.password.message as string}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-[#4F46E5] disabled:bg-primary/50 disabled:text-white/50 text-white font-semibold text-sm uppercase py-4 rounded-lg cursor-pointer disabled:cursor-not-allowed shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all duration-200 transform active:scale-98 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* Divider */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-700/60" />
            </div>
            <span className="relative bg-neutral-800 px-4 text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest select-none">
              Or Continue With
            </span>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full bg-neutral-900 hover:bg-neutral-700 border border-neutral-700 text-white font-bold text-xs uppercase py-3.5 rounded-lg cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.187 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.63 0 3.106.625 4.22 1.642l3.085-3.085C19.04 2.5 15.9 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.897 0 10.866-4.188 10.866-11.24 0-.768-.078-1.516-.216-2.24H12.24z" />
            </svg>
            <span>Google</span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-xs font-semibold text-neutral-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-primary hover:underline transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
