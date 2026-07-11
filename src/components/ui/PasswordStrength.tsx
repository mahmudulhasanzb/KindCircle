"use client";

import React from "react";

interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;

  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1)
    return { score: 1, label: "Weak", color: "bg-danger" };
  if (score <= 2)
    return { score: 2, label: "Fair", color: "bg-accent" };
  if (score <= 3)
    return { score: 3, label: "Good", color: "bg-secondary" };
  return { score: 4, label: "Strong", color: "bg-success" };
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, label, color } = getStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      {/* Bar segments */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              level <= score ? color : "bg-neutral-800"
            }`}
          />
        ))}
      </div>
      <p
        className={`text-xs font-medium transition-colors ${
          score <= 1
            ? "text-danger"
            : score <= 2
              ? "text-accent"
              : score <= 3
                ? "text-secondary"
                : "text-success"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
