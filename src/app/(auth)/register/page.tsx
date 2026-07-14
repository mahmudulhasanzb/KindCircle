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

  // Watch password for real-time validation rules
  const passwordVal = watch('password', '');
  const hasMinLength = passwordVal.length >= 6;
  const hasUppercase = /[A-Z]/.test(passwordVal);
  const hasLowercase = /[a-z]/.test(passwordVal);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const toastId = toast.loading('Uploading profile photo...');
      try {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setPhotoPreview(imageUrl);
          toast.success('Profile photo uploaded successfully!', {
            id: toastId,
          });
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
    console.log(authData);
    console.log(error);

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
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white font-sans antialiased">
      <div className="w-full max-w-[480px] bg-neutral-800 border border-neutral-700/80 rounded-xl p-8 md:p-10 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="mb-8 text-center flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-neutral-400 text-sm mt-1.5 font-medium">
            Join KindCircle to support or launch campaigns.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Biometric Upload */}
          <div className="flex flex-col items-center justify-center space-y-2 mb-4">
            <div className="relative w-24 h-24">
              <div
                onClick={handlePhotoClick}
                className="w-full h-full rounded-full border border-dashed border-neutral-700 hover:border-primary/50 bg-neutral-900 flex items-center justify-center cursor-pointer group transition-all duration-300 overflow-hidden"
              >
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt="Profile Preview"
                    width={96}
                    height={96}
                    unoptimized={true}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-neutral-500 group-hover:text-white transition-colors duration-200">
                    <Camera className="w-7 h-7 stroke-[1.5]" />
                  </div>
                )}
              </div>

              <div
                onClick={handlePhotoClick}
                className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 border-2 border-neutral-800 flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 z-10"
              >
                <Plus className="w-3 h-3 text-white stroke-[3]" />
              </div>
            </div>
            <span className="text-[10px] text-neutral-400 tracking-wider font-extrabold uppercase mt-1">
              Upload Profile Photo
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register('image', {
                onChange: handleFileChange,
              })}
              ref={e => {
                register('image').ref(e);
                fileInputRef.current = e;
              }}
            />
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              placeholder="Jane Doe"
              className="w-full bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            {errors.name && (
              <span className="text-danger text-xs">
                {errors.name.message as string}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="supporter@kindcircle.com"
              className="w-full bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            {errors.email && (
              <span className="text-danger text-xs">
                {errors.email.message as string}
              </span>
            )}
          </div>

          {/* Password Field */}
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
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 cursor-pointer"
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

          {/* Password Validation Hints */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center space-x-2 text-xs">
              <span
                className={`rounded-full p-0.5 ${hasMinLength ? 'bg-success/20 text-success' : 'bg-neutral-900 text-neutral-500'}`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span
                className={
                  hasMinLength ? 'text-neutral-200' : 'text-neutral-500'
                }
              >
                6+ characters
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span
                className={`rounded-full p-0.5 ${hasUppercase ? 'bg-success/20 text-success' : 'bg-neutral-900 text-neutral-500'}`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span
                className={
                  hasUppercase ? 'text-neutral-200' : 'text-neutral-500'
                }
              >
                1 uppercase letter
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span
                className={`rounded-full p-0.5 ${hasLowercase ? 'bg-success/20 text-success' : 'bg-neutral-900 text-neutral-500'}`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span
                className={
                  hasLowercase ? 'text-neutral-200' : 'text-neutral-500'
                }
              >
                1 lowercase letter
              </span>
            </div>
          </div>

          {/* User role selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              I am a…
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                className={`w-full rounded-2xl border-2 px-4 py-3 text-left font-semibold transition-colors cursor-pointer ${
                  role === 'supporter'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-background hover:border-primary/40'
                }`}
                type="button"
                onClick={() => {
                  setRole('supporter');
                }}
              >
                <span className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4" /> Supporter
                </span>
                <span className="text-xs text-neutral-500">
                  Start with 50 credits
                </span>
              </button>
              <button
                className={`w-full rounded-2xl border-2 px-4 py-3 text-left font-semibold transition-colors cursor-pointer ${
                  role === 'creator'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-background hover:border-primary/40'
                }`}
                type="button"
                onClick={() => {
                  setRole('creator');
                }}
              >
                <span className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" /> Creator
                </span>
                <span className="text-xs text-neutral-500">
                  Start with 20 credits
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
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
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          {/* Divider */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-700/60"></div>
            </div>
            <span className="relative bg-neutral-800 px-4 text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest select-none">
              Or Continue With
            </span>
          </div>

          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full bg-neutral-900 hover:bg-neutral-700 border border-neutral-700 text-white font-bold text-xs uppercase py-3.5 rounded-lg cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200"
          >
            {/* Custom Google Icon SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.187 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.63 0 3.106.625 4.22 1.642l3.085-3.085C19.04 2.5 15.9 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.897 0 10.866-4.188 10.866-11.24 0-.768-.078-1.516-.216-2.24H12.24z" />
            </svg>
            <span>Google</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-xs font-semibold text-neutral-400">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="text-primary hover:underline transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
