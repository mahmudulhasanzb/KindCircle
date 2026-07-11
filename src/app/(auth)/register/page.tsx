"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Upload, X, ChevronDown } from "lucide-react";
import PasswordStrength from "@/components/ui/PasswordStrength";
import { signUp } from "@/lib/auth-client";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  image?: string;
  general?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // --- Validation ---
  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Enter a valid email address";
    }
    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 6) {
      errs.password = "Must be at least 6 characters";
    }
    if (!role) errs.role = "Choose a role";
    return errs;
  }

  // --- Image handling ---
  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Select an image file" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image must be under 5 MB",
      }));
      return;
    }

    setImageFile(file);
    setErrors((prev) => ({ ...prev, image: undefined }));
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // --- Submit ---
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);

    try {
      let imageUrl: string | undefined;

      // Upload profile picture to imgBB if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const imgBBKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        if (imgBBKey) {
          const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${imgBBKey}`,
            { method: "POST", body: formData }
          );
          const data = await res.json();
          if (data.success) {
            imageUrl = data.data.url;
          }
        }
      }

      await signUp.email({
        name,
        email,
        password,
        image: imageUrl,
      });

      router.push("/login");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setErrors({ general: message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-xl sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Create your account</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Start supporting or creating campaigns on KindCircle
        </p>
      </div>

      {errors.general && (
        <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name */}
        <div>
          <label
            htmlFor="register-name"
            className="mb-1.5 block text-[13px] font-medium text-neutral-300"
          >
            Full name
          </label>
          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className={`w-full rounded-lg border bg-neutral-950 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none transition-all focus:ring-2 focus:ring-primary/40 ${
              errors.name ? "border-danger" : "border-neutral-700"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-danger">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="register-email"
            className="mb-1.5 block text-[13px] font-medium text-neutral-300"
          >
            Email
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`w-full rounded-lg border bg-neutral-950 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none transition-all focus:ring-2 focus:ring-primary/40 ${
              errors.email ? "border-danger" : "border-neutral-700"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-danger">{errors.email}</p>
          )}
        </div>

        {/* Profile Picture */}
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-neutral-300">
            Profile picture{" "}
            <span className="text-neutral-600">(optional)</span>
          </label>
          {imagePreview ? (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="h-14 w-14 rounded-full object-cover border border-neutral-700"
              />
              <button
                type="button"
                onClick={removeImage}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-danger transition-colors"
              >
                <X size={14} />
                Remove
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-500 transition-colors hover:border-primary/50 hover:text-neutral-300"
            >
              <Upload size={16} />
              Choose image
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          {errors.image && (
            <p className="mt-1 text-xs text-danger">{errors.image}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="register-password"
            className="mb-1.5 block text-[13px] font-medium text-neutral-300"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className={`w-full rounded-lg border bg-neutral-950 px-3.5 py-2.5 pr-10 text-sm text-white placeholder:text-neutral-600 outline-none transition-all focus:ring-2 focus:ring-primary/40 ${
                errors.password ? "border-danger" : "border-neutral-700"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-danger">{errors.password}</p>
          )}
          <PasswordStrength password={password} />
        </div>

        {/* Role Dropdown */}
        <div>
          <label
            htmlFor="register-role"
            className="mb-1.5 block text-[13px] font-medium text-neutral-300"
          >
            I want to
          </label>
          <div className="relative">
            <select
              id="register-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full appearance-none rounded-lg border bg-neutral-950 px-3.5 py-2.5 pr-10 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/40 ${
                role ? "text-white" : "text-neutral-600"
              } ${errors.role ? "border-danger" : "border-neutral-700"}`}
            >
              <option value="" disabled>
                Choose your role
              </option>
              <option value="supporter">Support campaigns</option>
              <option value="creator">Create campaigns</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />
          </div>
          {errors.role && (
            <p className="mt-1 text-xs text-danger">{errors.role}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#4F46E5] focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
