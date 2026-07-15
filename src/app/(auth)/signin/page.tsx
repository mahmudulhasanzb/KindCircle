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
    const { data: authData, error } = await authClient.signIn.email({ email, password });
    if (error) {
      toast.error(error.message || 'Sign in failed');
      return;
    }
    toast.success('Signed in successfully!');
    router.push('/');
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: 'google', callbackURL: '/' });
    } catch (error) {
      toast.error((error as Error).message || 'Google sign in failed');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center py-12 px-4 relative overflow-hidden font-sans antialiased">
      {/* Ambient orbs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative w-full max-w-[440px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 group mb-6">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl font-black text-sm text-white transition-transform group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #6366F1, #0EA5E9)', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}
            >
              KC
            </div>
            <span className="font-black text-xl tracking-tight text-white">
              Kind<span className="text-[#6366F1]">Circle</span>
            </span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
            Welcome back
          </h1>
          <p className="text-sm text-white/45">Sign in to your account to continue.</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border border-white/8 p-8"
          style={{
            background: 'rgba(255,255,255,0.04)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="you@example.com"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 transition-all duration-200 focus:outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: errors.email ? '0 0 0 2px rgba(239,68,68,0.4)' : undefined,
                }}
                onFocus={(e) => { e.target.style.border = '1px solid rgba(99,102,241,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                onBlur={(e) => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.boxShadow = ''; }}
              />
              {errors.email && (
                <span className="text-[#EF4444] text-xs">{errors.email.message as string}</span>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-white/25 transition-all duration-200 focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) => { e.target.style.border = '1px solid rgba(99,102,241,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                  onBlur={(e) => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; e.target.style.boxShadow = ''; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <span className="text-[#EF4444] text-xs">{errors.password.message as string}</span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #0EA5E9)',
                boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
              }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/8" />
              </div>
              <span className="relative px-4 text-[10px] font-black text-white/25 uppercase tracking-widest"
                style={{ background: 'rgba(10,10,15,0.6)', backdropFilter: 'blur(4px)' }}>
                Or continue with
              </span>
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-sm text-white/70 hover:text-white cursor-pointer transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.187 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.63 0 3.106.625 4.22 1.642l3.085-3.085C19.04 2.5 15.9 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.897 0 10.866-4.188 10.866-11.24 0-.768-.078-1.516-.216-2.24H12.24z" />
              </svg>
              <span>Google</span>
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-white/35">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-bold text-[#818CF8] hover:text-[#6366F1] transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
