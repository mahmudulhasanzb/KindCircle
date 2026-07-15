'use client';

import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  isProcessing?: boolean;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  isProcessing = false,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={isProcessing ? undefined : onClose} 
      />
      
      {/* Modal Content */}
      <div
        className="relative bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-[440px] p-6 shadow-2xl animate-in fade-in scale-in-95 duration-200 z-50"
        style={{ borderRadius: '16px', padding: '24px' }}
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex-shrink-0">
            <AlertTriangle className="h-6 w-6 stroke-[2]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white tracking-tight leading-none">
                {title}
              </h3>
              {!isProcessing && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/50 transition-colors cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              )}
            </div>
            
            <div className="mt-3 text-sm text-neutral-300 leading-relaxed">
              {message}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-neutral-800/60">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 border border-neutral-800 text-neutral-300 text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderRadius: '8px' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`px-5 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-500 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            style={{ borderRadius: '8px' }}
          >
            {isProcessing ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
