"use client";

import { useState, useEffect } from "react";

export interface MockUser {
  name: string;
  email: string;
  role: "supporter" | "creator" | "admin";
  credits: number;
  avatar: string;
}

const DEFAULT_MOCK_USER: MockUser = {
  name: "John Doe",
  email: "john@example.com",
  role: "supporter",
  credits: 850,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
};

export function useMockAuth() {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("mock_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        setUser(null);
      }
    }
    setLoading(false);

    const handleStorageChange = () => {
      const updated = localStorage.getItem("mock_user");
      if (updated) {
        try {
          setUser(JSON.parse(updated));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("mock-auth-change", handleStorageChange);
    return () => {
      window.removeEventListener("mock-auth-change", handleStorageChange);
    };
  }, []);

  const login = (role: "supporter" | "creator" | "admin" = "supporter") => {
    const newUser = { ...DEFAULT_MOCK_USER, role };
    localStorage.setItem("mock_user", JSON.stringify(newUser));
    setUser(newUser);
    window.dispatchEvent(new Event("mock-auth-change"));
  };

  const logout = () => {
    localStorage.removeItem("mock_user");
    setUser(null);
    window.dispatchEvent(new Event("mock-auth-change"));
  };

  return { user, loading, login, logout };
}
