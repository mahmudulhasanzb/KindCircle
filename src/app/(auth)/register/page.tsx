'use client';
import { authClient } from '@/lib/auth-client';
import { uploadImage } from '@/lib/uploadImage';
import {
  Camera,
  Check,
  Eye,
  EyeOff,
  HeartHandshake,
  Plus,
  Rocket,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('supporter');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const passwordVal = watch('password', '');
  const hasMinLength = passwordVal.length >= 6;
  const hasUppercase = /[A-Z]/.test(passwordVal);
  const hasLowercase = /[a-z]/.test(passwordVal);

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const toastId = toast.loading('Uploading profile photo...');
      try {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setPhotoPreview(imageUrl);
          toast.success('Profile photo uploaded!', { id: toastId });
        } else {
          toast.error('Failed to upload photo.', { id: toastId });
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to upload photo.', { id: toastId });
      }
    }
  };

  const onSubmit = async (data: any) => {
    const { name, email, password } = data;
    const { data: authData, error } = await authClient.signUp.email({
      name,
      email,
      password,
      role: role,
      credits: role === 'supporter' ? 50 : 20,
      image: photoPreview || undefined,
    } as any);
    if (authData) {
      toast.success('Registration successful!');
      router.push('/');
    }
    if (error) {
      toast.error(error.message as string);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: 'google', callbackURL: '/' });
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
  };

  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.border = '1px solid rgba(99,102,241,0.6)';
      e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.border = '1px solid rgba(255,255,255,0.1)';
      e.target.style.boxShadow = '';
    },
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
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative w-full max-w-[480px]">
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
            Create Account
          </h1>
          <p className="text-sm text-white/45">Join KindCircle to support or launch campaigns.</p>
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
            {/* Avatar upload */}
            <div className="flex flex-col items-center gap-2 mb-2">
              <div className="relative w-20 h-20">
                <div
                  onClick={handlePhotoClick}
                  className="w-full h-full rounded-full overflow-hidden flex items-center justify-center cursor-pointer group transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '2px dashed rgba(99,102,241,0.3)' }}
                >
                  {photoPreview ? (
                    <Image src={photoPreview} alt="Profile Preview" width={80} height={80} unoptimized={true} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/30 group-hover:text-white/60 transition-colors">
                      <Camera className="w-6 h-6 stroke-[1.5]" />
                    </div>
                  )}
                </div>
                <div
                  onClick={handlePhotoClick}
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 z-10"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #0EA5E9)', border: '2px solid rgba(9,9,11,0.8)' }}
                >
                  <Plus className="w-3 h-3 text-white stroke-[3]" />
                </div>
              </div>
              <span className="text-[10px] text-white/30 tracking-widest font-bold uppercase">Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register('image', { onChange: handleFileChange })}
                ref={(e) => {
                  register('image').ref(e);
                  fileInputRef.current = e;
                }}
              />
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Full Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="Jane Doe"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                style={inputStyle}
                {...focusHandlers}
              />
              {errors.name && <span className="text-[#EF4444] text-xs">{errors.name.message as string}</span>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="you@example.com"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                style={inputStyle}
                {...focusHandlers}
              />
              {errors.email && <span className="text-[#EF4444] text-xs">{errors.email.message as string}</span>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                  style={inputStyle}
                  {...focusHandlers}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <span className="text-[#EF4444] text-xs">{errors.password.message as string}</span>}

              {/* Password strength hints */}
              <div className="space-y-1 pt-1">
                {[
                  { met: hasMinLength, label: '6+ characters' },
                  { met: hasUppercase, label: '1 uppercase letter' },
                  { met: hasLowercase, label: '1 lowercase letter' },
                ].map(({ met, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <span
                      className="flex items-center justify-center rounded-full w-4 h-4 transition-all duration-200"
                      style={{ background: met ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)', color: met ? '#4ADE80' : 'rgba(255,255,255,0.25)' }}
                    >
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span style={{ color: met ? '#4ADE80' : 'rgba(255,255,255,0.3)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Role selection */}
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-3">I am a…</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'supporter', icon: <HeartHandshake className="w-4 h-4" />, label: 'Supporter', sub: 'Start with 50 credits' },
                  { value: 'creator', icon: <Rocket className="w-4 h-4" />, label: 'Creator', sub: 'Start with 20 credits' },
                ].map(({ value, icon, label, sub }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className="flex flex-col items-start gap-1 px-4 py-3.5 rounded-xl text-left font-bold transition-all duration-200 cursor-pointer"
                    style={{
                      background: role === value ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                      border: `2px solid ${role === value ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.08)'}`,
                      color: role === value ? '#818CF8' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    <span className="flex items-center gap-2 text-sm">{icon} {label}</span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>{sub}</span>
                  </button>
                ))}
              </div>
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
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
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-sm text-white/70 hover:text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.187 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.63 0 3.106.625 4.22 1.642l3.085-3.085C19.04 2.5 15.9 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.897 0 10.866-4.188 10.866-11.24 0-.768-.078-1.516-.216-2.24H12.24z" />
              </svg>
              <span>Google</span>
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-white/35">
            Already have an account?{' '}
            <Link href="/signin" className="font-bold text-[#818CF8] hover:text-[#6366F1] transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
