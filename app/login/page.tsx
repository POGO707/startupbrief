"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "./actions";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const res = await login(formData);
      if (res?.error) {
        console.error(res.error);
        alert(res.error);
        setIsLoading(false);
        return;
      }
      
      // If successful, the server action will automatically throw a redirect exception
      // which Next.js catches to perform the redirect, along with the cookies properly attached.
    } catch (e: any) {
      console.error(e);
      alert(e.message || "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4 font-sans">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-xl font-bold tracking-tight text-black mb-2">
            Startup Brief<span className="text-orange-600">.</span>
          </Link>
          <p className="text-sm text-neutral-500">Sign in to the Admin Dashboard</p>
        </div>

        <div className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] border border-neutral-200 p-8">
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-shadow"
                placeholder="admin@startupbrief.com"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-shadow"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          
          <div className="mt-6 text-center text-xs text-neutral-500">
            Secure access is strictly limited to authorized personnel.
          </div>
        </div>
      </div>
    </div>
  );
}
