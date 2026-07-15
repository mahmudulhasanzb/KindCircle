'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { uploadImage } from '@/lib/uploadImage';
import { createCampaignAction } from '@/lib/api/campaigns/actions';

const CATEGORIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'education', label: 'Education' },
  { value: 'health', label: 'Health' },
  { value: 'environment', label: 'Environment' },
  { value: 'arts-culture', label: 'Arts & Culture' },
  { value: 'community', label: 'Community' },
  { value: 'business', label: 'Business' },
  { value: 'sports', label: 'Sports' },
];

export default function AddCampaignForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const [formData, setFormData] = useState({
    title: '',
    story: '',
    category: 'technology',
    funding_goal: '',
    minimum_contribution: '',
    deadline: '',
    reward_info: '',
  });

  // Get tomorrow's date in YYYY-MM-DD format to set as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    const toastId = toast.loading('Uploading cover image...');
    try {
      const url = await uploadImage(file);
      if (url) {
        setImageUrl(url);
        toast.success('Image uploaded successfully!', { id: toastId });
      } else {
        toast.error('Failed to upload image. Try again.', { id: toastId });
        setImagePreview('');
      }
    } catch {
      toast.error('Failed to upload image.', { id: toastId });
      setImagePreview('');
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { title, story, category, funding_goal, minimum_contribution, deadline, reward_info } = formData;

    if (!title.trim() || !story.trim() || !category || !funding_goal || !minimum_contribution || !deadline || !reward_info.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!imageUrl) {
      toast.error('Please upload a cover image');
      return;
    }

    const goalNum = parseFloat(funding_goal);
    const minContributionNum = parseFloat(minimum_contribution);

    if (isNaN(goalNum) || goalNum <= 0) {
      toast.error('Funding goal must be greater than 0');
      return;
    }

    if (isNaN(minContributionNum) || minContributionNum <= 0) {
      toast.error('Minimum contribution must be greater than 0');
      return;
    }

    if (minContributionNum > goalNum) {
      toast.error('Minimum contribution cannot exceed funding goal');
      return;
    }

    const deadlineDate = new Date(deadline);
    if (deadlineDate.getTime() <= Date.now()) {
      toast.error('Deadline must be a future date');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Creating your campaign...');

    try {
      const res = await createCampaignAction({
        title: title.trim(),
        story: story.trim(),
        category,
        funding_goal: goalNum,
        minimum_contribution: minContributionNum,
        deadline: new Date(deadline).toISOString(),
        reward_info: reward_info.trim(),
        image_url: imageUrl,
      });

      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && (res.message.includes('failed') || res.status === 400 || res.status === 500)) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('Campaign created successfully! Pending admin approval.', { id: toastId });
        router.push('/dashboard/creator/my-campaigns');
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'An unexpected error occurred', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div
        className="p-5 sm:p-6 bg-neutral-100 dark:bg-neutral-800 border border-white/5 rounded-xl space-y-6"
        style={{ borderRadius: '12px', padding: '24px' }}
      >
        <h2 className="text-xl font-bold text-foreground pb-2 border-b border-neutral-200 dark:border-neutral-700/50">
          Campaign Details
        </h2>

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="campaign-title" className="text-xs font-semibold text-foreground">
            Campaign Title
          </label>
          <input
            id="campaign-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Give your campaign a clear, descriptive title"
            required
            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200"
            style={{ borderRadius: '8px' }}
          />
        </div>

        {/* Story */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="campaign-story" className="text-xs font-semibold text-foreground">
            Campaign Story
          </label>
          <textarea
            id="campaign-story"
            name="story"
            rows={5}
            value={formData.story}
            onChange={handleInputChange}
            placeholder="Describe your project, why you are raising funds, and what you hope to achieve"
            required
            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200"
            style={{ borderRadius: '8px' }}
          />
        </div>

        {/* Grid for category & deadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="campaign-category" className="text-xs font-semibold text-foreground">
              Category
            </label>
            <select
              id="campaign-category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200 cursor-pointer"
              style={{ borderRadius: '8px' }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="campaign-deadline" className="text-xs font-semibold text-foreground">
              Deadline Date
            </label>
            <input
              id="campaign-deadline"
              type="date"
              name="deadline"
              min={minDateString}
              value={formData.deadline}
              onChange={handleInputChange}
              required
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200 cursor-pointer"
              style={{ borderRadius: '8px' }}
            />
          </div>
        </div>

        {/* Grid for funding goal & minimum contribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="campaign-goal" className="text-xs font-semibold text-foreground">
              Funding Goal (Credits)
            </label>
            <input
              id="campaign-goal"
              type="number"
              name="funding_goal"
              min="1"
              value={formData.funding_goal}
              onChange={handleInputChange}
              placeholder="e.g. 1000"
              required
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200"
              style={{ borderRadius: '8px' }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="campaign-min-contrib" className="text-xs font-semibold text-foreground">
              Minimum Contribution (Credits)
            </label>
            <input
              id="campaign-min-contrib"
              type="number"
              name="minimum_contribution"
              min="1"
              value={formData.minimum_contribution}
              onChange={handleInputChange}
              placeholder="e.g. 10"
              required
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200"
              style={{ borderRadius: '8px' }}
            />
          </div>
        </div>

        {/* Reward Info */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="campaign-reward" className="text-xs font-semibold text-foreground">
            Reward Details
          </label>
          <textarea
            id="campaign-reward"
            name="reward_info"
            rows={3}
            value={formData.reward_info}
            onChange={handleInputChange}
            placeholder="Explain what reward or benefit supporters will receive for backing your campaign"
            required
            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200"
            style={{ borderRadius: '8px' }}
          />
        </div>

        {/* Cover Image Upload */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-foreground">Cover Image</span>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Upload Area */}
            <div className="md:col-span-2">
              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-[var(--primary)] dark:hover:border-[var(--primary)] rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
                  isUploading ? 'opacity-50 cursor-wait' : ''
                }`}
                style={{ borderRadius: '8px' }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="hidden"
                />
                
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400 mb-2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
                
                <span className="text-xs font-semibold text-foreground mb-0.5">
                  {isUploading ? 'Uploading file...' : 'Click to Upload Image'}
                </span>
                <span className="text-[10px] text-[var(--text-secondary)]">
                  PNG, JPG or WEBP up to 5MB
                </span>
              </label>
            </div>

            {/* Preview Box */}
            <div className="flex items-center justify-center">
              {imagePreview ? (
                <div className="relative w-full h-[105px] border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-neutral-900" style={{ borderRadius: '8px' }}>
                  <img
                    src={imagePreview}
                    alt="Upload Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-full h-[105px] border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg flex items-center justify-center text-xs text-[var(--text-secondary)]"
                  style={{ borderRadius: '8px' }}
                >
                  Preview Area
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="px-5 py-2.5 border border-neutral-200 dark:border-neutral-700 text-foreground text-sm font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-150 cursor-pointer"
          style={{ borderRadius: '8px' }}
        >
          Cancel
        </button>
        <button
          type="submit"
          id="campaign-submit"
          disabled={isSubmitting || isUploading}
          className={`px-6 py-2.5 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:bg-[#4F46E5] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
            isSubmitting || isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{ borderRadius: '8px' }}
        >
          {isSubmitting ? 'Creating Campaign...' : 'Submit Campaign'}
        </button>
      </div>
    </form>
  );
}
